const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("hello i am running");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(503).send("You can't add more owners");
    }

    let { first_name, last_name, user_name, email, contact_no, password } =
      req.body;

    const createdOwner = await ownerModel.create({
      first_name,
      last_name,
      user_name,
      email,
      contact_no,
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
         createdOwner.password=hash;
         await createdOwner.save();
         res.status(201).send(createdOwner);
      });

    });
  });
}

module.exports = router;
