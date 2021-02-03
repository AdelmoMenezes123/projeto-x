import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRouter from './routes/usuario.route';

export class App {
    private express: express.Application;
    private port = 9000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    };

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log('🚀 🚀 Servidor Rodando na porta: ' + this.port)
        });
    }

    private database(): void {
        // mongoose.connect('mongodb+srv://adelmo:adelmo6995@cluster0.kshdg.mongodb.net/<dbname>?retryWrites=true&w=majority',

        mongoose.connect('mongodb://localhost:27017/myapp',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRouter)
    }
}