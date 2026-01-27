
import dotenv from "dotenv"
dotenv.config();
import express from "express" // Importing express tool to use for my routes
import { fileURLToPath } from "url"; //Import and destructuring to translate my file for express
import path, {dirname} from "path"; // Importing path that can tell me where my file is. Destructuring dirname to get the exact folder name. 
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";




// Calling express to us create end points and CRUD request
const app = express ();
//Port my app is running on
const PORT = 3000;



app.use(cors({
  origin: "http://localhost:5173", //vite front end
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
   allowedHeaders: ["Content-Type", "Authorization"]
})); 

app.use(express.json());

app.use("/auth", authRoutes);

//Makes my file readable for express and the exact location of my file with file name
const __filename = fileURLToPath(import.meta.url);
//Tells me the folder my file is located in
const __dirname = dirname(__filename);

app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from the backend on Home.jsx 👋" });
});



//Telling express this is where you can find all my static files. 
app.use(express.static(path.join(__dirname, '../public')));

// Basic route
// GET requested crated for the Home page 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//Dashboard enpoint created serving a html file
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});





// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

