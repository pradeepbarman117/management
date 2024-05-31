const express = require("express") 
const cors = require('cors')
const jwt = require("jsonwebtoken") 
const cookieParser = require("cookie-parser") 
const app = express() 

const dotenv = require('dotenv');
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const port = process.env.portNumber || 8000


app.use(cors({
    // origin:["http://localhost:3000"],   //frontend url 
    origin:["http://localhost:5173/dashboard"],
    methods: ["POST","GET"],
    credentials:true,
}
))



// for Auth user verify with token
const verifyUser = (req, res , next) =>{
  const token = req.cookies.token;
  if(!token){
      return res.json({Error:"You are not authorised"})
  }
  else{
      jwt.verify(token, "jwt-secret-key", (err, decoded)=>{
          if(err){
               return res.json({Error:"Token is not okey"})}
          else{
               req.name = decoded.name;
               req.email = decoded.email;
               res.header('Access-Control-Allow-Credentials', true);
               next()
          }
      })
}
}

const auth = require("./routes/auth/auth")
app.get('/', verifyUser, (req,res)=>{
  return res.json({Status:"Success", name:req.name,email:req.email})
})


app.get('/work', (req, res) => {
  res.send('App is working..')
})

app.use(auth)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})