-------------------------------------1. АНАЛИЗ ПРОДУКЦИИ------------------------------------------------------------
alter session set container = MusicShop


-----------------------------КОЛИЧЕСТВО ПРОДАННЫХ ИНСТРУМЕНТОВ В ДИАПАЗОНЕ ДВУХ ДАТ-------------------------------------------------

CREATE OR REPLACE PROCEDURE CountSoldInstruments(p_StartDate VARCHAR2, p_EndDate VARCHAR2) AS
  v_count NUMBER;
  v_StartDate DATE := TO_DATE(p_StartDate, 'YYYY-MM-DD');
  v_EndDate DATE := TO_DATE(p_EndDate, 'YYYY-MM-DD');
BEGIN
  SELECT COUNT(*) INTO v_count FROM Orders o
  JOIN OrderItems oi ON oi.OrderID = o.OrderID
  WHERE o.ReservationDate BETWEEN v_StartDate AND v_EndDate;

  IF v_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('No instruments sold in the specified period.');
  ELSE
    DBMS_OUTPUT.PUT_LINE('Amount of sold instruments in the specified period: ' || TO_CHAR(v_count));
  END IF;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Error: No data available for counting in the specified period.');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END CountSoldInstruments;



EXEC CountSoldInstruments('2023-12-18', '2023-12-31');

drop procedure CountSoldInstruments





-----------------------------ИНФОРМАЦИЯ О ПРОДАННЫХ ИНСТРУМЕНТАХ--------------------------------------------------------

CREATE OR REPLACE PROCEDURE GetSoldInstrumentsInfo AS
BEGIN
  DECLARE
    v_sold_count NUMBER;
  BEGIN
    SELECT COUNT(DISTINCT oi.InstrumentID)
    INTO v_sold_count
    FROM OrderItems oi;

    IF v_sold_count = 0 THEN
      DBMS_OUTPUT.PUT_LINE('No instruments have been sold.');
      RETURN;
    END IF;
  END;

  FOR r IN (
    SELECT o.OrderID, u.UserName AS Buyer, i.InstrumentName, COUNT(oi.InstrumentID) AS Quantity, o.ReservationDate
    FROM Orders o
    JOIN OrderItems oi ON o.OrderID = oi.OrderID
    JOIN Instruments i ON oi.InstrumentID = i.InstrumentID
    JOIN Users u ON o.UserID = u.UserID
    GROUP BY o.OrderID, u.UserName, i.InstrumentName, o.ReservationDate
    ORDER BY o.ReservationDate
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('OrderID: ' || r.OrderID ||
                         ', Buyer: ' || r.Buyer ||
                         ', Instrument: ' || r.InstrumentName ||
                         ', Quantity: ' || r.Quantity ||
                         ', Date: ' || TO_CHAR(r.ReservationDate, 'YYYY-MM-DD HH24:MI:SS'));
  END LOOP;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END GetSoldInstrumentsInfo;



EXEC GetSoldInstrumentsInfo

drop procedure GetSoldInstrumentsInfo



-----------------------------ЗАКАЗ ИНСТРУМЕНТА------------------------------------------------------------------------
CREATE OR REPLACE TYPE INSTRUMENTS_TABLE AS TABLE OF INT;

CREATE OR REPLACE PROCEDURE ReserveInstrument(p_UserID NUMBER, p_InstrumentIDs INSTRUMENTS_TABLE, p_ReservationDate VARCHAR2) AS
  v_TotalInstruments NUMBER;
  v_Availability NUMBER;
  v_Date DATE;
  v_OrderID NUMBER;
BEGIN
  v_Date := TO_DATE(p_ReservationDate, 'YYYY-MM-DD');

  SELECT COUNT(*) INTO v_TotalInstruments FROM Instruments;

  IF v_TotalInstruments = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: total instruments amount is ' || v_TotalInstruments);
    RETURN;
  END IF;

  IF v_Date > SYSDATE THEN
    DBMS_OUTPUT.PUT_LINE('Error: reservation date cannot be in the future.');
    RETURN;
  END IF;

  INSERT INTO Orders (UserID, ReservationDate) VALUES (p_UserID, v_Date)
  RETURNING OrderID INTO v_OrderID;

  FOR i IN p_InstrumentIDs.FIRST .. p_InstrumentIDs.LAST LOOP
    SELECT Availability INTO v_Availability FROM Instruments WHERE InstrumentID = p_InstrumentIDs(i);

    IF v_Availability = 1 THEN
      INSERT INTO OrderItems (OrderID, InstrumentID) VALUES (v_OrderID, p_InstrumentIDs(i));
      DBMS_OUTPUT.PUT_LINE('Instrument with ID ' || p_InstrumentIDs(i) || ' successfully ordered.');
    ELSE
      DBMS_OUTPUT.PUT_LINE('Instrument with ID ' || p_InstrumentIDs(i) || ' unavailable for order.');
    END IF;
  END LOOP;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Error: no instrument with such ID');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END ReserveInstrument;


DECLARE
  instrument_ids INSTRUMENTS_TABLE;
BEGIN
  instrument_ids := INSTRUMENTS_TABLE(1, 2); 
  ReserveInstrument(1, instrument_ids, '2023-12-18'); 
END;

select * from Orders
select * from OrderItems

delete from OrderItems

drop procedure ReserveInstrument




--------------------------------------------------ОБЩЕЕ КОЛИЧЕСТВО ИНСТРУМЕНТОВ------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE CountAllInstruments AS 
  v_count NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_count FROM Instruments;
  
  IF v_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('No instruments found.');
  ELSE
    DBMS_OUTPUT.PUT_LINE('Amount of all instruments: ' || TO_CHAR(v_count));
  END IF;
  
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Error: No data available for counting.');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END CountAllInstruments;




EXEC CountAllInstruments;

drop procedure CountAllInstruments






---------------------------------------------ПОПУЛЯРНЫЕ ИНСТРУМЕНТЫ------------------------------------------
CREATE OR REPLACE PROCEDURE ShowTopInstruments(p_TopCount NUMBER) AS
  v_count NUMBER := 0;
BEGIN
  FOR r IN (
    SELECT i.InstrumentID, i.InstrumentName, COUNT(oi.InstrumentID) AS OrderCount
    FROM Instruments i
    JOIN OrderItems oi ON i.InstrumentID = oi.InstrumentID
    GROUP BY i.InstrumentID, i.InstrumentName
    ORDER BY OrderCount DESC
    FETCH FIRST p_TopCount ROWS ONLY
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('InstrumentID: ' || r.InstrumentID ||
                         ', InstrumentName: ' || r.InstrumentName ||
                         ', OrdersCount: ' || r.OrderCount);
    v_count := v_count + 1;
  END LOOP;

  IF v_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: No popular instruments found.');
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END ShowTopInstruments;


-- Пример вызова процедуры для вывода топ-5 популярных инструментов
EXEC ShowTopInstruments(1);

drop procedure ShowTopInstruments





---------------------------------------------ВЫВЕСТИ ВСЕ ИНСТРУМЕНТЫ------------------------------------------
CREATE OR REPLACE PROCEDURE ShowAllInstruments AS 
BEGIN
  FOR r IN (SELECT * FROM Instruments ORDER BY InstrumentID) LOOP
    DBMS_OUTPUT.PUT_LINE('InstrumentID: ' || r.InstrumentID ||
                         ', InstrumentName: ' || r.InstrumentName ||
                         ', CategoryID: ' || r.CategoryID ||
                         ', ManufacturerID: ' || r.ManufacturerID ||
                         ', Availability: ' || r.Availability ||
                         ', Cost: ' || r.Cost);
  END LOOP;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('No instruments found.');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END ShowAllInstruments;

EXEC ShowAllInstruments 

drop procedure ShowAllInstruments




---------------------------------------------ОСТАВИТЬ ОТЗЫВ------------------------------------------
CREATE OR REPLACE PROCEDURE CreateReview(
    p_UserID NUMBER,
    p_InstrumentID NUMBER,
    p_ReviewText NVARCHAR2
) AS
    v_OrderID NUMBER;
BEGIN
    -- Проверка, заказывал ли пользователь такой инструмент
    SELECT o.OrderID INTO v_OrderID
    FROM Orders o
    JOIN OrderItems oi ON o.OrderID = oi.OrderID
    WHERE o.UserID = p_UserID AND oi.InstrumentID = p_InstrumentID;

    -- Если заказ не найден, выходим с ошибкой
    IF v_OrderID IS NULL THEN
        DBMS_OUTPUT.PUT_LINE('Error: User did not order the specified instrument.');
        RETURN;
    END IF;

    -- Вставка отзыва
    INSERT INTO InstrumentsReview (UserID, InstrumentID, ReviewText)
    VALUES (p_UserID, p_InstrumentID, p_ReviewText);

    DBMS_OUTPUT.PUT_LINE('Review successfully added.');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: Order not found for the specified user and instrument.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END CreateReview;

EXEC CreateReview(1, 2, 'fantastic!!!');


drop procedure CreateReview




---------------------------------------------ВЫВЕСТИ ВСЕ ОТЗЫВЫ------------------------------------------
CREATE OR REPLACE PROCEDURE ShowAllReviews AS
BEGIN
  FOR r IN (SELECT * FROM InstrumentsReview) LOOP
    DBMS_OUTPUT.PUT_LINE('ReviewID: ' || r.ReviewID ||
                         ', UserID: ' || r.UserID ||
                         ', InstrumentID: ' || r.InstrumentID ||
                         ', ReviewText: ' || r.ReviewText);
  END LOOP;

  IF SQL%NOTFOUND THEN
    DBMS_OUTPUT.PUT_LINE('No reviews found.');
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END ShowAllReviews;



EXEC ShowAllReviews;

drop procedure ShowAllReviews