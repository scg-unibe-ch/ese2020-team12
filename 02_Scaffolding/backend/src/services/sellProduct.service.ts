import {SellProductItem, SProductItemCreationAttributes} from '../models/sellProduct.model';


export class SellProductService {

    public postSellProduct(sellProduct: SProductItemCreationAttributes): Promise<SProductItemCreationAttributes> {
        return SellProductItem.create(sellProduct).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public putSellProduct(article: SProductItemCreationAttributes): Promise<SProductItemCreationAttributes> {
        return SellProductItem.findOne({
            where: {
                articleListId: article.articleListId
            }})
            .then(found => {
                if (found != null) {
                    return  found.update(article);
                } else {
                    return Promise.reject({ message: 'article not found' });
                }
            }).catch(err => Promise.reject({ message: err }));
    }

    public deleteArticle(article: SProductItemCreationAttributes) {
        SellProductItem.findOne({
            where: {
                articleListId: article.articleListId
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

    public getArticles(body: SProductItemCreationAttributes): Promise<SProductItemCreationAttributes[]> {
        return SellProductItem.findAll({
            where: {
                sellProductId: body.sellProductId
            }
        });
    }
}
