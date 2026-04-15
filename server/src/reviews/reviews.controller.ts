import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string) {
    return this.reviewsService.findByRestaurant(id);
  }

  @Get('product/:id')
  findByProduct(@Param('id') id: string) {
    return this.reviewsService.findByProduct(id);
  }

  @Post('averages')
  getAverages(@Body() body: { ids: string[]; type: 'restaurant' | 'product' }) {
    return this.reviewsService.getAverageRatings(body.ids, body.type);
  }
}
