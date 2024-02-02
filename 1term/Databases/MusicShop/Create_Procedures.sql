-------------------------------------1. АНАЛИЗ ПРОДУКЦИИ------------------------------------------------------------

-----------------------------КОЛИЧЕСТВО ПРОДАННЫХ ИНСТРУМЕНТОВ-------------------------------------------------
CREATE OR REPLACE PROCEDURE CountSoldInstruments(p_StartDate DATE, p_EndDate DATE) AS 
  v_count NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_count FROM Orders
  WHERE ReservationDate BETWEEN p_StartDate AND p_EndDate;
  
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

-- Пример вызова процедуры с датами '2023-01-01' и '2023-12-31'
BEGIN
  CountSoldInstruments(TO_DATE('2023-05-05', 'YYYY-MM-DD'), TO_DATE('2023-12-31', 'YYYY-MM-DD'));
END;

truncate table Orders


-----------------------------ВСЯ ИНФОРМАЦИЯ О ПРОДАННЫХ ИНСТРУМЕНТАХ--------------------------------------------------------
CREATE OR REPLACE PROCEDURE ShowSoldInstruments AS
  v_count NUMBER := 0;
BEGIN
  FOR r IN (SELECT i.InstrumentID, i.InstrumentName, o.OrderID, o.ReservationDate
            FROM Instruments i
            JOIN Orders o ON i.InstrumentID = o.InstrumentID)
  LOOP
    DBMS_OUTPUT.PUT_LINE('InstrumentID: ' || r.InstrumentID || 
                         ', InstrumentName: ' || r.InstrumentName || 
                         ', OrderID: ' || r.OrderID || 
                         ', ReservationDate: ' || TO_CHAR(r.ReservationDate, 'DD-MM-YYYY'));
    v_count := v_count + 1;
  END LOOP;
  
  IF v_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('No sold instruments.');
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END ShowSoldInstruments;

BEGIN
    ShowSoldInstruments;
END;


-----------------------------ЗАКАЗ ИНСТРУМЕНТА------------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE ReserveInstrument(p_InstrumentID NUMBER, p_ReservationDate VARCHAR2) AS
  v_TotalInstruments NUMBER;
  v_Availability NUMBER;
  v_Date DATE;
BEGIN
  -- Преобразуем строку в дату
  v_Date := TO_DATE(p_ReservationDate, 'YYYY-MM-DD');
  
  -- Проверяем, есть ли записи в таблице Instruments
  SELECT COUNT(*) INTO v_TotalInstruments FROM Instruments;
  
  IF v_TotalInstruments = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: total instruments amount is ' || v_TotalInstruments);
    RETURN;
  END IF;
  
  -- Проверяем, что дата резервирования не больше текущей даты
  IF v_Date > SYSDATE THEN
    DBMS_OUTPUT.PUT_LINE('Error: reservation date cannot be in the future.');
    RETURN;
  END IF;
  
  -- Проверяем наличие конкретного инструмента
  SELECT Availability INTO v_Availability FROM Instruments WHERE InstrumentID = p_InstrumentID;
  
  IF v_Availability = 1 THEN
    -- Инструмент доступен для резервирования
    INSERT INTO Orders (InstrumentID, ReservationDate) VALUES (p_InstrumentID, v_Date);
    DBMS_OUTPUT.PUT_LINE('Instrument with ID ' || p_InstrumentID || ' successfully ordered.');
  ELSE
    -- Инструмент недоступен
    DBMS_OUTPUT.PUT_LINE('Instrument with ID ' || p_InstrumentID || ' unavailable for order.');
  END IF;
  
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Error: no instrument with such ID');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END ReserveInstrument;

-- Пример вызова процедуры без TO_DATE
BEGIN
  ReserveInstrument(3, '2023-05-05');
END;



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


BEGIN
  CountAllInstruments;
END; 



---------------------------------------------ПОПУЛЯРНЫЕ ИНСТРУМЕНТЫ------------------------------------------
CREATE OR REPLACE PROCEDURE ShowTopInstruments(p_TopCount NUMBER) AS
  v_count NUMBER := 0;
BEGIN
  FOR r IN (
    SELECT i.InstrumentID, i.InstrumentName, COUNT(o.InstrumentID) AS OrderCount
    FROM Instruments i
    JOIN Orders o ON i.InstrumentID = o.InstrumentID
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
BEGIN
  ShowTopInstruments(5);
END;
