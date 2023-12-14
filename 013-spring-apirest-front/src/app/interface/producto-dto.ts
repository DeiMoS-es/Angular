export class ProductoDTO {
    idProducto: number;
    nombreProducto: string;
    precioProducto: number;
    //ivaProducto: number;
    stockProducto: number;
    cantidad: number;
  
    constructor(idProducto: number, nombreProducto: string, precioProducto: number, stockProducto: number, cantidad: number) {
      this.idProducto = idProducto;
      this.nombreProducto = nombreProducto;
      this.precioProducto = precioProducto;
      //this.ivaProducto = ivaProducto;
      this.stockProducto = stockProducto;
      this.cantidad = cantidad;
    }
}