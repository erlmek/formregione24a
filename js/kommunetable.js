import {fetchAnyUrl} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")


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

