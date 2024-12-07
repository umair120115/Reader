import Navbar from "./Navbar";
import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/NewPDFViewer.css";
import ChatGpt from "./ChatGPT";
import api from "../api";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Correctly set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `node_modules/pdfjs-dist/build/pdf.worker.min.mjs`;

function NewPDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const { pdf } = location.state || {};
  const fileUrl = pdf.pdf;
  const pdf_id = pdf.id;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const [notes, setNotes] = useState("");
  const [prevnotes, setPrevNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, [JSON.stringify(prevnotes)]);

  const makeNotes = async (e) => {
    e.preventDefault();
    const res = await api.post(`/pdf/${pdf_id}/notes/`, { notes: notes }).then(() => {
      alert("Notes Created");
      setNotes(""); // Clear the input after note creation
      getNotes(); // Refresh the notes list
    });
  };

  const getNotes = async () => {
    const res = await api.get(`/pdf/${pdf_id}/note/`).then((res) => {
      setPrevNotes(res.data);
    });
  };
  

  return (
    <>
      <Navbar />
      <div className="viewer-container">
        {/* PDF Viewer Section */}
        <div className="pdf-viewer">
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>

          <div className="navigation-buttons">
            <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
              Next
            </button>
          </div>
        </div>

        {/* ChatGPT and Notes Section */}
        <div className="chat-notes-container">
          <ChatGpt />

          <div className="notes-making-container">
            <form onSubmit={makeNotes}>
              <input
                type="text"
                placeholder="Enter note"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button type="submit">Create</button>
            </form>
          </div>

          <div className="prevnotes-container">
            {prevnotes.map((prevnote) => {
              const date = JSON.stringify(prevnote.timing);
              const formattedDate = date.substring(1, 11);
              const time = date.substring(12, 20);

              return (
                <li key={prevnote.id}>
                  <strong>
                    {formattedDate} at {time}
                  </strong>
                  : <p>{prevnote.notes}</p>
                  <button onClick={()=>{ const res=api.delete(`pdf/${prevnote.id}/pdfnote/`) }}>Delete</button>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPDFViewer;
