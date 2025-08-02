import express from "express";
import Snippet from "../models/Snippet.js";

//this lib helps in creating the unique number for our slug 
import {nanoid} from "nanoid";

const router = express.Router();//initializes a router object from express
router.post("/",async(req,res)=>{ //Handles POST request to base path and this function is async
  
  try{
  const { code , language}=req.body;  //req.body this is the body we get from post and then we are using .jason in our main file to convert it.
 
 //This code checks weather the is entered or not returns with error 404 with the error message 
  if(!code){
    return res.status(400).json({error : 'Code is required'});
  }

//creates a unique string of 6 char long for slug
  const slug = nanoid(6);

  const newSnippet = new Snippet({code,language,slug});
  await newSnippet.save();

  //Respond with yes
  res.status(201).json({message:"Snippet created",slug});
}catch(err){
  res.status(500).json({error:"Server error "});
}
});



// GET - RETRIEVE A SNIPPET BY SLUG

router.get("/:slug",async(req,res) => {//defines the http to get route on the router with this dynamic path parameter
  try{
    const snippet = await Snippet.findOne({slug:req.params.slug});// query which ask the mongoose to find the Sniooet collection of this slug in its database

    if(!snippet){//if there was no snippet then error 404
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json(snippet); //if there is snippet then send it with status 200 as JSON
  }catch(err){
    res.status(500).json({error:"Server error"});
  }
});

export default router;