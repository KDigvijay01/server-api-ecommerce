import * as prodObject from "./prod.js";
import * as devObj from "./dev.js";

let defaultObj;
if(process.env.NODE_ENV=='production'){
    // module.exports = require('./prod.js')
    defaultObj=prodObject;

 }else{
    defaultObj=devObj;
 }

 export default {...defaultObj};