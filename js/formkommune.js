import {postObjectAsJson} from "./modulejson.js";

console.log("jeg er i formkommune xx")

let formKommune;
const urlKommune = "http://localhost:8080/kommune"

document.addEventListener('DOMContentLoaded', createFormEventListener);

function createFormEventListener() {
    formKommune = document.getElementById("formKommune");
    formKommune.addEventListener("submit", handleFormSubmit);
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    //vi er nødt til at lægge regionKode ned i property, region: {kode: 9999}
    plainFormData.region = {}
    plainFormData.region.kode = plainFormData.regionKode;
    delete plainFormData.regionKode;
    try {
        const responseData = await postObjectAsJson(url, plainFormData, "POST");
        alert("Kommune gemt" + " statuscode=" + responseData[1]);
        return responseData; // return JSON so caller can use it
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault(); //forhindrer submit form i at blive udført
    try {
        const formData = new FormData(formKommune); //formData indeholder alle indtastede data
        console.log(formData);
        const responseData = await postFormDataAsJson(urlKommune, formData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}





