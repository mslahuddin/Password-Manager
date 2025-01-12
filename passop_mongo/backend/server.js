/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import PasswordManager from './models/passwordManager.js'; // Adjusted import path

// Creating an instance of an Express app
const app = express();

dotenv.config();

// Define the port to listen on
const port = 3000;
app.use(cors());
// Middleware to handle JSON requests
app.use(express.json());

// MongoDB connection URL (make sure it's using the correct DB name)
const url = 'mongodb://localhost:27017/PasswordManager'; // Corrected URL format
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Default route for testing the server
app.get('/', async (req, res) => {
  try {
    const passwords = await PasswordManager.find(); // Fetch the passwords from the DB
    res.status(200).json(passwords); // Send the passwords as a response
    console.log(passwords); // Log to the console
  } catch (err) {
    res.status(500).json({ message: 'Error fetching passwords' });
  }
});



app.post('/', async (req, res) => {
    try{
    const password=req.body;
    const newPassword= new PasswordManager(password);
    const savePassword=await newPassword.save()

    res.status(201).json(savePassword);
    }
    catch (err) {
        console.error('Error saving password:', err);
        res.status(500).json({ message: 'Error saving password' });
      }
  });


  // Example of backend deletion handling in Express.js
  app.delete("/", async (req, res) => {
    const { id } = req.body;  // Extract the ID from the request body
  
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
  
    try {
      // Find and delete the password by ID
      const result = await PasswordManager.findByIdAndDelete(id);  // Ensure you are using the correct ID field (_id for MongoDB)
  
      if (!result) {
        return res.status(404).json({ message: "Password not found" });
      }
  
      // If deletion is successful, respond with a success message
      res.status(200).json({ message: "Password removed successfully" });
    } catch (error) {
      console.error("Error deleting password:", error);
      res.status(500).json({ message: "Error deleting password" });
    }
  });
  



// Server listens on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
