import {ProfilePhoto, ProfilePhotoCreationAttributes} from '../models/profilePhoto.model';


export class ProfilePhotoService {


    public static findPicture(userId: string): Promise<ProfilePhotoCreationAttributes> {
        return ProfilePhoto.findOne({
            where: {userId: userId}
        });
    }

    public postProfilePhoto(image: any): Promise<ProfilePhotoCreationAttributes> {
        return ProfilePhoto.create(image).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }
}
