import {model, Document} from 'mongoose';
import Usuario from './usuario.interface';
import UsuarioSchema from './usuario.schema';
import bcrypt from 'bcrypt';

interface UsuarioModel extends Usuario, Document {
    compareSenha(password: string): Promise<boolean>
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


export default  model<UsuarioModel>('Usuario', UsuarioSchema);