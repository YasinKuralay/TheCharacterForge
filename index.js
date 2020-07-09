const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
// const { compare, hash } = require("./bc");
// const db = require("./db");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());

app.use(
    cookieSession({
        secret: "I'm always happy",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    console.log("req.csrfToken() ", req.csrfToken());
    next();
});

// app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.get("/welcome", (req, res) => {
//     if (req.session.userId) {
//         res.redirect("/");
//     } else {
//         res.sendFile(__dirname + "/index.html"); //should I just delete the else?
//     }
// });

app.get("*", function (req, res) {
    if (
        !req.session.userId &&
        req.url !== "/" &&
        req.url !== "/login" &&
        req.url !== "/resetpassword"
    ) {
        console.log("this just ran");
        res.redirect("/");
    } else {
        console.log("nope, this ran");
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
