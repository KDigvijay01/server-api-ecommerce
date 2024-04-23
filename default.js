
import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";


const DefaultData=async()=>{
    try{
         const products = await Product.find({}); // Find all documents to delete
        for (const product of products) {
            await product.deleteOne(); // Delete each document individually
        }
        await Product.insertMany(products);
        
        console.log("Data, imported successfully");
    }
    catch(err){
        console.log("Error while inserting default data", err);
    }

}

export default DefaultData;
