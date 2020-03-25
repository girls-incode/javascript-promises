'use strict';

let users = [
    { id: 1, gender: "FEMALE" },
    { id: 2, gender: "FEMALE" },
    { id: 3, gender: "MALE" }
];

let brands = [
    { id: 1, name: "Adidas" },
    { id: 2, name: "Armani" },
    { id: 3, name: "Benetton" },
    { id: 4, name: "Kalvin klein" },
    { id: 5, name: "Desigual" },
    { id: 6, name: "Fossil" },
    { id: 7, name: "Guess" }
];

class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
    }
}

function getRandomBrands(title) {
    let brandsLen = brands.length;
    let randomBrands = [];
    let brandNames = [];
    let len = Math.floor(Math.random() * brandsLen) || 1;

    for (let i=0; i < len; i++) {
        let newBrand = brands[Math.floor(Math.random() * brandsLen)];
        if (brandNames.indexOf(newBrand.name) === -1) {
            randomBrands.push(newBrand);
            brandNames.push(newBrand.name);
        }
    }
    console.log(title);
    console.log(randomBrands);

    return randomBrands
}

function getLikedBrands(id) {
    return new Promise((resolve, reject) => {
        resolve(getRandomBrands('likedBrands'));
    })
}

function getTopBrandsForGender(gender) {
    return new Promise((resolve, reject) => {
        resolve(getRandomBrands('BrandsForGender'));
    })
}

function solution(U, N) {
    const unique = (items) => [...new Set(items)];
    
    console.info('User: ', U);
    console.info('N: ', N);

    return new Promise((resolve, reject) => {
        Promise.all([getLikedBrands(U.id), getTopBrandsForGender(U.gender)]).then((results) => {
            const [likedBrands, topBrands] = results;
            if (likedBrands.length >= N) {
                return resolve(likedBrands.slice(0, N).map(item => item.name));
            }
            const combinedBrands = unique([...likedBrands, ...topBrands].map(i => i.name));
            combinedBrands.length >= N ? resolve(combinedBrands.slice(0, N)) : reject(new CustomError('Not enough data'));
        });
    })
}

solution(users[0], 3).then(status => {
    console.log(status);
})
.catch(error => { 
    console.log(error.message)
});