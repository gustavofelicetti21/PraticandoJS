import tarefas from "../models/Tarefas.js";

class TarefasController {
    static listarTarefas = async (req, res) => {
        try {
            const tarefasResultado = await tarefas.find().exec();

            res.status(200).json(tarefasResultado)
        } catch (erro) {
            console.log(erro);
        }
    }

    static cadastrarTarefa = async (req,res) => {
        try {
            const tarefa = new tarefas(req.body);
            
            const tarefaResultado = await tarefa.save();

            res.status(200).send(tarefaResultado.toJson)
        } catch(erro) {
            console.log(erro);
        }
    }

    static atualizarTarefa = async (req, res) => {
        try {
            const id = req.params.id;

            const tarefa = req.body;
            tarefa.data_alterado = Date.now();

            if (tarefa.status == "Finalizado") {
                tarefa.data_finalizado = Date.now();
            }

            const tarefaResultado = await tarefas.findByIdAndUpdate(id, {$set: tarefa});

            if (tarefaResultado!==null) {
                res.status(200).send({message: "Tarefa atualizado com sucesso"});
            } else {
                res.status(500).send({message: "Não foi possivel atualizar tarefa"});
            }
        } catch(erro) {
            console.log(erro);
        }
    }

    static deletarTarefa = async (req,res) => {
        try {
            const tarefaResultado = await tarefas.findByIdAndDelete(req.params.id);

            if (tarefaResultado!==null) {
                res.status(200).send({message: "Tarefa atualizado com sucesso"});
            } else {
                res.status(500).send({message: "Não foi possivel atualizar tarefa"});
            }
        } catch(erro) {
            console.log(erro);
        }
    }
}

export default TarefasController;