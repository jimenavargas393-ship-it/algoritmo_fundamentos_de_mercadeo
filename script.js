const postres = [
{nombre:"Cheesecake", rating:1000},
{nombre:"Brownie", rating:1000},
{nombre:"Tiramisú", rating:1000},
{nombre:"Helado de chocolate", rating:1000},
{nombre:"Flan", rating:1000},
{nombre:"Tres leches", rating:1000},
{nombre:"Cupcake", rating:1000},
{nombre:"Donas", rating:1000},
{nombre:"Pastel de zanahoria", rating:1000},
{nombre:"Macarons", rating:1000}
]

let A
let B

function nuevoDuelo(){

let i = Math.floor(Math.random()*postres.length)
let j

do{
j = Math.floor(Math.random()*postres.length)
}while(i===j)

A=i
B=j

document.getElementById("postreA").innerText=postres[i].nombre
document.getElementById("postreB").innerText=postres[j].nombre

let pregunta=document.getElementById("contexto").value
document.getElementById("pregunta").innerText=pregunta

}

function votar(opcion){

let ganador
let perdedor

if(opcion==="A"){
ganador=A
perdedor=B
}else{
ganador=B
perdedor=A
}

actualizarElo(ganador,perdedor)
actualizarRanking()
nuevoDuelo()

}

function actualizarElo(g,p){

let k=32

let Rg=postres[g].rating
let Rp=postres[p].rating

let Eg=1/(1+Math.pow(10,(Rp-Rg)/400))
let Ep=1/(1+Math.pow(10,(Rg-Rp)/400))

postres[g].rating = Rg + k*(1-Eg)
postres[p].rating = Rp + k*(0-Ep)

}

function actualizarRanking(){

let ranking=[...postres]

ranking.sort((a,b)=>b.rating-a.rating)

let lista=document.getElementById("ranking")
lista.innerHTML=""

ranking.forEach(p=>{
let li=document.createElement("li")
li.innerText=p.nombre+" — "+p.rating.toFixed(0)
lista.appendChild(li)
})

}

function reiniciar(){

postres.forEach(p=>p.rating=1000)
actualizarRanking()

}

nuevoDuelo()
actualizarRanking()
