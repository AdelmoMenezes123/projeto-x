import {Request, Response} from "express";
import usuarioModel from './usuario.model'
import Usuario from './usuario.interface';

class UsuarioController{
    public async cadastrar(req: Request, resp: Response): Promise<Response>{
        const usuario: Usuario = await usuarioModel.create(req.body);
        const resposta = {
            message: 'Usuario cadastrado com sucesso!',
            nome: usuario.nome,
            password: usuario.password,
            avatar: usuario.avatar
        };

        return resp.json(resposta);
    }
}

export default new UsuarioController();