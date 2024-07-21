DECLARE @i INT = 0;
WHILE @i < 100
BEGIN
    INSERT INTO Sold (UserID, ReservationDate)
    VALUES ((SELECT TOP 1 UserID FROM Users ORDER BY NEWID()), DATEADD(DAY, (ABS(CHECKSUM(NEWID())) % 365), '2023-01-01'));

    SET @i = @i + 1;
END;

SET @i = 0;
WHILE @i < 100
BEGIN
    INSERT INTO SoldItems (SoldID, InstrumentID)
    VALUES ((SELECT TOP 1 SoldID FROM Sold ORDER BY NEWID()), (SELECT TOP 1 InstrumentID FROM Instruments ORDER BY NEWID()));

    SET @i = @i + 1;
END;


EXEC ImportInstrumentsFromJSON;
select * from Instruments

select * from Sold s inner join SoldItems si 
on s.SoldID = si.SoldID


--3 Вычисление суммарной стоимости проданных инструментов помесячно, за квартал, за полгода, за год
SELECT
    [year],
    [half year],
    [quarter],
    [month],
    SUM([income]) AS [income]
FROM
    (SELECT
        YEAR(ReservationDate) AS [year],
        CASE
            WHEN MONTH(ReservationDate) BETWEEN 1 AND 6 THEN '1-е'
            ELSE '2-е'
        END AS [half year],
        DATEPART(QUARTER, ReservationDate) AS [quarter],
        MONTH(ReservationDate) AS [month],
        Cost AS [income]
    FROM
        Sold AS s
    JOIN
        SoldItems AS si ON s.SoldID = si.SoldID
    JOIN
        Instruments AS i ON si.InstrumentID = i.InstrumentID) AS SubQuery
GROUP BY
    [year],
    [half year],
    [quarter],
    [month]
WITH ROLLUP;



--4 Суммарная стоимость заказов клиентов, доля от стоимости всех заказов, 
--  доля от максимальной суммарной стоимости заказов клиентов
WITH total_sales AS (
  SELECT UserID, SUM(i.Cost) AS client_sales
  FROM Sold AS s
  JOIN SoldItems AS si ON s.SoldID = si.SoldID
  JOIN Instruments AS i ON si.InstrumentID = i.InstrumentID
  WHERE ReservationDate BETWEEN '01.04.2023' AND '01.08.2023'
  GROUP BY UserID
),
max_sales AS (
  SELECT MAX(client_sales) AS max_client_sales
  FROM total_sales
)
SELECT 
    UserID [client_id],
    client_sales [total_client_sales],
    100.0 * client_sales / SUM(client_sales) OVER () [percent_of_total_sales],
    100.0 * client_sales / (SELECT max_client_sales FROM max_sales) [percent_of_max_client_sales]
FROM total_sales
ORDER BY total_client_sales DESC;



-- 5.	Продемонстрируйте применение функции ранжирования ROW_NUMBER() для разбиения результатов запроса на страницы (по 20 строк на каждую страницу).
DECLARE @PageNumber AS INT, @RowsOfPage AS INT;
SET @PageNumber = 1;
SET @RowsOfPage = 20;

WITH InstrumentsWithRowNumber AS
(
    SELECT 
        ROW_NUMBER() OVER(ORDER BY InstrumentID) AS RowNum,
        InstrumentID,
        InstrumentName,
        CategoryID,
        ManufacturerID,
        Availability,
        Cost
    FROM Instruments
)
SELECT 
    InstrumentID,
    InstrumentName,
    CategoryID,
    ManufacturerID,
    Availability,
    Cost
FROM InstrumentsWithRowNumber
WHERE RowNum BETWEEN ((@PageNumber-1)*@RowsOfPage+1) AND (@PageNumber*@RowsOfPage);

select * from Instruments

--6.	Продемонстрируйте применение функции ранжирования ROW_NUMBER() для удаления дубликатов.
INSERT INTO Instruments (InstrumentName, CategoryID, ManufacturerID, Availability, Cost) VALUES ('A', 1, 1, 1, 100);
select * from Instruments
WITH Duplicates AS
(
    SELECT 
        ROW_NUMBER() OVER(PARTITION BY InstrumentName ORDER BY InstrumentID) AS RowNum,
        InstrumentID
    FROM Instruments
)
DELETE FROM Duplicates WHERE RowNum > 1;



----7 Суммарные стоимости 6 последних заказов для каждого клиента
WITH NumberedSales AS (
  SELECT 
      s.UserID [client_id], 
      i.Cost,
      ROW_NUMBER() OVER(PARTITION BY s.UserID ORDER BY s.ReservationDate DESC) [RowNum]
    FROM Sold s 
    JOIN SoldItems si ON s.SoldID = si.SoldID
    JOIN Instruments i ON si.InstrumentID = i.InstrumentID
)
SELECT client_id, SUM(Cost) [total_6_last_sales_cost]
  FROM NumberedSales
  WHERE RowNum <= 6
  GROUP BY client_id
  ORDER BY client_id;


  select * from SoldItems si inner join Sold s 
  on si.SoldID = s.SoldID inner join Instruments i
  on si.InstrumentId = i.InstrumentID where UserId = 5 


--8 Какой инструмент был продан наибольшее количество раз для каждого клиента
WITH SoldInstruments AS (
    SELECT UserID, InstrumentID, COUNT(*) as SoldCount
    FROM SoldItems si
    JOIN Sold s ON si.SoldID = s.SoldID
    GROUP BY UserID, InstrumentID
),
Ranking AS (
    SELECT UserID, InstrumentID, SoldCount,
           RANK() OVER (PARTITION BY UserID ORDER BY SoldCount DESC) as Rank
    FROM SoldInstruments
)
SELECT r.UserID, r.InstrumentID, r.SoldCount
FROM Ranking r
WHERE r.Rank = 1;
