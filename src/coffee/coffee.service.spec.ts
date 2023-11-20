import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { PrismaService } from '../prisma/prisma.service';

const mockedData = [
  {
    id: 0,
    name: 'coffee black',
    description: 'black coffee',
    price: 1.0,
    imageUrl: 'https://www.google.com',
    coffeeType: { id: 0, name: 'black' },
  },
  {
    id: 1,
    name: 'sweet coffee',
    description: 'sweet coffee',
    price: 1.0,
    imageUrl: 'https://www.google.com',
    coffeeType: { id: 1, name: 'sweet' },
  },
  {
    id: 2,
    name: 'fake coffee',
    description: 'fake coffee',
    price: 1.0,
    imageUrl: 'https://www.google.com',
    coffeeType: { id: 2, name: 'fake' },
  },
];

describe('CoffeeService', () => {
  let service: CoffeeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeService, PrismaService],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a coffee', async () => {
    prisma.coffee.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.coffee.create = jest.fn().mockReturnValueOnce(mockedData[0]);

    const data = {
      name: 'coffee black',
      description: 'black coffee',
      price: 1.0,
      imageUrl: 'https://www.google.com',
      coffeeTypeId: '0',
    };

    expect(await service.create(data)).toBe(mockedData[0]);

    expect(prisma.coffee.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('should throw an error when creating a coffee that already exists', async () => {
    prisma.coffee.findFirst = jest.fn().mockReturnValueOnce(mockedData[0]);

    const data = {
      name: 'coffee black',
      description: 'black coffee',
      price: 1.0,
      imageUrl: 'https://www.google.com',
      coffeeTypeId: '0',
    };

    expect(async () => await service.create(data)).rejects.toThrow(
      'Coffee already exists',
    );
  });

  it('should return many coffees', async () => {
    prisma.coffee.findMany = jest.fn().mockReturnValueOnce(mockedData);

    expect(await service.findAll()).toBe(mockedData);
  });

  it('should return many coffees by type', async () => {
    prisma.coffee.findMany = jest.fn().mockReturnValueOnce(mockedData[1]);

    expect(await service.findAllByType('1')).toBe(mockedData[1]);
  });

  it('should update a coffee', async () => {
    prisma.coffee.findFirst = jest.fn().mockReturnValueOnce(mockedData[0]);
    prisma.coffee.update = jest.fn().mockReturnValueOnce(mockedData[0]);

    const data = {
      name: 'coffee black',
      description: 'black coffee',
      price: 1.0,
      imageUrl: 'https://www.google.com',
      coffeeTypeId: '0',
    };

    expect(await service.update('0', data)).toBe(mockedData[0]);

    expect(prisma.coffee.update).toHaveBeenCalledWith({
      where: {
        id: '0',
      },
      data,
    });
  });

  it('should throw an error when updating a coffee that does not exist', async () => {
    prisma.coffee.findFirst = jest.fn().mockReturnValueOnce(null);

    const data = {
      name: 'coffee black',
      description: 'black coffee',
      price: 1.0,
      imageUrl: 'https://www.google.com',
      coffeeTypeId: '0',
    };

    expect(async () => await service.update('0', data)).rejects.toThrow(
      'Coffee not found',
    );
  });
});
