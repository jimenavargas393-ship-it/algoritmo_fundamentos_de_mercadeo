const postres = [
{nombre:"Cheesecake", rating:1000},
{nombre:"Brownie", rating:1000},
{nombre:"Tiramisú", rating:1000},
{nombre:"Helado", rating:1000},
{nombre:"Flan", rating:1000},
{nombre:"Tres Leches", rating:1000},
{nombre:"Cupcake", rating:1000},
{nombre:"Donas", rating:1000},
{nombre:"Pastel de Zanahoria", rating:1000},
{nombre:"Macarons", rating:1000}
]

let A
let B
let votos = []

function nuevoDuelo(){

let i = Math.floor(Math.random()*postres.length)
let j

do{
j = Math.floor(Math.random()*postres.length)
}while(i===j)

A = i
B = j

document.getElementById("postreA").innerText = postres[A].nombre
document.getElementById("postreB").innerText = postres[B].nombre

let pregunta = document.getElementById("contexto").value
document.getElementById("pregunta").innerText = pregunta

}

function votar(opcion){

let ganador
let perdedor

if(opcion === "A"){
ganador = A
perdedor = B
}else{
ganador = B
perdedor = A
}

votos.push({
ganador: postres[ganador].nombre,
perdedor: postres[perdedor].nombre
})

actualizarElo(ganador, perdedor)

actualizarRanking()

nuevoDuelo()

}

function actualizarElo(g, p){

let K = 32

let Rg = postres[g].rating
let Rp = postres[p].rating

let Eg = 1/(1 + Math.pow(10,(Rp - Rg)/400))
let Ep = 1/(1 + Math.pow(10,(Rg - Rp)/400))

postres[g].rating = Rg + K*(1 - Eg)
postres[p].rating = Rp + K*(0 - Ep)

}

function actualizarRanking(){

let ranking = [...postres]

ranking.sort((a,b)=> b.rating - a.rating)

let lista = document.getElementById("ranking")

lista.innerHTML = ""

ranking.forEach((p,i)=>{

let li = document.createElement("li")

li.innerText = (i+1) + ". " + p.nombre + " — " + p.rating.toFixed(0)

lista.appendChild(li)

})

}

function reiniciar(){

postres.forEach(p => p.rating = 1000)

votos = []

actualizarRanking()

nuevoDuelo()

}

function exportarCSV(){

let tabla = `
<table>
<tr>
<th>Ganador</th>
<th>Perdedor</th>
</tr>
`

votos.forEach(v=>{
tabla += `
<tr>
<td>${v.ganador}</td>
<td>${v.perdedor}</td>
</tr>
`
})

tabla += `</table>`

let blob = new Blob([tabla], {
type:"application/vnd.ms-excel"
})

let url = URL.createObjectURL(blob)

let a = document.createElement("a")

a.href = url
a.download = "votos_postres.xls"

a.click()

}

window.onload = function(){

nuevoDuelo()
actualizarRanking()

}
