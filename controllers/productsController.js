import Products from "../models/products.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
    // Products.find().then((data)=>{
    //     res.json(data)
    // })
    // .catch(()=>{
    //     res.json({
    //         message:"Failed to fetch products"
    //     })
    // })

    try {
        if(isAdmin(req)){
            const products = await Products.find()
        res.json(products)

        }else{
            const products = await Products.find({isAvailable:true})
            res.json(products)
        } } 
        catch (err) {
        res.json({
            message: "Failed to get products",
            error: err
        })
    }
}
export function saveProducts(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to add products"
        })
        return
    }

    const products = new Products(
        req.body
    );

    products.save().then(() => {
        res.json({
            message: "Products added successfully"
        })
    }).catch(() => {
        res.json({
            message: "Failed to add products"
        })
    })
}

export async function deleteProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to delete products"
        })
        return
    }
    try{
        await Products.deleteOne({ productId: req.params.productId })
        res.json({
            message: "Product deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete product",
            error: err
        })
    }
}

