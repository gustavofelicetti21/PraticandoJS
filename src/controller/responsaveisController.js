import NaoEncontrado from "../erros/NaoEncontrado.js";
import responsaveis from "../models/Responsaveis.js";

class ResponsaveisController {
    static listarResponsaveis = async (req,res) => {
        try {
            const responsaveisResultado = await responsaveis.find().exec();
            if (responsaveisResultado!==null) {
                res.status(200).json(responsaveisResultado);
            } else {
                res.status(200).json({});
            }
        } catch (erro) {
            next(erro);
        }
    }

    static listarResponsaveisPorId = async (req,res, next) => {
        try {
            const responsaveisResultado = await responsaveis.findById(req.params.id).exec();

            if (responsaveisResultado!==null) {
                res.status(200).json(responsaveisResultado);
            } else {
                next(new NaoEncontrado("Responsável não encontrado"));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static cadastrarResponsavel = async (req, res, next) => {
        try {
            const responsavel = new responsaveis(req.body);

            const responsavelResultado = await responsavel.save();

            res.status(201).send(responsavelResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    }

    static atualizarResponsavel = async (req, res, next) => {
        try {
            const id = req.params.id;
            const responsavelResultado = await responsaveis.findByIdAndUpdate(id, {$set: req.body});

            if (responsavelResultado!==null) {
                res.status(200).send({message: "Responsavel atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("Responsável não encontrado"));
            }
        } catch(erro) {
            next(erro);
        }
    }

    static deletarResponsavel = async (req, res, next) => {
        try {
            const id = req.params.id;
            const responsavelResultado = await responsaveis.findByIdAndDelete(id);

            if (responsavelResultado!==null) {
                res.status(200).send({message: "Responsavel removido com sucesso"});
            } else {
                next(new NaoEncontrado("Responsável não encontrado"));
            }
        } catch (erro) {
            next(erro);
        }
    }
}

export default ResponsaveisController;