import * as mongoose from 'mongoose';
import Usuario from './usuario.interface';
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

UsuarioSchema.pre<Usuario>('save', async function criptografaSenha() {
    this.password = await bcrypt.hash(this.password, 8);
});

UsuarioSchema.pre<Usuario>('save', async function gerarAvatar() {
    // const randomId = Math.floor(Math.random() *(1000000)) + 1;

    // this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`
    this.avatar = `https://ui-avatars.com/api/?rounded=true&name=${this.nome}`
});

export default UsuarioSchema;


//chave para api 60791a4b78124909a92247ab571bfb24

// https://avatars.abstractapi.com/v1/?api_key=60791a4b78124909a92247ab571bfb24&name=adelmo.menzes2010@gmail.com