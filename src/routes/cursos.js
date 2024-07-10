import { Router } from "express";
import { CursosController } from "../controllers/cursoscontroller.js";

const routercursos = Router();


routercursos.get('/', CursosController.getAll);
routercursos.get('/:id',  CursosController.getById);

routercursos.post('/',  CursosController.create);
routercursos.put('/:id',  CursosController.update);
routercursos.delete('/:id', CursosController.delete);

export default routercursos;