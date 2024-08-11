const { MongoClient, ServerApiVersion } = require('mongodb');
const express =require('express')
const cors=require('cors')
const uri = "mongodb+srv://ankit:<12345>@twitter.qyeix.mongodb.net/?retryWrites=true&w=majority&appName=twitter";
const port =5000
const app=express()
app.use(cors())
app.use(express.json())

const client =new MongoClient(uri);

async function run() {
    try{
        await client.connect();
        // console.log(`server running on posrt ${port}`)
        const postcollection =client.db("database").collection("posts");
        const usercollection=client.db("database").collection("users")

        app.post('/register',async(req,res)=>{
            const user=req.body;
            const result=await usercollection.insertOne(user)
            res.send(result);

        });
        app.get('/loggedinuser',async(req,res)=>{
            const email=req.query.email;
            const user=await usercollection.find({email :email}).toArray();
            res.send(user);
        })

    }catch(error){
        console.log(error)
    };    
}run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send("Twiller is working")
})
app.listen(port,()=>{
    console.log(`Twiller clone is working on ${port}`)
})