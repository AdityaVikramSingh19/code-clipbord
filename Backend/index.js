import express from "express"; //importing all the required things 
import mongoose from "mongoose";
import cors from "cors";
import snippetsRoutes from "./Routes/snippetRoutes.js";
import dotenv from "dotenv";

dotenv.config(); // required to read the env file 

//express app
const app = express();


//middle part of connecting 
app.use(cors()); // this helps in getting request from other domains frontend 
app.use(express.json());  //prases the json request comming

// Routes
app.use('/api/snippets', snippetsRoutes); 



//connecting to mongodb
mongoose.connect(process.env.MONGO_URI,/*process.env is the environment variable acceser builtin in Node.js and MOngo_uri is an evironment variable to store mongo url  */ {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.log("❌ MongoDB connection error:", err));


 //Sample route to test server
app.get('/', (req, res) => {
  res.send('Hello from NoteCode Backend!');
});



//this starts the server 
const PORT = process.env.PORT || 5000;  //vercel or railway or other platforms creates a env where the server runs or it usually runs on port 5000
app.listen(PORT, () => {  //app.listen is a express variable adn this basically starts the server as this accepts the https requests
  console.log(`🚀 Server running on port ${PORT}`);  //consoling log just to make sure its accepting the request 
});