import express, { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import {ProfilePhotoService} from '../services/profilePhoto.service';
import path from 'path';
import {verifyToken} from '../middlewares/checkAuth';
import {upload} from '../middlewares/fileFilter';

const profilePhotoService = new ProfilePhotoService();
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
    '/:userId',
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
