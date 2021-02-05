import Usuario from "../../controller/usuario/usuario.interface";

declare global {
    namespace express {
        interface Request {
            usuario?: Usuario;
        }
    }
} 