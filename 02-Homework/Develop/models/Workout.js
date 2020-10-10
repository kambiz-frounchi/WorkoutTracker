const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
