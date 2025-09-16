import express from "express";
import responsaveis from "./responsaveisRoutes.js";
import tarefas from "./tarefasRoutes.js";

const routes = (app) => {
    app.route("/").get((req,res) => {
        res.status(200).send({titulo: "teste"})
    });

    app.use(
        express.json(),
        responsaveis,
        tarefas
    );
}

export default routes;