var express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
app.get('/api',function(req,res){
    res.json({
        text:'my api!'
    });
});
app.post('/api/login',function(req,res){
    //auth user
    const user={id: 3,name:'anu'};
    
    const token = jwt.sign({ user },"my_secret_key",{expiresIn:60});
    res.json({
        token: token
    
    });
});
app.get('/api/protected',verifyToken,function(req,res)
{
   //jwt.verify(req.token,'my_secret_key',function(err,data){
//if(err){
   // res.sendStatus(403);
//}else {
   // res.send("sucess")
  // res.send(decoded);
})
   // });
//});
//middleware
function verifyToken(req,res,next){

let authHeader = req.headers.authorization;

if(authHeader==undefined){

res.status(401).send({error:"no token provided"})

}
let token = authHeader.split(" ")[1]
jwt.verify(token,"my_secret_key",function(err,decode)
{
    if(err){

        res.status(500).send({error:"authentication failed"})

    }
    else {

        //next();
       res.send(decode);
    }
}
)

}



// function ensureToken(req,res,next){
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !=='undefined'){
//         const bearer = bearerHeader.split;
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     }else{
//         res.sendStatus(403)
//     }
// }
app.listen(8080,function(){
console.log('app listening on port 8080!');

});
    

