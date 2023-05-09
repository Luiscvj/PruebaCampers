
let datos = Object.fromEntries(new FormData(frmData).entries());

const myHeaders = new Headers ({

"Content-Type": "application/json"
})


let postClientes = (datos) =>{

fetch( `${URL_API}customers`,
{
   method: "POST",
   headers: myHeaders,
   body:JSON.stringify(datos)
}
).then(respuesta => {
return respuesta.json();
}).then(respuesta =>{
    console.log(respuesta);

}).catch(error =>{
console.log(error);
})

}