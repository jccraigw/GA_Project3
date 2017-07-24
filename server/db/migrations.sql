-- run this file with psql -a -f migrations.sql

CREATE DATABASE store;
\c store;

CREATE TABLE users (
id  SERIAL PRIMARY KEY,
name VARCHAR(255) ,
email VARCHAR(255) ,
token VARCHAR(255) ,
password_digest VARCHAR(255),
street VARCHAR(255),
street_pt_two VARCHAR(255),
city VARCHAR(255),
state VARCHAR(255),
zip INTEGER
);

CREATE TABLE products (
id  SERIAL PRIMARY KEY,
name VARCHAR(255) ,
price money ,
color VARCHAR(255) ,
size VARCHAR(255) ,
image_url VARCHAR(255)
);

CREATE TABLE orders (
id  SERIAL PRIMARY KEY,
name VARCHAR(255) ,
id_users INTEGER references users(id),
id_products INTEGER references products(id),
id_carts INTEGER references carts(id)
);

CREATE TABLE reviews (
id  SERIAL PRIMARY KEY,
name VARCHAR(255) ,
text VARCHAR(255) ,
id_products INTEGER references products(id)
);

CREATE TABLE carts (
id  SERIAL PRIMARY KEY
);

