import { paytmMerchantKey, paytmParams } from "../index.js";
import PaytmChecksum from "../paytm/PaytmChecksum.js";
import formidable from "formidable";
import https from "https";

export const addPaymentGateway=async(request, response)=>{
    try{
        let paytmCheckSum=await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
        
        let params={
            ...paytmParams, 'CHECKSUMHASH': paytmCheckSum
        }
        return response.status(200).json(params);
    }
    catch(err){
        console.error("Error in paytm checksum", err)
        return response.status(500).json({error: err.message});
    }

}


export const paymentResponse=(request, response) => {
    let form = new formidable.IncomingForm();

        let paytmCheckSum=request.body.CHECKSUMHASH;

        delete request.body.CHECKSUMHASH;

        let isVerifySigmature=PaytmChecksum.verifySignature(request.body, paytmMerchantKey, paytmCheckSum)
        
        if(isVerifySigmature){

            let paytmParams={};

            paytmParams["MID"]=request.MID;

            paytmParams["ORDERID"]=request.ORDERID;

            PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey).then(function(checksum){
                paytmParams["CHECKSUMHASH"]=checksum;
                let post_data= JSON.stringify(paytmParams);

                let options={
                    hostname: "securegw-stage.paytm.in",
                    port: 443,
                    path: '/order/status',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                }

                let res="";
                let post_req= https.request(options, function(post_req){
                    post_req.on('data', function(chunk){
                        res+=chunk;
                    });

                    post_req.on('end', function(){
                        let result= JSON.parse(res);
                        response.redirect(`http://localhost:3000/`);
                    })
                })

                post_req.write(post_data);
                post_req.end();


            })
        }
        else{
            console.log("Chcksum mismatch");
        }
}




// export const paymentResponse = (request, response) => {

//     const form = new formidable.IncomingForm();
//     const paytmCheckSum = request.body.CHECKSUMHASH;
//     delete request.body.CHECKSUMHASH;

//     const isVerifySignature = paytmchecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
//     if (isVerifySignature) {
//         let paytmParams = {};
//         paytmParams["MID"] = request.body.MID;
//         paytmParams["ORDERID"] = request.body.ORDERID;

//         paytmchecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

//             paytmParams["CHECKSUMHASH"] = checksum;

//             const post_data = JSON.stringify(paytmParams);

//             const options = {
//                 hostname: 'securegw-stage.paytm.in',
//                 port: 443,
//                 path: '/order/status',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Content-Length': post_data.length
//                 }
//             };

//             let res = "";
//             const post_req = https.request(options, function (post_res) {
//                 post_res.on('data', function (chunk) {
//                     res += chunk;
//                 });

//                 post_res.on('end', function () {
//                     let result = JSON.parse(res);
//                     console.log(result);
//                     response.redirect(`http://localhost:3000/`)
//                 });
//             });
//             post_req.write(post_data);
//             post_req.end();
//         });
//     } else {
//         console.log("Checksum Mismatched");
//     }
// }