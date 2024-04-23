
import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";


async function deleteDocumentById(id) {
    try {
        const deletedDocument = await Product.findByIdAndDelete(id);
        if (deletedDocument) {
            console.log(`Document with ID ${id} deleted successfully.`);
        } else {
            console.log(`No document found with ID ${id}.`);
        }
    } catch (error) {
        console.error("Error while deleting document:", error);
    }
}



const DefaultData=async()=>{
    try{
        const productsArray = await Product.find({}); // Find all documents to delete
        // for (const product of products) {
        //     await product.deleteOne(); // Delete each document individually
        // }
        if(productsArray.length){
             for (const product of productsArray) {
                    await deleteDocumentById(product._id);
        } 
        }

        await Product.insertMany(products);
        
        console.log("Data, imported successfully");
    }
    catch(err){
        console.log("Error while inserting default data", err);
    }

}

export default DefaultData;
