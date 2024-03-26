import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import CreateUsers from './components/CreateUsers';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';
import Profile from './components/Profile';
import CreateVehicle from './components/CreateVehicle';
import CreateService from './components/CreateService';
import GenerateReceipt from './components/GenerateReceipt';
import ReceiptViewer from './components/ReceiptViewer';
import ReceiptList from './components/ReceiptList';
import LogoUpload from './components/LogoUpload';
import AddSignature from './components/AddSignature';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/createuser" element={<CreateUser/>} />
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/createusers" element={<CreateUsers/>}/>
        <Route path="/createvehicles" element={<CreateVehicle/>}/>
        <Route path="/createservices" element={<CreateService/>}/>
        <Route path="/generatereceipt" element={<GenerateReceipt/>}/>
        <Route path="/receiptviewer/:receiptId" element={<ReceiptViewer/>}/>
        <Route path="/receiptlist" element={<ReceiptList/>}/>
        <Route path="/logo" element={<LogoUpload/>}/>
        <Route path="/signature" element={<AddSignature/>}/>
      </Routes>



    </Router>
  );
}

export default App;
