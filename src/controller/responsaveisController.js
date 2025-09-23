import NaoEncontrado from "../erros/NaoEncontrado.js";
import {responsaveis} from "../models/index.js";

class ResponsaveisController {
    static listarResponsaveis =  (req,res, next) => {
        try {
            const responsaveisResultado =  responsaveis.find();
            
            req.resultado = responsaveisResultado;

            next();
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

    static listarResponsaveisFiltrando = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca!==null) {
                const responsaveisResultado =  responsaveis.find(busca, {});
            
                req.resultado = responsaveisResultado;

                next();
            } else {
                res.status(200).send([]);
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

async function processaBusca(parametros) {
    const {nome, idade, cargo} = parametros;

    let busca = {};

    if (nome) busca.nome={$regex: nome, $options: "i"};
    if (cargo) busca.cargo = cargo;
    if (idade) busca.idade = parseInt(idade);

    if (busca=={}) {
        return null;
    } else {
        return busca;
    }
}

export default ResponsaveisController;