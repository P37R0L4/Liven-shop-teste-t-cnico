declare type ProductRating = {
  rate?: number;
  count?: number;
};

declare type UserAddress = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  },
};

declare type UserName = {
  firstname: string;
  lastname: string;
}

declare type ProductOnCart = {
  productId?: number;
  quantity?: number;
};

declare type Products = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: ProductRating;
  quantity?: number;
};

declare type UserData = {
  email: string;
  username: string;
  password: string;
  id: number;
  phone: string;
  name: UserName,
  address: UserAddress;
};
