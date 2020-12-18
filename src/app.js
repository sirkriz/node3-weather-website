const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./util/geocode.js");
const forecast = require("./util/forecast.js");

const app = express();

// Heroku port
const port = process.env.PORT || 3000;

// Define Paths
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set HandleBars and views
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Duke"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Duke"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Duke",
        helpText: "This is the tip"
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            errorMessage: "Must provide an address"
        });
    }

    geoCode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({errorMessage: error});
        }

        forecast(longitude, latitude, (error, {description, temperature, precip, humidity} = {}) => {
            if (error) {
                return res.send({errorMessage: error});
            }

            res.send({
               title: "Forecast",
               location,
               forecast: description,
               temperature,
               precip,
               humidity
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "No search term"
        });
    }

    res.send({
        products: []
    });
});


// Error requests mapping
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Not Found",
        errorMessage: "Help article not found",
        name: "Duke"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Not Found",
        errorMessage: "Page Not Found",
        name: "Duke"
    });
});

app.listen(port, () => {
    console.log("Server up on port " + port);
});