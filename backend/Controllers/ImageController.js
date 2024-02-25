import ImageModel from '../Models/ImageScema.js';
import cloudinary from '../Config/cloudinary.js';

export const createPostController = async (req, res) => {
    const { name, prompt, photo } = req.body;
    try {
        if(!name || !prompt || !photo) {
            return res.status(400).json({
                success: false,
                message: "please enter a vlaid data"
            })
        }

        const options = {
            folder: 'Ai generated images',
            tags: ['image', 'generated'],
        };

        const result = await cloudinary.uploader.upload(photo, options);
        const newPost = await new ImageModel({
            name,
            prompt,
            photo: result.secure_url  
        }).save(); 
        res.status(200).json({
            success: true,
            data: newPost
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to create a post, please try again'
        });
    }
};

export const getAllPostsController = async (req, res) => {
    try {
        const posts = await ImageModel.find({});
        res.status(200).json({
            success: true,
            data: posts
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Fetching posts failed, refresh the page and try again'
        });
    }
};


export const searchPostController = async(req, res) => {
    
    const {search} = req.params
    if(!search) {
        return res.status(400).json({
            success: false,
            msg: 'Please enter something to search'
        })
    }
    try {
        const images = await ImageModel.find({
            $or: [
                {prompt: {$regex: search, $options: 'i'}},
            ]
        })
        res.status(200).send({
            success: true,
            images
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'error ocured in searching',
            error 
        })
    }
}