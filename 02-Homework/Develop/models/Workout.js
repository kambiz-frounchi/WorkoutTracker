const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
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
  },
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
});

const workoutSchema = new Schema({
  day: {
    type: Date
  },
  exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);
*/


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

//const Exercise = mongoose.model("Exercise", exerciseSchema);
/*
const CardioExercise = Exercise.discriminator("cardio", new Schema({
  distance: {
    type: Number,
    default: 0
  }
}, options));

const ResistanceExercise = Exercise.discriminator("resistance", new Schema({
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
}, options));
*/

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
