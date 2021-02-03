import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import usuarioModel from '../controller/usuario/usuario.model';
import Usuario from '../controller/usuario/usuario.interface'

class AuthMiddlewares {

    public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response  > {
        
        const token = req.query.token || req.headers['x-access-token'];
        console.log(token)
        try {
            if (!token) {
                return res.status(401).send({ message: "Acesso restrito!" });
            }
            const usuarioToken = jwt.verify(token, 'SECRET') as Usuario;
            const usuario = await usuarioModel.findById(usuarioToken.id);
            if (!usuario) {
                return res.status(400).send({ message: "Usuario não existe no baco de dados!" })
            }

             req.usuario = usuario;

            return next();
        } catch (error) {
            return res.status(401).send({ message: "Token invalido !" })
        }

    }
}

export default new AuthMiddlewares();