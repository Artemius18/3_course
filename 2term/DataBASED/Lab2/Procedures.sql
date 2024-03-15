CREATE PROCEDURE CountAllInstruments
AS
BEGIN
    DECLARE @v_count INT;

    SELECT @v_count = COUNT(*) FROM Instruments;

    IF @v_count = 0
    BEGIN
        PRINT 'No instruments found.';
    END
    ELSE
    BEGIN
        PRINT 'Amount of all instruments: ' + CAST(@v_count AS NVARCHAR);
    END

END;

EXEC CountAllInstruments