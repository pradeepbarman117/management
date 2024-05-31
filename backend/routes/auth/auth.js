

const Router = require('express').Router();
const teamLeadController = require('../../controllers/auth/teamLeadController')
const authControlllers  = require('../../controllers/auth/authControlllers')
const empControllers  = require('../../controllers/auth/empControllers')
// to edit data
Router.post('/auth/login',authControlllers.login)
Router.post('/auth/signup',authControlllers.signup) 

// to show data
Router.get('/auth/emplogin',empControllers.emplogin) 

// to add data
Router.post('/auth/empsignup',empControllers.empsignup) 

// for delete data
Router.delete('/auth/empdelete/:id',empControllers.empdelete) 

// to edit data
Router.put('/auth/editempdet/:id',empControllers.editemployeedetails) 

// to edit data
Router.post('/auth/loademployeedetails',empControllers.loademployeedetails) 



// Auth user with token checking 
Router.post('/auth_register',teamLeadController.register) 
Router.post('/auth_login',teamLeadController.login)
Router.get('/showdata',teamLeadController.showdata)
// Router.get('/',verifyUser,teamLeadController.userverify)team_leads
Router.get('/auth_logout',teamLeadController.logout)
 







module.exports = Router   

