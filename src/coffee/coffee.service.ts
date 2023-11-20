import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { PrismaService } from '../prisma/prisma.service';

const select = {
  id: true,
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  coffeeType: {
    select: {
      id: true,
      name: true,
    },
  },
};

@Injectable()
export class CoffeeService {
  constructor(private prisma: PrismaService) {}

  private async exists(name: string): Promise<boolean> {
    const exists = await this.prisma.coffee.findFirst({
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
    const exists = await this.prisma.coffee.findFirst({
      where: {
        id,
      },
    });

    return !!exists;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    if (await this.exists(createCoffeeInput.name)) {
      throw new Error('Coffee already exists');
    }

    return this.prisma.coffee.create({
      data: {
        name: createCoffeeInput.name,
        description: createCoffeeInput.description,
        price: createCoffeeInput.price,
        imageUrl: createCoffeeInput.imageUrl,
        coffeeTypeId: createCoffeeInput.coffeeTypeId,
      },
    });
  }

  async update(id: string, createCoffeeInput: CreateCoffeeInput) {
    if (!(await this.existsById(id))) {
      throw new Error('Coffee not found');
    }

    return this.prisma.coffee.update({
      where: {
        id,
      },
      data: {
        name: createCoffeeInput.name,
        description: createCoffeeInput.description,
        price: createCoffeeInput.price,
        imageUrl: createCoffeeInput.imageUrl,
        coffeeTypeId: createCoffeeInput.coffeeTypeId,
      },
    });
  }

  async findAll() {
    return this.prisma.coffee.findMany({
      select,
    });
  }

  findAllByType(coffeeTypeId: string) {
    return this.prisma.coffee.findMany({
      where: {
        coffeeTypeId: coffeeTypeId,
      },
      select,
    });
  }

  async remove(id: string) {
    if (!(await this.existsById(id))) {
      throw new Error('Coffee not found');
    }

    return this.prisma.coffee.delete({
      where: {
        id,
      },
    });
  }
}
