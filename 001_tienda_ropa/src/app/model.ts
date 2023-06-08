export interface Usuario {
    idUsuario:number;
    userName: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaAlta?: Date;
    telefono: string;
    email: string;
    perfil?: string;
}