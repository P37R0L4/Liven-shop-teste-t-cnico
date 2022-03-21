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
