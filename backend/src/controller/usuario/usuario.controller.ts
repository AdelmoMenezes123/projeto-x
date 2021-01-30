import { json, Request, Response } from "express";
import usuarioModel from './usuario.model'
import Usuario from './usuario.interface';

import bcrypt from 'bcrypt';
import UsuarioSchema from "./usuario.schema";

class UsuarioController {

    //CADASTRAR USUARIO
    public async cadastrar(req: Request, resp: Response): Promise<Response> {

        const userModel: Usuario = req.body;
        userModel.createAt = new Date();

        const usuario = new usuarioModel(userModel);

        let resposta = {};

        await usuario.save()
            .then(cadastrado => {
                resposta = {
                    message: 'Usuario cadastrado com sucesso!',
                    nome: cadastrado.nome,
                    password: cadastrado.password,
                    avatar: cadastrado.avatar
                };
            })

        return resp.json(resposta);
    }

    //AUTENTICACAO DE USUARIO LOGIN
    public async autenticar(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const usuario = await usuarioModel.findOne({ email });
        console.log("usuario ", usuario)

        if (!usuario) {
            return res.status(400).send({ message: ' Usuario não encontrado' });
        };

        const passwordInvalido = await bcrypt.compare(password, usuario.password);
        // usuario.compareSenha(password);
        if (!passwordInvalido) {
            return res.status(400).send({ message: ' Senha incorreta!' });
        }

        return res.json({
            usuario,
            token: usuario.gerarToken(),
        });
    }

    public async listagem(req: Request, res: Response): Promise<Response> {

        const usuario = await usuarioModel.find()
        
        return res.send(usuario)
    }
}

export default new UsuarioController();