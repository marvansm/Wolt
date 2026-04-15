import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      console.log('[ReviewsService] Creating review with data:', JSON.stringify(createReviewDto, null, 2));
      
      // Ensure rating is an integer to match Prisma schema (Int)
      const data = {
        ...createReviewDto,
        rating: Math.round(Number(createReviewDto.rating || 5))
      };

      return await this.prisma.review.create({
        data,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('[ReviewsService] Error creating review:', error);
      if (error.code === 'P2003') {
        console.error('[ReviewsService] Foreign key constraint failed. Check if userId or restaurantId/productId exists in DB.');
      }
      throw error;
    }
  }

  async findByRestaurant(restaurantId: string) {
    return this.prisma.review.findMany({
      where: { restaurantId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByProduct(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAverageRatings(ids: string[], type: 'restaurant' | 'product') {
    if (!ids || ids.length === 0) return [];
    
    const validIds = ids.filter(id => id !== null && id !== undefined && id !== '');
    if (validIds.length === 0) return [];
    
    const ratings = await this.prisma.review.groupBy({
      by: [type === 'restaurant' ? 'restaurantId' : 'productId'],
      where: {
        [type === 'restaurant' ? 'restaurantId' : 'productId']: { in: validIds },
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return ratings
      .filter(r => (type === 'restaurant' ? r.restaurantId : r.productId) !== null)
      .map((r) => ({
        id: type === 'restaurant' ? r.restaurantId : r.productId,
        average: r._avg.rating || 0,
        count: r._count.rating || 0,
      }));
  }
}
