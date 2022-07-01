"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const criadero_controller_1 = require("./controllers/criadero.controller");
const router = (app) => {
    app.post("/criaderos", criadero_controller_1.createCriadero);
    app.get("/criaderos/:id", criadero_controller_1.retrieveCriadero);
    app.put("/criaderos/:id", criadero_controller_1.updateCriadero);
    app.delete("/criaderos/:id", criadero_controller_1.deleteCriadero);
    app.get("/criaderos", criadero_controller_1.listCriaderos);
};
exports.router = router;
