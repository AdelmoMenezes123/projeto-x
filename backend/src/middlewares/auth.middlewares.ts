import { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import usuarioModel from '../controller/usuario/usuario.model';
import Usuario from '../controller/usuario/usuario.interface';


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



  // const authHeader = req.headers['authorization']
  // console.log("autheader", authHeader)
  // const token = authHeader && authHeader.split(' ')[1]
  // console.log("toke", token)
  // if (token == null) return res.sendStatus(401) // if there isn't any token


  // jwt.verify(token, "SECRET" as string, (err: any, user: any) => {
  //   if (err) return res.sendStatus(403)
  //   req.usuario = user;

  //next() // pass the execution off to whatever request the client intended
  //})


export default new AuthMiddlewares();