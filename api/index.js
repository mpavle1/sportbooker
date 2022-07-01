global.TextEncoder = require("util").TextEncoder;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();

const users = require("./routes/api/users");
const sports = require("./routes/api/sports");
const locations = require("./routes/api/locations");
const events = require("./routes/api/events");
const search = require("./routes/api/search");
const sportCenters = require("./routes/api/sportCenters");
const ticket = require("./routes/api/ticket");

app.use(cors());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            generateResolvConf: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


// Routes
app.use("/api/users", users);
app.use("/api/sports", sports);
app.use("/api/locations", locations);
app.use("/api/events", events);
app.use("/api/search", search);
app.use("/api/sportCenters", sportCenters);
app.use("/api/ticket", ticket);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));