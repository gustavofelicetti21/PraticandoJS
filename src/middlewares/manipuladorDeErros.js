import ErroBase from "../erros/ErroBase.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

function manipuladorDeErros (erro, req,res, next) {
    if(erro instanceof ErroBase){
        erro.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta();
    }
}

export default manipuladorDeErros;