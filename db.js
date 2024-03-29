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

// module.exports.returnLastCharacter = (userId) => {
//     return db.query(`SELECT * FROM user${userId}Characters
//     ORDER BY id DESC LIMIT 1`);
// };

// module.exports.createCharacter = (userId, number) => {
//     return db.query(`INSERT INTO user${userId}Characters (name)
//     VALUES ($1)`, []);
// }

module.exports.createCharacter = (name, description, userId) => {
    return db.query(
        `INSERT INTO user${userId}Characters (name, description)
    VALUES ($1, $2)
    RETURNING id`,
        [name, description]
    );
};

module.exports.createCharacterTable = (userId, characterId) => {
    return db.query(
        `CREATE TABLE user${userId}character${characterId}(
        id SERIAL PRIMARY KEY,
        heading TEXT,
        content_front TEXT,
        content_back TEXT
    )`
    );
};

module.exports.firstInsertIntoCharacterTable = (
    heading,
    contentFront,
    userId,
    characterId
) => {
    return db.query(
        `INSERT INTO user${userId}character${characterId} (heading, content_front)
    VALUES ($1, $2)`,
        [heading, contentFront]
    );
};

module.exports.secondInsertIntoCharacterTable = (
    heading,
    contentFront,
    userId,
    characterId
) => {
    return db.query(
        `INSERT INTO user${userId}character${characterId} (heading, content_front)
    VALUES ($1, $2)`,
        [heading, contentFront]
    );
};

module.exports.getCharacter = (characterId, userId) => {
    return db.query(
        `SELECT * FROM user${userId}Characters
    WHERE id=$1`,
        [characterId]
    );
};

module.exports.getCharacterCards = (userId, characterId) => {
    return db.query(
        `SELECT * FROM user${userId}character${characterId} ORDER BY id`
    );
};

module.exports.updateCharacterTable = (front, back, charId, cardId, userId) => {
    return db.query(
        `UPDATE user${userId}character${charId}
    SET content_front = $1, content_back = $2
    WHERE id = ${cardId}
    `,
        [front, back]
    );
};

module.exports.addCard = (heading, charId, userId) => {
    return db.query(
        `INSERT INTO user${userId}character${charId} (heading)
    VALUES ($1)`,
        [heading]
    );
};

module.exports.updateCharName = (charName, charId, userId) => {
    return db.query(
        `UPDATE user${userId}Characters
    SET name = $1
    WHERE id=$2`,
        [charName, charId]
    );
};

module.exports.updateCardName = (heading, cardId, userId, charId) => {
    return db.query(
        `UPDATE user${userId}character${charId}
    SET heading = $1
    WHERE id = $2`,
        [heading, cardId]
    );
};

module.exports.getUsersCharacters = (userId) => {
    return db.query(`SELECT * FROM user${userId}Characters ORDER BY id`);
};
