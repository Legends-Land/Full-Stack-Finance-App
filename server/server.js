import dotenv from "dotenv"
dotenv.config();
import express from "express" // Importing express tool to use for my routes
import { fileURLToPath } from "url"; //Import and destructuring to translate my file for express
import path, {dirname} from "path"; // Importing path that can tell me where my file is. Destructuring dirname to get the exact folder name. 
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";



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

//Routes 
app.use("/expenses", expenseRoutes);

app.use("/auth", authRoutes);

//Makes my file readable for express and the exact location of my file with file name
const __filename = fileURLToPath(import.meta.url);
//Tells me the folder my file is located in
const __dirname = dirname(__filename);

app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from the backend on Home.jsx 👋" });
});


app.get('/legend', (req , res) => {
  res.json({message:"This is information from the backend port 300"});
});








// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

