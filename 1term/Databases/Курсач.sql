CREATE FULLTEXT CATALOG FullTextCatalog
USE [OnlineShop]


CREATE UNIQUE INDEX ui_Stud ON dbo.Student(student_id);  
DROP INDEX ui_Stud on dbo.Student


create fulltext index on dbo.Student
(
	university language 1033
)
key index ui_Stud on FullTextCatalog 
with change_tracking auto
drop fulltext index on dbo.Student

CREATE TABLE Student (
    student_id INT PRIMARY KEY IDENTITY(1,1),
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    university NVARCHAR(100) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F'))
);
drop table Student

-- Вставка данных в таблицу Student
INSERT INTO Student (first_name, last_name, university, gender)
VALUES ('Ivan', 'Ivanov', 'Belarusian State University', 'M'),
       ('Maria', 'Petrova', 'Belarusian National Technical University', 'F'),
       ('Alexei', 'Sidorov', 'Belarusian State University of Informatics and Radioelectronics', 'M'),
       ('Elena', 'Vasilyeva', 'Belarusian State Medical University', 'F'),
       ('Nikolai', 'Kuznetsov', 'Belarusian State University', 'M');

select * from Student


select * from dbo.Student 
where contains(university, 'arus');

select * from dbo.Student 
where university like '%State%'
order by university

----------------------------------------------------------СОЗДАНИЕ НЕОБХОДИМЫХ ТАБЛИЦ ДЛЯ БАЗЫ ДАННЫХ-----------------------------------------------
-- Создание таблицы категорий
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(50) NOT NULL UNIQUE
);

-- Создание таблицы производителей
CREATE TABLE Manufacturers (
    ManufacturerID INT PRIMARY KEY IDENTITY(1,1),
    ManufacturerName NVARCHAR(50) NOT NULL UNIQUE,
    Country NVARCHAR(50)
);

-- Создание таблицы инструментов
CREATE TABLE Instruments (
    InstrumentID INT PRIMARY KEY IDENTITY(1,1),
    InstrumentName NVARCHAR(50) NOT NULL,
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    ManufacturerID INT FOREIGN KEY REFERENCES Manufacturers(ManufacturerID),
    Availability BIT NOT NULL CHECK (Availability IN (0, 1)),
    Cost FLOAT NOT NULL CHECK (Cost > 0)
);

-- Создание таблицы статусов
CREATE TABLE StatusUpdates (
    StatusUpdateID INT PRIMARY KEY IDENTITY(1,1),
    InstrumentID INT FOREIGN KEY REFERENCES Instruments(InstrumentID),
    Status NVARCHAR(20) NOT NULL CHECK (Status IN ('В наличии', 'Продан', 'Зарезервирован')),
    StatusDate DATETIME NOT NULL CHECK (StatusDate <= GETDATE())
);

-- Создание таблицы скидок
CREATE TABLE Discounts (
    DiscountID INT PRIMARY KEY IDENTITY(1,1),
    InstrumentID INT FOREIGN KEY REFERENCES Instruments(InstrumentID),
    DiscountPercent INT NOT NULL CHECK (DiscountPercent >= 0 AND DiscountPercent <= 75),
    StartDate DATETIME NOT NULL CHECK (StartDate <= GETDATE()),
    EndDate DATETIME,
    CONSTRAINT CHK_EndDate CHECK (EndDate >= StartDate AND (EndDate IS NULL OR EndDate <= GETDATE()))
);

-- Создание таблицы для зарезервированных инструментов
CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY IDENTITY(1,1),
    InstrumentID INT FOREIGN KEY REFERENCES Instruments(InstrumentID),
    ReservationDate DATETIME NOT NULL CHECK (ReservationDate <= GETDATE())
);


DROP TABLE Reservations --1
DROP TABLE Discounts --2
DROP TABLE Instruments --3
DROP TABLE Categories --4
DROP TABLE Manufacturers --5
DROP TABLE StatusUpdates --7


----------------------------------------------------------ЗАПОЛНЕНИЕ ТАБЛИЦ ДАННЫМИ-----------------------------------------------
-- Вставка данных в таблицу Categories
INSERT INTO Categories (CategoryID, CategoryName) VALUES
(1, 'Струнные'),
(2, 'Духовые'),
(3, 'Язычковые'),
(4, 'Ударные'),
(5, 'Клавишные'),
(6, 'Механические'),
(7, 'Электромузыкальные');
SELECT * FROM Categories

