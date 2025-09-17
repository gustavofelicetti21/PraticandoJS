import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipula404(req,res,next) {
    const erro = new NaoEncontrado();

    next(erro);
}

export default manipula404;