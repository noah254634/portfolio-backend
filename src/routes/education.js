import {getEducation, addEducation, deleteEducation} from '../controllers/educationController.js';
import express from 'express';

const router = express.Router();

router.get('/', getEducation);
router.post('/', addEducation);
router.delete('/:id', deleteEducation);


export default router;