import { getDataAll,postData,opc,deleteData } from "../rutas/modulos-api.js";


let frmModulo = document.querySelector('#frmRegistroModulo')






 let saveData = () => {

    frmModulo.addEventListener('submit', (e)=>{

        e.preventDefault()

        let data = Object.fromEntries(new FormData(e.target));
        opc[e.submitter.dataset.accion](data)
        getRequest();
    })

 }




 let verData = (datos) => {
     console.log(datos);
    let divModulos = document.querySelector('#verModulos')
    let modulos = ``;

    




        datos.foreach( modulo  =>{ 
            modulos += /* html */ 
            `
            <div class="col-3">
             <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Modulo ${modulo.nombre}</h5>
                       <br>
                        <p class="card-text">Skill:holaa</p>
                       
                    </div>
             </div>
            </div>
            `
    divModulos.innerHTML =modulos;

        })

 }


 

 function requestGet(){
        getDataAll()
        .then(result=>{
            console.log(result)
               verData(...result)
    
        })
    
    
    } 
requestGet()
 saveData();
