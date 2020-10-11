const router = require("express").Router();
const { mongo } = require("mongoose");
const mongojs = require("mongojs");
const Workout = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
  console.log(`get workouts`);
  //get all workouts from DB and sort in ascending order
  Workout.find({})
    .sort({ day: 1 })
    .then(dbWorkouts => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  console.log("range");
  //get all workouts from DB and sort in descending order;
  //there is no formal specification for what this API should do
  //and the front-end is not really paying attention to the date of the exercises
  //and simply showing one exercise per day in the duration line chart and the weight pie chart;
  //it is not obvious as to whether this API should somehow only show the aggregate exercise duration and weight per day 
  //(note you cannot combine the exercise names ...)
  const workouts = [];
  Workout.find({})
    .sort({ day: -1 })
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("put");
  console.log(req.params.id);
  console.log(req.body);

  //only process new exercise if it has a name
  //this is to avoid adding an empty exercise entry in the workout
  //which the front-end is posting to the back-end when the user
  //presses the complete workout button

  if (!req.body.name) {
    res.json({});
    return;
  }

  const exercise = {
    type: req.body.type,
    name: req.body.name,
    duration: req.body.duration
  }

  if (req.body.type === "cardio") {
    exercise.distance = req.body.distance;
  }
  else if (req.body.type === "resistance") {
    exercise.weight = req.body.weight;
    exercise.sets = req.body.sets;
    exercise.reps = req.body.reps;
    exercise.duration = req.body.duration;
  }

  Workout.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        day: new Date()
      },
      $push: {
        exercises: [exercise]
      }
    }
  )
  .then((workout) => {
    res.json(workout);
  })
});

//create workout
router.post("/api/workouts", (req, res) => {
  console.log("post");
  console.log(req.body);
  Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
