import { model, Document } from 'mongoose';
import Usuario from './usuario.interface';
import UsuarioSchema from './usuario.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UsuarioModel extends Usuario, Document {
    compareSenha(password: string): Promise<boolean>
    gerarToken(): string;
}


UsuarioSchema.pre<UsuarioModel>('save', async function criptografaSenha() {
    this.password = await bcrypt.hash(this.password, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', async function gerarAvatar() {
    // const randomId = Math.floor(Math.random() *(1000000)) + 1;
    // this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`

    this.avatar = `https://ui-avatars.com/api/?rounded=true&name=${this.nome}`
});

// UsuarioSchema.methods.compararSenhas = function(password: string): Promise<boolean> {
//     return bcrypt.compare(password, this.password);
// }

UsuarioSchema.methods.gerarToken = function (): string {

    const decodedToken = {
        _id: String(this._id),
        nome: this.nome,
        avatar: this.avatar,
    };

    return jwt.sign(decodedToken, 'SECRET', {
        expiresIn: '1d',
    })
}


export default model<UsuarioModel>('Usuario', UsuarioSchema);