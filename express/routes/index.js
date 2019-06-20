var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();

const recaptchaKeys = {
  checkbox: "6LdDnKkUAAAAAFa2nbcYYGPH6mzx2AL3bqWs4ukw",
  invisible: "6Leuz6kUAAAAAGW7I1sp-C7XPh26Rvty6C8wXQIW",
  3: "6LfUcqkUAAAAAKwAQkQsfrGj7vVGnC0-BC-OoP6m"
};

router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.post("/verify-recaptcha/:version", function(req, res) {
  if (!req.body.recaptcha) {
    return res.status(400).json({ success: false });
  }

  const verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    recaptchaKeys[req.params.version] +
    "&response=" +
    req.body.recaptcha +
    "&remoteip=" +
    req.connection.remoteAddress;

  fetch(verificationUrl, { method: "POST" })
    .then(res => res.json())
    .then(json => {
      if (!json.success) {
        return res.status(400).json(json);
      }

      res.json(json);
    })
    .catch(err => {
      return res.json(err);
    });
});

module.exports = router;
