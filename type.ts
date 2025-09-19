//type.ts
export interface ProductProps {
  _id: string;
  name?: string;
  _type?: string;
  _rev?: string;
  _createdAt?: string;
  price?: number;
  rowprice?: number;
  title?: string;
  position?: string;
  ratings?: number;
  description?: string;
  slug?: {
    current: string;
    _type: string;
  };
  image?: {
    _type: string;
    asset: {
      _id: string;
      url: string;
    };
  };
  category?: {
    title: string;
  }[];
  brand?: {
    title: string;
  };
  productId?: string; // Add productId property
  isnew?: boolean;
  body?: any;
  quantity?: any; // Add quantity property
}
export interface CategoryProps {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
}
export interface StateProps {
  mojoy: {
    productData: ProductProps[];
    categoryData: CategoryProps[];
    totalAmount: number; // Add totalAmount property
  };
}
