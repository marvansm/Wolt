export class CreateReviewDto {
  rating: number;
  comment: string;
  userId: string;
  restaurantId?: string;
  productId?: string;
}
