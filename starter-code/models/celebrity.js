const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create model's schema using the Mongoose Schema class
const celebritySchema = new Schema(
  {
    //document structure & rules defined here
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    catchPhrase: { type: String, required: true }
  },
  {
    //additional settings for the schema class
    timestamps: true
  }
);

//book model -> books collection
const Celebrity = mongoose.model("Celebrity", celebritySchema);

//make the book model shrable to other files in the app
module.exports = Celebrity;
