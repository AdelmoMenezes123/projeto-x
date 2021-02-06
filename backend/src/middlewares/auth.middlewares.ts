// import { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
// import usuarioModel from '../controller/usuario/usuario.model';
// import Usuario from '../controller/usuario/usuario.interface';


class AuthMiddlewares {

  public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {


    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: 'token nao autorizado' })
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
      return res.status(401).send({ error: 'token error' })
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
      return res.status(401).send({ error: 'token malformado' })
    }

    jwt.verify(token, "SECRET", (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Error token invalido' })

      req.usuario = decoded._id;
      return next();
    })
  }
}

export default new AuthMiddlewares();