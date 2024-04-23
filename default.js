
import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";


const DefaultData=async()=>{
    try{
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Data, imported successfully");

    }
    catch(err){
        console.log("Error while inserting default data", err);
    }

}

export default DefaultData;