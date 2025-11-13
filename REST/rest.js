import express from 'express';
const app = express();
const PORT = 7000;

const User = [{
id:1,
name:"User1"
}]

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({"message":"Server is working"});
})

app.get("/user",(req,res)=>{
    res.status(201).json(User);
})

app.post("/user",(req,res)=>{
    const newUser = {id:Date.now(),...req.body};
    User.push(newUser);
    res.status(201).json({"message":"New user pushed",newUser});
})

app.put("/user/:id",(req,res)=>{
    const userId = parseInt(req.params.id);
    const gUser = User.map((u)=>u.id===userId);
    if(gUser){
        gUser.name = req.body.name;
        res.status(200).json({"message":"User updated",gUser});
    }else{
        res.status(404).json({"message":"User not found"});
    }
})

app.delete("/user/:id",(req,res)=>{
    User = User.filter((u)=>u.id != parseInt(req.params.id));
    res.status(200).json({"message":"User deleted",User});
   
})

app.listen(PORT,()=>{
    console.log( `Server is running on ${PORT}`);
})