import { Module } from '@nestjs/common';
import { CoffeeTypeService } from './coffee-type.service';
import { CoffeeTypeResolver } from './coffee-type.resolver';

@Module({
  providers: [CoffeeTypeResolver, CoffeeTypeService],
})
export class CoffeeTypeModule {}
