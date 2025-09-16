import express from "express";
import ResponsaveisController from "../controller/responsaveisController.js";

const router = express.Router();

router
    .get("/responsaveis", ResponsaveisController.listarResponsaveis)
    .post("/responsaveis", ResponsaveisController.cadastrarResponsavel)
    .put("/responsaveis/:id", ResponsaveisController.atualizarResponsavel)
    .delete("/responsaveis/:id", ResponsaveisController.deletarResponsavel)

export default router;