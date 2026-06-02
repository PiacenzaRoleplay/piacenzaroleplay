-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'CAPOFAZIONE', 'STAFF');

-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('POLIZIA_DI_STATO', 'CARABINIERI', 'VIGILI_DEL_FUOCO', 'ACI', 'GUARDIA_DI_FINANZA', 'ESERCITO_ITALIANO', 'DIREZIONE_INVESTIGATIVA_MAFIA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "robloxName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "faction" "Faction",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bando" (
    "id" SERIAL NOT NULL,
    "faction" "Faction" NOT NULL,
    "robloxName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handledById" INTEGER,

    CONSTRAINT "Bando_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServerStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerSchedule" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "schedule" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServerSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerLink" (
    "id" SERIAL NOT NULL,
    "ehCode" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServerLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_robloxName_key" ON "User"("robloxName");

-- AddForeignKey
ALTER TABLE "Bando" ADD CONSTRAINT "Bando_handledById_fkey" FOREIGN KEY ("handledById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
