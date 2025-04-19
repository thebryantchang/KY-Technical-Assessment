import {Request,Response} from 'express';
import {saveFormResponse} from '../services/formServices';

export const submitForm = async(req:Request, res:Response) => {
    try{
        const data = req.body;
        await saveFormResponse(data);
        res.status(200).json({message: 'Form submitted successfully'})
    } catch(error){
        console.error('Submit Error', error);
        res.status(500).json({message: 'Form failed to submit'})
    }
}