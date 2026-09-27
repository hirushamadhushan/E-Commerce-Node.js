import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    const tokenString = req.header("Authorization")

    if(tokenString != null){
        const token = tokenString.replace("Bearer ","")

        //console.log(token);

        jwt.verify(token, "Hirusha@#200406", (err, decoded) => {
            if(decoded != null){
                req.user = decoded;
                next();
            }else{
               console.log("Invalid token");
               res.status(403).json({ message: "Invalid token" });
            }
        })
    }else{
        next();
    }
}

)

mongoose.connect("mongodb://admin:0000@ac-gqzwtvu-shard-00-00.kvnpdyu.mongodb.net:27017,ac-gqzwtvu-shard-00-01.kvnpdyu.mongodb.net:27017,ac-gqzwtvu-shard-00-02.kvnpdyu.mongodb.net:27017/?ssl=true&replicaSet=atlas-1159cv-shard-0&authSource=admin&appName=Cluster0")
.then(()=>{
    console.log('Connected to MongoDB');
})


app.use('/products',productRouter);
app.use('/users',userRouter);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})



//const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.anuuaxw.mongodb.net/?appName=Cluster0";