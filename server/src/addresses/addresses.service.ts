import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    return this.prisma.address.create({
      data: createAddressDto,
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.address.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}
