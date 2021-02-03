import { model, Document } from 'mongoose';
import Usuario from './usuario.interface';
import UsuarioSchema from './usuario.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UsuarioModel extends Usuario, Document {
    // compareSenha(password: string): Promise<boolean>
    gerarToken(): string;
}


UsuarioSchema.pre<UsuarioModel>('save', async function criptografaSenha() {
    this.password = await bcrypt.hash(this.password, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', async function gerarAvatar() {
    this.avatar = await `https://ui-avatars.com/api/?rounded=true&name=${this.nome}`

});

// UsuarioSchema.method("compararSenhas", function(this: UsuarioModel, ...args: any[]){
//     return bcrypt.compare(args[0], this.password); 
// });


UsuarioSchema.methods.gerarToken = function (this: Usuario): string {

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