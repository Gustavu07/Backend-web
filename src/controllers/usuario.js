import { usermodel } from "../models/usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsuarioController {
    static async getAll(req, res) {
        try {
            const usuarios = await usermodel.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async register(req, res) {
        const { nombre, apellido, email, contrasena } = req.body;
        try {
            const existingUser = await usermodel.getByemail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const result = await usermodel.create({ nombre, apellido, email, contrasena: hashedPassword });
            
            console.log(`Usuario creado: 
                Nombre: ${result.nombre}
                Apellido: ${result.apellido}
                Email: ${result.email}
                Contraseña: [NO SE MUESTRA POR SEGURIDAD]`);
            
                res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        const { email, contrasena } = req.body;
        try {
            const user = await usermodel.getByemail(email);
            if (user && await bcrypt.compare(contrasena, user.contrasena)) {
                const token = jwt.sign({ id_user: user.id_user }, 'tu_secreto', { expiresIn: '1h' });

                // Imprimir datos del usuario en la consola
                console.log(`Usuario autenticado: 
                    Nombre: ${user.nombre}
                    Apellido: ${user.apellido}
                    Email: ${user.email}
                    Contraseña: [NO SE MUESTRA POR SEGURIDAD]`);

                res.json({ token, user });
            } else {
                res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}
