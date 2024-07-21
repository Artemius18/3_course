CREATE TABLE Sales
(
    SaleDate DATE,
    Product VARCHAR(255),
    Amount INT
);

-- Вставка данных в таблицу Sales
INSERT INTO Sales (SaleDate, Product, Amount)
VALUES 
('2024-01-01', 'Product1', 100),
('2024-02-01', 'Product2', 200),
('2024-03-01', 'Product3', 300);


CREATE FUNCTION dbo.GetSalesData (@StartDate DATE, @EndDate DATE)
RETURNS TABLE
AS
RETURN
(
    SELECT SaleDate, Product, Amount
    FROM Sales
    WHERE SaleDate BETWEEN @StartDate AND @EndDate
);

SELECT * 
FROM dbo.GetSalesData('2024-01-01', '2024-01-03');
