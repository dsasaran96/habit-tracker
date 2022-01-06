-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     firstName VARCHAR(60) NOT NULL,
--     lastName VARCHAR(60) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     passwordHash VARCHAR(255) NOT NULL
-- );

CREATE TABLE goals(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    userID int,
    FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE
);