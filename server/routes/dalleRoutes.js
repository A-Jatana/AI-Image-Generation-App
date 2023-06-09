import express, { response } from 'express';
import * as dotenv from 'dotenv'; //use environment variables
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send('Helloo from DALL-E!');
});

router.route('/').post(async (req, res) =>{
    try {
        const { prompt } = req.body; //req.body is the prompt that is sent to the server from the frontend

        const aiResponse = await openai.createImage({
            prompt, 
            n: 1, //1 image
            size: '1024x1024',
            response_format: 'b64_json',
        })

        const image = aiResponse.data.data[0].b64_json; //get the image from the response
        res.status(200).json({ photo: image }); //send the image back to the frontend
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;