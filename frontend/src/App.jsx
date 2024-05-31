import './App.css'
import Admin from './admin/Admin';
import Navbar from './components/common/header/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginSuccess from './admin/components/common/login/LoginSuccess'
// import Login from './admin/components/common/login/Login';
import EditRowDialog from './admin/components/dailyprojectstatus/editrowdialog/EditRowDialog';
import AuthLogin from './admin/authentication/authLogin';
import AuthSignin from './admin/authentication/authSignin';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='/dashboard' element={<Admin/>} />
          <Route path='/dashboard/update/:id' element={<EditRowDialog/>} />
          <Route path='/admin' element={<AuthLogin/>} />
          <Route path='/admin-signin' element={<AuthSignin/>} />
  
        </Routes>
      </Router>

      
    </>
  )
}

export default App
