
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CoffeeTypeInput {
    name: string;
}

export class CreateCoffeeInput {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    coffeeTypeId: string;
}

export class CoffeeType {
    id: string;
    name: string;
}

export abstract class IQuery {
    abstract coffeeType(coffeeTypeId?: Nullable<string>): Nullable<CoffeeType>[] | Promise<Nullable<CoffeeType>[]>;

    abstract coffees(coffeeTypeId?: Nullable<string>): Nullable<Coffee>[] | Promise<Nullable<Coffee>[]>;
}

export abstract class IMutation {
    abstract createCoffeeType(input: CoffeeTypeInput): CoffeeType | Promise<CoffeeType>;

    abstract updateCoffeeType(id: string, input: CoffeeTypeInput): CoffeeType | Promise<CoffeeType>;

    abstract deleteCoffeeType(id: string): CoffeeType | Promise<CoffeeType>;

    abstract createCoffee(createCoffeeInput: CreateCoffeeInput): CreateCoffeeOutput | Promise<CreateCoffeeOutput>;

    abstract updateCoffee(id: string, createCoffeeInput: CreateCoffeeInput): CreateCoffeeOutput | Promise<CreateCoffeeOutput>;

    abstract deleteCoffee(id: string): Coffee | Promise<Coffee>;
}

export class Coffee {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    coffeeType: CoffeeType;
}

export class CreateCoffeeOutput {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    coffeeTypeId: string;
}

type Nullable<T> = T | null;
