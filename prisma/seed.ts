import { PrismaClient } from '@prisma/client';

// TODO: Add aws sdk upload image to s3
const robustaPlaceholder =
  'https://placeholder.pics/svg/300x300/DEDEDE/555555/Robusta';
const arabicPlaceholder =
  'https://placeholder.pics/svg/300x300/DEDEDE/555555/Arabic';

const prisma = new PrismaClient();
async function main() {
  const arabic = await prisma.coffeeType.upsert({
    where: { name: 'Arabic' },
    update: {},
    create: {
      name: 'Arabic',
    },
  });

  const robusta = await prisma.coffeeType.upsert({
    where: { name: 'Robusta' },
    update: {},
    create: {
      name: 'Robusta',
    },
  });

  const darkRoast = await prisma.coffee.upsert({
    where: { name: 'Dark Roast' },
    update: {},
    create: {
      name: 'Dark Roast',
      description: 'Free in the MVST office',
      price: 19.0,
      imageUrl: arabicPlaceholder,
      coffeeTypeId: arabic.id,
    },
  });

  const americano = await prisma.coffee.upsert({
    where: { name: 'Americano' },
    update: {},
    create: {
      name: 'Americano',
      description: 'Free in the MVST office',
      price: 20.0,
      imageUrl: robustaPlaceholder,
      coffeeTypeId: robusta.id,
    },
  });

  const capuccino = await prisma.coffee.upsert({
    where: { name: 'Capuccino' },
    update: {},
    create: {
      name: 'Capuccino',
      description: 'Free in the MVST office',
      price: 15.0,
      imageUrl: arabicPlaceholder,
      coffeeTypeId: arabic.id,
    },
  });

  const decafAmericano = await prisma.coffee.upsert({
    where: { name: 'Decaf Americano' },
    update: {},
    create: {
      name: 'Decaf Americano',
      description: 'Free in the MVST office',
      price: 20.0,
      imageUrl: robustaPlaceholder,
      coffeeTypeId: robusta.id,
    },
  });

  const pineRoast = await prisma.coffee.upsert({
    where: { name: 'Pine Roast' },
    update: {},
    create: {
      name: 'Pine Roast',
      description: 'Free in the MVST office',
      price: 19.0,
      imageUrl: arabicPlaceholder,
      coffeeTypeId: arabic.id,
    },
  });

  const raphaelOriginal = await prisma.coffee.upsert({
    where: { name: 'Raphael Original' },
    update: {},
    create: {
      name: 'Raphael Original',
      description: 'Free in the MVST office',
      price: 15.0,
      imageUrl: robustaPlaceholder,
      coffeeTypeId: robusta.id,
    },
  });

  console.log('Seeding the database...');

  console.log({
    arabic,
    robusta,
    darkRoast,
    americano,
    capuccino,
    decafAmericano,
    pineRoast,
    raphaelOriginal,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
