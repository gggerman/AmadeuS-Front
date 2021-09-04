
// FUNCIONES REUTILIZABLES

//AGREGA UN PUNTO AL PRECIO
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }