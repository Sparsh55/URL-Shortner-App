import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        <span role="img" aria-label="MER">
          and 👨‍💻
        </span>{" "}
        MERN(Mongodb,Express,React & Node) stack, Developed by Sparsh Saxena
      </p>
      <p style={{ marginTop: "-3px" }}>
        Copyright &copy; 2024, All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
