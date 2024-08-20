import { Imagen } from "./imagen";

export interface Producto {
    idProducto: number;
    nombreProducto: string;
    descripcionProducto: string;
    precioProducto: number;
    stockProducto: number;
    tipoProducto: string;
    fechaAltaProducto?: Date;
    imagen: Imagen;
}
