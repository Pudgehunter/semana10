const nombre = document.getElementById('nombre');
const idCandidato = document.getElementById('idCandidato');
const registrarButton = document.getElementById('registrarButton');

const idPresidente = document.getElementById('idPresidente');
const votarButton = document.getElementById('votarButton');

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

database.ref('users').on('value',function(data){
    data.forEach(
        function(a){
            let clave = a.key;
            let valor = a.idCandidato;
            console.log(clave);
            console.log(valor);
        }
    )
});

votar = () => {

    let idPres = idPresidente.value;

    if(idPres.equals(data.a.val().getElementById)){

    }

}

votarButton.addEventListener('click',votar);