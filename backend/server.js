import express from 'express';
import mongoose from 'mongoose';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js'

const app = express();

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

mongoose.connect("mongodb+srv://test_user_1:p%40ssw0rd@cluster0.cxkkkd0.mongodb.net/", { dbName: 'demo_db'})
    .then(() => {
        console.log("connected DB")

        app.listen(4000, 'localhost', () => {

    })

}).catch(err => {
    console.log(err)
})

