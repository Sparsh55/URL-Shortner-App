import "./GoogleLogin.css";

const GoogleLoginButton = () => {
  function setCookie(name, value, days = 0) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      stringValue
    )}${expires}; path=/`;
  }
  const handleGoogleLogin = () => {
    // Open Google Login in a new window
    const googleLoginWindow = window.open(
      "http://localhost:5600/api/auth/google", // Backend endpoint
      "_blank",
      "width=500,height=600"
    );

    // Poll the new window for a user response
    // const pollTimer = setInterval(async () => {
    //     try {
    //         if (googleLoginWindow.closed) {
    //             clearInterval(pollTimer);

    //             // Fetch user data from the backend if the login was successful
    //             const response = await axios.get('http://localhost:5600/api/auth/google/callback', { withCredentials: true });
    //             if (response.data.success) {
    //                 // setUser(response.data.user);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         clearInterval(pollTimer);
    //     }
    // }, 1000)
    window.addEventListener("message", (event) => {
      // Ensure the message is from the expected source
      if (event.origin === "http://localhost:5600") {
        setCookie("userUrl", event.data, 4);
        // setUser(event.data); // Update user data
        googleLoginWindow.close(); // Close the popup window (as a fallback)
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      {" "}
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#4285F4",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#357AE8")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4285F4")}
      >
        
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
