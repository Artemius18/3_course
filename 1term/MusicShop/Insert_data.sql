--------------------------------ÈÌÏÎÐÒ ÄÀÍÍÛÕ ÈÇ JSON--------------------------------
CREATE OR REPLACE DIRECTORY UTL_DIR AS 'C:\MusicShop';
GRANT READ, WRITE ON DIRECTORY UTL_DIR TO public;


CREATE OR REPLACE PROCEDURE ImportInstrumentsFromJSON
IS
BEGIN
  FOR json_rec IN (SELECT InstrumentName, CategoryID, ManufacturerID, Availability, Cost
                   FROM JSON_TABLE(BFILENAME('UTL_DIR', 'Instruments.json'), '$[*]' 
                                  COLUMNS (
                                    InstrumentName VARCHAR2(50) PATH '$.InstrumentName',
                                    CategoryID NUMBER PATH '$.CategoryID',
                                    ManufacturerID NUMBER PATH '$.ManufacturerID',
                                    Availability NUMBER PATH '$.Availability',
                                    Cost NUMBER PATH '$.Cost'
                                  ))
                  )
  LOOP
    BEGIN
      INSERT INTO Instruments (InstrumentID, InstrumentName, CategoryID, ManufacturerID, Availability, Cost)
      VALUES (
        DEFAULT, -- Èñïîëüçóéòå DEFAULT äëÿ InstrumentID
        json_rec.InstrumentName,
        json_rec.CategoryID,
        json_rec.ManufacturerID,
        json_rec.Availability,
        json_rec.Cost
      );
    EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Instrument with the ID already exists.');
      WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error inserting Instrument: ' || SQLERRM);
        RAISE;
    END;
  END LOOP;
  COMMIT;
  DBMS_OUTPUT.PUT_LINE('Import completed successfully.');
END ImportInstrumentsFromJSON;




BEGIN
  ImportInstrumentsFromJSON;
END;



--------------------------------ÝÊÑÏÎÐÒ ÄÀÍÍÛÕ Â JSON--------------------------------
CREATE OR REPLACE PROCEDURE ExportInstrumentsToJSON
IS
  v_file UTL_FILE.FILE_TYPE;
BEGIN
  v_file := UTL_FILE.FOPEN('UTL_DIR', 'ExportInstruments.json', 'W');

  UTL_FILE.PUT_LINE(v_file, '[');

  FOR rec IN (SELECT InstrumentID, InstrumentName, CategoryID, ManufacturerID, Availability, Cost
              FROM Instruments
              ORDER BY InstrumentID)
  LOOP
    UTL_FILE.PUT_LINE(v_file, JSON_OBJECT(
                                  'InstrumentID' VALUE rec.InstrumentID,
                                  'InstrumentName' VALUE rec.InstrumentName,
                                  'CategoryID' VALUE rec.CategoryID,
                                  'ManufacturerID' VALUE rec.ManufacturerID,
                                  'Availability' VALUE rec.Availability,
                                  'Cost' VALUE rec.Cost
                                ) || ',');

  END LOOP;

  UTL_FILE.PUT_LINE(v_file, ']');
  UTL_FILE.FCLOSE(v_file);

  DBMS_OUTPUT.PUT_LINE('Export completed successfully.');
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error exporting data: ' || SQLERRM);
    IF UTL_FILE.IS_OPEN(v_file) THEN
      UTL_FILE.FCLOSE(v_file);
    END IF;
END ExportInstrumentsToJSON;




BEGIN
  ExportInstrumentsToJSON;
END;

