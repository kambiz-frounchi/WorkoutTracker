const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//only common fields defined in exerciseSchema;
//the discrimanator key (type property) determines whether the exercise array is 
//going to use the cardio schema or the resistance schema
const exerciseSchema = new Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  duration: {
    type: Number,
    default: 0
  }
}, {discriminatorKey: "type"});

//workoutSchema consists of the day and an array of exercises (defined by exerciseSchema)
const workoutSchema = new Schema({
  day: {
    type: Date
  },
  exercises: [exerciseSchema]
});

const exercises = workoutSchema.path("exercises");

const CardioExercise = exercises.discriminator("cardio", new Schema({
  distance: {
    type: Number,
    default: 0
  }
}));

const ResistanceExercise = exercises.discriminator("resistance", new Schema({
  weight: {
    type: Number,
    default: 0
  },
  reps: {
    type: Number,
    default: 0
  },
  sets: {
    type: Number,
    default: 0
  }
}));

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
