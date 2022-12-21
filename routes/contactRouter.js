const { Router } = require("express");
const { validateUsuario } = require("../middleware/valida-usuario");
const Contact = require("../models/contacts");
const router = Router();

router.get('/', validateUsuario, async (req, res) => {
    try {

        const usuario = req.usuario;

        const contacts = await Contact.find({ usuario: usuario });

        if (contacts.length == 0) {
            res.status(404).json({ mensaje: "Not found", contacts: [] });
        }

        res.status(200).json({ mensaje: " Consulta exitosa", contacts });

    } catch (error) {
        return res.status(500).json({ mensaje: error })
    }
});


router.post('/', validateUsuario, async (req, res) => {
    try {

        const usuario = req.usuario;
        const { name, lastName, numero } = req.body;

        if (!name) {
            return res.status(400).json({ mensaje: 'Nombre obligatorio', contact: null });
        }

        if (!numero) {
            return res.status(400).json({ mensaje: 'numero obligatorio', contact: null });
        }

        const newContact = new Contact({
            name: name,
            lastName: lastName,
            numero: numero,
            usuario: usuario
        });

        await newContact.save();

        res.status(201).json({ mensaje: 'Usuario creado', contact: newContact })

    } catch (error) {
        return res.status(500).json({ mensaje: error })
    }
});


router.delete('/:contactId', validateUsuario, async (req, res) => {
    try {

        const { contactId } = req.params;
        const usuario = req.usuario;

        const contactDelete = await Contact.findOne({ _id: contactId, usuario: usuario });

        if (!contactDelete) {
            return res.status(400).json({ mensaje: 'Contacto no existe', contact: null });
        }

        await contactDelete.deleteOne();

        res.status(202).json({ mensaje: 'Contacto eliminado', contact: contactDelete })


    } catch (error) {
        return res.status(500).json({ mensaje: error })
    }
});


module.exports = router;