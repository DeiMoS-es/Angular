export interface Contacto {
    idContacto:number;
    nombre: string;
    fechaNacimiento?: Date;
    telefono: string;
    email?: string;
}

export interface Credentials{
    email: string;
    password: string
}