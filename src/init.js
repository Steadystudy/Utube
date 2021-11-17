import "dotenv/config";
import "./db";
import "./models/video";
import "./models/user";
import "./models/comment";
import app from "./server";

const PORT = 5000;

function handleListening() {
  console.log(`Listening http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
