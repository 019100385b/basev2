import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basev2';
}
/*
  __________________________________________________

    Tarea | lunes, 20 de septiembre de 2021, 14:00
  __________________________________________________
    Preparar un programa que permita crear productos, agregarlos a un almacen, modificar la cantidad de productos en el almacen (saldo),
    tener cuidado con los saldos negativos, trabajar con más de un almacen y mover productos entre almacenes.
    Todo es en consola, la aplicación deberá mostrar los mensajes correspondientes a las acciones de muestra, es decir, si creo un producto y
    lo agrego al almacen 01, mostrar los productos con sus saldos en el almacen 01.
    No es necesario interacción con la aplicación. Presentación individual. Subir el proyecto a github y presentar la url de github para la
    revisión del código fuente.
*/

//  [ OBJETOS ]     ________________________________________________________________________________________________________________________
class almacen {
  static id: number = 1;
  public id: number;
  icono: string;
  nombre: string;
  productos: producto[];

  constructor(nom: string, prods: producto[]){
    this.id = almacen.id++;
    this.icono = '🏬';
    this.nombre = nom;
    this.productos = prods;
  }

  mostrarProductos(){
    console.log(`[${this.icono}:${this.id}]  ${this.nombre} | Listado de productos:`);
    console.log('\t  ID\tProducto\t Cantidad\tDescripcion');
    this.productos.forEach((producto) => {
      console.log(`\t- ${producto.id}.\t${producto.icono}\t${producto.nombre}\t\t${producto.cantidad}\t\t${producto.descripcion}`);
    });
    console.log(' ');
  }

  getProducto(nombre: string){
    return this.productos.find(producto => producto.nombre === nombre);
  }
}

class producto {
  static id: number = 1;
  public id: number;
  icono: string;
  nombre: string;
  cantidad: number;
  descripcion: string;

  constructor(ico: string, nom: string, cant: number, desc: string){
    this.id = producto.id++;
    this.icono = ico;
    this.nombre = nom;
    this.cantidad = cant;
    this.descripcion = desc
  }

  edit_cantidad(alm: almacen, valor: number): boolean {
    console.log(`[${alm.icono}:${alm.id} ${alm.nombre} | 📦:${this.id}] ${this.icono} ${this.nombre} (${this.cantidad}), ${this.descripcion}.`);
    if ((this.cantidad + valor) < 0)  {console.log(`\t- [ERROR] No hay suficientes productos a quitar.`); console.log(' '); return false;}
    else {
      this.cantidad += valor;
      if (valor >= 0)                 {console.log(`\t- [INFO] Se han AGREGADO (${valor}) a la cantidad total del producto.`);}
      else                            {console.log(`\t- [INFO] Se han REMOVIDO (${Math.abs(valor)}) a la cantidad total del producto.`);}
    }
    console.log(`\t- [INFO] La nueva cantidad del producto es de (${this.cantidad}).`)
    console.log(' ');
    return true;
  }
}

//  [ Valores por Defecto ]     ________________________________________________________________________________________________________________________
const alm_01 = new almacen('Primer Almacen', [
  new producto('🥔', 'Papa', 52, 'Papa Huayro'),
  new producto('🍐', 'Pera', 84, 'Peras de todo tamaño'),
  new producto('🥑', 'Palta', 16, 'Paltas frescas'),
  new producto('🍅', 'Tomate', 42, 'Tomates recien cosechados'),
  new producto('🍑', 'Durazno', 38, 'Duraznos frescos y dulces'),
  new producto('🍎', 'Manzana', 158, 'Manzanas de todo tipo y color')
]);

const alm_02 = new almacen('Segundo Almacen', [
  new producto('🥔', 'Papa', 15, 'Papa Huayro'),
  new producto('🍐', 'Pera', 84, 'Peras de todo tamaño'),
  new producto('🥑', 'Palta', 0, 'Paltas frescas'),
  new producto('🍅', 'Tomate', 3, 'Tomates recien cosechados'),
  new producto('🍑', 'Durazno', 8, 'Duraznos frescos y dulces'),
  new producto('🍎', 'Manzana', 21, 'Manzanas de todo tipo y color')
]);

const alm_03 = new almacen('Tercer Almacen', [
  new producto('🥔', 'Papa', 41, 'Papa Huayro'),
  new producto('🍐', 'Pera', 84, 'Peras de todo tamaño'),
  new producto('🥑', 'Palta', 45, 'Paltas frescas'),
  new producto('🍅', 'Tomate', 18, 'Tomates recien cosechados'),
  new producto('🍑', 'Durazno', 13, 'Duraznos frescos y dulces'),
  new producto('🍎', 'Manzana', 10, 'Manzanas de todo tipo y color')
]);

//  [ Funciones ]     ________________________________________________________________________________________________________________________
function moverProductos(alm_origen: almacen, nombre_producto: string, cantidad: number, alm_destino: almacen){
  if (alm_origen.getProducto(nombre_producto)?.edit_cantidad(alm_origen, -Math.abs(cantidad))){
    alm_destino.getProducto(nombre_producto)?.edit_cantidad(alm_destino, cantidad);
  }
}

//  [ CODIGO ]     ________________________________________________________________________________________________________________________
alm_01.mostrarProductos();
alm_02.mostrarProductos();
alm_03.mostrarProductos();
moverProductos(alm_01, 'Papa', 10000, alm_02);
alm_01.mostrarProductos();
alm_02.mostrarProductos();
alm_03.mostrarProductos();