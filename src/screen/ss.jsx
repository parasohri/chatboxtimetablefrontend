import React, { useState, useEffect } from "react";
import { apiClient } from "../../axios/axios.js";

const MessageUI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        if (prompt) {
            fetchAIResponse();
        }
    }, [prompt]);

    const fetchAIResponse = async () => {
        try {
            const response = await apiClient.post(`/ai/process?da=${prompt}`);
            console.log(response.data);
            const rr = JSON.parse(response.data);

            setMessages((prevMessages) => [...prevMessages, { sender: "ai", text: response.data }]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    const handleSend = () => {
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
            setPrompt(input);
            setInput("");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ ...styles.message, ...styles[msg.sender] }}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend} style={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
    },
    message: {
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        maxWidth: '60%',
    },
    user: {
        backgroundColor: 'white',
        color: 'black',
        alignSelf: 'flex-start',
    },
    ai: {
        backgroundColor: 'white',
        color: 'black',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    sendButton: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
    },
};

const App = () => {
    return (<>
        <MessageUI />
        made by PARAS OHRI
        </>
    );
};

export default App;
