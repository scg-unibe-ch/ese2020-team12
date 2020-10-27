import {LendProductItem, LProductItemCreationAttributes} from '../models/lendProduct.model';


export class LendProductService {

    public postLendProduct(lendProduct: LProductItemCreationAttributes): Promise<LProductItemCreationAttributes> {
        return LendProductItem.create(lendProduct).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public putLendProduct(article: LProductItemCreationAttributes): Promise<LProductItemCreationAttributes> {
        return LendProductItem.findOne({
            where: {
                lendProductId: article.lendProductId
            }})
            .then(found => {
                if (found != null) {
                    return  found.update(article);
                } else {
                    return Promise.reject({ message: 'article not found' });
                }
            }).catch(err => Promise.reject({ message: err }));
    }

    public deleteArticle(article: LProductItemCreationAttributes) {
        LendProductItem.findOne({
            where: {
                lendProductId: article.lendProductId
            }})
            .then(found => {
                if (found != null) {
                    found.destroy()
                        .then(item => Promise.resolve({message: item}))
                        .catch(err => Promise.reject({message: err}));
                } else {
                    return Promise.reject();
                }
            })
            .catch(err => Promise.reject({message: err}));
    }

    public getArticles(body: LProductItemCreationAttributes): Promise<LProductItemCreationAttributes[]> {
        return LendProductItem.findAll({
            where: {
                lendProductId: body.lendProductId
            }
        });
    }
}
