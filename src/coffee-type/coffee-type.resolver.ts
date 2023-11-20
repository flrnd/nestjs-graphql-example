import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoffeeTypeService } from './coffee-type.service';
import { CreateCoffeeTypeInput } from './dto/create-coffee-type.input';

@Resolver('CoffeeType')
export class CoffeeTypeResolver {
  constructor(private readonly coffeeTypeService: CoffeeTypeService) {}

  @Mutation('createCoffeeType')
  create(
    @Args('CreateCoffeeTypeInput') createCoffeeTypeInput: CreateCoffeeTypeInput,
  ) {
    return this.coffeeTypeService.create(createCoffeeTypeInput);
  }

  @Mutation('updateCoffeeType')
  update(
    @Args('id') id: string,
    @Args('CreateCoffeeTypeInput') createCoffeeTypeInput: CreateCoffeeTypeInput,
  ) {
    return this.coffeeTypeService.update(id, createCoffeeTypeInput);
  }

  @Mutation('deleteCoffeeType')
  delete(@Args('id') id: string) {
    return this.coffeeTypeService.remove(id);
  }

  @Query('coffeeType')
  getCoffeeTypes(@Args('id') coffeeTypeId?: string) {
    if (coffeeTypeId) {
      return this.coffeeTypeService.findOne(coffeeTypeId);
    }

    return this.coffeeTypeService.findAll();
  }
}
