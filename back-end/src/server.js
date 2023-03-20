import express from 'express';
import { MongoClient } from 'mongodb';

import { cartItems as cartItemsRaw, products as productsRaw } from './temp-data.js';

let cartItems = cartItemsRaw;
let products = productsRaw;
const DATABASE = 'mongodb+srv://barryanderson:<PASSWORD>@cluster0.iiobiwd.mongodb.net/vue-db';
const URL = DATABASE.replace('<PASSWORD>', 'xxxxxxxxxxx');

const client = new MongoClient(URL);
const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  await client.connect();
  const db = client.db('vue-db');
  const products = await db.collection('products').find({}).toArray();
  res.send(products);
});

async function populateCartIds(ids) {
  await client.connect();
  const db = client.db('vue-db');
  return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
}

app.get('/users/:userId/cart', async (req, res) => {
  await client.connect();
  const db = client.db('vue-db');
  const user = await db.collection('users').findOne({ id: req.params.userId });
  const populatedCart = await populateCartIds(user.cartItems);
  res.json(populatedCart);
});

app.get('/products/:productId', async (req, res) => {
  await client.connect();
  const db = client.db('vue-db');
  const productId = req.params.productId;
  const product = await db.collection('products').findOne({ id: productId });
  res.json(product);
});

app.post('/cart', (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  const cartItems = cartItems.filter(product => product.id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
