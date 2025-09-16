import responsaveis from "../models/Responsaveis.js";

class ResponsaveisController {
    static listarResponsaveis = async (req,res) => {
        try {
            const responsaveisResultado = await responsaveis.find().exec();

            res.status(200).json(responsaveisResultado);
        } catch (erro) {
            console.log(erro);
        }
    }

    static cadastrarResponsavel = async (req, res) => {
        try {
            const responsavel = new responsaveis(req.body);

            const responsavelResultado = await responsavel.save();

            res.status(201).send(responsavelResultado.toJSON());
        } catch (erro) {
            console.log(erro);
        }
    }

    static atualizarResponsavel = async (req, res) => {
        try {
            const id = req.params.id;
            const responsavelResultado = await responsaveis.findByIdAndUpdate(id, {$set: req.body});

            if (responsavelResultado!==null) {
                res.status(200).send({message: "Responsavel atualizado com sucesso"});
            } else {
                res.status(500).send({message: "Não foi possivel atualizar responsavel"});
            }
        } catch(erro) {
            console.log(erro);
        }
    }

    static deletarResponsavel = async (req, res) => {
        try {
            const id = req.params.id;
            const responsavelResultado = await responsaveis.findByIdAndDelete(id);

            if (responsavelResultado!==null) {
                res.status(200).send({message: "Responsavel removido com sucesso"});
            } else {
                res.status(500).send({message: "Não foi possivel deletar responsavel"});
            }
        } catch (erro) {
            console.log(erro);
        }
    }
}

export default ResponsaveisController;