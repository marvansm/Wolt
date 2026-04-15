import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto as any,
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async update(id: string, updateCategoryDto: Partial<CreateCategoryDto>) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto as any,
      });
      return updatedCategory;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
      });
      return deletedCategory;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
