import { Router } from 'express';
import usuarioController from '../controller/usuario/usuario.controller';
import UsuarioController from '../controller/usuario/usuario.controller';
import authMiddlewares from '../middlewares/auth.middlewares';

const usuarioRouter = Router();

usuarioRouter.post('/cadastro', UsuarioController.cadastrar);
usuarioRouter.post('/login', UsuarioController.autenticar);

usuarioRouter.get('/',
     authMiddlewares.autorizarUsuarioByToken,
     usuarioController.listagem
);

usuarioRouter.get('/:id',
     authMiddlewares.autorizarUsuarioByToken,
     usuarioController.getUser
);


export default usuarioRouter;