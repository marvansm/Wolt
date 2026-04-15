import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    return this.prisma.store.create({
      data: createStoreDto as any,
    });
  }

  async findAll() {
    return this.prisma.store.findMany();
  }

  async findOne(id: string) {
    const formattedName = id.replace(/-/g, ' ');
    const store = await this.prisma.store.findFirst({
      where: {
        OR: [
          { id: id },
          { name: { equals: formattedName, mode: 'insensitive' } }
        ]
      }
    });

    if (!store) {
      throw new NotFoundException(`Store with ID or name ${id} not found`);
    }
    return store;
  }

  async update(id: string, updateStoreDto: Partial<CreateStoreDto>) {
    try {
      return await this.prisma.store.update({
        where: { id },
        data: updateStoreDto as any,
      });
    } catch {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.store.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
  }

  async search(query: string) {
    if (!query) return [];
    
    // Refined search: Only matches store metadata OR specific fields inside the menu JSON
    return this.prisma.$queryRaw`
      SELECT * FROM "Store"
      WHERE "name" ILIKE ${'%' + query + '%'}
         OR EXISTS (
           SELECT 1 FROM jsonb_array_elements("menu") AS product
           WHERE product->>'name' ILIKE ${'%' + query + '%'}
              OR product->>'description' ILIKE ${'%' + query + '%'}
         )
    `;
  }
}
