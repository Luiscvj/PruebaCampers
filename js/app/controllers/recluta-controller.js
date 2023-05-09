import { getDataAll,postData,putData, opc,searchDataById,deleteData} from '../rutas/recluta-api.js'

let formRecluta = document.querySelector('#frmRegistroRecluta');



function delRecluta(){

    document.querySelectorAll('#eliminarRecluta').forEach(element => {

        element.addEventListener('click' , (e)  => {

            deleteData(e.target.dataset.iduser)

        })
        
    })

}





function updateReclutaForm(){
  

    document.querySelectorAll('#editarRecluta').forEach(element=>{

        element.addEventListener('click', (e) =>{

             let btnRecluta = document.querySelector('#btnRecluta')

            btnRecluta.dataset.accion="PUT"
            document.querySelector('#registroRecluta').style.display ="block"
          
            document.querySelector('#listarRecluta').style.display ="none"
            
            requestGetById(parseInt(e.target.dataset.iduser))
            







        })
    })
}

  

let putDataRecluta =  (id) => {

    formRecluta.addEventListener("submit", (e) => { 


        e.preventDefault()

        let data = Object.fromEntries(new FormData(e.target));
        opc[e.submitter.dataset.accion](data,id)
       

    })



}


let verDivs  = () =>{

    document.querySelectorAll('.nav-link').forEach(element =>{

        element.addEventListener('click',(e) =>{
        
            let datos = JSON.parse(e.target.dataset.ocultar)
            
                
                datos[0].forEach(element =>{

                    let divVer = document.querySelector(element);
                    console.log(element);
                    divVer.style.display = 'block'

                })
            
                datos[1].forEach(element=>{

                    let divQuitar = document.querySelector(element);
                   
                    divQuitar.style.display = 'block'

                })
            

            let divOcultar = document.querySelector(datos[1]);

            if(datos[0].includes('#listarRecluta') ){
                requestGet()
                

            }
            divOcultar.style.display = 'none'

        })

    })


}


let saveData =() => {

    formRecluta.addEventListener("submit", (e)=>{


        e.preventDefault()

        let data = Object.fromEntries(new FormData(e.target));
        
        opc[e.submitter.dataset.accion](data)
   })
}





function verRecluta(reclutas){
    console.log(reclutas)
    let divCards = document.querySelector('#listarRecluta')
    let contenido = ``;


    reclutas.forEach(recluta => {
     contenido += /* html */ 
     `<div class="col-3"  style=" margin-left: 5rem;">
        <div class="card" style="width: 18rem;">
        <img src="../../img/dino.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${recluta.nombre}</h5>
                <p class="card-text">${recluta.nroId}</p>
                <p class="card-text">${recluta.email}</p>
                <a href="#" id="eliminarRecluta"  data-idUser="${recluta.id}" class="btn btn-danger">Eliminar</a>
                <a href="#" id="editarRecluta"  data-idUser="${recluta.id}" data-bs-target="#staticBackdrop"   data-bs-toggle="modal" class="btn btn-primary">Editar</a>
            </div>
       </div>

    </div>


   
     `
    })

    divCards.innerHTML = contenido;
    updateReclutaForm()
    delRecluta()
}



function requestGet(){
    getDataAll()
    .then(result => {
        verRecluta(result)


    })

    


}

function requestGetById(id){
    searchDataById(id)
    .then(result=>{
       console.log(result)
       loadFrmData(result);
       putDataRecluta(id)
       



    })
}

let loadFrmData = (data)=>{
  
    const {nombre,email,edad,fechaNacimiento,direccion,telefono,nroId,fechaIngreso,id_team} = data
    const frm = new FormData(formRecluta);
    frm.set("nombre",nombre);
    frm.set("email",email);
    frm.set("edad",edad)
    frm.set("fechaNacimiento",fechaNacimiento)
    frm.set("direccion",direccion);
    frm.set("telefono",telefono);
    frm.set("nroId",nroId);
    frm.set("fechaIngreso",fechaIngreso)
    
    frm.set("id_team",id_team)

    for( let pair of frm.entries()){

        formRecluta.elements[pair[0]].value = pair[1];


    }

}


function  choiceEquipo(dato){

    switch(dato){

        case "1":
            return "Apolo";
            break;

        case "2":
             return "Artemis";
             break;
        default:
            return "Sputnik"
            break;

           
    }
}

/* requestGet() */


/*FILTROOS */


let filtroEdad = ()=>{
    document.querySelector('#edadRadio').addEventListener('click', (e) =>{
      
        getDataAll()
                .then(result => {
                    let menorEdad =  result.filter(element => element.edad < 18 )
                    verRecluta(menorEdad);
                          
                    })
                })
       
    }




let filtroEquipo = () =>{

    document.querySelector('#team').addEventListener('change', (e)=>{

        getDataAll()
        .then(result=>{

            console.log(e.target.value);
              let equipo = result.filter(recluta => recluta.id_team == e.target.value)  
              verRecluta(equipo);
        })

    })

}




filtroEquipo()
verDivs()
saveData();
filtroEdad();