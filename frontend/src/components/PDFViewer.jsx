// import Navbar from "./Navbar";
// import React from "react";
// import { Document, Page } from "react-pdf";
// import { pdfjs } from "react-pdf";
// import { useLocation } from "react-router-dom";
// import { useState,useEffect } from "react";
// import "../styles/PDFViewer.css";
// import ChatGpt from "./ChatGPT";
// import api from "../api";
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';
// // Correctly set the worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `node_modules/pdfjs-dist/build/pdf.worker.min.mjs`;


// function PDFViewer() {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const location = useLocation();
//     const { pdf } = location.state || {};
//     const fileUrl = pdf.pdf
//     const pdf_id= pdf.id
  
//     // This function handles when the document is loaded and sets the total number of pages
//     const onDocumentLoadSuccess = ({ numPages }) => {
//       setNumPages(numPages);
//     };


//     const [notes,setNotes]=useState("")
//     const [prevnotes,setprevNotes]=useState([])
//     useEffect(
//         ()=>{
//             getNotes();
//         },[JSON.stringify(prevnotes)]
//     );
//     const makeNotes = async()=>{
//         const res= await api.post(`/pdf/${pdf_id}/notes/`,{notes:notes}).then(
//             (res)=>{
//                 alert('Notes Created');
//             }
//         )
//     }

//     const getNotes = async()=>{
//         const res = await api.get(`/pdf/${pdf_id}/note/`).then(
//             (res)=>{
//                 setprevNotes(res.data);
                
//             }
//         )
//     }

//   return (
//     <>
//       <Navbar />
//       <ChatGpt/>
//       <div className="notes-making-container">
//     <form action="" onSubmit={makeNotes}>
//         <input type="text" placeholder="enter note" value={notes} onChange={(e)=>setNotes(e.target.value)} />
//         <button type="submit">Create</button>
//         </form>
//     </div>

//     <div className="prevnotes-container">
//         {prevnotes.map((prevnote)=>{

//         const date= JSON.stringify(prevnote.timing)
//         let Date= date.substring(1,11)
//         let time= date.substring(12,20)

            

//             return<>
//             <li key={prevnote.id}><strong>{Date} at {time}</strong>: <p>{prevnote.notes}</p></li>
            
//             </>
//         })}
//     </div>
//       <div className="file-container">
//       <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>

//       <div>
//         <button
//           disabled={pageNumber <= 1}
//           onClick={() => setPageNumber(pageNumber - 1)}
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageNumber} of {numPages}
//         </span>
//         <button
//           disabled={pageNumber >= numPages}
//           onClick={() => setPageNumber(pageNumber + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//     <div className="file-notes">
//         <input type="textArea" />
//     </div>
//     </>
//   );
// }

// export default PDFViewer;
