-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "shipping_adress" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collections" (
    "id" BIGSERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" BIGSERIAL NOT NULL,
    "collection_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "product_type" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items_img" (
    "id" BIGSERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Items_img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "total_price" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_status" VARCHAR(50) NOT NULL,
    "shipping_adress" VARCHAR(1024) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_items" (
    "id" BIGSERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "item_id" BIGINT NOT NULL,
    "order_id" BIGINT NOT NULL,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Items_id_key" ON "Items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Items_collection_id_key" ON "Items"("collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "Items_img_id_key" ON "Items_img"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_items_id_key" ON "Order_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_items_item_id_key" ON "Order_items"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_items_order_id_key" ON "Order_items"("order_id");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
