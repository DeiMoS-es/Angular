import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interface/producto';
import { ProductoDTO } from 'src/app/interface/producto-dto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // variables
  productos: Producto[];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'tipo'];
  productoSeleccionado: Producto | null = null;
  btnCarrito = true;  
  cantidad: number = 1;
  isLoggedIn: boolean = false;
  token: string | null = null;

  constructor(private productoService: ProductoService, private router: Router, private sharedService: SharedServiceService,
              private carritoService: CarritoService, private contadorCarrito: ContadorCarritoService,
              private loginService: LoginService) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.sharedService.productoSeleccionado$.subscribe(
        (product) => this.productoSeleccionado = product
    )
    this.loginService.usuarioIsLoginSubject.subscribe({
      next: (userLoginOn) =>{
        this.isLoggedIn = userLoginOn;
      }
    })
    this.comprobarToken();
  }

  private obtenerProductos(){
    this.productoService.obtenerProductos().subscribe(dato => {
      this.productos = dato;
    })
  }

  public verProducto(idProducto: number) {
    // Lógica para ver el producto
    console.log(idProducto);
    this.productoService.obternerProductoId(idProducto).subscribe({
      next: (data) => {
        this.productoSeleccionado = data;
      },
      error: (err) => {console.log(err);}
    })
    //this.router.navigate(['/ver-producto', idProducto]) //Si quisiera crear/navegar a otro component para ver un producto
  }

  public editarProducto(idProducto: number) {
    console.log(idProducto);
    this.router.navigate(['/editar-producto', idProducto]);
  }

  public eliminarProducto(idProducto: number) {
    this.productoService.eliminarProducto(idProducto).subscribe({
      next: (data: any) => {
        console.log("Respuesta del servidor:", data);
        const mensaje = data.mensaje;
        console.log(mensaje);
        Swal.fire({
          title: mensaje,
          icon: "success",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
      });
      },
      error:(err) =>{
        console.log("Error: ", err);
        Swal.fire({
          title: "Error al eliminar el producto",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
      })
      },
      complete:() =>{console.log("Complete"); this.obtenerProductos();}
    });
  }

  public cerrarDetalles(){
    this.productoSeleccionado = null;
  }

  public addProducto(idProducto: number){
    this.productoService.obternerProductoId(idProducto).subscribe({
      next: (data) => {
        let productoDTO: ProductoDTO = new ProductoDTO(
          data.idProducto,
          data.nombreProducto,
          data.precioProducto,
          data.stockProducto,
          0
        );
        this.carritoService.agregarProductoALista(productoDTO);
      },
      error: (err) =>{
        console.log(err);
        Swal.fire({
          title: "Error al añadir el producto al carrito",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
      },
      complete: ()=>{
        // if(this.carritoService.obtenerListaProductosEnPedido()){}
        this.contadorCarrito.aumentarContador();
      }
    });
  }

  public mostrarAcciones(isLoggedIn: boolean){
    if(isLoggedIn){
      this.displayedColumns = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'tipo','acciones'];
    } else {
      this.displayedColumns = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'tipo'];
    }
  }

  private comprobarToken():void{
    this.token = this.loginService.getToken();
    if(this.token){
      this.isLoggedIn = true;
      this.mostrarAcciones(this.isLoggedIn)
    }else{
      this.isLoggedIn = false;
    }
  }

  //TODO actualizar el stock al ir añadiendo productos a la lista
  public actualizarStock(){
    
  }
}
