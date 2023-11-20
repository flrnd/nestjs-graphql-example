import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeResolver } from './coffee.resolver';

@Module({
  providers: [CoffeeResolver, CoffeeService],
})
export class CoffeeModule {}
