import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from "./components/loginPage";
import RegisterForm from "./components/registerPage";
import HomePage from "./pages/HomePage";
import UploadPDF from "./components/PDFUpload";
import 'bootstrap/dist/css/bootstrap.min.css';
// import PDFViewer from "./components/PDFViewer";
import NewPDFViewer from "./components/NewPDFViewer";

function App() {
  function Logout(){
    localStorage.clear()
    return <Navigate to="/login"/>
  }
  function RegisterAndLogout() {
    localStorage.clear()
    return <RegisterForm />
  }
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/register" element={<RegisterAndLogout/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
      <Route path="/upload" element={<ProtectedRoute><UploadPDF/></ProtectedRoute>}/>
      <Route path="/pdfviewer" element={<ProtectedRoute><NewPDFViewer/></ProtectedRoute>}/>
      



    </Routes>
    
    
    
    
    </BrowserRouter>
    
  )
}

export default App
