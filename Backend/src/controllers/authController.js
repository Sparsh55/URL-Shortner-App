import { OAuth2Client } from 'google-auth-library';
import User from '../models/Users.js';
import '../../env.js';
import axios from "axios";
import jwt from "jsonwebtoken";

const REDIRECT_URI = process.env.BASE_URL+"/auth/google/callback"

export const googleLogin = async (req, res) => {
  // const { token } = req.body;
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
    console.log("hello world")  
  res.redirect(googleAuthURL);

  // try {
  //   const ticket = await client.verifyIdToken({
  //     idToken: token,
  //     audience: process.env.GOOGLE_CLIENT_ID,
  //   });

  //   const payload = ticket.getPayload();
  //   const { email, sub: googleId } = payload;

  

  //   const jwtToken = user.generateAuthToken();
  //   res.json({ jwtToken });
  // } catch (error) {
  //   console.error('Error during Google login:', error);
  //   res.status(500).send('Internal server error');
  // }
};

export const googleCallback = async(req,res)=>{
  const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'No authorization code provided' });
    }

    try {
        // Exchange the authorization code for tokens
        const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const { id_token, access_token } = tokenResponse.data;

        // Decode the ID token to get user information
       const userInfo = jwt.decode(id_token);
       console.log(userInfo);
       let user = await User.findOne({ email:userInfo.email });
       if (!user) {
         user = new User({ email:userInfo.email, name:userInfo.name });
         await user.save();
       }


       const htmlResponse = `
            <script>
                // Pass user data back to the opener window
                window.opener.postMessage(${JSON.stringify(user)}, '*');
                // Close the popup window
                window.close();
            </script>
        `;

        res.send(htmlResponse);

    } catch (error) {
        console.error('Error during Google OAuth:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
}
