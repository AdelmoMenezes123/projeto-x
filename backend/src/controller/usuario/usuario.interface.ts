import * as mongoose from 'mongoose';

interface Usuario extends mongoose.Document {
    nome: string;
    cpf: string;
    avatar: string;
    email: Date;
    password: string;
    createAt?: Date;
    updateAt?: Date;
}

export default Usuario;