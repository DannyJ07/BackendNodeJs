"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCriaderos = exports.deleteCriadero = exports.updateCriadero = exports.retrieveCriadero = exports.createCriadero = void 0;
const criadero_model_1 = require("../models/criadero.model");
const createCriadero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreCriadero, fechaRegistro, propietario, telefono, direccion } = req.body;
    const response = yield new CriaderoController().create({ nombreCriadero, fechaRegistro, propietario, telefono, direccion });
    return res.status(response.status).json(response);
});
exports.createCriadero = createCriadero;
const retrieveCriadero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new CriaderoController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveCriadero = retrieveCriadero;
const updateCriadero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreCriadero, fechaRegistro, propietario, telefono, direccion } = req.body;
    const docId = req.params.id;
    const response = yield new CriaderoController().update(docId, { nombreCriadero, fechaRegistro, propietario, telefono, direccion });
    return res.status(response.status).json(response);
});
exports.updateCriadero = updateCriadero;
const deleteCriadero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new CriaderoController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteCriadero = deleteCriadero;
const listCriaderos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new CriaderoController().list();
    return res.status(200).json(response);
});
exports.listCriaderos = listCriaderos;
class CriaderoController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const criadero = new criadero_model_1.Criadero(payload);
            return criadero.save().then(data => {
                return {
                    message: "CREATED: Criadero added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Player",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return criadero_model_1.Criadero.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Criadero not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Criadero retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return criadero_model_1.Criadero.updateOne({ _id: docId }, { $set: {
                    nombreCriadero: payload.nombreCriadero,
                    fechaRegistro: payload.fechaRegistro,
                    propietario: payload.propietario,
                    telefono: payload.telefono,
                    direccion: payload.direccion
                } }).then(data => {
                return {
                    message: "OK: Criadero updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Criadero not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return criadero_model_1.Criadero.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Criadero not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Criadero deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return criadero_model_1.Criadero.find({}).then(data => {
                return {
                    message: "OK: All criaderos retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Criaderos", status: 500, content: err };
            });
        });
    }
}
