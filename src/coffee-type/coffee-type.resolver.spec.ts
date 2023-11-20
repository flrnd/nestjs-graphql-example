import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeTypeResolver } from './coffee-type.resolver';
import { CoffeeTypeService } from './coffee-type.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CoffeeType } from 'src/graphql';

const mockCoffeeType: CoffeeType = {
  id: '0',
  name: 'black',
};

const mockCoffeeTypes: CoffeeType[] = [mockCoffeeType];

const coffeeTypeServiceMock = {
  create: jest.fn().mockReturnValue(mockCoffeeType),
  update: jest.fn().mockReturnValue(mockCoffeeType),
  findAll: jest.fn().mockReturnValue(mockCoffeeTypes),
  findOne: jest.fn().mockReturnValue(mockCoffeeType),
  remove: jest.fn().mockReturnValue(mockCoffeeType),
};

describe('CoffeeTypeResolver', () => {
  let resolver: CoffeeTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeTypeResolver,
        { provide: CoffeeTypeService, useValue: coffeeTypeServiceMock },
      ],
      imports: [PrismaModule],
    }).compile();

    resolver = module.get<CoffeeTypeResolver>(CoffeeTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all coffee types', async () => {
    expect(await resolver.getCoffeeTypes()).toBe(mockCoffeeTypes);

    expect(coffeeTypeServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find one coffee type by id', async () => {
    expect(await resolver.getCoffeeTypes('0')).toBe(mockCoffeeType);

    expect(coffeeTypeServiceMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should create a coffee type', async () => {
    expect(await resolver.create({ name: 'black' })).toBe(mockCoffeeType);

    expect(coffeeTypeServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update a coffee type', async () => {
    expect(await resolver.update('0', { name: 'black' })).toBe(mockCoffeeType);

    expect(coffeeTypeServiceMock.update).toHaveBeenCalledTimes(1);
  });

  it('should delete a coffee type', async () => {
    expect(await resolver.delete('0')).toBe(mockCoffeeType);

    expect(coffeeTypeServiceMock.remove).toHaveBeenCalledTimes(1);
  });
});
