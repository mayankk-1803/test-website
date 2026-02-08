import type { Product, Testimonial } from './types';


export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation technology',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with style',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    description: 'Crystal clear audio in a compact design',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1279406/pexels-photo-1279406.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Professional Camera Lens',
    description: 'Capture stunning photos with precision optics',
    price: 449.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Ergonomic Office Chair',
    description: 'Ultimate comfort for long working hours',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    description: 'Tactile typing experience for professionals',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mayank Mathur',
    review: 'Amazing products! The quality exceeded my expectations. Fast shipping and excellent customer service.',
    rating: 5
  },
  {
    id: 2,
    name: 'Arjun Singh',
    review: 'I\'ve been shopping here for over a year now. Always reliable and their products are top-notch.',
    rating: 5
  },
  {
    id: 3,
    name: 'Manaj Kaushik',
    review: 'Best online shopping experience ever! The products arrived perfectly packaged and exactly as described.',
    rating: 5
  }
];
