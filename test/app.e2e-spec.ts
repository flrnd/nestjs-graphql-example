import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CoffeeService } from '../src/coffee/coffee.service';
import { CoffeeTypeService } from '../src/coffee-type/coffee-type.service';
import { coffeTypes, coffees, createOutput } from './mockedData';

const gql = '/graphql';

describe('GraphQL AppResolver', () => {
  let app: INestApplication;
  const coffeeService = {
    findAll: () => coffees,
    findAllByType: () => coffees,
    create: () => createOutput,
  };

  const coffeeTypeService = {
    findAll: () => coffeTypes,
    findOne: () => coffeTypes[0],
    create: () => coffeTypes[0],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CoffeeService)
      .useValue(coffeeService)
      .overrideProvider(CoffeeTypeService)
      .useValue(coffeeTypeService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe(gql, () => {
    describe('Coffee', () => {
      it('should find all coffees', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
            query {
              coffees {
                id
                name
                description
                price
                imageUrl
                coffeeType {
                  id
                  name
                }
              }
            }
          `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.coffees).toEqual(coffees);
          });
      });

      it('should find all coffees by type', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
            query {
              coffees(coffeeTypeId: "0") {
                id
                name
                description
                price
                imageUrl
                coffeeType {
                  id
                  name
                }
              }
            }
          `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.coffees).toEqual(coffees);
          });
      });

      it('should create a coffee', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
            mutation {
              createCoffee(createCoffeeInput: {name: "black coffee", description: "black coffee", price: 1.0, imageUrl: "google.com", coffeeTypeId: "0" }) {id name description price imageUrl coffeeTypeId}
            }
          `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createCoffee).toEqual(createOutput);
          });
      });
    });

    describe('CoffeeType', () => {
      it('should find all coffee types', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
            query {
              coffeeTypes {
                id
                name
              }
            }
          `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.coffeeTypes).toEqual(coffeTypes);
          });
      });

      it('should find one coffee type by id', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
            query {
              coffeeType(id: "0") {
                id
                name
              }
            }
          `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.coffeeType).toEqual(coffeTypes[0]);
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
