import "./Loader.css";
import { useState, useEffect } from "react";

const Loader = () =>{
  const [message, setMessage] = useState('Fetching data...');

  useEffect(() => {
    const messages = ['Fetching data...', 'Setting things up...', 'Almost ready...'];
    let messageIndex = 0;

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setMessage(messages[messageIndex]);
    }, 5000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="creative-loader">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <h4>{message}</h4>
      </div>
    </>
  );
};

export default Loader;
