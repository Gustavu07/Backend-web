import { CategoriasModel } from '../models/categoriamodel.js';

export class CategoriasController {
    static async getAll(req, res) {
        try {
            const categorias = await CategoriasModel.getAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const categoria = await CategoriasModel.getById(id);
            if (categoria) {
                res.json(categoria);
            } else {
                res.status(404).json({ message: 'Categoría no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        const { nombre_curso, descripcion } = req.body;
        try {
            const newCategoria = { nombre_curso, descripcion };
            const result = await CategoriasModel.create(newCategoria);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nombre_curso, descripcion } = req.body;
        try {
            const updatedCategoria = { nombre_curso, descripcion };
            const result = await CategoriasModel.update(id, updatedCategoria);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await CategoriasModel.delete(id);
            res.json({ message: 'Categoría eliminada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
