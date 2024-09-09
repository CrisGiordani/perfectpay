-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING_APPROVAL', 'ACTIVE', 'BLOCKED', 'REMOVED');

-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('CREATED', 'APPROVED', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "fornecedor" BOOLEAN NOT NULL DEFAULT false,
    "comprador" BOOLEAN NOT NULL DEFAULT false,
    "razao_social" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "cep" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "detalhes" JSONB NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'WAITING_APPROVAL',
    "aproved_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "ncm" TEXT,
    "cod_barras" TEXT,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "embalagem" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "imagens" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "Status" NOT NULL DEFAULT 'WAITING_APPROVAL',
    "created_by" TEXT NOT NULL,
    "aproved_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogs" (
    "id" TEXT NOT NULL,
    "id_fornecedor" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "id_comprador" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "status" "StatusOrder" NOT NULL DEFAULT 'CREATED',

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_history" (
    "id" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "status" "StatusOrder" NOT NULL DEFAULT 'CREATED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "orders_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoppinglists" (
    "id" TEXT NOT NULL,
    "id_comprador" TEXT NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "shoppinglists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "id_comprador" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_celular_key" ON "users"("celular");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "products_ncm_key" ON "products"("ncm");

-- CreateIndex
CREATE UNIQUE INDEX "products_cod_barras_key" ON "products"("cod_barras");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_responsavel_fkey" FOREIGN KEY ("responsavel") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoppinglists" ADD CONSTRAINT "shoppinglists_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
