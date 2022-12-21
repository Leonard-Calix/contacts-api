const { request, response } = require("express");
const User = require("../models/user");

const validateUsuario = async (req = request, res = response, netx) => {
    const usuario = req.header('usuario');

    if (!usuario) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token'
        });
    }

    try {

        const user = await User.findOne({ _id: usuario });

        if (!user) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario invalido'
            });
        }

        req.usuario = usuario;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'usuario no valido'
        });
    }

    netx();
}

module.exports = {
    validateUsuario
}