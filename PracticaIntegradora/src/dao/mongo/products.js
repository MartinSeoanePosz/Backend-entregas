import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    thumbnail:{
        type: String,
        require: true,
    },
    code:{
        type: String,
        require: true,
        unique: true,
    },
    category:{
        type: String,
        require: true,
    },
    stock:{
        type: Number,
        require: true,
    }
});

export const productModel = mongoose.model(productCollection, productSchema);
    
