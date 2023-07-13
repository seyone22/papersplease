export const paperService = {
    getAll,
    getById
};

async function getAll() {
    const response = await fetch('http://localhost:3000/api'); //this needs to be changed to be relative uri
    const data = await response.json();

    return data;
}

async function getById(id) {
    console.log("getById function :");
    const response = await fetch(`http://localhost:3000/api?id=${id}`)
    const data = await response.json();

    return data;
}