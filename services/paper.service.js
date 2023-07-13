export const paperService = {
    getAll
};

async function getAll() {
    const response = await fetch('http://localhost:3000/api'); //this needs to be changed to be relative uri
    const data = await response.json();

    return data;
}