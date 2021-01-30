import * as mongoose from 'mongoose';
import Usuario from './usuario.interface';
import UsuarioSchema from './usuario.schema';

const UsuarioModel = mongoose.model<Usuario>('Usuario', UsuarioSchema);

export default UsuarioModel;