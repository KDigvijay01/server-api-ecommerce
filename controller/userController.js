import User from "../model/user-schema.js";




export const userSignup=async(request, response) => {
    try{
        // console.log("request.body", request.body);
        const exist=await User.findOne({username: request.body.username});
        if(exist){
            return response.status(401).json({message: "Username already exist"});
        }

        const user= request.body;
        const newUser= new User(user);
        await newUser.save();

        response.status(200).json({message: user});
    }
    catch(err){
        console.error("Error ", err)
    }
    

};


export const userLogin=async(request, response) => {
    try{
        // console.log("request.body", request.body);
        // const exist=await User.findOne({username: request.body.username});
        const username= request.body.username;
        const password= request.body.password;
        
        let user=await User.findOne({username: username, password: password});
       
        if(user){
            // {message: "Username already exist"}
            return response.status(200).json({data: user});
        }
        else{
            return response.status(401).json(`invalid login`);
        }
    }
    catch(err){
        console.error("Error ", err)
        return response.status(500).json(`Error `, err.message);
    }
    

};