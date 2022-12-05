console.log("I am server")

import express from 'express';
const app = express()
const port = process.env.PORT ||5000

app.get('/', (req, res) => {

 console.log("Request ip", req.ip)   
  res.send('Hello World!' + new Date().toString())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})