import express from 'express';
import { generateImageController } from '../Controllers/DalleController.js';

const router = express.Router();

router.post('/generateImage', generateImageController);

export default router;
