import {faker} from '@faker-js/faker';


export const listOfProducts = () => {
    const numOfProducts = 100;
    const products = [];
    for(let i = 0; i < numOfProducts; i++){
        products.push(generateProducts());
    }
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: Math.floor(Math.random() * 100),
        role: faker.datatype.boolean() ? "admin" : "user",
        products: products
    };
}


export const generateProducts = () => {
    return{
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        code: faker.commerce.isbn(),
        stock: Math.floor(Math.random() * 100),
        id: faker.database.mongodbObjectId()
    }
}
// console.log(listOfProducts());