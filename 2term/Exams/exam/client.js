const axios = require('axios');

async function getUserByQuery(id) {
    try {
        const result = await axios.get(`http://localhost:3000/users?id=${id}`);
        console.dir(result.data);
    } catch(err) {
            console.log('ooops, there is an error: ' + err.message);
    }
}


async function getUserByPath(id) {
    try {
        const result = await axios.get(`http://localhost:3000/users/${id}`);
        console.dir(result.data);
    } catch(err) {
            console.log('ooops, there is an error: ' + err.message);
    }
}

console.log('by query:', getUserByQuery(1));  
console.log('by path:', getUserByPath(2));  

console.log('no user:', getUserByPath(5)); //no user  
