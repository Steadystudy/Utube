import "dotenv/config";
import "./db";
import "./models/video";
import "./models/user";
import app from "./server";

const PORT = 4000;

function handleListening() {
  console.log(`Listening http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
