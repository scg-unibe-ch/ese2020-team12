import express, { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import {config} from '../config';
import {profilePhotoService} from '../services/profilePhoto.service';
import path from 'path';

const upload = multer({
    dest: config.uploadPath
});

const photoController = express.Router();
photoController.post('/photo',
    upload.array('images', 1),
    async (req: AuthFileRequest, res: Response, next: NextFunction) => {
    console.log('-----1');
        console.log(req.body.userId);
        try {
            console.log('-----2');
            const files = req.files as any[];
            console.log(files);
            console.log('-----3');
            const uploadPromises = files.map( file => {
                console.log('-----4');
                const image = {
                    userId: req.body.userId,
                    fileName: file.filename
                };
                return profilePhotoService.create(image);
            });
            await Promise.all(uploadPromises);
            res.send({ sucess: true });
        } catch (err) {
            return next(err);
        }
    }
);

photoController.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fileName = req.params.fileName;
            res.sendFile(path.join(process.cwd(), config.uploadPath + `/${fileName}`));
        } catch (err) {
            next(err);
        }
    }
);

interface AuthFileRequest extends Request {
    file: any;
}

export const ProfilePhotoController: Router = photoController;
