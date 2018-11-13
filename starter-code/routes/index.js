const express = require("express");
const Celebrity = require("../models/celebrity.js");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    // .sort({ createdAt: -1 }) //sort by date(reverse orders)
    .then(celebrityResults => {
      //send the database query results to the HBS file as "BOOKARRAY"
      res.locals.celebrityArray = celebrityResults;
      res.render("celebrities/index");
    })
    //next() skips to the error handler in "bin/www"
    .catch(err => next(err));
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.get("/celebrities/show/:celebritiesId", (req, res, next) => {
  //get the Id from the URL(it's inside the req.params object)
  const { celebritiesId } = req.params;
  Celebrity.findById(celebritiesId)
    .then(celebrityDoc => {
      res.locals.celebrityItem = celebrityDoc;
      res.render("celebrities/show");
    })
    .catch(err => next(err));
});

router.post("/celebrities/process-movies", (req, res, next) => {
  //get the user inputs from inside req.body
  // we use req.body because it's a POST form
  const { name, occupation, catchPhrase } = req.body;

  //save user inputs in anew book document
  Celebrity.create({ name, occupation, catchPhrase })
    .then(celebrityDoc => {
      //redirect if it's successful
      res.redirect("/celebrities");
      //(redirect ONLY to URLS -"/books" instead of book-list.hbs)
    })
    //"next()" skips to the error handler in "bin/www"
    .catch(err => next(err));
  // res.send(req.body);
});

router.get("/celebrities/:celebritiesId/delete", (req, res, next) => {
  const { celebritiesId } = req.params;

  Celebrity.findByIdAndRemove(celebritiesId)
    .then(celebrityDoc => {
      res.redirect("/celebrities");
    })
    .catch(err => next(err));
});

router.get("/celebrities/edit/:celebritiesId", (req, res, next) => {
  const { celebritiesId } = req.params;
  Celebrity.findByIdAndUpdate(celebritiesId)
    .then(celebrityDoc => {
      res.locals.celebrityItem = celebrityDoc;
      // res.send(req.params);
      res.render("celebrities/edit");
    })
    .catch(err => next(err));
});

router.post("/celebrities/:celebritiesId/process-edit", (req, res, next) => {
  const { celebritiesId } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(
    celebritiesId, //ID of the document to update
    { $set: { name, occupation, catchPhrase } }, //what changes to be made
    { runValidators: true } //Additional settings
  )
    .then(celebrityDoc => {
      res.redirect(`/celebrities/show/${celebritiesId}`);
    })
    .catch(err => next(err));
});

module.exports = router;
