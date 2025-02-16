export interface Product {
  id: number;
  price: number;
  title: string;
  category: Category;
  description: string;
  image: string;
}

export type APIResource = Product | Category | Product[] | Category[];

export type Category =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing";

export interface queryType {
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;
}

export class QueryBuilder {
  #baseUrl = 'https://fakestoreapi.com/products';
  #limit: number;
  #order: 'asc' | 'desc';
  #query: keyof queryType;
  #id: number;
  #category: Category;

  constructor(
    query: keyof queryType = 'product',
    limit = 0,
    order: 'asc' | 'desc' = 'asc',
    id = 1,
    category: Category = 'electronics'
  ) {
    this.#limit = limit;
    this.#order = order;
    this.#query = query;
    this.#id = id;
    this.#category = category;
  }

  limit(n: number) {
    this.#limit = n;
    return this;
  }

  sort(order: 'asc' | 'desc') {
    this.#order = order;
    return this;
  }

  id(id: number) {
    this.#id = id;
    return this;
  }

  type(query: keyof queryType) {
    this.#query = query;
    return this;
  }

  category(category: Category) {
    this.#category = category;
    return this;
  }

  build() {
    let url = this.#baseUrl;
    switch (this.#query) {
      case 'categories':
        url += '/categories';
        break;
      case 'products':
        url += '?limit=' + this.#limit + '&sort=' + this.#order;
        break;
      case 'product':
        url += '/' + this.#id;
        break;
      case 'category':
        url += '/category/' + this.#category;
    }

    return encodeURI(url);
  }
}
