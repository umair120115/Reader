import React from "react";
import api from "../api";
import { useState } from "react";

function ChatGpt(){
    const [message,setMessage]=useState("")
    const [response, setResponse]= useState("")


    const handleSend = async () => {
        try {
            const res = await api.post("/pdf/chatgpt/", {
                message: message,
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error communicating with the server:", error);
        }
    };


    return <>
    <div style={{ padding: "20px" }}>
            <h2>Chat with GPT</h2>
            <textarea
                rows="4"
                cols="50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <br />
            <button onClick={handleSend}>Send</button>
            <div style={{ marginTop: "20px", backgroundColor: "#f4f4f4", padding: "10px" }}>
                <strong>Response:</strong>
                <p>{response}</p>
            </div>
        </div>
    
    
    
    
    </>
}
export default ChatGpt;