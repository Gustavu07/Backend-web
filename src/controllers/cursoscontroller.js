import { cursosmodel } from "../models/cursosmodel.js";
import { guardarImagen } from '../utils/image.js';


export class CursosController {
    static async getAll(req, res) {
        try {
            const cursos = await cursosmodel.getAll();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const curso = await cursosmodel.getById(id);
            if (curso) {
                res.json(curso);
            } else {
                res.status(404).json({ message: 'Curso no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
    const { categoria, id_user,  nombre, descripcion, universidad_o_procedencia, nivel, idioma, imagenes, fecha_inicio, fecha_fin } = req.body;
    const imagen = req.files.imagenes;
    console.log(imagen);

    try {
        let rutaImagen
        if (imagen) {
            rutaImagen = await guardarImagen('cursos', imagen, nombre);  // Utiliza el nombre del curso como id para la imagen
        }

        const newCurso = { categoria:parseInt(categoria), id_user:parseInt(id_user), nombre, descripcion, universidad_o_procedencia, nivel, idioma, imagenes: rutaImagen, fecha_inicio, fecha_fin };
        const result = await cursosmodel.create(newCurso);
        res.status(201).json(result);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
    static async update(req, res) {
        console.log(req.body);
        const { id } = req.params;
        const {  nombre, descripcion, universidad_o_procedencia, nivel, idioma,  fecha_inicio, fecha_fin } = req.body;
        try {
            const updatedCurso = { nombre, descripcion, universidad_o_procedencia, nivel, idioma, fecha_inicio, fecha_fin };
            const result = await cursosmodel.update(id, updatedCurso);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}
    static async delete(req, res) {
        const { id } = req.params;
        try {
            await cursosmodel.delete(id);
            res.json({ message: 'Curso eliminado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}