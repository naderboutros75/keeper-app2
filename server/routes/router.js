import express from "express";
import { Note } from "../db/conn.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const notes = await Note.find({}).exec();
  console.log(notes);
});

export default router;
