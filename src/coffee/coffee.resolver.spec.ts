import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';
import { Coffee } from 'src/graphql';

const mockedCoffee: Coffee = {
  id: '0',
  name: 'coffee black',
  description: 'black coffee',
  price: 1.0,
  imageUrl: 'https://www.google.com',
  coffeeType: { id: '0', name: 'black' },
};

const updatedMockedCoffee: Coffee = {
  id: '0',
  name: 'updated coffee black',
  description: 'black coffee',
  price: 1.0,
  imageUrl: 'https://www.google.com',
  coffeeType: { id: '0', name: 'black' },
};

const mockedCoffees: Coffee[] = [mockedCoffee];

const coffeeServiceMock = {
  create: jest.fn().mockReturnValue(mockedCoffee),
  update: jest.fn().mockReturnValue(updatedMockedCoffee),
  remove: jest.fn().mockReturnValue(mockedCoffee),
  findAll: jest.fn().mockReturnValue(mockedCoffees),
  findAllByType: jest.fn().mockReturnValue(mockedCoffees),
  findOneById: jest.fn().mockReturnValue(mockedCoffee),
};

describe('CoffeeResolver', () => {
  let resolver: CoffeeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeResolver,
        { provide: CoffeeService, useValue: coffeeServiceMock },
      ],
    }).compile();

    resolver = module.get<CoffeeResolver>(CoffeeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a coffee', async () => {
    expect(
      await resolver.create({
        name: 'coffee black',
        description: 'black coffee',
        price: 1.0,
        imageUrl: 'https://www.google.com',
        coffeeTypeId: '0',
      }),
    ).toBe(mockedCoffee);

    expect(coffeeServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update a coffee', async () => {
    expect(
      await resolver.update('0', {
        name: 'updated coffee black',
        description: 'black coffee',
        price: 1.0,
        imageUrl: 'https://www.google.com',
        coffeeTypeId: '0',
      }),
    ).toBe(updatedMockedCoffee);

    expect(coffeeServiceMock.update).toHaveBeenCalledTimes(1);
    expect(coffeeServiceMock.update).toHaveBeenCalledWith('0', {
      name: 'updated coffee black',
      description: 'black coffee',
      price: 1.0,
      imageUrl: 'https://www.google.com',
      coffeeTypeId: '0',
    });
  });

  it('should find all coffees', async () => {
    expect(await resolver.getCoffees()).toBe(mockedCoffees);

    expect(coffeeServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find all coffees by type', async () => {
    expect(await resolver.getCoffees('0')).toBe(mockedCoffees);

    expect(coffeeServiceMock.findAllByType).toHaveBeenCalledTimes(1);
  });

  it('should delete a coffee', async () => {
    expect(await resolver.delete('0')).toBe(mockedCoffee);

    expect(coffeeServiceMock.remove).toHaveBeenCalledTimes(1);
  });
});
