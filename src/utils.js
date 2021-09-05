
// FUNCIONES REUTILIZABLES

//AGREGA UN PUNTO AL PRECIO
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

export function filtro( value, arr ) {
  let lista = []
  for ( let i = 0; i < arr.length; i++ ) {
    let temp = arr[i].categories
    for( let j = 0; j < temp.length; j++ ) {
      if( temp[j].name === value ){
        lista.push( arr[i] )
    }
  }
}
  return lista
}