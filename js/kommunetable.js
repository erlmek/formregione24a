import {fetchAnyUrl, restDelete, fetchRegioner, regionMap} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommuner = "http://localhost:8080/kommuner"
const urlKommune = "http://localhost:8080/kommune/"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

async function createTable(kommune) {
    //console.log(kommune);
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    row.id = kommune.navn

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
    if (kommune.hrefPhoto.length>2) {
        let img = document.createElement("img")
        img.setAttribute("src", kommune.hrefPhoto)
        img.setAttribute("alt", "hej")
        img.setAttribute("width", 150)
        img.setAttribute("height", 150)
        cell.appendChild(img)
    } else {
        cell.innerHTML = kommune.hrefPhoto
    }

    //add region dropdown
    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement("select")
    regionMap.forEach(reg => {
        const option = document.createElement("option")
        option.textContent = reg.navn
        option.value = reg.kode
        option.region = reg
        dropdown.appendChild(option)
    })
    cell.appendChild(dropdown)
    dropdown.value = kommune.region.kode

    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1";
    cell.appendChild(pbDelete);
    //pbDelete.addEventListener("click", () => {console.log("hej" + rowCount)})
    pbDelete.onclick = function () {
        console.log("hej" + rowCount);
        const el1 = document.getElementById(kommune.navn);
        console.log(el1)
        el1.remove();
        deleteKommune(kommune)
    }
    //console.log(row)
}

async function deleteKommune(kommune) {
    //http://localhost:8080/kommune/7777
    const url = urlKommune + kommune.kode;
    const response = await restDelete(url);
    const body = await response.text();
    alert(body)
}

function mysort(kommuner) {
    return kommuner.sort((kom1,kom2) => {
        if (kom1.region.kode>kom2.region.kode) {return 1}
        else if (kom2.region.kode > kom1.region.kode) {return -1}
        else {return (kom1.navn > kom2.navn) ? 1 : -1}
    })
}


let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommuner);
    if (kommuner.length > 10) {
        kommuner = mysort(kommuner)
        kommuner.forEach(createTable)
    } else {
        alert("Fejl i fetch")
    }
}

fetchRegioner();

pbCreateKommuneTable.addEventListener("click", fetchKommuner);

