const htmlRouter = require("express").Router();
const { mongo } = require("mongoose");
const mongojs = require("mongojs");
const Workout = require("../models/Workout.js");
const path = require("path");

htmlRouter.get("/", (req, res) => {
  console.log("/");
  console.log(req);
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

htmlRouter.get("/exercise", (req, res) => {
  console.log("/exercise");
  console.log(req);
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

htmlRouter.get("/stats", (req, res) => {
  console.log("/stats");
  console.log(req);
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});


module.exports = htmlRouter;