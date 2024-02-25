import OpenAI from 'openai'
import 'dotenv/config'

const apiKey = process.env.OPEN_AI_SECRET_KEY

const openai = new OpenAI({
    apiKey: apiKey,
})

export const generateImageController = async(req , res) => {
    const {prompt} = req.body

    if(!prompt) {
        return res.status(400).json({
            success: false,
            message: "please enter a vlaid prompt"
        })
    }
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
          });
          const image = response.data[0].b64_json;
          res.status(200).json({
            success: true,
            photo: image,
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
}