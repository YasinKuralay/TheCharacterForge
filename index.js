const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
// const { compare, hash } = require("./bc");
// const db = require("./db");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { compare, hash } = require("./bc");
const db = require("./db.js");
const ses = require("./ses.js");

app.use(compression());
app.use(express.json());

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

app.use(express.static("public"));

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

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/character:id", (req, res) => {
    const characterId = req.params.id;
    console.log("characterid is: ", characterId);
    Promise.all([
        db.getCharacter(characterId, req.session.userId),
        db.getCharacterCards(req.session.userId, characterId),
    ]).then((data) => {
        console.log("data in characterid is : ", data[1].rows[0]);
        res.json({ data });
    });
});

// app.get("/createcharacter", (req, res) => {
//     db.returnLastCharacter(req.session.userId).then((data) => {
//         console.log("data in createcharacter is: ", data.rows[0]);
//         if (!data.rows[0]) {
//             db.createCharacter(req.session.userId, 1);
//         } else {
//             console.log("data.rows[0] + 1 is: ", data.rows[0] + 1);
//             db.createCharacter(req.session.userId, data.rows[0] + 1);
//         }
//     });
// });

app.post("/createcharacter", (req, res) => {
    db.createCharacter("Allison", "No description yet", req.session.userId)
        .then((data) => {
            let characterId = data.rows[0].id;
            db.createCharacterTable(req.session.userId, characterId)
                .then(() => {
                    db.firstInsertIntoCharacterTable(
                        "Background",
                        "-Shady",
                        req.session.userId,
                        characterId
                    )
                        .then(() => {
                            db.secondInsertIntoCharacterTable(
                                "Hobbies",
                                "-Swimming",
                                req.session.userId,
                                characterId
                            ).then(() => {
                                res.json({ characterId });
                            });
                        })
                        .catch((err) => {
                            console.log(
                                "error in firstInsertIntoCharacterTable in /createcharacter: ",
                                err
                            );
                        });
                })
                .catch((err) => {
                    console.log(
                        "error in createCharacterTable in /createcharacter: ",
                        err
                    );
                });
        })
        .catch((err) => {
            console.log("error in createCharacter in /createcharacter: ", err);
        });
});

app.post("/register", (req, res) => {
    console.log("req.body: ", req.body);
    if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
    ) {
        console.log("didnt pass realiy check");
        res.json({ success: false });
    } else {
        hash(req.body.password).then((hashed) => {
            db.registerUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashed
            )
                .then((result) => {
                    req.session.userId = result.rows[0].id;
                    db.createUsersCharacters(req.session.userId)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("error in register inside", err);
                            res.json({ success: false });
                        });
                })
                .catch((err) => {
                    console.log("error in register", err);
                    res.json({ success: false });
                });
        });
    }
});

app.post("/login", (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false });
    } else {
        db.getPasswordByEmail(req.body.email)
            .then((result) => {
                compare(req.body.password, result.rows[0].password)
                    .then((outcome) => {
                        if (outcome) {
                            console.log("they match!");
                            console.log("the compare returns: ", result);
                            req.session.userId = result.rows[0].id;
                            res.json({ success: true });
                        } else {
                            console.log("no match");
                            res.json({ success: false });
                        }
                    })
                    .catch((err) => {
                        console.log("error in comparing password", err);
                    });
            })
            .catch((err) => {
                console.log("error in getpasswordbyemail", err);
                res.json({ success: false });
            });
    }
});

app.post("/sendemail", (req, res) => {
    db.getPasswordByEmail(req.body.email)
        .then(() => {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.insertSecretCode(req.body.email, secretCode)
                .then(() => {
                    let message = `Please enter the following code in the browser. Your code for reset password is ${secretCode}`;
                    let subject = "Your Reset Password Request at Persona";
                    ses.sendEmail(req.body.email, message, subject);
                })
                .catch((err) => {
                    console.log("error in insertSecretCode", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in get password", err);
            res.json({ success: false });
        });
    res.json({ success: true }); //this needs modification
});

app.post("/matchcode", (req, res) => {
    db.matchSecretCode(req.body.email)
        .then((result) => {
            if (req.body.code == result.rows[0].code) {
                hash(req.body.password).then((hashed) => {
                    db.updateUserPassword(hashed, req.body.email)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("err in db update", err);
                            res.json({ success: false });
                        });
                });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in matchsecretcode: ", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    if (
        !req.session.userId &&
        req.url !== "/welcome" &&
        req.url !== "/login" &&
        req.url !== "/resetpassword"
    ) {
        console.log("this just ran");
        res.redirect("/welcome");
    } else {
        console.log("nope, this ran");
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
