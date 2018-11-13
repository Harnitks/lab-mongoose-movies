const mongoose = require("mongoose");

const Celebrity = require("../models/celebrity.js");

mongoose
  .connect(
    "mongodb://localhost/starter-code",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const celebrityData = [
  {
    name: "Tom Cruise",
    occupation: "actor",
    catchPhrase:
      "I'm an all-or-nothing kind of person, and when I become interested in something, I give it my all."
  },
  {
    name: "Priyanka Chopra",
    occupation: "actor",
    catchPhrase:
      "Work hard, stay focused, and be committed. Most often than not, you’ll come out on top."
  },
  {
    name: "Robert Alan Monkhouse",
    occupation: "comedian",
    catchPhrase: "Bernie, the bolt!"
  }
];

Celebrity.create(celebrityData)
  .then(celebrityResults => {
    console.log(`Inserted ${celebrityResults.length} CELEBRITY`);
  })
  .catch(err => {
    console.log("CREATE FAILURE", err);
  });
