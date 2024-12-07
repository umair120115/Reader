import { useState } from "react";
import api from "../api";
import Navbar from "./Navbar";
import '../styles/UploadForm.css'


function UploadPDF(){
    const [pdf, setPDF]=useState(null)
    const [pdf_name,setPdf_name]=useState('')

    const handlePDFSubmit =async(e)=>{
        e.preventDefault();
        // Create a FormData object
        const formData = new FormData();
        formData.append("pdf_name", pdf_name); // Add the file name
        formData.append("pdf", pdf);
        const res= await api.post('/pdf/pdfs/',formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((res)=>{
            if(res.status===201){
                alert('pdf uploaded successfully');
            }
            else{
                alert('Something went wrong');
            }
        })
    }
    return <>
    <Navbar/>
    <div className="form-container">
        <form onSubmit={handlePDFSubmit}>
          <h1>Upload Your PDF</h1>
          <div className="input-group">
            <label>File Name</label>
            <input
              type="text"
              placeholder="Enter a name for the file"
              value={pdf_name}
              onChange={(e) => setPdf_name(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPDF(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>
    </>
}
export default UploadPDF;