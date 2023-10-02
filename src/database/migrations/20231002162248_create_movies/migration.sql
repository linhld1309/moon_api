/*
  Warnings:

  - You are about to drop the column `description` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_url` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `MovieFile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `documentedBy` was added to the `Movie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `movieId` was added to the `Movie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `trailerUrl` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED', 'SUSPENDED');

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "MovieFile" DROP CONSTRAINT "MovieFile_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "description",
DROP COLUMN "genre",
DROP COLUMN "release_date",
DROP COLUMN "thumbnail_url",
DROP COLUMN "userId",
ADD COLUMN     "documentedBy" TEXT NOT NULL,
ADD COLUMN     "movieId" TEXT NOT NULL,
ADD COLUMN     "posterUrl" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "synopsis" TEXT,
ADD COLUMN     "trailerUrl" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "accountActivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "MovieFile";

-- CreateTable
CREATE TABLE "AccessRoles" (
    "id" TEXT NOT NULL,
    "roleType" TEXT DEFAULT 'User',
    "level" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "actorId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieActors" (
    "movieId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieActors_pkey" PRIMARY KEY ("movieId","actorId")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "genreName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenres" (
    "movieId" TEXT NOT NULL,
    "genreName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieGenres_pkey" PRIMARY KEY ("movieId","genreName")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" SERIAL NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "amount" INTEGER,
    "timeDurationAmount" INTEGER,
    "timeDurationUnit" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("subscriptionId")
);

-- CreateTable
CREATE TABLE "UserSubscriptionPlans" (
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

    CONSTRAINT "UserSubscriptionPlans_pkey" PRIMARY KEY ("userId","subscriptionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessRoles_roleType_key" ON "AccessRoles"("roleType");

-- CreateIndex
CREATE UNIQUE INDEX "AccessRoles_level_key" ON "AccessRoles"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_id_key" ON "Actor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_actorId_key" ON "Actor"("actorId");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genreName_key" ON "Genre"("genreName");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_id_key" ON "Subscriptions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_subscriptionId_key" ON "Subscriptions"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_movieId_key" ON "Movie"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "AccessRoles"("roleType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_documentedBy_fkey" FOREIGN KEY ("documentedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActors" ADD CONSTRAINT "MovieActors_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActors" ADD CONSTRAINT "MovieActors_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenres" ADD CONSTRAINT "MovieGenres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenres" ADD CONSTRAINT "MovieGenres_genreName_fkey" FOREIGN KEY ("genreName") REFERENCES "Genre"("genreName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionPlans" ADD CONSTRAINT "UserSubscriptionPlans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscriptionPlans" ADD CONSTRAINT "UserSubscriptionPlans_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscriptions"("subscriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;
