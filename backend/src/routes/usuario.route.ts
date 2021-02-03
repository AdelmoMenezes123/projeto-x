import { Router } from 'express';
import UsuarioController from '../controller/usuario/usuario.controller';
import authMiddlewares from '../middlewares/auth.middlewares';

const usuarioRouter = Router();

usuarioRouter.post('/cadastro', UsuarioController.cadastrar);
usuarioRouter.post('/login', UsuarioController.autenticar);

usuarioRouter.get('/',
    // authMiddlewares.autorizarUsuarioByToken,
    UsuarioController.listagem
);


export default usuarioRouter;