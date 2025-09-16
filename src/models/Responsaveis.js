import mongoose from "mongoose";

const responsaveisSchema = new mongoose.Schema({
    id: {type:String},
    nome: {
        type: String,
        required: [true, "O nome do responsável é obrigatório"]
    },
    idade: {
        type: Number,
        required: [true, "A idade do responsável é obrigatório"]
    },
    cargo: {
        type: String,
        required: [true, "O cargo do responsável é obrigatório"]
    }
});

const responsaveis = mongoose.model("responsaveis", responsaveisSchema);
export default responsaveis;