CREATE OR REPLACE PACKAGE SONGWRITER_ALBUM_PACKAGE AS
    -- ==================================
    -- Создание альбома
    -- ==================================
    PROCEDURE CREATE_ALBUM(
        P_USER_ID IN NUMBER,
        P_ALBUM_NAME IN VARCHAR2,
        P_ALBUM_COVER IN VARCHAR2
    );
    -- ==================================
    -- Удаление альбома
    -- ==================================
    PROCEDURE DELETE_ALBUM(
        P_USER_ID IN NUMBER,
        P_ALBUM_ID IN NUMBER
    );
    -- ==================================
    -- Добавление песни в альбом
    -- ==================================
    PROCEDURE ADD_SONG_TO_ALBUM(
        P_USER_ID IN NUMBER,
        P_ALBUM_ID IN NUMBER,
        P_SONG_ID IN NUMBER
    );
    -- ==================================
    -- Удаление песни из альбома
    -- ==================================
    PROCEDURE REMOVE_SONG_FROM_ALBUM(
        P_SONG_ID IN NUMBER,
        P_ALBUM_ID IN NUMBER,
        P_USER_ID IN NUMBER
    );
    -- ==================================
    -- Проверка принадлежности альбома пользователю
    -- ==================================
    FUNCTION ALBUM_BELONGS_TO_USER(
        P_ALBUM_ID IN NUMBER,
        P_USER_ID IN NUMBER
    ) RETURN BOOLEAN;
END SONGWRITER_ALBUM_PACKAGE;

CREATE OR REPLACE PACKAGE BODY SONGWRITER_ALBUM_PACKAGE AS
PROCEDURE CREATE_ALBUM(
    P_USER_ID IN NUMBER,
    P_ALBUM_NAME IN VARCHAR2,
    P_ALBUM_COVER IN VARCHAR2
)
AS
    V_ALBUM_COUNT NUMBER;
    V_ALBUM_ID NUMBER;
BEGIN
    -- Проверяем, существует ли уже альбом с таким именем у пользователя
    SELECT COUNT(*)
    INTO V_ALBUM_COUNT
    FROM ALBUMS
    WHERE ALBUM_NAME = P_ALBUM_NAME;

    IF V_ALBUM_COUNT = 0 THEN
        -- Альбом с таким именем не существует, создаем новый
        INSERT INTO ALBUMS (ALBUM_COVER, RELEASE_DATE, ALBUM_NAME, UPLOAD_DATE)
        VALUES (P_ALBUM_COVER, SYSDATE, P_ALBUM_NAME, SYSDATE)
        RETURNING ALBUM_ID INTO V_ALBUM_ID;

        -- Создаем связь с пользователем
        INSERT INTO ALBUM_USER (USER_ID, ALBUM_ID)
        VALUES (P_USER_ID, V_ALBUM_ID);

        COMMIT; -- Фиксируем изменения
        DBMS_OUTPUT.PUT_LINE('Album created successfully and linked to the user.');
    ELSE
        -- Альбом с таким именем уже существует
        DBMS_OUTPUT.PUT_LINE('Album with this name already exists. Please choose a different name.');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
END CREATE_ALBUM;



-- ==================================
-- Удаление альбома
-- ==================================
PROCEDURE DELETE_ALBUM(
    P_USER_ID IN NUMBER,
    P_ALBUM_ID IN NUMBER
)
AS
    V_ALBUM_COUNT NUMBER;
BEGIN
    -- Проверяем, существует ли альбом
    SELECT COUNT(*)
    INTO V_ALBUM_COUNT
    FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    IF V_ALBUM_COUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('Album not found. Please provide a valid album ID.');
        RETURN;
    END IF;
    -- Проверяем, принадлежит ли альбом пользователю
    IF NOT ALBUM_BELONGS_TO_USER(P_ALBUM_ID, P_USER_ID) THEN
        DBMS_OUTPUT.PUT_LINE('Album does not belong to the user.');
        RETURN;
    END IF;
    -- Удаляем альбом
    DELETE FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    COMMIT; -- Фиксируем изменения
    DBMS_OUTPUT.PUT_LINE('Album deleted successfully.');

EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
END DELETE_ALBUM;

-- ==================================
-- Добавление песни в альбом
-- ==================================
PROCEDURE ADD_SONG_TO_ALBUM(
    P_USER_ID IN NUMBER,
    P_ALBUM_ID IN NUMBER,
    P_SONG_ID IN NUMBER
)
AS
    V_ALBUM_COUNT NUMBER;
    V_SONG_EXISTS NUMBER;
BEGIN
    -- Проверяем, существует ли альбом у пользователя
    SELECT COUNT(*)
    INTO V_ALBUM_COUNT
    FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    IF V_ALBUM_COUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('Album not found. Please provide a valid album ID.');
        RETURN;
    END IF;

    IF NOT ALBUM_BELONGS_TO_USER(P_ALBUM_ID, P_USER_ID) THEN
        DBMS_OUTPUT.PUT_LINE('Album does not belong to the user.');
        RETURN;
    END IF;
        -- Проверяем, существует ли песня
    SELECT COUNT(*)
    INTO V_SONG_EXISTS
    FROM SONGS
    WHERE SONG_ID = P_SONG_ID;

    IF V_SONG_EXISTS > 0 THEN
        -- Песни нет в альбоме, добавляем
        INSERT INTO ALBUM_SONG (ALBUM_ID, SONG_ID)
        VALUES (P_ALBUM_ID, P_SONG_ID);

        COMMIT; -- Фиксируем изменения
        DBMS_OUTPUT.PUT_LINE('Song added to the album successfully.');
    ELSE
        -- Песня не найдена
        DBMS_OUTPUT.PUT_LINE('Song not found. Please provide a valid song ID.');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Обработка ошибок, возвращение сообщения об ошибке
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
END ADD_SONG_TO_ALBUM;

-- ==================================
-- Удаление песни из альбома
-- ==================================
PROCEDURE REMOVE_SONG_FROM_ALBUM(
    P_SONG_ID IN NUMBER,
    P_ALBUM_ID IN NUMBER,
    P_USER_ID IN NUMBER
)
AS
    V_ALBUM_EXISTS NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO V_ALBUM_EXISTS
    FROM ALBUMS
    WHERE ALBUM_ID = P_ALBUM_ID;

    IF V_ALBUM_EXISTS = 0 THEN
        DBMS_OUTPUT.PUT_LINE('Album not found. Please provide a valid album ID.');
        RETURN;
    END IF;

    IF NOT ALBUM_BELONGS_TO_USER(P_ALBUM_ID, P_USER_ID) THEN
        DBMS_OUTPUT.PUT_LINE('Album does not belong to the user.');
        RETURN;
    END IF;

    DELETE FROM ALBUM_SONG WHERE SONG_ID = P_SONG_ID AND ALBUM_ID = P_ALBUM_ID;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Song removed from the album successfully.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
END REMOVE_SONG_FROM_ALBUM;
    -- ==================================
    -- Проверка принадлежности альбома пользователю
    -- ==================================
    FUNCTION ALBUM_BELONGS_TO_USER(
        P_ALBUM_ID IN NUMBER,
        P_USER_ID IN NUMBER
    ) RETURN BOOLEAN
    AS
        V_ALBUM_COUNT NUMBER;
    BEGIN
        -- Проверяем, принадлежит ли альбом пользователю
        SELECT COUNT(*)
        INTO V_ALBUM_COUNT
        FROM ALBUM_USER
        WHERE ALBUM_ID = P_ALBUM_ID AND USER_ID = P_USER_ID;

        RETURN V_ALBUM_COUNT > 0;
    END ALBUM_BELONGS_TO_USER;
END SONGWRITER_ALBUM_PACKAGE;
