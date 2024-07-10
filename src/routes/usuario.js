import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.js";

const router = Router();

router.get("/", UsuarioController.getAll);
router.post("/register", UsuarioController.register);
router.post("/login", UsuarioController.login);

export default router