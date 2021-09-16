const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/get", (req, res) => {

    console.log(req.body);
    return;
    // User.findOne({ email: req.body.email }).then(user => {
    //     if (user) {
    //         return res.status(400).json({ email: "Email already exists" });
    //     } else {
    //         const newUser = new User({
    //             email: req.body.email,
    //             password: req.body.password,
    //             name: req.body.name,
    //             lastName: req.body.lastName,
    //             dateOfBirth: req.body.dateOfBirth,
    //             phoneNumber: req.body.phoneNumber,
    //             type: req.body.type,
    //         });
    //         // Hash password before saving in database
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if (err) throw err;
    //                 newUser.password = hash;
    //                 newUser
    //                     .save()
    //                     .then(user => res.json(user))
    //                     .catch(err => console.log(err));
    //             });
    //         });
    //     }
    // });


});

module.exports = router;