import express from "express";
import ResponsaveisController from "../controller/responsaveisController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/responsaveis", ResponsaveisController.listarResponsaveis, paginar)
    .get("/responsaveis/busca", ResponsaveisController.listarResponsaveisFiltrando, paginar)
    .get("/responsaveis/:id", ResponsaveisController.listarResponsaveisPorId)
    .post("/responsaveis", ResponsaveisController.cadastrarResponsavel)
    .put("/responsaveis/:id", ResponsaveisController.atualizarResponsavel)
    .delete("/responsaveis/:id", ResponsaveisController.deletarResponsavel)

export default router;