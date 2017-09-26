DROP DATABASE IF EXISTS 	BAMAZON;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Milk","Dairy",2.00,100);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Eggs","Dairy",2.50,200);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Yogurt","Dairy",4.00,100);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Banana","Fruit",0.50,1000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Apple","Fruit",1.00,150);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Broccoli","Vegetable",1.75,50);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Cauliflower","Vegetable",2.50,125);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Chocolate","Treat",2.00,1000);