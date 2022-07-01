import {Application} from 'express';
import { createCriadero, deleteCriadero, listCriaderos, retrieveCriadero, updateCriadero } from './controllers/criadero.controller';

export const router = (app: Application)=>{
    app.post("/criaderos", createCriadero);  
    app.get("/criaderos/:id", retrieveCriadero);
    app.put("/criaderos/:id", updateCriadero);
    app.delete("/criaderos/:id", deleteCriadero);    
    app.get("/criaderos", listCriaderos);
}