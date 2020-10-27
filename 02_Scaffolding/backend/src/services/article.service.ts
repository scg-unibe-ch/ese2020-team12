import {ArticleList, ArticleListAttributes} from '../models/article.model';
import {SellProductItem} from '../models/sellProduct.model';
import {LendProductItem} from '../models/lendProduct.model';



export class ArticleService {

    public postArticle(article: ArticleListAttributes): Promise<ArticleListAttributes> {
        console.log(article);
        return ArticleList.create(article).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public putArticle(article: ArticleListAttributes): Promise<ArticleListAttributes> {
        return ArticleList.findOne({
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

    public deleteArticle(article: ArticleListAttributes) {
        ArticleList.findOne({
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

    public getArticles(body: ArticleListAttributes): Promise<ArticleListAttributes[]> {
        console.log(body);
        return ArticleList.findAll(
                  {
                      include:
                          [
                              ArticleList.associations.sellProductItems,
                              ArticleList.associations.lendProductItems,
                              ArticleList.associations.serviceItems
                          ]
              }
        );
    /*
    * ,
            include:
                [
                    ArticleList.associations.sellProductItems,
                    ArticleList.associations.lendProductItems,
                    ArticleList.associations.serviceItems
                ]
        }*/
}}
