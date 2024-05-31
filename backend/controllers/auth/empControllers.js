const dotenv = require('dotenv');
const mysql = require('mysql')

dotenv.config()
const muserpassword = process.env.userpassword


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: muserpassword,
    database: 'task_central',
});

const empControllers = {
    emplogin: (req, res) => {
        const sql = 'SELECT * FROM  employees';
        db.query(sql, (err, results) => {
            if (!err) {
                return res.json(results)
            } else {
                console.log(err);
            }
        })
    },

    empsignup: (req, res) => {
        const sql = "INSERT INTO employees (`employees_id`, `employees_name` ,`employees_start_date` , `employees_end_date`, `employees_task`, `employees_status`,`employees_priority`,`employees_description`,`employees_reported_to`,`employees_reported_to_id`,`employees_remark`,`assign_date`) VALUES (?)";
        const values = [
            req.body.employees_id,
            req.body.employees_name,
            req.body.employees_start_date,
            req.body.employees_end_date,
            req.body.employees_task,
            req.body.employees_status,
            req.body.employees_priority,
            req.body.employees_description,
            req.body.employees_reported_to,
            req.body.employees_reported_to_id,
            req.body.employees_remark,
            req.body.assign_date
        ]
        db.query(sql, [values], (err, results) => {
            if (!err) {
                return res.json(results)
            } else {
                console.log(err);
            }
        })
    },

    empdelete:(req, res) => {
        const sql =  "DELETE FROM employees WHERE id = ?"; 
            const id = req.params.id;
            db.query(sql, [id], (err, results) => {
            if (!err) {
                return res.json(results)
            } else {
                console.log(err);
            }
        })
    },

    editemployeedetails: (req, res) => {
        const sql = "UPDATE employees set `employees_id` = ?, `employees_name` = ?, `employees_start_date` = ?, `employees_end_date` = ?, `employees_task` = ?, `employees_status` = ?, `employees_priority` = ?, `employees_description` = ?, `employees_reported_to` = ?, `employees_reported_to_id` = ?, `employees_remark` = ? , `assign_date`=? WHERE id = ?";
        const id = req.params.id;
        const values = [
            req.body.employees_id,
            req.body.employees_name,
            req.body.employees_start_date,
            req.body.employees_end_date,
            req.body.employees_task,
            req.body.employees_status,
            req.body.employees_priority,
            req.body.employees_description,
            req.body.employees_reported_to,
            req.body.employees_reported_to_id,
            req.body.employees_remark,
            req.body.assign_date
        ];
       
        db.query(sql, [...values, id], (err, results) => {
            if (!err) {
                return res.json(results);
            } else {
                console.log(err);
                return res.status(500).json({ error: 'Database query failed' });
            }
        });
    },

   loademployeedetails:(req, res) => {
        const sql =  "INSERT INTO employees (`id`) VALUES (?)"; 
        const {id } = req.body;
         db.query('SELECT * FROM employees WHERE id = ?', [id], (err, result) => {
             const user = result[0];
             // console.log(user)
             if (err) {
             res.status(500).json({ message: 'Internal server error' });
             } else if (result.length === 0) {
             res.status(401).json({ message: 'Invalid id' });
             } else {
             res.status(200).json({ 
                // employees_name:`${user.employees_name}`,
                // employees_task: `${user.employees_task}`,
                employees_id: `${user.employees_id}`,
                employees_name: `${user.employees_name}`,
                employees_start_date:`${user.employees_start_date}`,
                employees_end_date:`${user.employees_end_date}`,
                employees_task:`${user.employees_task}`,
                employees_status:`${user.employees_status}`,
                employees_priority:`${user.employees_priority}`,
                employees_description:`${user.employees_description}`,
                employees_reported_to:`${user.employees_reported_to}`,
                employees_reported_to_id:`${user.employees_reported_to_id}`,
                employees_remark:`${user.employees_remark}`,

            });
             }
         })
    }
    
   


}

module.exports = empControllers