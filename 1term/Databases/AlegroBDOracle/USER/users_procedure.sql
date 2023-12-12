---------------------------------------------------------
--                                                     --
--           ПРОЦЕДУРЫ И ФУНКЦИИ ПОЛЬЗОВАТЕЛЯ          --
--                                                     --
---------------------------------------------------------
CREATE OR REPLACE PACKAGE SONG_MANAGEMENT_PACKAGE AS
    --ДОБАВЛЕНИЕ ПЕСНИ В СВОИ ПЕСНИ--
    FUNCTION ADD_SONG_TO_USERLIST(
        P_USER_ID IN NUMBER,
        P_SONG_ID IN NUMBER
    ) RETURN VARCHAR2;

    --УДАЛЕНИЕ ПЕСНИ ИЗ СВОИХ ПЕСЕН--
    FUNCTION REMOVESONGFROMPLAYLIST(
        P_USER_ID IN NUMBER,
        P_SONG_ID IN NUMBER
    ) RETURN VARCHAR2;

    -- Получить песни пользоваетля --
    FUNCTION GET_USER_SONGS(
        P_USER_ID IN NUMBER
    ) RETURN SYS_REFCURSOR;

    --ПРОСЛУШАТЬ ПЕСНЮ
    PROCEDURE LISTEN_TO_SONG(
        P_USER_ID IN NUMBER,
        P_SONG_ID IN NUMBER
    );
END SONG_MANAGEMENT_PACKAGE;
CREATE OR REPLACE PACKAGE BODY SONG_MANAGEMENT_PACKAGE AS
--ДОБАВЛЕНИЕ ПЕСНИ В СВОИ ПЕСНИ--
FUNCTION ADD_SONG_TO_USERLIST(
    P_USER_ID IN NUMBER,
    P_SONG_ID IN NUMBER
) RETURN VARCHAR2
IS
    V_SONG_EXISTS NUMBER;
    V_SONG_IN_PLAYLIST NUMBER;
BEGIN
    -- Проверяем существование песни
    SELECT COUNT(*)
    INTO V_SONG_EXISTS
    FROM SONGS
    WHERE SONG_ID = P_SONG_ID;

    IF V_SONG_EXISTS > 0 THEN
        -- Проверяем, есть ли уже эта песня в плейлисте пользователя
        SELECT COUNT(*)
        INTO V_SONG_IN_PLAYLIST
        FROM SONG_USER
        WHERE USER_ID = P_USER_ID AND SONG_ID = P_SONG_ID;

        IF V_SONG_IN_PLAYLIST = 0 THEN
            -- Песни нет в плейлисте, добавляем
            INSERT INTO SONG_USER (USER_ID, SONG_ID)
            VALUES (P_USER_ID, P_SONG_ID);

            COMMIT; -- Фиксируем изменения

            RETURN 'Song added to the playlist successfully.';
        ELSE
            -- Песня уже есть в плейлисте
            RETURN 'This song is already in your playlist.';
        END IF;
    ELSE
        -- Песня не найдена
        RETURN 'Song not found. Please provide a valid song ID.';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END ADD_SONG_TO_USERLIST;

--УДАЛЕНИЕ ПЕСНИ ИЗ СВОИХ ПЕСЕН--

FUNCTION REMOVESONGFROMPLAYLIST(
    P_USER_ID IN NUMBER,
    P_SONG_ID IN NUMBER
) RETURN VARCHAR2
IS
    V_SONG_EXISTS NUMBER;
    V_SONG_IN_PLAYLIST NUMBER;
BEGIN
    -- Проверяем существование песни
    SELECT COUNT(*)
    INTO V_SONG_EXISTS
    FROM SONGS
    WHERE SONG_ID = P_SONG_ID;

    IF V_SONG_EXISTS > 0 THEN
        -- Проверяем, есть ли эта песня в плейлисте пользователя
        SELECT COUNT(*)
        INTO V_SONG_IN_PLAYLIST
        FROM SONG_USER
        WHERE USER_ID = P_USER_ID AND SONG_ID = P_SONG_ID;

        IF V_SONG_IN_PLAYLIST > 0 THEN
            -- Песня найдена в плейлисте, удаляем
            DELETE FROM SONG_USER
            WHERE USER_ID = P_USER_ID AND SONG_ID = P_SONG_ID;

            COMMIT; -- Фиксируем изменения

            RETURN 'Song removed from the playlist successfully.';
        ELSE
            -- Песни нет в плейлисте
            RETURN 'This song is not in your playlist.';
        END IF;
    ELSE
        -- Песня не найдена
        RETURN 'Song not found. Please provide a valid song ID.';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END REMOVESONGFROMPLAYLIST;

-- Получить песни пользоваетля --

FUNCTION GET_USER_SONGS(
    P_USER_ID IN NUMBER
) RETURN SYS_REFCURSOR
IS
    V_CURSOR SYS_REFCURSOR;
BEGIN
    -- Возвращаем курсор с песнями пользователя
    OPEN V_CURSOR FOR
        SELECT S.SONG_ID, S.GENRE_ID, S.SONG, S.SONG_COVER, S.SONG_NAME, S.LISTENING_COUNTER, S.AUTHOR_ID
        FROM SONGS S
        WHERE S.AUTHOR_ID = P_USER_ID;

    RETURN V_CURSOR;
END GET_USER_SONGS;

--ПРОСЛУШАТЬ ПЕСНЮ
PROCEDURE LISTEN_TO_SONG(
   P_USER_ID IN NUMBER,
   P_SONG_ID IN NUMBER
)
IS
   V_MP3_PATH VARCHAR2(255);
BEGIN
   -- Увеличиваем счетчик прослушиваний
   UPDATE SONGS SET LISTENING_COUNTER = LISTENING_COUNTER + 1 WHERE SONG_ID = P_SONG_ID;
   INSERT INTO LISTENING_HISTORY (USER_ID, SONG_ID, AUDITION_DATE)
   VALUES (P_USER_ID, P_SONG_ID, SYSDATE);
   COMMIT ;

END LISTEN_TO_SONG;
END SONG_MANAGEMENT_PACKAGE;
--================================--
--СОЗДАНИЕ ПЛЕЙЛИСТА ПОЛЬЗОВАТЕЛЯ--
--================================--
CREATE OR REPLACE PACKAGE PLAYLIST_MANAGEMENT_PACKAGE AS
    -- Создание плейлиста пользователя
    FUNCTION CREATE_PLAYLIST(
        P_USER_ID IN NUMBER,
        P_PLAYLIST_NAME IN VARCHAR2,
        P_PLAYLIST_COVER IN VARCHAR2
    ) RETURN VARCHAR2;

    -- Удаление плейлиста пользователя
    FUNCTION DELETE_PLAYLIST(
        P_USER_ID IN NUMBER,
        P_PLAYLIST_NAME IN VARCHAR2
    ) RETURN VARCHAR2;

    -- Добавление песни в плейлист
    FUNCTION ADD_SONG_TO_PLAYLIST(
        P_USER_ID IN NUMBER,
        P_PLAYLIST_ID IN NUMBER,
        P_SONG_ID IN NUMBER
    ) RETURN VARCHAR2;

    -- Удаление песни из плейлиста
    FUNCTION REMOVE_SONG_FROM_PLAYLIST(
        P_USER_ID IN NUMBER,
        P_PLAYLIST_ID IN NUMBER,
        P_SONG_ID IN NUMBER
    ) RETURN VARCHAR2;

    -- Редактирование плейлиста
    FUNCTION EDIT_PLAYLIST(
        P_USER_ID IN NUMBER,
        P_PLAYLIST_ID IN NUMBER,
        P_CHANGES SYS.ODCIVARCHAR2LIST
    ) RETURN VARCHAR2;

    -- Получение песен из плейлиста
    FUNCTION GET_SONGS_FROM_PLAYLIST(
        P_USER_ID IN NUMBER,
        P_PLAYLIST_ID IN NUMBER
    ) RETURN SYS_REFCURSOR;

    -- Получение всех плейлистов пользователя
    FUNCTION GET_USER_PLAYLISTS(
        P_USER_ID IN NUMBER
    ) RETURN SYS_REFCURSOR;
END PLAYLIST_MANAGEMENT_PACKAGE;

CREATE OR REPLACE PACKAGE BODY PLAYLIST_MANAGEMENT_PACKAGE AS
FUNCTION CREATE_PLAYLIST(
    P_USER_ID IN NUMBER,
    P_PLAYLIST_NAME IN VARCHAR2,
    P_PLAYLIST_COVER IN VARCHAR2
) RETURN VARCHAR2
IS
    V_PLAYLIST_COUNT NUMBER;

BEGIN
    -- Проверяем, существует ли уже плейлист с таким именем у пользователя
    SELECT COUNT(*)
    INTO V_PLAYLIST_COUNT
    FROM PLAYLIST
    WHERE USER_ID = P_USER_ID AND PLAYLIST_NAME = P_PLAYLIST_NAME;

    IF V_PLAYLIST_COUNT = 0 THEN
        -- Плейлист с таким именем не существует, создаем новый
        INSERT INTO PLAYLIST (USER_ID, PLAYLIST_NAME, PLAYLIST_COVER)
        VALUES (P_USER_ID, P_PLAYLIST_NAME, P_PLAYLIST_COVER);

        COMMIT; -- Фиксируем изменения

        RETURN 'Playlist created successfully.';
    ELSE
        -- Плейлист с таким именем уже существует
        RETURN 'Playlist with this name already exists. Please choose a different name.';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END CREATE_PLAYLIST;

-- УДАЛЕНИЕ ПЛЕЙЛИСТА ПОЛЬЗОВАТЕЛЯ --

FUNCTION DELETE_PLAYLIST(
    P_USER_ID IN NUMBER,
    P_PLAYLIST_NAME IN VARCHAR2
) RETURN VARCHAR2
IS
    V_PLAYLIST_COUNT NUMBER;

BEGIN
    -- Проверяем, существует ли плейлист с таким именем у пользователя
    SELECT COUNT(*)
    INTO V_PLAYLIST_COUNT
    FROM PLAYLIST
    WHERE USER_ID = P_USER_ID AND PLAYLIST_NAME = P_PLAYLIST_NAME;

    IF V_PLAYLIST_COUNT > 0 THEN
        -- Удаляем плейлист
        DELETE FROM PLAYLIST
        WHERE USER_ID = P_USER_ID AND PLAYLIST_NAME = P_PLAYLIST_NAME;

        COMMIT; -- Фиксируем изменения

        RETURN 'Playlist deleted successfully.';
    ELSE
        -- Плейлист с таким именем не найден
        RETURN 'Playlist not found. Please provide a valid playlist name.';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END DELETE_PLAYLIST;

--Добавление песни в плейлист--

FUNCTION ADD_SONG_TO_PLAYLIST(
    P_USER_ID IN NUMBER,
    P_PLAYLIST_ID IN NUMBER,
    P_SONG_ID IN NUMBER
) RETURN VARCHAR2
IS
    V_PLAYLIST_COUNT NUMBER;
    V_SONG_EXISTS NUMBER;
BEGIN
    -- Проверяем, существует ли плейлист
    SELECT COUNT(*)
    INTO V_PLAYLIST_COUNT
    FROM PLAYLIST
    WHERE PLAYLIST_ID = P_PLAYLIST_ID AND USER_ID = P_USER_ID;

    IF V_PLAYLIST_COUNT > 0 THEN
        -- Проверяем, существует ли песня
        SELECT COUNT(*)
        INTO V_SONG_EXISTS
        FROM SONGS
        WHERE SONG_ID = P_SONG_ID;

        IF V_SONG_EXISTS > 0 THEN
            -- Проверяем, есть ли уже эта песня в плейлисте
            SELECT COUNT(*)
            INTO V_PLAYLIST_COUNT
            FROM PLAYLIST_SONG
            WHERE PLAYLIST_ID = P_PLAYLIST_ID AND SONG_ID = P_SONG_ID;

            IF V_PLAYLIST_COUNT = 0 THEN
                -- Песни нет в плейлисте, добавляем
                INSERT INTO PLAYLIST_SONG (PLAYLIST_ID, SONG_ID)
                VALUES (P_PLAYLIST_ID, P_SONG_ID);

                COMMIT; -- Фиксируем изменения

                RETURN 'Song added to the playlist successfully.';
            ELSE
                -- Песня уже есть в плейлисте
                RETURN 'This song is already in the playlist.';
            END IF;
        ELSE
            -- Песня не найдена
            RETURN 'Song not found. Please provide a valid song ID.';
        END IF;
    ELSE
        -- Плейлист не найден
        RETURN 'Playlist not found. Please provide a valid playlist ID.';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END ADD_SONG_TO_PLAYLIST;

--Удаление песни из плейлиста--

FUNCTION REMOVE_SONG_FROM_PLAYLIST(
    P_USER_ID IN NUMBER,
    P_PLAYLIST_ID IN NUMBER,
    P_SONG_ID IN NUMBER
) RETURN VARCHAR2
IS
    V_PLAYLIST_COUNT NUMBER;
BEGIN
    -- Проверяем, существует ли плейлист
    SELECT COUNT(*)
    INTO V_PLAYLIST_COUNT
    FROM PLAYLIST
    WHERE PLAYLIST_ID = P_PLAYLIST_ID AND USER_ID = P_USER_ID;

    IF V_PLAYLIST_COUNT > 0 THEN
        -- Проверяем, существует ли песня в плейлисте
        SELECT COUNT(*)
        INTO V_PLAYLIST_COUNT
        FROM PLAYLIST_SONG
        WHERE PLAYLIST_ID = P_PLAYLIST_ID AND SONG_ID = P_SONG_ID;

        IF V_PLAYLIST_COUNT > 0 THEN
            -- Удаляем песню из плейлиста
            DELETE FROM PLAYLIST_SONG
            WHERE PLAYLIST_ID = P_PLAYLIST_ID AND SONG_ID = P_SONG_ID;

            COMMIT; -- Фиксируем изменения

            RETURN 'Song removed from the playlist successfully.';
        ELSE
            -- Песня не найдена в плейлисте
            RETURN 'Song not found in the playlist. Please provide a valid song ID.';
        END IF;
    ELSE
        -- Плейлист не найден
        RETURN 'Playlist not found. Please provide a valid playlist ID.';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END REMOVE_SONG_FROM_PLAYLIST;

-- Редактирование плейлиста --
FUNCTION EDIT_PLAYLIST(
    P_USER_ID IN NUMBER,
    P_PLAYLIST_ID IN NUMBER,
    P_CHANGES SYS.ODCIVARCHAR2LIST
) RETURN VARCHAR2
IS
    V_PLAYLIST_COUNT NUMBER;
    V_NEW_NAME VARCHAR2(50);
    V_NEW_COVER VARCHAR2(100);
    I NUMBER := 1; -- начальное значение индекса

BEGIN
    -- Инициализируем переменные значениями по умолчанию
    V_NEW_NAME := NULL;
    V_NEW_COVER := NULL;

    -- Извлекаем значения из ассоциативного массива
    WHILE I <= P_CHANGES.COUNT
    LOOP
        CASE P_CHANGES(I)
            WHEN 'NAME' THEN
                V_NEW_NAME := P_CHANGES(I + 1);
                I := I + 2; -- увеличиваем индекс на 2, чтобы пропустить следующий элемент
            WHEN 'COVER' THEN
                V_NEW_COVER := P_CHANGES(I + 1);
                I := I + 2; -- увеличиваем индекс на 2, чтобы пропустить следующий элемент
        END CASE;
    END LOOP;

    -- Проверяем, существует ли плейлист
    SELECT COUNT(*)
    INTO V_PLAYLIST_COUNT
    FROM PLAYLIST
    WHERE PLAYLIST_ID = P_PLAYLIST_ID AND USER_ID = P_USER_ID;

    IF V_PLAYLIST_COUNT > 0 THEN
        -- Плейлист найден, обновляем информацию
        UPDATE PLAYLIST
        SET
            PLAYLIST_NAME = COALESCE(V_NEW_NAME, PLAYLIST_NAME),
            PLAYLIST_COVER = COALESCE(V_NEW_COVER, PLAYLIST_COVER)
        WHERE PLAYLIST_ID = P_PLAYLIST_ID AND USER_ID = P_USER_ID;

        COMMIT; -- Фиксируем изменения

        RETURN 'Playlist updated successfully.';
    ELSE
        -- Плейлист не найден
        RETURN 'Playlist not found. Please provide a valid playlist ID.';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END EDIT_PLAYLIST;

--получать песни из плейлиста--
FUNCTION GET_SONGS_FROM_PLAYLIST(
    P_USER_ID IN NUMBER,
    P_PLAYLIST_ID IN NUMBER
) RETURN SYS_REFCURSOR
IS
    V_PLAYLIST_EXISTS NUMBER;
    V_CURSOR SYS_REFCURSOR;
BEGIN
    -- Проверяем существование плейлиста у пользователя
    SELECT COUNT(*)
    INTO V_PLAYLIST_EXISTS
    FROM PLAYLIST
    WHERE PLAYLIST_ID = P_PLAYLIST_ID AND USER_ID = P_USER_ID;

    IF V_PLAYLIST_EXISTS = 0 THEN
        RETURN NULL;
    END IF;

    -- Возвращаем курсор с песнями из плейлиста
    OPEN V_CURSOR FOR
        SELECT S.SONG_ID, S.GENRE_ID, S.SONG, S.SONG_COVER, S.SONG_NAME, S.LISTENING_COUNTER, S.AUTHOR_ID
        FROM SONGS S
        JOIN PLAYLIST_SONG PS ON S.SONG_ID = PS.SONG_ID
        WHERE PS.PLAYLIST_ID = P_PLAYLIST_ID;

    RETURN V_CURSOR;
END GET_SONGS_FROM_PLAYLIST;

--получение всех плейлистов --
FUNCTION GET_USER_PLAYLISTS(
    P_USER_ID IN NUMBER
) RETURN SYS_REFCURSOR
IS
    V_CURSOR SYS_REFCURSOR;
BEGIN
    OPEN V_CURSOR FOR
        SELECT PLAYLIST_ID, PLAYLIST_NAME, PLAYLIST_COVER
        FROM PLAYLIST
        WHERE USER_ID = P_USER_ID;

    RETURN V_CURSOR;
END GET_USER_PLAYLISTS;
END PLAYLIST_MANAGEMENT_PACKAGE;
--================================--
--Пользователь и альбомы
--================================--
CREATE OR REPLACE PACKAGE USER_ALBUM_PACKAGE AS
  -- Подписка на альбом
  FUNCTION SUBSCRIBE_TO_ALBUM(P_USER_ID IN NUMBER, P_ALBUM_ID IN NUMBER) RETURN VARCHAR2;
  -- Отписка от альбома
  FUNCTION UNSUBSCRIBE_FROM_ALBUM(P_USER_ID IN NUMBER, P_ALBUM_ID IN NUMBER) RETURN VARCHAR2;
  -- Получить песни альбома
  FUNCTION GET_SONGS_FROM_ALBUM(P_ALBUM_ID IN NUMBER) RETURN SYS_REFCURSOR;
  -- Получить альбомы пользователя
  FUNCTION GET_USER_ALBUMS(P_USER_ID IN NUMBER) RETURN SYS_REFCURSOR;

END USER_ALBUM_PACKAGE;
CREATE OR REPLACE PACKAGE BODY USER_ALBUM_PACKAGE AS
--Подписка на альбом --
FUNCTION SUBSCRIBE_TO_ALBUM(
    P_USER_ID IN NUMBER,
    P_ALBUM_ID IN NUMBER
) RETURN VARCHAR2
IS
    V_USER_EXISTS NUMBER;
    V_ALBUM_EXISTS NUMBER;
    V_ALREADY_SUBSCRIBED NUMBER;
BEGIN
    -- Проверяем существование пользователя
    SELECT COUNT(*)
    INTO V_USER_EXISTS
    FROM USERS
    WHERE USER_ID = P_USER_ID;

    IF V_USER_EXISTS = 0 THEN
        RETURN 'User not found. Please provide a valid user ID.';
    END IF;

    -- Проверяем существование альбома
    SELECT COUNT(*)
    INTO V_ALBUM_EXISTS
    FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    IF V_ALBUM_EXISTS = 0 THEN
        RETURN 'Album not found. Please provide a valid album ID.';
    END IF;

    -- Проверяем, не подписан ли пользователь уже на этот альбом (если нужно)
    SELECT COUNT(*)
    INTO V_ALREADY_SUBSCRIBED
    FROM ALBUM_USER
    WHERE USER_ID = P_USER_ID AND ALBUM_ID = P_ALBUM_ID;

    IF V_ALREADY_SUBSCRIBED > 0 THEN
        RETURN 'User is already subscribed to this album.';
    END IF;

    -- Подписываем пользователя на альбом
    INSERT INTO ALBUM_USER (USER_ID, ALBUM_ID)
    VALUES (P_USER_ID, P_ALBUM_ID);

    COMMIT; -- Фиксируем изменения

    RETURN 'User subscribed to the album successfully.';
EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END SUBSCRIBE_TO_ALBUM;

-- Отписка от Альбома --
FUNCTION UNSUBSCRIBE_FROM_ALBUM(
    P_USER_ID IN NUMBER,
    P_ALBUM_ID IN NUMBER
) RETURN VARCHAR2
IS
    V_USER_EXISTS NUMBER;
    V_ALBUM_EXISTS NUMBER;
    V_SUBSCRIBED NUMBER;
BEGIN
    -- Проверяем существование пользователя
    SELECT COUNT(*)
    INTO V_USER_EXISTS
    FROM USERS
    WHERE USER_ID = P_USER_ID;

    IF V_USER_EXISTS = 0 THEN
        RETURN 'User not found. Please provide a valid user ID.';
    END IF;

    -- Проверяем существование альбома
    SELECT COUNT(*)
    INTO V_ALBUM_EXISTS
    FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    IF V_ALBUM_EXISTS = 0 THEN
        RETURN 'Album not found. Please provide a valid album ID.';
    END IF;

    -- Проверяем, подписан ли пользователь на этот альбом
    SELECT COUNT(*)
    INTO V_SUBSCRIBED
    FROM ALBUM_USER
    WHERE USER_ID = P_USER_ID AND ALBUM_ID = P_ALBUM_ID;

    IF V_SUBSCRIBED = 0 THEN
        RETURN 'User is not subscribed to this album.';
    END IF;

    -- Отписываем пользователя от альбома
    DELETE FROM ALBUM_USER
    WHERE USER_ID = P_USER_ID AND ALBUM_ID = P_ALBUM_ID;

    COMMIT; -- Фиксируем изменения

    RETURN 'User unsubscribed from the album successfully.';
EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        RETURN 'Error: ' || SQLCODE || ' - ' || SQLERRM;
END UNSUBSCRIBE_FROM_ALBUM;

-- Получить песни альбома --

FUNCTION GET_SONGS_FROM_ALBUM(
    P_ALBUM_ID IN NUMBER
) RETURN SYS_REFCURSOR
IS
    V_ALBUM_EXISTS NUMBER;
    V_CURSOR SYS_REFCURSOR;
BEGIN
    -- Проверяем существование альбома
    SELECT COUNT(*)
    INTO V_ALBUM_EXISTS
    FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    IF V_ALBUM_EXISTS = 0 THEN
        RETURN NULL;
    END IF;

    -- Возвращаем курсор с песнями из альбома
    OPEN V_CURSOR FOR
    SELECT S.SONG_ID, S.GENRE_ID, S.SONG, S.SONG_COVER, S.SONG_NAME, S.LISTENING_COUNTER, S.AUTHOR_ID
    FROM SONGS S
    JOIN ALBUM_SONG ASG ON S.SONG_ID = ASG.SONG_ID
    WHERE ASG.ALBUM_ID = P_ALBUM_ID;

    RETURN V_CURSOR;
END GET_SONGS_FROM_ALBUM;

--Получить альбомы на которые подписан пользователь--
FUNCTION GET_USER_ALBUMS(
    P_USER_ID IN NUMBER
) RETURN SYS_REFCURSOR
IS
    V_CURSOR SYS_REFCURSOR;
BEGIN
    -- Возвращаем курсор с альбомами пользователя
    OPEN V_CURSOR FOR
        SELECT A.ALBUM_ID, A.ALBUM_COVER, A.RELEASE_DATE, A.ALBUM_NAME
        FROM ALBUMS A
        JOIN ALBUM_USER AU ON A.ALBUM_ID = AU.ALBUM_ID
        WHERE AU.USER_ID = P_USER_ID;

    RETURN V_CURSOR;
END GET_USER_ALBUMS;
END USER_ALBUM_PACKAGE;

--------
--Тест
SELECT * FROM  SONGS;
SELECT * FROM  SONG_USER;
SELECT  * FROM USERS;

DECLARE
    Result VARCHAR2(200);
BEGIN
    Result := CREATEPLAYLIST(1, 'Imba', 'ddddd');
    DBMS_OUTPUT.PUT_LINE(Result);
END;

SELECT * FROM PLAYLIST;

DECLARE
    Result VARCHAR2(200);
BEGIN
    Result := DELETEPLAYLIST(1, 'Imba');
    DBMS_OUTPUT.PUT_LINE(Result);
END;

DECLARE
    Result VARCHAR2(200);
BEGIN
    Result := ADDSONGTOPLAYLIST(1, 1, 22);
    DBMS_OUTPUT.PUT_LINE(Result);
END;

DECLARE
    Result VARCHAR2(200);
BEGIN
    Result := REMOVESONGFROMPLAYLIST(1, 1, 22);
    DBMS_OUTPUT.PUT_LINE(Result);
END;


DECLARE
    V_RESULT VARCHAR2(100);
BEGIN
    V_RESULT := EDITPLAYLIST(
        P_USER_ID => 1,
        P_PLAYLIST_ID => 1,
        P_CHANGES => SYS.ODCIVARCHAR2LIST('COVER', 'FFFF')
    );
    DBMS_OUTPUT.PUT_LINE(V_RESULT);
END;

DECLARE
    V_CURSOR SYS_REFCURSOR;
    V_SONG_ID NUMBER;
    V_GENRE_ID NUMBER;
    V_SONG VARCHAR2(200);
    V_SONG_COVER VARCHAR2(200);
    V_SONG_NAME VARCHAR2(50);
    V_LISTENING_COUNTER NUMBER;
    V_AUTHOR_ID NUMBER;
BEGIN
    V_CURSOR := GET_USER_SONGS(1); -- Замените 1 на актуальный ID пользователя

    -- Ваш код для обработки курсора
    LOOP
        FETCH V_CURSOR INTO V_SONG_ID, V_GENRE_ID, V_SONG, V_SONG_COVER, V_SONG_NAME, V_LISTENING_COUNTER, V_AUTHOR_ID;
        EXIT WHEN V_CURSOR%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE('SONG_ID: ' || V_SONG_ID || ', SONG_NAME: ' || V_SONG_NAME);
        -- Дополнительная обработка, если необходимо
    END LOOP;

    -- Закрытие курсора
    CLOSE V_CURSOR;
END;
/


select  * from  PLAYLIST_SONG;
select  * from  SONG_USER;
select  * from  PLAYLIST;
select  * from  SONGS;
select  * from  USERS;
--------

create or replace function GET_ITEMS_BY_ORDER(ID_SONG INT) RETURN TABLE_ORDER_ITEM IS
        V_RESULT TABLE_ORDER_ITEM := TABLE_ORDER_ITEM();
    BEGIN
        SELECT RECORD_SONG_ITEM(
            SONG_ID,
            GENRE_ID,
            SONG,
            SONG_COVER,
            SONG_NAME,
            LISTENING_COUNTER,
            AUTHOR_ID
                   ) BULK COLLECT
        INTO V_RESULT
        FROM SONGS
        WHERE SONG_ID = ID_SONG;

        RETURN V_RESULT;
    END GET_ITEMS_BY_ORDER;

create or replace function GET_MUSIC RETURN TABLE_ORDER_ITEM IS
        V_RESULT TABLE_ORDER_ITEM := TABLE_ORDER_ITEM();
    BEGIN
        SELECT RECORD_SONG_ITEM(
            SONG_ID,
            GENRE_ID,
            SONG,
            SONG_COVER,
            SONG_NAME,
            LISTENING_COUNTER,
            AUTHOR_ID
                   ) BULK COLLECT
        INTO V_RESULT
        FROM SONGS;

        RETURN V_RESULT;
    END GET_MUSIC;

    CREATE OR REPLACE TYPE RECORD_SONG_ITEM AS OBJECT
(
    SONG_ID NUMBER,
    GENRE_ID NUMBER,
    SONG VARCHAR2(200),
    SONG_COVER VARCHAR2(200),
    SONG_NAME VARCHAR2(50),
    LISTENING_COUNTER NUMBER,
    AUTHOR_ID NUMBER
);

CREATE OR REPLACE TYPE TABLE_ORDER_ITEM AS TABLE OF RECORD_SONG_ITEM;


SELECT *
FROM TABLE(GET_ITEMS_BY_ORDER(2));

SELECT *
FROM TABLE(GET_MUSIC());



select * from  LISTENING_HISTORY;

