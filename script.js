function exportarExcel(){

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
