CREATE PROCEDURE ImportInstrumentsFromJSON
AS
BEGIN
  DECLARE @json NVARCHAR(MAX);

  -- Загрузка JSON из файла
  SELECT @json = BulkColumn
  FROM OPENROWSET (BULK 'E:\BSTU\3_course\2term\DataBASED\Lab2\Instruments.json', SINGLE_CLOB) as j;

  -- Вставка данных из JSON
  INSERT INTO Instruments (InstrumentName, CategoryID, ManufacturerID, Availability, Price)
  SELECT 
    InstrumentName,
    CategoryID,
    ManufacturerID,
    CASE WHEN Availability = 'true' THEN 1 ELSE 0 END, -- Преобразование из true/false в 1/0
    Price
  FROM OPENJSON(@json)
  WITH (
    InstrumentName NVARCHAR(255) '$.InstrumentName',
    CategoryID INT '$.CategoryID',
    ManufacturerID INT '$.ManufacturerID',
    Availability NVARCHAR(5) '$.Availability', -- Используем NVARCHAR для совместимости с true/false
    Price DECIMAL(10, 2) '$.Price'
  );

  PRINT 'Import completed successfully.';
END;


EXEC ImportInstrumentsFromJSON
select * from instruments