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
const SportCenter = require("../../models/SportCenter");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const responceObject = {};
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                type: req.body.type
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            if (user.type === 'sportCenter') {
                                const newSportCenter = new SportCenter({
                                    sports: [],
                                    capacity: '',
                                    location: '',
                                    user_id: user._id
                                });

                                newSportCenter
                                    .save()
                                    .then(sportCenter => res.json({
                                        user,
                                        sportCenter
                                    }))
                                    .catch(err => console.log(err));
                            } else {
                                return res.json({
                                    user
                                })
                            }
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                let payload = {
                    user: {
                        id: user._id,
                        dateOfBirth: user.dateOfBirth,
                        email: user.email,
                        lastName: user.lastName,
                        name: user.name,
                        phoneNumber: user.PhoneNumber,
                        type: user.type,
                    },
                    sportCenter: {}
                };

                if (user.type === 'sportCenter') {
                    SportCenter.findOne({ user_id: user._id })
                    .then((sportCenter) => {
                        payload.sportCenter = sportCenter;

                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    }).catch(( error ) => {
                        console.log(error);
                    })
                } else {
                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                }

            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.patch('/changePassword', (req, res) => {
    User.findById(req.body.user_id).then((user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, r) => {
                if(r){
                    let costFactor = 10;
                    bcrypt.hash(req.body.newPassword, costFactor, function(err, hash) {
                        User.findOneAndUpdate({
                            _id: req.user_id
                        },{
                            password: hash
                        }).then((u) => {
                            res.status(200).send(u);
                        }).catch((err) => {
                            res.status(500).send(err);
                        });
                    });
                } else {
                    res.status(400).send({message: "Passwords don't match"});
                }
            })
        } else {
            res.status(400).send({message: "User doesn't exist"});
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.patch('/', (req, res) => {
    User.findOneAndUpdate({_id: req.body.user.id}, {
        $set: req.body.user
    }).then((newUser)=>{
        SportCenter.findOneAndUpdate({_id: req.body.sportCenter.id}, {
            $set: req.body.sportCenter
        }).then((newSportCenter)=>{
            res.status(200).send({
                user: newUser,
                sportcenter: newSportCenter
            });
        });
    });
});

module.exports = router;