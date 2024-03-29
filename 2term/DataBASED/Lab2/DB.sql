CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Manufacturers (
    ManufacturerID INT IDENTITY(1,1) PRIMARY KEY,
    ManufacturerName NVARCHAR(50) NOT NULL UNIQUE,
    Country NVARCHAR(50)
);

CREATE TABLE Instruments (
    InstrumentID INT IDENTITY(1,1) PRIMARY KEY,
    InstrumentName NVARCHAR(50) NOT NULL,
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID) ON DELETE CASCADE,
    ManufacturerID INT FOREIGN KEY REFERENCES Manufacturers(ManufacturerID) ON DELETE CASCADE,
    Availability BIT NOT NULL CHECK (Availability IN (0, 1)),
    Cost DECIMAL(10, 2) NOT NULL CHECK (Cost > 0)
);

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(50) NOT NULL,
    Balance DECIMAL(10, 2) NOT NULL CHECK (Balance >= 0)
);

CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID) ON DELETE CASCADE,
    ReservationDate DATE NOT NULL
);

CREATE TABLE OrderItems (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID) ON DELETE CASCADE,
    InstrumentID INT FOREIGN KEY REFERENCES Instruments(InstrumentID) ON DELETE CASCADE
);

CREATE TABLE InstrumentsReview (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID) ON DELETE CASCADE,
    InstrumentID INT FOREIGN KEY REFERENCES Instruments(InstrumentID) ON DELETE CASCADE,
    ReviewText NVARCHAR(1000) NOT NULL
);



-------------------------------------------------------------”ƒ¿À≈Õ»≈ “¿¡À»÷-------------------------------------------------------------------------------------------
    DROP TABLE InstrumentsReview;
    DROP TABLE OrderItems;
    DROP TABLE Orders;
    DROP TABLE Instruments;
    DROP TABLE Categories;
    DROP TABLE Manufacturers;
    DROP TABLE Users;

-------------------------------------------------------------¬—“¿¬ ¿ ƒ¿ÕÕ€’-------------------------------------------------------------------------------------------
------------------------------------------------------Categories--------------------------------------------------
    INSERT INTO Categories (CategoryName) VALUES ('Strings');
    INSERT INTO Categories (CategoryName) VALUES ('Brass');
    INSERT INTO Categories (CategoryName) VALUES ('Reed');
    INSERT INTO Categories (CategoryName) VALUES ('Drums');
    INSERT INTO Categories (CategoryName) VALUES ('Keyboards');
    INSERT INTO Categories (CategoryName) VALUES ('Mechanical');
    INSERT INTO Categories (CategoryName) VALUES ('Electromusical');
    
    DELETE FROM CATEGORIES
    SELECT * FROM Categories
    
---------------------------------------------------Manufactures-----------------------------------------------------
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Cort', 'South Korea');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Taylor', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Crafter', 'South Korea');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Yamaha', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Fender', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Gibson', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Ibanez', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Martin', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Epiphone', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Rickenbacker', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('PRS', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Jackson', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Schecter', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('ESP', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Gretsch', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Guild', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Squier', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('BC Rich', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Music Man', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Washburn', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Steinway & Sons', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Kawai', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Roland', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Korg', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Moog', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Behringer', 'Germany');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('B?sendorfer', 'Austria');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Casio', 'Japan');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Charvel', 'United States');
    INSERT INTO Manufacturers (ManufacturerName, Country) VALUES ('Danelectro', 'United States');
    
    DELETE FROM Manufacturers
    SELECT * FROM Manufacturers
    
---------------------------------------------------------------Instruments---------------------------------------------------

    DELETE FROM Instruments
    SELECT count(*) FROM Instruments
    SELECT * FROM Instruments order by InstrumentID



---------------------------------------------------------------Users---------------------------------------------------
    INSERT INTO Users (UserName, Balance) VALUES ('John Doe', 1000.68);
    INSERT INTO Users (UserName, Balance) VALUES ('Anna Bell', 1200.54);
    
    
    DELETE FROM Users
    SELECT * FROM Users
    
    
---------------------------------------------------------------Reviews---------------------------------------------------
    --¬ÒÚ‡‚Í‡ ‰‡ÌÌ˚ı ‚ Ú‡·ÎËˆÛ InstrumentsReview
    INSERT INTO InstrumentsReview (UserID, InstrumentID, ReviewText) VALUES (1, 1, 'Great guitar, love the sound!');
    INSERT INTO InstrumentsReview (UserID, InstrumentID, ReviewText) VALUES (1, 2, 'Awesome piano, excellent build quality.');

    
    DELETE FROM InstrumentsReview
    SELECT * FROM InstrumentsReview
    

    SELECT *
    FROM Instruments i
    JOIN InstrumentsReview ir ON i.InstrumentID = ir.InstrumentID;


