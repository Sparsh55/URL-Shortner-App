import { Link } from "react-router-dom";
import "./AboutThisApp.css";

const AboutThisApp = () => {
  return (
    <div className="about-url-shortener">
      <div className="about-content">
        <h1 className="title">About URL Shortener</h1>
        <p className="description">
          Welcome to our URL Shortener app! Simplify your long and unwieldy URLs
          into short, manageable links that are easy to share.
        </p>
        <p className="features">
          <strong>Features:</strong>
          <ul>
            <li>Shorten long URLs effortlessly</li>
            <li>Track link clicks and analytics</li>
            <li>Manage and organize your shortened URLs</li>
            <li>Customize your short links</li>
            <li>Secure and reliable service</li>
          </ul>
          <Link to="/">
            <button className="get-started-btn3">Back to Home</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AboutThisApp;
