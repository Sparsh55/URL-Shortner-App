import { Link } from "react-router-dom";
import "./AboutMe.css"; 

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <img
          src="./../../naukridp.jpeg"
          alt="Profile"
          className="profile-pic"
        />
        <h1 className="name">Sparsh Saxena</h1>
        <p className="description">
          Hi, I'm Sparsh Saxena! I'm a passionate full-stack developer with a
          progressive overall 3 years of experince in mern stack development.
        </p>
        <p>
          My Website:-{" "}
          <Link to="https://personal-portfolio-r2t6.onrender.com/">
            https://personal-portfolio-r2t6.onrender.com
          </Link>
        </p>
        <p>Mobile:-9068393605</p>
        <p>Email:-sparshsaxena9654@gmail.com</p>
        <Link to="/">
          <button className="get-started-btn2">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default AboutMe;
