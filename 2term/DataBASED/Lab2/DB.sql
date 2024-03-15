CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY,
    RoleName NVARCHAR(255)
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY,
    RoleID INT FOREIGN KEY REFERENCES Roles(RoleID),
    UserName NVARCHAR(255),
    Password NVARCHAR(255),
    Balance DECIMAL(10, 2)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    OrderDate DATE
);

CREATE TABLE OrderedItems (
    OrderedItemID INT PRIMARY KEY IDENTITY,
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    InstrumentID INT FOREIGN KEY REFERENCES Instruments(InstrumentID)
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY,
    CategoryName NVARCHAR(255)
);

CREATE TABLE Instruments (
    InstrumentID INT PRIMARY KEY IDENTITY,
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    ManufacturerID INT FOREIGN KEY REFERENCES Manufacturers(ManufacturerID),
    InstrumentName NVARCHAR(255),
    Availability BIT,
    Price DECIMAL(10, 2)
);

CREATE TABLE Manufacturers (
    ManufacturerID INT PRIMARY KEY IDENTITY,
    ManufacturerName NVARCHAR(255),
    Country NVARCHAR(255)
);


---------------------------------------------------------INSERTING-------------------------------------------------------------
	
	-------------------------------------Manufacturers------------------------------------------------
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


	-----------------------------------------Roles---------------------------------------------
	INSERT INTO Roles (RoleName) VALUES ('User');
	INSERT INTO Roles (RoleName) VALUES ('Admin');


	-------------------------------------------Categories---------------------------------------
	INSERT INTO Categories (CategoryName) VALUES ('Acoustic');
	INSERT INTO Categories (CategoryName) VALUES ('Electric');
	INSERT INTO Categories (CategoryName) VALUES ('Bass');
	INSERT INTO Categories (CategoryName) VALUES ('Electric-acoustic');
	INSERT INTO Categories (CategoryName) VALUES ('Ukulele');


	---------------------------------------------------------------------------------------------