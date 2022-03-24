declare type ProductRating = {
  rate?: number;
  count?: number;
};

declare type Products = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: ProductRating;
};

declare type userData = {
  email: string;
  username: string;
  password: string;
  id: number;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  },
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    },
  },
};
