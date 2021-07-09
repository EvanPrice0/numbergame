import express, { json } from 'express';
import { MongoClient, Db } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { stringify } from 'querystring';
const app = express();
const port = 8000;
app.use(express.json())

class User {
  _id!: string;
  email!: string;
  password!: string;
  token?: string;
}
const withDB = async (operations: any, res: any) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db('newgame');
    await operations(db);

    client.close();
  }
  catch (err) {
    res.status(500).json({ message: "error connecting to db", err });
  }
}

app.put(`/api/login`, async(req, res) => {
  var body:User = req.body;
  if(body){
    withDB(async (db: Db) => {
    console.log(body)
      const user:User = await db.collection('user').findOne({_id: body["_id"]})
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          let newUser = user
          let usertoken = jwt.sign({ username: user.email }, 'secret');
          console.log('newuser',newUser)
          db.collection('user').findOneAndUpdate({_id: user._id},{'$set':{token: usertoken}})
          const updateduser = await db.collection('user').findOne({ _id:user._id })
          res.status(200).json({updateduser});
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
   }, res);
  }
});

app.put(`/api/signout`, async(req, res) => {
  var body:User = req.body;
  if(body){
    withDB(async (db: Db) => {
    console.log(body)
      const user:User = await db.collection('user').findOne({_id: body["_id"]})
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          let newUser = user
          db.collection('user').findOneAndUpdate({_id: user._id},{'$set':{token: null}})
          const updateduser = await db.collection('user').findOne({ _id:user._id })
          res.status(200).json(updateduser);
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
   }, res);
  }
});

app.get('/api/users',async (req, res) => {

  withDB(async (db: Db) => {
    const user: User[] = await db.collection('user').find({ }).toArray();
    res.status(200).json(user);
  }, res);
});

app.get('/api/user/:id',async (req, res) => {
  console.log('user', req.params.id)
  withDB(async (db: Db) => {
    const user: User = await db.collection('user').findOne({_id: req.params.id});
    res.status(200).json(user);
  }, res);
});

app.post('/api/signup', async (req, res) => {
  var login:User = req.body;
  console.log('signup',login)
  const salt = await bcrypt.genSalt(10);
  login.password = await bcrypt.hash(login.password, salt);
  withDB(async (db:Db) => {
      db.collection('user').insertOne(login);
      const updatedArticleInfo = await db.collection('user').findOne({ _id:login._id })
      res.status(200).json(updatedArticleInfo)
  },res)
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});