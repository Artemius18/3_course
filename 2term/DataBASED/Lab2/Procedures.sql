-------------------------------------------------------------FUNCTIONS---------------------------------------------------------------------
CREATE FUNCTION CountAllInstruments()
RETURNS INT
AS
BEGIN
  DECLARE @v_count INT;
  SELECT @v_count = COUNT(*) FROM Instruments;
  RETURN @v_count;
END;
GO
SELECT dbo.CountAllInstruments() AS InstrumentCount;


CREATE FUNCTION ShowAllInstruments()
RETURNS TABLE
AS
RETURN 
(
  SELECT InstrumentID, InstrumentName, CategoryID, ManufacturerID, Availability, Cost 
  FROM Instruments 
);
GO
SELECT * FROM dbo.ShowAllInstruments()


CREATE FUNCTION ShowAllReviews()
RETURNS TABLE
AS
RETURN 
(
  SELECT ReviewID, UserID, InstrumentID, ReviewText 
  FROM InstrumentsReview
);
GO
SELECT * FROM dbo.ShowAllReviews();

-------------------------------------------------------------PROCEDURES---------------------------------------------------------------------

CREATE PROCEDURE InsertIntoInstruments
    @InstrumentName NVARCHAR(50),
    @CategoryID INT,
    @ManufacturerID INT,
    @Availability BIT,
    @Cost DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO Instruments (InstrumentName, CategoryID, ManufacturerID, Availability, Cost)
    VALUES (@InstrumentName, @CategoryID, @ManufacturerID, @Availability, @Cost);
END;
GO

CREATE PROCEDURE UpdateInstruments
    @InstrumentID INT,
    @InstrumentName NVARCHAR(50),
    @CategoryID INT,
    @ManufacturerID INT,
    @Availability BIT,
    @Cost DECIMAL(10, 2)
AS
BEGIN
    UPDATE Instruments
    SET InstrumentName = @InstrumentName,
        CategoryID = @CategoryID,
        ManufacturerID = @ManufacturerID,
        Availability = @Availability,
        Cost = @Cost
    WHERE InstrumentID = @InstrumentID;
END;
GO

CREATE PROCEDURE DeleteFromInstruments
    @InstrumentID INT
AS
BEGIN
    DELETE FROM Instruments
    WHERE InstrumentID = @InstrumentID;
END;
GO

EXEC InsertIntoInstruments @InstrumentName = 'New Instrument', @CategoryID = 1, @ManufacturerID = 1, @Availability = 1, @Cost = 100.00;

EXEC UpdateInstruments @InstrumentID = 2, @InstrumentName = 'Updated Instrument', @CategoryID = 2, @ManufacturerID = 2, @Availability = 0, @Cost = 200.00;

EXEC DeleteFromInstruments @InstrumentID = 2;

-------------------------------------------------------------TRIGGER---------------------------------------------------------------------
CREATE TRIGGER InstrumentsInsertTrigger
ON Instruments
AFTER INSERT
AS
BEGIN
    DECLARE @InstrumentID INT, @InstrumentName NVARCHAR(50);
    SELECT @InstrumentID = InstrumentID, @InstrumentName = InstrumentName FROM inserted;
    PRINT 'New instrument has been inserted. InstrumentID: ' + CAST(@InstrumentID AS NVARCHAR(10)) + ', InstrumentName: ' + @InstrumentName;
END;
GO
