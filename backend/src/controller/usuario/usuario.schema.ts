import {Schema, model, Document} from 'mongoose';

const UsuarioSchema = new Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createAt: { type: Date },
    updateAt: { type: Date},
});


export default UsuarioSchema;


//chave para api 60791a4b78124909a92247ab571bfb24

// https://avatars.abstractapi.com/v1/?api_key=60791a4b78124909a92247ab571bfb24&name=adelmo.menzes2010@gmail.com