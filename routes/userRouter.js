const { Router } = require("express");
const User = require("../models/user");
const router = Router();

// POST - GUARDAR
// GET - OBTENER

router.get('/', async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json({ mensaje: "Consulta exitosa", users: users });

    } catch (error) {
        return res.status(500).json({ error })
    }

});

router.get('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        //const user = await User.findById(id);
        const user = await User.findOne({ _id: id });

        res.status(200).json({ mensaje: "Consulta exitosa", user: user });

    } catch (error) {
        return res.status(500).json({ error })
    }
});


router.post('/', async (req, res) => {

    try {

        const { name, lastName, email } = req.body;

        // validar que recibamos el nombre
        if (!name)
            return res.status(400).json({ mensaje: "El nombre es requerido" });

        // validar que recibamos el correo
        if (!email)
            return res.status(400).json({ mensaje: "El correo es requerido" });

        // validar que recibamos el correo unico
        const existeUser = await User.findOne({ email: email }, {}); // OBTIENE UN REGISTRO

        if (existeUser)
            return res.status(400).json({ mensaje: "El correo ya esta registrado" });

        // guardar Usuario

        const newUser = new User({
            name: name,
            lastName: lastName,
            email: email
        });

        await newUser.save();

        return res.status(201).json({ mensaje: "Usuario agregado con exito", user: newUser });

    } catch (error) {
        return res.status(500).json({ error })
    }

});

router.put('/:id', async (req, res) => {
    try {

        const { name, lastName, email } = req.body;
        const { id } = req.params;

        // validar que recibamos el nombre
        if (!name)
            return res.status(400).json({ mensaje: "El nombre es requerido" });

        // validar que recibamos el correo
        if (!email)
            return res.status(400).json({ mensaje: "El correo es requerido" });

        // validamos que el usuario exista    
        const user = await User.findById(id);

        if (!user)
            return res.status(400).json({ mensaje: "El usuario no existe" });

        user.name = name;
        user.lastName = lastName;

        await user.save();

        return res.status(204).json({ mensaje: "Usuario actualizado con exito", user: user });


    } catch (error) {
        return res.status(500).json({ error })
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // validamos que el usuario exista    
        const user = await User.findById(id);

        if (!user)
            return res.status(400).json({ mensaje: "El usuario no existe" });

        await user.deleteOne();

        return res.status(200).json({ mensaje: "Usuario eliminado con exito", user: user });

    } catch (error) {
        return res.status(500).json({ error })
    }
});



module.exports = router;