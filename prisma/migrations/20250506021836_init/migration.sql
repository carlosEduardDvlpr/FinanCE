-- CreateEnum
CREATE TYPE "transactions_type" AS ENUM ('income', 'expense');

-- CreateEnum
CREATE TYPE "transactions_category" AS ENUM ('home', 'food', 'transport', 'personal', 'education', 'leisure', 'debt', 'others', 'income');

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "transactions_type" NOT NULL,
    "amount" DECIMAL(8,2) NOT NULL,
    "description" VARCHAR(40) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "transactions_category" NOT NULL DEFAULT 'home',

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password_hash" CHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_transactions_user_idx" ON "transactions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ux_users_username" ON "users"("username");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "fk_transactions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
