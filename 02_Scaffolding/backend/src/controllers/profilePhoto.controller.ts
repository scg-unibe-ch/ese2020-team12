import express, { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import {ProfilePhotoService} from '../services/profilePhoto.service';
import path from 'path';
import {verifyToken} from '../middlewares/checkAuth';

const profilePhotoService = new ProfilePhotoService();


const storage = multer.diskStorage(({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
    }
}));


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(new Error('wrong format'), true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});


const photoController = express.Router();

photoController.post('/:userId', upload.single('profilePic'), verifyToken, (req: Request, res: Response , next: NextFunction) => {
    console.log(req.file);
        try {
                const image = {
                    userId: Number(req.params.userId),
                    fileName: req.file.filename
                };
                profilePhotoService.postProfilePhoto(image);
                res.send({ sucess: true });
            } catch (err) {
            return next(err);
        }
    }
);

photoController.get(
    '/:userId', verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let fileName = '';
            const userId = req.params.userId;
            ProfilePhotoService.findPicture(userId).then(file => {
                fileName = file.fileName;
                res.sendFile(path.join(process.cwd(), './upload/' + fileName));
            });
        } catch (err) {
            next(err);
        }
    }
);



export const ProfilePhotoController: Router = photoController;
