-----------------------------ДОБАВЛЕНИЕ ИНСТРУМЕНТА-------------------------------------------------
CREATE OR REPLACE PROCEDURE InsertInstrument(
    p_InstrumentName IN NVARCHAR2,
    p_CategoryID IN NUMBER,
    p_ManufacturerID IN NUMBER,
    p_Availability IN NUMBER,
    p_Cost in NVARCHAR2
)
IS
  v_category_count NUMBER;
  v_manufacturer_count NUMBER;
  v_cost NUMBER;
BEGIN
  -- Проверка наличия категории
  SELECT COUNT(*) INTO v_category_count FROM Categories WHERE CategoryID = p_CategoryID;

  IF v_category_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Category does not exist.');
    RETURN;
  END IF;

  -- Проверка наличия производителя
  SELECT COUNT(*) INTO v_manufacturer_count FROM Manufacturers WHERE ManufacturerID = p_ManufacturerID;

  IF v_manufacturer_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Manufacturer does not exist.');
    RETURN;
  END IF;

  -- Проверка значения Availability
  IF p_Availability NOT IN (0, 1) THEN
    DBMS_OUTPUT.PUT_LINE('Error: Availability must be either 0 or 1.');
    RETURN;
  END IF;

  -- Преобразование строки в число для Cost
  v_cost := TO_NUMBER(p_Cost);

  -- Проверка значения Cost
  IF v_cost <= 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Cost must be greater than 0.');
    RETURN;
  END IF;

  -- Вставка данных
  INSERT INTO Instruments (InstrumentName, CategoryID, ManufacturerID, Availability, Cost)
  VALUES (p_InstrumentName, p_CategoryID, p_ManufacturerID, p_Availability, v_cost); 
 DBMS_OUTPUT.PUT_LINE('Instrument ' || p_InstrumentName || ' was successfully added');

  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
    RAISE;
END InsertInstrument;





BEGIN
  InsertInstrument(
    'ExampleInstrument',  -- Имя инструмента
    7,                     -- CategoryID
    8,                     -- ManufacturerID
    1,                     -- Availability
    '1000,45'                -- Cost
  );
END;

select * from instruments where InstrumentName = 'ExampleInstrument'
delete from instruments where InstrumentName = 'ExampleInstrument'



-----------------------------УДАЛЕНИЕ ИНСТРУМЕНТА-------------------------------------------------
CREATE OR REPLACE PROCEDURE DeleteInstrument(
    p_InstrumentID IN NUMBER
)
IS
  v_instrument_count NUMBER;
BEGIN
  -- Проверка наличия инструмента
  SELECT COUNT(*) INTO v_instrument_count FROM Instruments WHERE InstrumentID = p_InstrumentID;

  IF v_instrument_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Instrument with ID ' || p_InstrumentID || ' does not exist.');
    RETURN;
  END IF;

  -- Удаление инструмента
  DELETE FROM Instruments WHERE InstrumentID = p_InstrumentID;
  DBMS_OUTPUT.PUT_LINE('Instrument with ID ' || p_InstrumentID || ' successfully deleted');
  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
    RAISE;
END DeleteInstrument;


BEGIN
  DeleteInstrument(100000); 
END;



-----------------------------ИЗМЕНЕНИЕ ИНСТРУМЕНТА-------------------------------------------------
CREATE OR REPLACE PROCEDURE UpdateInstrument(
    p_InstrumentID IN NUMBER,
    p_InstrumentName IN NVARCHAR2,
    p_CategoryID IN NUMBER,
    p_ManufacturerID IN NUMBER,
    p_Availability IN NUMBER,
    p_Cost IN NVARCHAR2
)
IS
  v_category_count NUMBER;
  v_manufacturer_count NUMBER;
  v_cost NUMBER;
  v_instrument_count NUMBER;
BEGIN
  -- Проверка наличия инструмента
  SELECT COUNT(*) INTO v_instrument_count FROM Instruments WHERE InstrumentID = p_InstrumentID;

  IF v_instrument_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Instrument with ID ' || p_InstrumentID || ' does not exist.');
    RETURN;
  END IF;

  -- Проверка наличия категории
  SELECT COUNT(*) INTO v_category_count FROM Categories WHERE CategoryID = p_CategoryID;

  IF v_category_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Category does not exist.');
    RETURN;
  END IF;

  -- Проверка наличия производителя
  SELECT COUNT(*) INTO v_manufacturer_count FROM Manufacturers WHERE ManufacturerID = p_ManufacturerID;

  IF v_manufacturer_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Manufacturer does not exist.');
    RETURN;
  END IF;

  -- Проверка значения Availability
  IF p_Availability NOT IN (0, 1) THEN
    DBMS_OUTPUT.PUT_LINE('Error: Availability must be either 0 or 1.');
    RETURN;
  END IF;

  -- Преобразование строки в число для Cost с обработкой ошибок
    v_cost := TO_NUMBER(p_Cost);

  -- Проверка значения Cost
  IF v_cost <= 0 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Cost must be greater than 0.');
    RETURN;
  END IF;

  -- Изменение данных об инструменте
  UPDATE Instruments
  SET
    InstrumentName = p_InstrumentName,
    CategoryID = p_CategoryID,
    ManufacturerID = p_ManufacturerID,
    Availability = p_Availability,
    Cost = v_cost
  WHERE InstrumentID = p_InstrumentID;
  DBMS_OUTPUT.PUT_LINE('Instrument with ID ' || p_InstrumentID || ' was successfully updated');
  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
    RAISE;
END UpdateInstrument;




BEGIN
  UpdateInstrument(
    1,                    -- InstrumentID, 
    'UpdatedInstrument',   -- Новое имя инструмента
    7,                     -- Новый CategoryID
    8,                     -- Новый ManufacturerID
    1,                     -- Новое Availability
    '1500,99'               -- Новая Cost
  );
END;

select * from instruments where InstrumentID = 1