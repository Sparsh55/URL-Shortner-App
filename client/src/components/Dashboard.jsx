import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [totalClick, setTotalClick ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://url-shortner-app-rbyi.onrender.com/api/url", {
        longUrl,
      });
     console.log(response);
      setTotalClick(response.data.analytics.totalClicks)
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error creating short URL", error);
    }
  };

   


  return (
    <Container className="dashboard">
      <Box sx={{ flexGrow: 1, padding: 3 }} className="dashboard1">
        <Typography
          variant="h4"
          component="h1"
          style={{ marginBottom: "20px", marginLeft: "320px" }}
        >
          URL Shortener Dashboard
        </Typography>
        <Card>
          <CardContent>
            <CardHeader title="Shorten Your URL" />
            <form onSubmit={handleSubmit}>
              <TextField
                label="Enter Your Long URL here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Shorten
              </Button>
            </form>
            {shortUrl && (
              <div>
              <Box sx={{ mt: 2 ,display: 'flex', alignItems: 'center', justifyContent: 'center',gap:'70px'}} >
                <div>
                <Typography variant="h6">Short URL:</Typography>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
                </div>
                <div>
                <h2>Total Clicks on the URL</h2>
                <h2>{totalClick}</h2>
                </div>
                <div>
                <h2>Unique Clicks on the URL</h2>
                <h2>{totalClick}</h2>
                </div>
              </Box>
              </div>
            )}
          </CardContent>
        </Card>
        <Link to="/">
          <button className="get-started-btn1">Back to Home</button>
        </Link>
      </Box>
    </Container>
  );
}
