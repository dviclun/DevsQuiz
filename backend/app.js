"use strict"

import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Router } from 'express';
import { MongoClient } from 'mongodb';

config();

const URI = process.env.MONGODB_URI

const client = new MongoClient(URI);

await client.connect();

const dbName = "DevsQuiz";
const collectionName = "questions";


const app = express();
const router = Router();
app.use(cors());

app.use(express.json());



router.post('/getQuestions', async (req, res) => {
  const {tech} = req.body;

  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName); 
    const cursor = collection.find({category: tech.toLowerCase()});
    const docs = await cursor.toArray();
    res.json(docs)
  } catch (err) {
      console.error(err);
      res.status(500).json(err)
  }

  
})

app.use(router);


app.listen(3000, ()=> {
    console.log('Escuchando solicitud')
})
