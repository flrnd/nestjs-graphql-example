-- CreateTable
CREATE TABLE "Coffee" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "coffeeTypeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeeType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "CoffeeType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coffee_name_key" ON "Coffee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeType_name_key" ON "CoffeeType"("name");

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_coffeeTypeId_fkey" FOREIGN KEY ("coffeeTypeId") REFERENCES "CoffeeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
