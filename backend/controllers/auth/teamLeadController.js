 

const express = require("express")
const mysql = require("mysql")
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser") 
const salt = 10
const app = express()
app.use(express.json())

const dotenv = require('dotenv');
dotenv.config()
app.use(cookieParser())

const muserpassword = process.env.userpassword
app.use(cors({
    origin:["http://localhost:5173/dashboard"],
    methods: ["POST","GET"],
    credentials:true
}
))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: muserpassword,
    database: 'task_master',
});

const teamLeadController = {
    // register: (req, res)=>{
    //     // const sql = "INSERT INTO  student (`name`,`email`,`password`) VALUES (?)"
    //     const sql = "INSERT INTO team_leads (`employee_id`, `name` , `email`,`password`,`department`, `designation`,`reporting_to`,`reporting_to_id`) VALUES (?)";
    //     bcrypt.hash(req.body.password.toString(), salt,(err,hash)=>{
    //         if(err) return res.json({Error:"Error for hasing password"})
    //         const values = [
    //             req.body.employee_id,
    //             req.body.name,
    //             req.body.email,
    //             hash,
    //             req.body.department,
    //             req.body.designation,
    //             req.body.reporting_to,
    //             req.body.reporting_to_id,
    //         ]
    //         db.query(sql, [values], (err, results) => {
    //             if (!err) {
    //                 return res.json(results)
    //                 res.json({Message:"data inserted"})
    //             } else {
    //                 console.log(err);
    //                 res.json({Error:`Error for inserting data`})
    //             }
    //         })
    //     })
       
    //  },
    register: (req, res) => {
        const sql = "INSERT INTO team_leads (`employee_id`, `name`,`profile_pic`, `email`, `password`, `department`, `designation`, `reporting_to`, `reporting_to_id`) VALUES (?)";
        
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) return res.json({ Error: "Error hashing password" });
    
            const values = [
                req.body.employee_id,
                req.body.name,
                req.body.profile_pic,
                req.body.email,
                hash,
                req.body.department,
                req.body.designation,
                req.body.reporting_to,
                req.body.reporting_to_id,
            ];
    
            db.query(sql, [values], (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        // Handle duplicate entry error
                        return res.json({ Error: "Employee ID already exists" });
                    } else {
                        console.log(err);
                        return res.json({ Error: "Error inserting data" });
                    }
                } else {
                    return res.json({ Message: "Data inserted successfully", results });
                }
            });
        });
    },
    
    

    login: (req, res)=>{
        const sql = "SELECT * FROM  team_leads WHERE email =? "
        db.query(sql, [req.body.email], (err, data) => {
            if (err) return res.json({ Error: "Error in server " })
            if (data.length > 0) {
                bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                    if (err) return res.json({ Error: "Password compare Error " })
                    if (response) {
                        const employee_id = data[0].employee_id;
                        const name = data[0].name;
                        const email = data[0].email;
                        const department = data[0].department;
                        const reporting_to = data[0].reporting_to;
                        const reporting_to_id = data[0].reporting_to_id;
                        const designation = data[0].designation;
                        const profile_pic = data[0].profile_pic
                        const token = jwt.sign({ employee_id,name , email,department,reporting_to,reporting_to_id ,profile_pic}, "jwt-secret-key", { expiresIn: '1d' });
                        res.cookie("token", token)

                        return res.json({ Status: `Success`, token:token , name:name,email:email,employee_id:employee_id 
                         ,department:department,reporting_to:reporting_to,reporting_to_id:reporting_to_id , designation:designation , profile:profile_pic })
                    } else {
                        return res.json({ Error: "Password not match" })
                    }
                })
            } else {
                // No user found with the provided email
                return res.json({ Error: "No user found with the provided email" });
            }
        })
    }, 
    showdata: (req, res) => {
        const sql = 'SELECT * FROM  team_leads';
        db.query(sql, (err, results) => {
            if (!err) {
                return res.json(results)
            } else {
                console.log(err);
            }
        })
    },

    userverify: (req,res)=>{
        return res.json({Status:"Success", name:req.name , name:req.email})
    },
   logout:(req, res)=>{
        res.clearCookie('token');
        return res.json({Status: "Success"})
    }

    
    

    
   


}

module.exports = teamLeadController