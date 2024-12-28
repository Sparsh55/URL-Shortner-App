import  { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
// import GoogleLoginButton from './GoogleLoginButton';


const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.landing-page').classList.add('fade-in');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <video src="../../1321208-uhd_3840_2160_30fps.mp4" autoPlay loop muted id='backgroundvideo'></video>
      <div className="intro-text">
        <h1>
          <Typewriter
            options={{
              strings: ['Welcome to URL Shortener!', 'Simplify your links','Rid off Long Complex URLs'],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <h3>
          Transform your long URLs into short, manageable links.
        </h3>
      
        <button
          onClick={() => navigate('/dashboard')}
          className="get-started-btn"
        >
          Get Started Now!
        </button>
        <button
          onClick={() => navigate('/about')}
          className="get-started-btn"
          style={{ marginLeft: '30px' }}
        >
          Connect with Me!
        </button>
        <button
          onClick={() => navigate('/aboutthisapp')}
          className="get-started-btn"
          style={{ marginLeft: '30px' }}
        >
          About This App!
        </button>
        {/* <GoogleLoginButton /> */}
      </div>
    </div>
  );
};

export default LandingPage;
