import { Request, Response } from 'express';
import { Criadero, ICriadero } from '../models/criadero.model';
import { IResponse } from '../models/response.model';

export const createCriadero = async (req: Request, res: Response)=> {           
    const { nombreCriadero, fechaRegistro, propietario, telefono, direccion } : ICriadero = req.body;
    const response = await new CriaderoController().create({ nombreCriadero, fechaRegistro, propietario, telefono, direccion});         
    return res.status(response.status).json(response);   
}

export const retrieveCriadero = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new CriaderoController().retrieve(docId);         
    return res.status(response.status).json(response);   
 }

 export const updateCriadero = async (req: Request, res: Response)=> {           
    const { nombreCriadero, fechaRegistro, propietario, telefono, direccion } : ICriadero = req.body;
    const docId : String = req.params.id; 
    const response = await new CriaderoController().update(docId, { nombreCriadero, fechaRegistro, propietario, telefono, direccion});         
    return res.status(response.status).json(response);   
}

export const deleteCriadero = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new CriaderoController().delete(docId);         
    return res.status(response.status).json(response);   
 }

 export const listCriaderos = async (req: Request, res: Response) => {
    const response = await new CriaderoController().list();         
    return res.status(200).json(response);    
}


class CriaderoController{

    public async create(payload : ICriadero) : Promise<IResponse> {
        const criadero = new Criadero(payload);
        return criadero.save().then(data => {
            return {
                message: "CREATED: Criadero added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Player",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Criadero.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Criadero not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Criadero retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : ICriadero) : Promise<IResponse>{
        return Criadero.updateOne({_id: docId} , { $set: { 
            nombreCriadero: payload.nombreCriadero, 
            fechaRegistro: payload.fechaRegistro, 
            propietario: payload.propietario, 
            telefono: payload.telefono, 
            direccion: payload.direccion
          } }).then(data => {            
            return {
                message: "OK: Criadero updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Criadero not updated",
                status: 500,
                content : err
            }
        });
    }

    public async delete(docId: String) : Promise<IResponse> {
        return Criadero.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Criadero not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Criadero deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Criadero.find({}).then(data => {
                return {
                    message: "OK: All criaderos retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Criaderos", status: 500, content : err }
        });       
    }
}