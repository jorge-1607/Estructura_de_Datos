class ColaCircular {

constructor(tamaño){

this.tamaño=tamaño;

this.arreglo=new Array(tamaño);

this.frente=0;

this.final=0;

this.cantidad=0;

}

encolar(dato){

if(this.cantidad===this.tamaño){

return false;

}

this.arreglo[this.final]=dato;

this.final=(this.final+1)%this.tamaño;

this.cantidad++;

return true;

}

desencolar(){

if(this.cantidad===0){

return null;

}

let dato=this.arreglo[this.frente];

this.frente=(this.frente+1)%this.tamaño;

this.cantidad--;

return dato;

}

mostrar(){

let datos=[];

for(let i=0;i<this.cantidad;i++){

datos.push(

this.arreglo[(this.frente+i)%this.tamaño]

);

}

return datos;

}

}

let cola = new ColaCircular(1000000);

function registrarSolicitud(){

let solicitud={

empleado:
document.getElementById("empleado").value,

area:
document.getElementById("area").value,

tipo:
document.getElementById("tipo").value,

descripcion:
document.getElementById("descripcion").value

};

cola.encolar(solicitud);

mostrar();

}

function atenderSolicitud(){

let solicitud=cola.desencolar();

if(solicitud){

document.getElementById("resultado").innerHTML=

"Atendiendo solicitud de: "

+solicitud.empleado;

}else{

document.getElementById("resultado").innerHTML=

"No hay solicitudes";


}

mostrar();

}

function cancelarSolicitud(){

let solicitud=cola.desencolar();

if(solicitud){

document.getElementById("resultado").innerHTML=

"Solicitud cancelada";

}

mostrar();

}

function mostrar(){

let lista=document.getElementById("lista");

lista.innerHTML="";

cola.mostrar().forEach((s,i)=>{

lista.innerHTML+=`

<p>

<b>Turno:</b> ${i+1}

<br>

<b>Empleado:</b> ${s.empleado}

<br>

<b>Área:</b> ${s.area}

<br>

<b>Tipo:</b> ${s.tipo}

<br>

<b>Problema:</b> ${s.descripcion}

</p>

`;

});

}

function simular(cantidad){

let inicio=performance.now();


for(let i=0;i<cantidad;i++){

cola.encolar({

empleado:"Empleado "+i,

area:"Área "+i,

tipo:"Preventivo",

descripcion:"Solicitud automática "+i

});

}

let fin=performance.now();

document.getElementById("resultado").innerHTML=

"Se agregaron "+cantidad+

" solicitudes en "+

(fin-inicio).toFixed(2)+" ms";

mostrar();

}

function crearRecursivo(numero){

if(numero===0){

return;

}

cola.encolar({

empleado:"Empleado repetido",

area:"Producción",

tipo:"Revisión",

descripcion:"Solicitud creada por recursividad"

});

crearRecursivo(numero-1);

}

function generarRecursivo(){

crearRecursivo(10);

document.getElementById("resultado").innerHTML=

"Se generaron solicitudes usando recursividad";

mostrar();

}