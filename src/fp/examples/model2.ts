import lazyMap from '../lazy/lazyMap';
import go from '../utils/go';
import iterReduce from '../utils/iterReduce';
import { Model, Collection } from './model';

interface IProduct {
  id: number;
  price: number;
}

class Product extends Model<IProduct> {}

class ProductList extends Collection<Product> {
  totalPrice() {
    return go(
      this,
      lazyMap((p: Product) => p.get('price')),
      iterReduce((prev: number, curr: number) => prev + curr)
    );
  }
}

const main = () => {
  const proudctList = new ProductList();
  proudctList.add(new Product({ id: 1, price: 10000 }));
  console.log(proudctList.totalPrice());
  proudctList.add(new Product({ id: 2, price: 20000 }));
  console.log(proudctList.totalPrice());
  proudctList.add(new Product({ id: 3, price: 30000 }));
  console.log(proudctList.totalPrice());
};

main();
