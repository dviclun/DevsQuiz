"use strict"

import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import  ollama  from 'ollama';
import { Router } from 'express';

config();

const app = express();
const router = Router();
app.use(cors());

app.use(express.json());

router.post('/getQuestions', async (req, res) => {
  const {tech} = req.body;


  const prompt = `
    Genera un array de 2 preguntas de opción múltiple sobre ${tech}. La pregunta debe ser seguida por 4 respuestas.
    Una de las respuestas debe ser correcta y las otras tres incorrectas. El formato de respuesta debe ser SOLAMENTE un array con objetos
    que tienen la siguiente estructura, sin explicacíon, TAN SOLO EL ARRAY y sin que ponga JSON delante, que comience directamente el array con []:
    {
      "pregunta": "Texto de la pregunta",
      "respuestas": [
        {"id": "id de la respuesta 1", "texto": "Texto de la respuesta 1", "correcta": false},
        {"id": "id de la respuesta 2", "texto": "Texto de la respuesta 2", "correcta": false},
        {"id": "id de la respuesta 3", "texto": "Texto de la respuesta 3", "correcta": false},
        {"id": "id de la respuesta 4", "texto": "Texto de la respuesta 4", "correcta": true}
      ]
    }
  `

  const testPrompt = 'say hi'

  try {

    console.log('generating...')
    
    const response = await ollama.chat({
      model: 'gemma2:2b',
      messages: [{role: 'user', content: prompt}]
    })

    console.log('response generated')
    res.json({ reply: response.message.content });

  } catch (error) {
    res.status(500).send({ error: 'Error interacting with the model' });
  }
})

app.use(router);


app.listen(3000, ()=> {
    console.log('Escuchando solicitud')
})
