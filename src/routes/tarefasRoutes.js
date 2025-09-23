import express from "express";
import TarefasController from "../controller/tarefasController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes
    .get("/tarefas", TarefasController.listarTarefas, paginar)
    .get("/tarefas/busca", TarefasController.listarTarefasFiltrando, paginar)
    .get("/tarefas/:id", TarefasController.listarTarefasPorId)
    .post("/tarefas", TarefasController.cadastrarTarefa)
    .put("/tarefas/:id", TarefasController.atualizarTarefa)
    .delete("/tarefas/:id", TarefasController.deletarTarefa)

export default routes;