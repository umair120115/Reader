import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../styles/PDFList.css"; // Link the CSS file

function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPDFs();
  }, []);

  const getPDFs = async () => {
    const res = await api.get("/pdf/pdfs");
    setPdfs(res.data);
    console.log(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/pdf/${id}/delete/`);
      alert("PDF deleted successfully");
      setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
    } catch (error) {
      console.error("Failed to delete PDF:", error);
      alert("An error occurred while deleting the PDF.");
    }
  };

  return (
    <div className="pdf-list-container">
      <h1>Uploaded PDFs</h1>
      {pdfs.length > 0 ? (
        <Table striped bordered hover responsive="md" className="pdf-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>PDF Name</th>
              <th>Uploaded On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdfs.map((pdf, index) => (
              <tr key={pdf.id}>
                <td>{index + 1}</td>
                <td>{pdf.pdf_name}</td>
                <td>{pdf.added}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="open-btn"
                      onClick={() => {
                        navigate("/pdfviewer", { state: { pdf } });
                      }}
                    >
                      Open
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(pdf.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="no-data">No PDFs available. Please upload some!</p>
      )}
    </div>
  );
}

export default PDFList;
