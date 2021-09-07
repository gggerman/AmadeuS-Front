
// FUNCIONES REUTILIZABLES

//AGREGA UN PUNTO AL PRECIO
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

export function validar( name, arr ) {
  name = name.trim();
  const result = arr.find( elem => elem.name.toLocaleLowerCase() === name.toLocaleLowerCase() ) 
  if( result ){
    return true
  }
  return false
}