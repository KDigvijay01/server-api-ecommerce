import dotenv from "dotenv";
dotenv.config();



import Stripe from "stripe";


console.log("process.env.STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY)


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


console.log(stripe);


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
            success_url: `https://client-flipcart-clone-8g86.vercel.app/paymentSuccess`,
            cancel_url: `https://client-flipcart-clone-8g86.vercel.app/paymentFailed`,
          });
          console.log("session in payment", session);
      
          res.json({ sessionId: session.id });
      
        } catch (error) {
          console.error('Error creating Checkout session:', error);
          res.status(500).send('Error creating Checkout session');
        }
      
    }