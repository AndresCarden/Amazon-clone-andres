const express = require("express");
const adminRouter = express.Router();
const admin =require("../middlewares/admin");
const {Product} = require("../models/product");
const Order = require("../models/order");


//agregar productos metodo post
adminRouter.post("/admin/add-product", admin,async(req, res)=>{

    try{
        const {name, description, images,cantidad,precio, category}=req.body;
       
        let product = Product({
      
                name,
                description,
                images,
                cantidad,
                precio,
                category
            });

        product = await product.save();
        res.json(product);

    }catch(e){
        res.status(500).json({error:e.message});
    }


});



//get de productos traer productos para alistar
adminRouter.get("/admin/get-products", admin, async(req, res)=>{
try{

    const product = await Product.find({});
    res.json(product);
   }catch(e){
     res.status(500).json({error:e.message});
   }
});

//delete && eliminar productos
adminRouter.post("/admin/delete-product", admin, async(req, res)=>{
try {
    const {id} = req.body;
    let product = await Product.findByIdAndDelete(id);
    res.json(product);
} catch (e) {
    res.status(500).json({error:e.message});
}

});


//traer lista de orden
adminRouter.get("/admin/get-orders", admin, async(req, res)=>{

    try {
        const orders = await Order.find({});
        res.json(orders);
        
    } catch (e) {
        res.status(500).json({error:e.message});
        
    }});


//status  de orden
adminRouter.post("/admin/change-order-status", admin, async(req,res)=>{

try {
    const{id, status} = req.body;
    let order = await Order.findById(id);
    order.status = status;
    order = await order.save();
    req.json(order);
    
} catch (e) {
    res.status(500).json({error:e.message});

    
}

});



adminRouter.get("/admin/analytics", admin, async(req, res)=>{

    try {
        const orders = await Order.find({});
        let totalVentas =0;
        for(let i=0; i<orders.length;i++){
            for(let j=0;j<orders[i].products.length;j++){
             totalVentas += orders[i].products[j].cantidad * orders[i].products[j].product.precio;
            }
        }

        //tipo de categoria 
        let MobileEarning = await fetchCategoryWiseProduct("Mobile");
        let EssentialsEarning = await fetchCategoryWiseProduct("Essentials");
        let AplicacionEarning = await fetchCategoryWiseProduct("Aplicacion");
        let LibrosEarning = await fetchCategoryWiseProduct("Libros");
        let FashionEarning = await fetchCategoryWiseProduct("Fashion");

        let earnings = {
            totalVentas,
            MobileEarning,
            EssentialsEarning,
            AplicacionEarning,
            LibrosEarning,
            FashionEarning,
        };

        res.json(earnings);

    } catch (e) {
        res.status(500).json({error:e.message});
        
    }

});

async function fetchCategoryWiseProduct(category){
let earning = 0;
let categoryOrdes = await Order.find({
    "products.product.category":category,
});

for(let i=0; i<categoryOrdes.length;i++){
    for(let j=0;j<categoryOrdes[i].products.length;j++){
     earning += categoryOrdes[i].products[j].cantidad * categoryOrdes[i].products[j].product.precio;
    }
}

return earning;


}


module.exports = adminRouter;