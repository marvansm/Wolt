import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: createRestaurantDto as any,
    });
  }

  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: string) {
    const formattedName = id.replace(/-/g, ' ');
    const restaurant = await this.prisma.restaurant.findFirst({
      where: {
        OR: [
          { id: id },
          { name: { equals: formattedName, mode: 'insensitive' } }
        ]
      }
    });

    if (!restaurant) throw new NotFoundException(`Restaurant with ID or name ${id} not found`);
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: Partial<CreateRestaurantDto>) {
    try {
      return await this.prisma.restaurant.update({
        where: { id },
        data: updateRestaurantDto as any,
      });
    } catch {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.restaurant.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }

  async search(query: string) {
    if (!query) return [];
    
    // Refined search: Only matches restaurant metadata OR specific fields inside the menu JSON
    return this.prisma.$queryRaw`
      SELECT * FROM "Restaurant"
      WHERE "name" ILIKE ${'%' + query + '%'}
         OR "description" ILIKE ${'%' + query + '%'}
         OR "address" ILIKE ${'%' + query + '%'}
         OR EXISTS (
           SELECT 1 FROM jsonb_array_elements("menu") AS product
           WHERE product->>'name' ILIKE ${'%' + query + '%'}
              OR product->>'description' ILIKE ${'%' + query + '%'}
         )
    `;
  }
}
