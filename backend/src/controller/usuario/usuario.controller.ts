import jwt from 'jsonwebtoken';
import { json, Request, Response } from "express";
import usuarioModel from './usuario.model'
import Usuario from './usuario.interface';

import bcrypt from 'bcrypt';

class UsuarioController {

    //CADASTRAR USUARIO
    public async cadastrar(req: Request, resp: Response): Promise<Response> {

        const userModel: Usuario = req.body;
        userModel.createAt = new Date();

        const usuario = new usuarioModel(userModel);

        let resposta = {};
        var decodedToken = {};
        var token = {};
        await usuario.save()
            .then(async cadastrado => {
                 decodedToken = {
                    _id: String(cadastrado.id),
                    nome: cadastrado.nome,
                    avatar: cadastrado.avatar,
                };
        
                 token = await  jwt.sign(decodedToken, 'SECRET', {
                    subject: cadastrado.id,
                    expiresIn: '1d',
                })
                resposta = {
                    message: 'Usuario cadastrado com sucesso!',
                    nome: cadastrado.nome,
                    password: cadastrado.password,
                    avatar: cadastrado.avatar
                };
                
            })


        return resp.json({ resposta, token });
    }

    //AUTENTICACAO DE USUARIO LOGIN
    public async autenticar(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;


        const usuario = await usuarioModel.findOne({ email });

        if (!usuario) {
            return res.status(400).send({ message: ' Usuario não encontrado' });
        };

        const passwordInvalido = await bcrypt.compare(password, usuario.password);
        // usuario.compareSenha(password);
        if (!passwordInvalido) {
            return res.status(400).send({ message: ' Senha incorreta!' });
        }

        const decodedToken = {
            _id: String(usuario._id),
            nome: usuario.nome,
            avatar: usuario.avatar,
        };

        const token = jwt.sign(decodedToken, 'SECRET', {
            subject: usuario.id,
            expiresIn: '1d',
        })

        return res.json({
            usuario,
            token
        });
    }

    // LISTAGEM DE USUARIOS
    public async listagem(req: Request, res: Response): Promise<Response> {

        const usuario = await usuarioModel.find()
        return res.send({
            usuario
        })

    }

}

export default new UsuarioController();