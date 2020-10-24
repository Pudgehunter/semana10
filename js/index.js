const nombre = document.getElementById('nombre');
const idCandidato = document.getElementById('idCandidato');
const registrarButton = document.getElementById('registrarButton');

const idPresidente = document.getElementById('idPresidente');
const votarButton = document.getElementById('votarButton');

//los botones apartes que van de primero
const verCandidatoButton = document.getElementById('verCandidatoButton');
const verVotacionesButton = document.getElementById('verVotacionesButton');

var database = firebase.database();



//Siempre va primero esto si lo hace de esta manera
registrar = () => {

    let n = nombre.value;
    let idCand = idCandidato.value;

    if(n == ''){
        alert('No pusiste nombre');
        return;
    }
    if(idCand == ''){
        alert('No pusiste identificación');
        return;
    }

    let objetoUsuario = {
        nombre: n,
        idCandidato: idCand
    };

    //console.log(objetoUsuario);

    let json = JSON.stringify(objetoUsuario);
    //console.log(json);

    database.ref('users').push().set(objetoUsuario);

    nombre.value = '';
    idCandidato.value = '';

}

registrarButton.addEventListener('click',registrar);



votar = () => {
    let idPres = idPresidente.value;
    
    database.ref('users').on('value',function(data){
        data.forEach(
            function(a){
                let clave = a.key;
                let nombrePresidente = a.val().nombre;
                let valor = a.val().idCandidato;
                console.log(clave);
                console.log(valor);
                if(idPres == valor){
                    alert(nombrePresidente+" "+valor + " " + votos[a]);
                    votos[a] = votos[a] + 1;
                }
            }
        )
    });
    

    

}

votarButton.addEventListener('click',votar);

//los botones apartes tienen una función alert y es...

candidatobutton = () => {
    database.ref('users').on('value',function(data){
        data.forEach(
            function(a){
                let nombrePresidente = a.val().nombre;
                let valor = a.val().idCandidato;
                console.log(valor);
                alert(nombrePresidente +valor);
            }
        )
        noLoop();
    });
}

verCandidatoButton.addEventListener('click',candidatobutton);

votacionesButton = () => {
    database.ref('users').on('value',function(data){
        data.forEach(
            function(a){
                let nombrePresidente = a.val().nombre;
                let valor = a.val().idCandidato;
                console.log(valor);
                alert(nombrePresidente + votos[a]);
            }
        )
    });
} 

verVotacionesButton.addEventListener('click',votacionesButton);

let votos = [];

database.ref('users').on('value',function(data){
    data.forEach(
        function(a){
            votos[a] = 0;
        }
    )
});