import {Router} from 'express';
import { submitForm } from '../controllers/formControllers';

const router = Router();

router.post('/submit',submitForm);

export default router;