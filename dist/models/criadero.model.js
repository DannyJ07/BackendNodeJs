"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criadero = void 0;
const mongoose_1 = require("mongoose");
//Schema 
const criaderoSchema = new mongoose_1.Schema({
    nombreCriadero: { type: String },
    fechaRegistro: { type: Date },
    propietario: { type: String },
    telefono: { type: String },
    direccion: { type: String }
});
//Model
const Criadero = (0, mongoose_1.model)('Criadero', criaderoSchema);
exports.Criadero = Criadero;
