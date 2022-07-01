import { Schema, model } from 'mongoose';

//Interface
export interface ICriadero{
    nombreCriadero:   null | string;
    fechaRegistro:    null | Date;
    propietario:      null | string;
    telefono:         null | string;
    direccion:        null | string;
}

//Schema 

const criaderoSchema = new Schema<ICriadero>({

    nombreCriadero:   {type:String},
    fechaRegistro:    {type:Date},
    propietario:      {type:String},
    telefono:         {type:String},
    direccion:        {type:String}

});

//Model

const Criadero = model<ICriadero>('Criadero', criaderoSchema);
export {Criadero}