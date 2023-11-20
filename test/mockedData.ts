import { Coffee, CoffeeType, CreateCoffeeOutput } from 'src/graphql';

export const coffees: Coffee[] = [
  {
    id: '0',
    name: 'coffee black',
    description: 'black coffee',
    price: 1.0,
    imageUrl: 'https://www.google.com',
    coffeeType: { id: '0', name: 'black' },
  },
  {
    id: '1',
    name: 'sweet coffee',
    description: 'sweet coffee',
    price: 1.0,
    imageUrl: 'https://www.google.com',
    coffeeType: { id: '1', name: 'sweet' },
  },
  {
    id: '2',
    name: 'fake coffee',
    description: 'fake coffee',
    price: 1.0,
    imageUrl: 'https://www.google.com',
    coffeeType: { id: '2', name: 'fake' },
  },
];

export const createOutput: CreateCoffeeOutput = {
  id: '0',
  name: 'black coffee',
  description: 'black coffee',
  price: 1.0,
  imageUrl: 'google.com',
  coffeeTypeId: '0',
};

export const coffeTypes: CoffeeType[] = [
  {
    id: '0',
    name: 'black',
  },
  {
    id: '1',
    name: 'sweet',
  },
];
