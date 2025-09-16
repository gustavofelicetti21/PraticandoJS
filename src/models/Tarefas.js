import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"

const tarefaSchema = new mongoose.Schema({
    id: {type: String},
    titulo: {
        type: String,
        required: [true, "O título da tarefa deve ser obrigatório"]
    },
    descricao: {type:String},
    responsavel: {
        type: mongoose.Schema.ObjectId,
        ref: "responsaveis",
        required: [true, "O responsável para uma tarefa é obrigatório"],
        autopopulate: {select:"nome"}
    },
    status: {
        type: String,
        default: "Novo",
        enum: {
            values: ["Atendendo", "Finalizado", "Novo"],
            message: "O status {VALUE} é inválido"
        }
    },
    urgencia: {
        type: String,
        required: [true, "A urgência é obrigatória"],
        enum: {
            values: ["Alta", "Media", "Baixa"],
            message: "A urgência {VALUE} é inválida"
        }
    },
    data_abertura: {
        type: Date,
        default: Date.now
    },
    data_alterado: {
        type: Date,
        default: Date.now
    },
    data_finalizado: {
        type: Date
    }
});

tarefaSchema.plugin(autopopulate);
const tarefas = mongoose.model("tarefas", tarefaSchema);

export default tarefas;