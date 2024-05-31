const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const mysql = require('mysql')


dotenv.config()
const muserpassword = process.env.userpassword

// db conection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: muserpassword,
    database: 'task_central'
})


const authControllers = {
    
    login:(req, res) => {
        const sql =  "INSERT INTO team_leads (`email` ,`password`) VALUES (?)"; 
        const { email, password } = req.body;
         db.query('SELECT * FROM team_leads WHERE email = ? AND password = ?', [email, password], (err, result) => {
             const user = result[0];
             console.log(user)
             if (err) {
             res.status(500).json({ message: 'Internal server error' });
             } else if (result.length === 0) {
             res.status(401).json({ message: 'Invalid username or password' });
             } else {
             
             // const token = jwt.sign({ id: user.ID, username: user.Name });
             res.status(200).json({ message: 'Login successful' });
             // console.log("User : ",user.Name);
             }
         })

     // console.log(res.json({mesaage: 'User already logged in'}));
 } ,

    signup: (req, res) => {
        const sql = "INSERT INTO team_leads (`employee_id`, `name` ,`email` , `department`, `designation`, `reporting_to`) VALUES (?)";
        const values = [
            req.body.employee_id,
            req.body.name,
            req.body.email,
            req.body.department,
            req.body.designation,
            req.body.reporting_to,
        ]
        db.query(sql, [values], (err, results) => {
            if (!err) {
                return res.json(results)
            } else {
                console.log(err);
            }
        })
    },
}

module.exports = authControllers