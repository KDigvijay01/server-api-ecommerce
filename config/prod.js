
let prodObject= {
    USERNAME:process.env.DB_USERNAME,
    PASSWORD:process.env.DB_PASSWORD,
    MERCHANT_KEY:process.env.PAYTM_MERCHANT_KEY,
    MID:process.env.PAYTM_MID,
    WEBSITE:process.env.PAYTM_WEBSITE,
    CHANNELID:process.env.PAYTM_CHANNEL_ID,
    INDUSTRY_TYPE_ID:process.env.PAYTM_INDUSTRY_TYPE_ID,
    CUST_ID:process.env.PAYTM_CUST_ID,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
}

export default {...prodObject}