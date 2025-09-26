import {fetchAnyUrl} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    //console.log(kommune);
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode
    cell.style.width = "7%";

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn
    cell.style.width = "15%";

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href
    cell.style.width = "30%";

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.kode
    cell.style.width = "7%";

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn
    cell.style.width = "30%";

    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    cell.appendChild(pbDelete);
    pbDelete.addEventListener("click", () => {console.log("hej" + rowCount)})

    //console.log(row)

}

let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune);
    if (kommuner.length > 10) {
        kommuner.forEach(createTable)
    } else {
        alert("Fejl i fetch")
    }
}

pbCreateKommuneTable.addEventListener("click", fetchKommuner);

