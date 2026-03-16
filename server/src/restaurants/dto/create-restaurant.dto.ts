export class CreateRestaurantDto {
  name: string;
  description: string;
  image: string;
  banner: string;
  avatar: string;
  deliveryTime: string;
  rating: number;
  priceRange: string;
  deliveryFee: string;
  minOrderAmount?: number;
  promo?: string;
  address: string;
  menu: { name: string; category?: string; categoryIcon?: string; price: number; originalPrice?: number; description?: string; image?: string; weight?: string; unitPrice?: string; badge?: string }[];
}
