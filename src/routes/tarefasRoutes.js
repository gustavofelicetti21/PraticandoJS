import express from "express";
import TarefasController from "../controller/tarefasController.js";

const routes = express.Router();

routes
    .get("/tarefas", TarefasController.listarTarefas)
    .get("/tarefas/:id", TarefasController.listarTarefasPorId)
    .post("/tarefas", TarefasController.cadastrarTarefa)
    .put("/tarefas/:id", TarefasController.atualizarTarefa)
    .delete("/tarefas/:id", TarefasController.deletarTarefa)

export default routes;