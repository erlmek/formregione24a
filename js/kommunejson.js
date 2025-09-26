console.log("jeg er i formkommunejson")

function createKommune() {
    const kommune = {}
    kommune.kode = "7777"
    kommune.navn = "Skagen Nord xxx"
    kommune.href = "http:skagensyd"
    kommune.region = {}
    kommune.region.kode = "1081"
    return kommune;
}

const urlPostKommune = "http://localhost:8080/kommune";

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
    console.log(response);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const responseJson = await response.json();

    console.log(responseJson);
    console.log(response.status);

    return [responseJson, response.status];
}


async function postKommune(kommune) {
    result = ""
    try {
        const nogetjson = await postObjectAsJson(urlPostKommune, kommune, "POST");
        result = nogetjson
        console.log("selve json");
        console.log(nogetjson[0]);
        console.log("status")
        console.log("status=" + nogetjson[1]);
        console.log("FINITITO")
    } catch (e) {
        console.error(e);
    }
    return result
}

const kommune1 = createKommune();
postKommune(kommune1);
//husk man kan ikke skriv noget her. postKommune står og venter.

