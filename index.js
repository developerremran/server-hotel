const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT ||  5000;




// midleware 
app.use(cors());
app.use(express.json())


// mongodb start

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://emran:6sg8C827UEMcRMAV@cluster0.c6hcfpk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

     const MenuData = client.db('MenuData').collection('MenuData');
     const ReviewData = client.db('MenuData').collection('review');

     app.get('/products', async(req, res) =>{
        const body = req.body;
       
        const result = await MenuData.find(body).toArray();
        res.send(result)
     })

     app.get('/reviews', async(req, res) =>{
        const body = req.body;
        console.log(body);
        const result = await ReviewData.find(body).toArray();
        res.send(result)
     })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// mongodb end 


// normal 

app.get('/',(req, res)=>{
    res.send('Server Running Now store your Data')
} )

app.listen(port, ()=>{
  console.log('server is running......');
})