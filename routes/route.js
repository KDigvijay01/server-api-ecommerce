import express from "express";
import { userLogin, userSignup } from "../controller/userController.js";
import { getProductById, getProducts } from "../controller/productController.js";
// import { addPaymentGateway, paymentResponse} from "../controller/paymentController.js";
import { addStripePaymentGateway } from "../controller/stripePaymentController.js";


// 
const router= express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
// router.post("/payment", addStripePaymentGateway);

// Define a route to handle the creation of a Checkout session
router.post('/payment', addStripePaymentGateway);


export default router;
