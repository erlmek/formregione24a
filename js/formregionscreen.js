console.log("jeg er i formregionscreen")

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formRegion;
const urlRegion = "http://localhost:8080/region"

function createFormEventListener() {
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit);
    console.log(formRegion);
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "content-type": "application/json"
        },
        body: objectAsJsonString
    };

    const response = await fetch(url,fetchOptions);

    console.log("færdig fetch")
    console.log(response);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData);
    try {
        console.log("postform")
        const responseData = await postObjectAsJson(url, plainFormData, "POST");
        alert("Region gemt");
        return responseData; // return JSON so caller can use it
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}


async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    try {
        const formData = new FormData(formRegion);
        console.log(formData);
        const responseData = await postFormDataAsJson(urlRegion, formData);
        console.log(responseData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }

}
