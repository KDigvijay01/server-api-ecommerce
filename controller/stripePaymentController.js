import dotenv from "dotenv";

import Stripe from "stripe";
dotenv.config();


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);





export const addStripePaymentGateway=async(req, res)=>{
        try {
          const {products} = req.body;
          const lineItems=products.map(product=>
              {
                  return {
                  price_data:{
                      currency: "inr",
                      product_data:{
                          name: product.title.longTitle,
                          images:[product.url]
                      },
                      unit_amount: Math.round(product.price.cost)*100
                  },
                  quantity: product.quantity
              }
              })
      
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [...lineItems],
            mode: 'payment',
            success_url: `${window.location.origin}`,
            cancel_url: `${window.location.origin}`,
          });
          console.log("session in payment", session);
      
          res.json({ sessionId: session.id });
      
        } catch (error) {
          console.error('Error creating Checkout session:', error);
          res.status(500).send('Error creating Checkout session');
        }
      
    }