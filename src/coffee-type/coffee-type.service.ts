import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeTypeInput } from './dto/create-coffee-type.input';

@Injectable()
export class CoffeeTypeService {
  constructor(private prisma: PrismaService) {}

  private async exists(name: string): Promise<boolean> {
    const exists = await this.prisma.coffeeType.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return !!exists;
  }

  private async existsById(id: string): Promise<boolean> {
    const exists = await this.prisma.coffeeType.findFirst({
      where: {
        id,
      },
    });

    return !!exists;
  }

  async create(createCoffeeTypeInput: CreateCoffeeTypeInput) {
    if (await this.exists(createCoffeeTypeInput.name)) {
      throw new Error('Coffee type already exists');
    }

    return this.prisma.coffeeType.create({
      data: {
        name: createCoffeeTypeInput.name,
      },
    });
  }

  async update(id: string, createCoffeeTypeInput: CreateCoffeeTypeInput) {
    if (!(await this.exists(createCoffeeTypeInput.name))) {
      throw new Error('Coffee type already exists');
    }

    return this.prisma.coffeeType.update({
      where: {
        id,
      },
      data: {
        name: createCoffeeTypeInput.name,
      },
    });
  }

  async remove(id: string) {
    if (!(await this.existsById(id))) {
      throw new Error('Coffee type not found');
    }

    return this.prisma.coffeeType.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.coffeeType.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.coffeeType.findUnique({
      where: {
        id,
      },
    });
  }
}
