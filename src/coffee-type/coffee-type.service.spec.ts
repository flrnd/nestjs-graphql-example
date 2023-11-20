import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeTypeService } from './coffee-type.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CoffeeTypeService', () => {
  let service: CoffeeTypeService;
  let prisma: PrismaService;

  const mockedCoffeeTypes = [
    { id: 0, name: 'black' },
    { id: 1, name: 'sweet' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeTypeService, PrismaService],
    }).compile();

    service = module.get<CoffeeTypeService>(CoffeeTypeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should find all coffee types', async () => {
    prisma.coffeeType.findMany = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes);

    expect(await service.findAll()).toBe(mockedCoffeeTypes);
  });

  it('should find one coffee type', async () => {
    prisma.coffeeType.findUnique = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes[0]);

    expect(await service.findOne('0')).toBe(mockedCoffeeTypes[0]);
  });

  it('should create a coffee type', async () => {
    prisma.coffeeType.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.coffeeType.create = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes[0]);

    expect(await service.create({ name: 'black' })).toBe(mockedCoffeeTypes[0]);
  });

  it('should update a coffee type', async () => {
    prisma.coffeeType.findFirst = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes[0]);
    prisma.coffeeType.update = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes[0]);

    expect(await service.update('0', { name: 'black' })).toBe(
      mockedCoffeeTypes[0],
    );
  });

  it('should remove a coffee type', async () => {
    prisma.coffeeType.findFirst = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes[0]);
    prisma.coffeeType.delete = jest
      .fn()
      .mockReturnValueOnce(mockedCoffeeTypes[0]);

    expect(await service.remove('0')).toBe(mockedCoffeeTypes[0]);
  });
});
