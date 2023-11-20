import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';

@Resolver('Coffee')
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id') id: string,
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeeService.update(id, createCoffeeInput);
  }

  @Mutation('deleteCoffee')
  async delete(@Args('id') id: string) {
    return this.coffeeService.remove(id);
  }

  @Query('coffees')
  async getCoffees(@Args('coffeeTypeId') coffeeTypeId?: string) {
    if (coffeeTypeId) {
      return this.coffeeService.findAllByType(coffeeTypeId);
    }
    return this.coffeeService.findAll();
  }
}
