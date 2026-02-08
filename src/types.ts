export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  id?: number; 
}

export interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
}
