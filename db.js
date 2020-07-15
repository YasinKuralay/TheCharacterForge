const spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/characterforge"
);

module.exports.registerUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id`,
        [firstname, lastname, email, password]
    );
};

module.exports.getPasswordByEmail = (email) => {
    return db.query(
        `SELECT password, id FROM users 
    WHERE email = $1
    `,
        [email]
    );
};

module.exports.insertSecretCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code)
    VALUES ($1, $2)`,
        [email, code]
    );
};

module.exports.matchSecretCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1
        ORDER BY created_at DESC
        LIMIT 1;`,
        [email]
    );
};

module.exports.updateUserPassword = (hashedpw, email) => {
    return db.query(
        `UPDATE users
    SET password = $1 
    WHERE users.email = $2;`,
        [hashedpw, email]
    );
};

module.exports.createUsersCharacters = (userId) => {
    return db.query(`CREATE TABLE user${userId}Characters(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT
    );`);
};
