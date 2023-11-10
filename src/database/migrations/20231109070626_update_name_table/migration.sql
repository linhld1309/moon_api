/*
  Warnings:

  - You are about to drop the `AccessRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieActors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSubscriptionPlans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieActors" DROP CONSTRAINT "MovieActors_actorId_fkey";

-- DropForeignKey
ALTER TABLE "MovieActors" DROP CONSTRAINT "MovieActors_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieGenres" DROP CONSTRAINT "MovieGenres_genreName_fkey";

-- DropForeignKey
ALTER TABLE "MovieGenres" DROP CONSTRAINT "MovieGenres_movieId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscriptionPlans" DROP CONSTRAINT "UserSubscriptionPlans_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscriptionPlans" DROP CONSTRAINT "UserSubscriptionPlans_userId_fkey";

-- DropTable
DROP TABLE "AccessRoles";

-- DropTable
DROP TABLE "MovieActors";

-- DropTable
DROP TABLE "MovieGenres";

-- DropTable
DROP TABLE "Subscriptions";

-- DropTable
DROP TABLE "UserSubscriptionPlans";

-- CreateTable
CREATE TABLE "AccessRole" (
    "id" TEXT NOT NULL,
    "roleType" TEXT DEFAULT 'User',
    "level" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieActor" (
    "movieId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieActor_pkey" PRIMARY KEY ("movieId","actorId")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" TEXT NOT NULL,
    "genreName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreName")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "amount" INTEGER,
    "timeDurationAmount" INTEGER,
    "timeDurationUnit" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionId")
);

-- CreateTable
CREATE TABLE "UserSubscriptionPlan" (
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "subscriptionStatus" "SubscriptionStatus"[],
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "suspendedAt" TIMESTAMP(3),
    "subscriptionAutoRenewal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscriptionPlan_pkey" PRIMARY KEY ("userId","subscriptionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessRole_roleType_key" ON "AccessRole"("roleType");

-- CreateIndex
CREATE UNIQUE INDEX "AccessRole_level_key" ON "AccessRole"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscriptionId_key" ON "Subscription"("subscriptionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "AccessRole"("roleType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreName_fkey" FOREIGN KEY ("genreName") REFERENCES "Genre"("genreName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionPlan" ADD CONSTRAINT "UserSubscriptionPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionPlan" ADD CONSTRAINT "UserSubscriptionPlan_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("subscriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;
