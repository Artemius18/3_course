CREATE TABLE Users (
    id INT NOT NULL PRIMARY KEY IDENTITY,
    username NVARCHAR(20) NOT NULL UNIQUE, --nickname
    password NVARCHAR(32) NOT NULL UNIQUE
);

INSERT INTO Users (username, password)
VALUES ('u1', 'p1'), 
       ('u2', 'p2');

select * from Users
truncate table Users
drop table Users