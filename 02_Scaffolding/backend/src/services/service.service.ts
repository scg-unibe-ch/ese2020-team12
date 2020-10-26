import {SellProductItem, SProductItemCreationAttributes} from '../models/sellProduct.model';
import {ServiceItem, ServiceItemCreationAttributes} from '../models/service.model';


export class ServiceProductService {

    public postService(sellProduct: ServiceItemCreationAttributes): Promise<ServiceItemCreationAttributes> {
        return ServiceItem.create(sellProduct).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public putService(article: ServiceItemCreationAttributes): Promise<ServiceItemCreationAttributes> {
        return ServiceItem.findOne({
            where: {
                serviceId: article.serviceId
            }})
            .then(found => {
                if (found != null) {
                    return  found.update(article);
                } else {
                    return Promise.reject({ message: 'article not found' });
                }
            }).catch(err => Promise.reject({ message: err }));
    }

    public deleteArticle(article: ServiceItemCreationAttributes) {
        ServiceItem.findOne({
            where: {
                serviceId: article.serviceId
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

    public getArticles(body: ServiceItemCreationAttributes): Promise<ServiceItemCreationAttributes[]> {
        return ServiceItem.findAll({
            where: {
                serviceId: body.serviceId
            }
        });
    }
}
