CREATE TABLE Users (
    id INT IDENTITY PRIMARY KEY,
    username NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL
);

INSERT INTO Users (username, password) VALUES ('u1', 'p1');
INSERT INTO Users (username, password) VALUES ('u2', 'p2');
