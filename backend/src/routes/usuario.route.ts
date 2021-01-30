import {Router} from 'express';
import UsuarioController from '../controller/usuario/usuario.controller';

const usuarioRouter = Router();

usuarioRouter.post('/cadastro', UsuarioController.cadastrar);
usuarioRouter.post('/login', UsuarioController.autenticar);

export default usuarioRouter;