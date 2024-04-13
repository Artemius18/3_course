drop INDEX idx_instrument_name
alter session set container = MusicShop

begin
    ctx_ddl.drop_preference('my_wordlist');
    ctx_ddl.drop_preference('my_lexer');
end;

begin
    ctx_ddl.create_preference ('my_wordlist', 'BASIC_WORDLIST');
    ctx_ddl.create_preference ('my_lexer', 'AUTO_LEXER');
    ctx_ddl.set_attribute ('my_lexer', 'INDEX_STEMS', 'YES');
end;


CREATE INDEX idx_instrument_name ON Instruments(InstrumentName)
INDEXTYPE IS CTXSYS.CONTEXT parameters ('LEXER my_lexer WORDLIST my_wordlist');


CREATE OR REPLACE PROCEDURE SearchInstruments(p_SearchString VARCHAR2) AS
  v_SearchString VARCHAR2(100);
  v_ResultCount NUMBER;
BEGIN
  IF LENGTH(p_SearchString) > 100 THEN
    DBMS_OUTPUT.PUT_LINE('Error: Input string is too long.');
    RETURN;
  END IF;

  v_SearchString := '%' || p_SearchString || '%';

  SELECT COUNT(*) INTO v_ResultCount FROM Instruments WHERE CONTAINS(InstrumentName, v_SearchString) > 0;

  IF v_ResultCount > 0 THEN
    FOR instrument_rec IN (
      SELECT * FROM Instruments WHERE CONTAINS(InstrumentName, v_SearchString) > 0
    ) LOOP
      DBMS_OUTPUT.PUT_LINE('InstrumentID: ' || instrument_rec.InstrumentID || ', InstrumentName: ' || instrument_rec.InstrumentName);
    END LOOP;
  ELSE
    DBMS_OUTPUT.PUT_LINE('No instruments found matching the search criteria.');
  END IF;
END SearchInstruments;


BEGIN
  SearchInstruments('or');
END;







