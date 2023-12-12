-- Создаем полнотекстовый индекс для столбца SongName
CREATE INDEX SONGNAME_TEXT_IDX
ON SONGS(SONG_NAME)
INDEXTYPE IS CTXSYS.CONTEXT;

CREATE INDEX SONGCOVER_TEXT_IDX
ON SONGS(SONG_COVER)
INDEXTYPE IS CTXSYS.CONTEXT;


DROP INDEX SONGNAME_TEXT_IDX;

drop index SONGCOVER_TEXT_IDX;
-- Создаем полнотекстовый индекс для столбца Author


-- Создание настроек для лексера
BEGIN
    ctx_ddl.create_preference('my_lexer', 'AUTO_LEXER');
    ctx_ddl.set_attribute('my_lexer', 'INDEX_STEMS', 'YES');
END;

-- Создание настроек для словника
BEGIN
    ctx_ddl.create_preference('my_wordlist', 'BASIC_WORDLIST');
END;


-- Создание индекса для SONG_NAME
CREATE INDEX song_name_text_idx
ON SONGS(SONG_NAME)
INDEXTYPE IS CTXSYS.CONTEXT
PARAMETERS ('LEXER my_lexer WORDLIST my_wordlist');

drop index  song_name_text_idx;


-- Создание индекса для SONG_COVER
CREATE INDEX song_cover_text_idx
ON SONGS(SONG_COVER)
INDEXTYPE IS CTXSYS.CONTEXT
PARAMETERS ('LEXER my_lexer WORDLIST my_wordlist');


SELECT *
FROM SONGS
WHERE CONTAINS(SONG_NAME, '%идти%') > 0;


CREATE OR REPLACE FUNCTION SearchSongs(p_search_term VARCHAR2)
RETURN SYS_REFCURSOR
IS
  RESULT_CURSOR SYS_REFCURSOR;
BEGIN
  OPEN RESULT_CURSOR FOR
    SELECT *
    FROM SONGS
    WHERE CONTAINS(SONG_NAME, '%' || p_search_term || '%', 1) > 0;

  RETURN RESULT_CURSOR;
END SearchSongs;


select * from SONGS;
--------------------------------------------------------
SELECT * FROM SONGS WHERE CONTAINS(SONG_NAME, '%ong1%', 1) > 0;

