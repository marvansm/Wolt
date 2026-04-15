import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      if (createOrderDto.paymentMethod === 'credit' && createOrderDto.userId) {
        const user = await this.prisma.user.findUnique({ where: { id: createOrderDto.userId } });
        if (!user) {
          throw new BadRequestException('User not found');
        }
        // @ts-ignore
        if (user.credit < createOrderDto.total) {
          throw new BadRequestException('Insufficient Wolt credits');
        }
        await this.prisma.user.update({
          where: { id: createOrderDto.userId },
          // @ts-ignore
          data: { credit: user.credit - createOrderDto.total }
        });
      }

      return await this.prisma.order.create({
        data: createOrderDto as any,
      });
    } catch (error) {
      console.error('[OrdersService] Error creating order:', error);
      if (error?.code === 'P2003') {
        throw new BadRequestException('Restaurant or User or Product does not exist. Please clear your cart and try again.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: string, updateOrderDto: Partial<CreateOrderDto>) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: updateOrderDto as any,
      });
    } catch {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.order.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
