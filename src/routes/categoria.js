import { Router } from 'express';
import { CategoriasController } from '../controllers/categoriaController.js';

const routercategoria = Router();

routercategoria.get('/', CategoriasController.getAll);
routercategoria.get('/:id', CategoriasController.getById);
routercategoria.post('/', CategoriasController.create);
routercategoria.put('/:id', CategoriasController.update);
routercategoria.delete('/:id', CategoriasController.delete);

export default routercategoria;
