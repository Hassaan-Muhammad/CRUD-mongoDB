console.log("I am server")

import express from 'express';
import path from 'path';

const app = express()
const port = process.env.PORT ||5003

app.get('/abc', (req, res) => {

 console.log("Request ip", req.ip)   
  res.send('Hello World! new ' + new Date().toString())
})

app.get('/weather', (req, res) => {

    console.log("Request ip", req.ip)   
     res.send({
        temp: 41,
        humidity: 25,
        serverTime: new Date().toString()
      } )
   })

const __dirname= path.resolve();

app.use('/', express.static ( path.join(__dirname, './web/build') ) )
app.use('*', express.static ( path.join(__dirname, './web/build') ) )



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})