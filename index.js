const express = require('express');
const cors= require('cors');
require('dotenv').config();
const Transaction = require('./Models/Transaction');
const mongoose= require("mongoose");
const app = express();
const s="mongodb://localhost:27017/expenseTracker";
app.use(cors());
app.use(express.json()); 

mongoose.connect(s)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection failed:", err));


app.get('/API/test' , (req,res)=> {
    res.json('test ok3');
})

app.post('/API/transaction' , async (req,res)=>{
    // console.log(process.env.MONGO_URL);
    // await mongoose.connect(process.env.MONGO_URL);
   const{price,name,description,datetime}=req.body;
   try{
    const transaction =await Transaction.create({price,name,description,datetime});
    console.log("data pass successfully");
    
   }
   catch(err){
    console.log("some issue");
    
   }
    
    
})

app.get('/API/transactions', async (req,res)=>{
    await mongoose.connect(s);
    const transactions = await Transaction.find();
    res.json(transactions);
})


// mongoose.connect(s, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         bufferCommands: false,
//         bufferTimeoutMS: 20000
//       }).then(()=>{console.log("db connected");
//       }).catch((err)=>{
//         console.log(err);
        
//       })

app.listen(4041,()=>{console.log("server running");
}); 
// mongodb+srv://money:<db_password>@cluster0.lulf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// GBPBjw8w47T9eM88
