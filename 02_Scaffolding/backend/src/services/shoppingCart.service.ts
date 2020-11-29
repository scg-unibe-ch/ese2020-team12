import {ShoppingCartItem, ShoppingCartItemCreationAttributes} from '../models/shoppingCart.model';




export class ShoppingCartService {

    public postShoppingCart(item: ShoppingCartItemCreationAttributes): Promise<ShoppingCartItemCreationAttributes> {
        return ShoppingCartItem.create(item).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public getSellArticles(id: number): Promise<ShoppingCartItemCreationAttributes[]> {
        return ShoppingCartItem.findAll({
            where: {
                userId: id
            }
        });
    }

}
