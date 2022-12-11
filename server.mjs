

import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5003

app.use(cors());
app.use(express.json());


let products = [];

app.post('/product', (req, res) => {

  const body = req.body;

  if (
    !body.name
    || !body.price
    || !body.description
  ) {
    res.status(400).send( { message:"required parameter failed" })
    return;
  }

  console.log(body.name)
  console.log(body.price)
  console.log(body.description)

  products.push({
    id: new Date().getTime(),
    name: body.name,
    price: body.price,
    description: body.description
  })

  res.send( {  message: "Product succesfully stored"})

})

app.get('/products', (req, res) => {
  res.send( {  message:"Here are all products" ,
              data: products})
})

app.get('/product/:id', (req, res) => {

  const id = req.params.id;
  let isFound = false

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {

      res.send( {  message:"Get product by id",
                  data: products[i]})

      isFound = true
      break;
    }
  }

  if (isFound == false) {
    res.status(404).send( {  message:"product not found"})
  }

})

app.delete('/product/:id', (req, res) => {

  const id = req.params.id;
  let isFound = false

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {

      products.splice(i, 1)

      res.send({  message:"Product deleted Successfuly"})
      isFound = true
      break;
    }
  }

  if (isFound == false) {
    res.status(404).send({  message:"Delete failed: product not found"})
  }

})

app.put('/product/:id', (req, res) => {

  const body = req.body;
  const id = req.params.id;
  let isFound = false

  if (
    !body.name
    || !body.price
    || !body.description
  ) {
    res.status(400).send({  message:"required parameter failed"})
    return;
  }

  console.log(body.name)
  console.log(body.price)
  console.log(body.description)

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {

      products[i].name= body.name;
      products[i].price= body.price;
      products[i].description= body.description;


      res.send({  message: "Product modified Successfuly"})
      isFound = true
      break;
    }
  }

  if (!isFound) {
    res.status(404).send({  message:"Delete failed: product not found"})
  }

  res.send({  message:"Product succesfully stored"})

})








const __dirname = path.resolve();

app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})