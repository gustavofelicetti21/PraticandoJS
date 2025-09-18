import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import NaoEncontrado from "../erros/NaoEncontrado.js"
import tarefas from "../models/Tarefas.js";

class TarefasController {
    static listarTarefas = async (req, res) => {
        try {
            const tarefasResultado = await tarefas.find();
            if (tarefasResultado!==null) {
                res.status(200).json(tarefasResultado)
            } else {
                res.status(200).json({});
            }
        } catch (erro) {
            next(erro);
        }
    }

    static listarTarefasPorId = async (req, res, next) => {
        try {
            const tarefasResultado = await tarefas.findById(req.params.id, {}, {autopopulate: false})
                .populate("responsavel");

            if (tarefasResultado!==null) {
                res.status(200).json(tarefasResultado);
            } else {
                next(new NaoEncontrado("Não foi encontrar responsavel"));
            }
        } catch (erro) {
            next(erro)
        }
    }

    static cadastrarTarefa = async (req,res) => {
        try {
            const tarefa = new tarefas(req.body);
            
            const tarefaResultado = await tarefa.save();

            res.status(200).json(tarefaResultado)
        } catch(erro) {
            console.log(erro);
        }
    }

    static atualizarTarefa = async (req, res, next) => {
        try {
            const id = req.params.id;
            const tarefa = req.body;

            const status = ["Atendendo", "Finalizado", "Novo"];

            const tarefaOriginal = await tarefas.findById(id);

            if (tarefaOriginal==null) {
                next(new NaoEncontrado("Tarefa não encontrada"));
            } else if (tarefaOriginal.status=="Finalizado"){
                next(new RequisicaoIncorreta("Tarefa Finalizada, não pode ser alterada"));
            } else if((!status.includes(tarefa.status))&&(tarefa.status!==undefined)) {
                next(new RequisicaoIncorreta(`Status '${tarefa.status}' é inválido`));
            } else {
                tarefa.data_alterado = Date.now();
    
                if (tarefa.status == "Finalizado") {
                    tarefa.data_finalizado = Date.now();
                }
                const tarefaResultado = await tarefas.findByIdAndUpdate(id, {$set: tarefa});

                res.status(200).send({message: "Tarefa atualizado com sucesso"});
            }
        } catch(erro) {
            next(erro);
        }
    }

    static deletarTarefa = async (req,res,next) => {
        try {
            const tarefaResultado = await tarefas.findByIdAndDelete(req.params.id);

            if (tarefaResultado!==null) {
                res.status(200).send({message: "Tarefa atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("Tarefa não encontrada"));
            }
        } catch(erro) {
            next(erro);
        }
    }
}

export default TarefasController;