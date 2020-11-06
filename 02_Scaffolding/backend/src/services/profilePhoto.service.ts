import {ProfilePhoto} from '../models/profilePhoto.model';


export class ProfilePhotoService {

    public async create(file: any) {
        return ProfilePhoto.create(file);
    }

    public async getFilename(photoId: string) {
        const photo = await ProfilePhoto.findOne({
            where: {
                id: photoId,
            },
        });
        return photo.fileName;
    }

}

export const profilePhotoService = new ProfilePhotoService();
