CREATE PROCEDURE ImportInstrumentsFromJSON
AS
BEGIN
  DECLARE @json NVARCHAR(MAX);

  SELECT @json = BulkColumn
  FROM OPENROWSET (BULK 'E:\BSTU\3_course\2term\DataBASED\Lab2\Instruments.json', SINGLE_CLOB) as j;

  INSERT INTO Instruments (InstrumentName, CategoryID, ManufacturerID, Availability, Cost)
  SELECT 
    InstrumentName,
    CategoryID,
    ManufacturerID,
    CASE WHEN Availability = 'true' THEN 1 ELSE 0 END, 
    Price
  FROM OPENJSON(@json)
  WITH (
    InstrumentName NVARCHAR(50) '$.InstrumentName',
    CategoryID INT '$.CategoryID',
    ManufacturerID INT '$.ManufacturerID',
    Availability NVARCHAR(5) '$.Availability', 
    Price DECIMAL(10, 2) '$.Price'
  );

  PRINT 'Import completed successfully.';
END;
EXEC ImportInstrumentsFromJSON;

SELECT * FROM Instruments;
