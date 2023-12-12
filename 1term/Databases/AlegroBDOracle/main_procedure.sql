-- USERS create or replace PROCEDURES 1
--/
CREATE OR REPLACE PROCEDURE create_user
(
    p_user_role IN USERS.USER_ROLE%TYPE,
    p_name IN USERS.USER_NAME%TYPE,
    p_login IN USERS.USER_LOGIN%TYPE,
    p_password IN VARCHAR2
)
IS
    empty_parameter_ex EXCEPTION;
    duplicate_name_login_ex EXCEPTION;
    PRAGMA EXCEPTION_INIT(duplicate_name_login_ex, -1); -- Код ошибки для дублирования

BEGIN
    IF TRIM(p_name) IS NULL OR TRIM(p_login) IS NULL OR TRIM(p_password) IS NULL THEN
        RAISE empty_parameter_ex;
    END IF;

    -- Проверяем уникальность имени и логина
    BEGIN
        INSERT INTO USERS(USER_ROLE, USER_NAME, USER_LOGIN, USER_PASS)
        VALUES (p_user_role, TRIM(p_name), TRIM(p_login), (SELECT hash_password(TRIM(p_password)) FROM DUAL));
        COMMIT;
    EXCEPTION
        WHEN duplicate_name_login_ex THEN
            dbms_output.put_line('Name or login is not unique');
        WHEN OTHERS THEN
            dbms_output.put_line('Unexpected error');
    END;

EXCEPTION
    WHEN empty_parameter_ex THEN
        dbms_output.put_line('Empty parameter');
    WHEN OTHERS THEN
        dbms_output.put_line('Error in create_user procedure');
END;

CREATE OR REPLACE PROCEDURE update_user
(
    p_id IN USERS.USER_ID%TYPE,
    p_user_role IN USERS.USER_ROLE%TYPE DEFAULT NULL,
    p_name IN USERS.USER_NAME%TYPE DEFAULT NULL,
    p_login IN USERS.USER_LOGIN%TYPE DEFAULT NULL,
    p_password IN VARCHAR2 DEFAULT NULL
)
IS
    v_hashed_password VARCHAR2(256); -- Используйте размер, подходящий для вашей функции hash_password
BEGIN
    -- Проверка на изменение значений перед выполнением UPDATE
    IF p_user_role IS NOT NULL OR
       p_login IS NOT NULL OR
       p_name IS NOT NULL OR
       p_password IS NOT NULL THEN

        -- Обработка хешированного пароля
        IF p_password IS NOT NULL THEN
            v_hashed_password := hash_password(TRIM(p_password));
        END IF;

        UPDATE USERS
        SET USER_ROLE = CASE WHEN p_user_role IS NOT NULL THEN TRIM(p_user_role) ELSE USER_ROLE END,
            USER_LOGIN = CASE WHEN p_login IS NOT NULL THEN TRIM(p_login) ELSE USER_LOGIN END,
            USER_NAME = CASE WHEN p_name IS NOT NULL THEN TRIM(p_name) ELSE USER_NAME END,
            USER_PASS = CASE WHEN v_hashed_password IS NOT NULL THEN v_hashed_password ELSE USER_PASS END
        WHERE USER_ID = p_id;

        dbms_output.put_line('User updated successfully');
    ELSE
        dbms_output.put_line('No changes to update');
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        dbms_output.put_line('Error in update_user procedure');
END;

CREATE OR REPLACE PROCEDURE delete_user
(
    p_id IN USERS.USER_ID%TYPE
)
IS
BEGIN
    -- Удаление из таблицы SONG_USER
    DELETE FROM SONG_USER WHERE USER_ID = p_id;

    -- Удаление из таблицы PLAYLIST_SONG
    DELETE FROM PLAYLIST_SONG WHERE PLAYLIST_ID IN (SELECT PLAYLIST_ID FROM PLAYLIST WHERE USER_ID = p_id);

    -- Удаление из таблицы PLAYLIST
    DELETE FROM PLAYLIST WHERE USER_ID = p_id;

    -- Удаление из таблицы ALBUM_USER
    DELETE FROM ALBUM_USER WHERE USER_ID = p_id;

    -- Удаление из таблицы USERS
    DELETE FROM USERS WHERE USER_ID = p_id;

    COMMIT;
END delete_user;

CREATE OR REPLACE FUNCTION AUTHENTICATE_USER
(
    p_login IN USERS.USER_LOGIN%TYPE,
    p_password IN VARCHAR2
)
RETURN SYS_REFCURSOR
IS
    user_cursor SYS_REFCURSOR;
BEGIN
    OPEN user_cursor FOR
        SELECT USER_ID, USER_ROLE, USER_NAME, USER_LOGIN, USER_PASS
        FROM USERS
        WHERE USER_LOGIN = p_login
        AND USER_PASS = hash_password(p_password);

    RETURN user_cursor;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL; -- Пользователь с данным логином и паролем не найден
    WHEN OTHERS THEN
        RETURN NULL; -- Обработка других ошибок
END;

DECLARE
    user_result SYS_REFCURSOR;
    login_param USERS.USER_LOGIN%TYPE := 'user2_login';
    password_param VARCHAR2(100) := 'password2';
BEGIN
    user_result := AUTHENTICATE_USER(login_param, password_param);
END;

select * from USERS;
--/
-- Song_User create or replace PROCEDURES 2
--/

    create or replace PROCEDURE create_song_user (
        p_song_id SONG_USER.SONG_ID%TYPE,
        p_user_id SONG_USER.USER_ID%TYPE
    )
    IS
    BEGIN
        INSERT INTO Song_User (SONG_ID, USER_ID) VALUES (p_song_id, p_user_id);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END create_song_user;

    create or replace PROCEDURE delete_song_user (
        p_song_id SONG_USER.SONG_ID%TYPE,
        p_user_id SONG_USER.USER_ID%TYPE
    )
    IS
    BEGIN
        DELETE FROM Song_User WHERE SONG_ID = p_song_id AND USER_ID = p_user_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END delete_song_user;

--/

-- Albums create or replace PROCEDURES 3
--/


create or replace PROCEDURE create_album (
        p_cover IN VARCHAR2,
        p_release_date IN DATE,
        p_name IN VARCHAR2
    )
    IS
    BEGIN
        INSERT INTO Albums (ALBUM_COVER, RELEASE_DATE, ALBUM_NAME)
        VALUES (p_cover, p_release_date, p_name);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END create_album;

    create or replace PROCEDURE update_album (
        p_id IN INT,
        p_cover IN VARCHAR2,
        p_release_date IN DATE,
        p_name IN VARCHAR2
    )
    IS
    BEGIN
        UPDATE Albums
        SET ALBUM_COVER = p_cover, RELEASE_DATE = p_release_date, ALBUM_NAME = p_name
        WHERE ALBUM_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END update_album;

    create or replace PROCEDURE delete_album (
        p_id IN INT
    )
    IS
    BEGIN
        DELETE FROM Albums WHERE ALBUM_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END delete_album;

--/
-- Album_User create or replace PROCEDURES 4

    create or replace PROCEDURE add_album_to_user (
        p_album_id IN INT,
        p_song_id IN INT
    )
    IS
    BEGIN
        INSERT INTO Album_Song (SONG_ID, ALBUM_ID)
        VALUES (p_song_id, p_album_id);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END add_album_to_user;

    create or replace PROCEDURE remove_album_to_user (
        p_song_id IN INT,
        p_album_id IN INT
    )
    IS
    BEGIN
        DELETE FROM Album_Song WHERE SONG_ID = p_song_id AND ALBUM_ID = p_album_id ;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END remove_album_to_user;

--/
-- Album_Song create or replace PROCEDURES 5
--/
    create or replace PROCEDURE add_song_to_album (
        p_album_id IN INT,
        p_song_id IN INT
    )
    IS
    BEGIN
        INSERT INTO Album_Song (SONG_ID, ALBUM_ID)
        VALUES (p_song_id, p_album_id);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END add_song_to_album;

    create or replace PROCEDURE remove_song_from_album (
        p_song_id IN INT,
        p_album_id IN INT
    )
    IS
    BEGIN
        DELETE FROM Album_Song WHERE SONG_ID = p_song_id AND ALBUM_ID = p_album_id ;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END remove_song_from_album;

--/
-- PlayList create or replace PROCEDURES 6
--/

    create or replace PROCEDURE create_playlist (
        p_name PLAYLIST.PLAYLIST_NAME%type,
        p_cover PLAYLIST.PLAYLIST_COVER%type,
        p_user_id PLAYLIST.USER_ID%type
    )
    IS
    BEGIN
        INSERT INTO PlayList (PLAYLIST_NAME, PLAYLIST_COVER, USER_ID)
        VALUES (p_name, p_cover, p_user_id);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END create_playlist;

    create or replace PROCEDURE update_playlist (
        p_id PLAYLIST.PLAYLIST_ID%type,
        p_name PLAYLIST.PLAYLIST_NAME%type,
        p_cover PLAYLIST.PLAYLIST_COVER%type
    )
    IS
    BEGIN
        UPDATE PlayList
        SET PLAYLIST_NAME = p_name, PLAYLIST_COVER = p_cover
        WHERE PLAYLIST_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END update_playlist;

    create or replace PROCEDURE delete_playlist (
        p_id PLAYLIST.PLAYLIST_ID%type
    )
    IS
    BEGIN
        DELETE FROM PlayList WHERE PLAYLIST_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END delete_playlist;

--/
-- Playlist_Song create or replace PROCEDURES 7
--/

    create or replace PROCEDURE add_song_to_playlist (
        p_playlist_id IN INT,
        p_song_id IN INT
    )
    IS
    BEGIN
        INSERT INTO Playlist_Song (PLAYLIST_ID, SONG_ID)
        VALUES (p_playlist_id, p_song_id);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END add_song_to_playlist;

    create or replace PROCEDURE remove_song_from_playlist (
        p_playlist_id IN INT,
        p_song_id IN INT
    )
    IS
    BEGIN
        DELETE FROM Playlist_Song WHERE PLAYLIST_ID = p_playlist_id AND SONG_ID = p_song_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END remove_song_from_playlist;

--//

-- Songs create or replace PROCEDURES 8
--//
CREATE OR REPLACE PROCEDURE ADD_SONG (
    P_GENRE_NAME VARCHAR2,
    P_SONG VARCHAR2,
    P_SONG_NAME VARCHAR2,
    P_SONG_COVER VARCHAR2,
    P_AUTHOR_NAME VARCHAR2
)
IS
    V_GENRE_ID INT;
    V_AUTHOR_ID INT;
    V_EXISTING_SONG_ID INT;
BEGIN
    -- Проверяем, существует ли автор с заданным именем
    SELECT USER_ID INTO V_AUTHOR_ID
    FROM USERS
    WHERE UPPER(USER_NAME) = UPPER(P_AUTHOR_NAME) AND USER_ROLE = 'AUTHOR';

    -- Если автор существует, проверяем, существует ли жанр с заданным именем
    SELECT GENRE_ID INTO V_GENRE_ID
    FROM GENRES
    WHERE UPPER(GENRE_NAME) = UPPER(P_GENRE_NAME);

    -- Проверяем, существует ли песня с заданным названием
    SELECT SONG_ID INTO V_EXISTING_SONG_ID
    FROM SONGS
    WHERE UPPER(SONG_NAME) = UPPER(P_SONG_NAME);

    -- Если песня не существует, выполняем вставку
    IF V_EXISTING_SONG_ID IS NULL THEN
        INSERT INTO SONGS (GENRE_ID, SONG, SONG_COVER, SONG_NAME, LISTENING_COUNTER, AUTHOR_ID)
        VALUES (V_GENRE_ID, P_SONG, P_SONG_COVER, P_SONG_NAME, 0, V_AUTHOR_ID);

        COMMIT;
    ELSE
        -- Песня с таким названием уже существует
        RAISE_APPLICATION_ERROR(-20003, 'Песня с названием ' || P_SONG_NAME || ' уже существует.');
    END IF;

EXCEPTION
    -- Обрабатываем исключение, если автор или жанр не найдены
    WHEN NO_DATA_FOUND THEN
        IF V_AUTHOR_ID IS NULL THEN
            RAISE_APPLICATION_ERROR(-20001, 'Автор с именем ' || P_AUTHOR_NAME || ' не найден.');
        ELSE
            RAISE_APPLICATION_ERROR(-20002, 'Жанр с именем ' || P_GENRE_NAME || ' не найден.');
        END IF;
    WHEN OTHERS THEN
        -- Обрабатываем другие исключения
        RAISE;
END ADD_SONG;

create or replace PROCEDURE update_song (
        p_id SONGS.SONG_ID%type,
        p_genre_id SONGS.GENRE_ID%type,
        p_song SONGS.SONG%type,
        p_song_name SONGS.SONG_NAME%type,
        p_song_cover SONGS.SONG_COVER%type,
        p_listening_counter SONGS.LISTENING_COUNTER%type,
        p_author_id SONGS.AUTHOR_ID%type
    )
    IS
    BEGIN
        UPDATE Songs
        SET GENRE_ID = p_genre_id, SONG = p_song,  SONG_NAME = p_song_name, SONG_COVER = p_song_cover,
            LISTENING_COUNTER = p_listening_counter, AUTHOR_ID = p_author_id
        WHERE SONG_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END update_song;

CREATE OR REPLACE PROCEDURE DELETE_ALL_SONG AS
BEGIN

       FOR d IN (SELECT SONG_ID FROM SONGS)
   LOOP
    DELETE FROM PLAYLIST_SONG WHERE SONG_ID = d.SONG_ID;

    -- Удаление из таблицы SONG_USER
    DELETE FROM SONG_USER WHERE SONG_ID = d.SONG_ID;

    -- Удаление из таблицы ALBUM_SONG
    DELETE FROM ALBUM_SONG WHERE SONG_ID = d.SONG_ID;

    -- Удаление из таблицы LISTENING_HISTORY
    DELETE FROM LISTENING_HISTORY WHERE SONG_ID = d.SONG_ID;

    -- Удаление из таблицы SONGS
    DELETE FROM SONGS WHERE SONG_ID = d.SONG_ID;
   END LOOP;
    -- Удаление из таблицы PLAYLIST_SONG
    -- COMMIT для фиксации изменений
    COMMIT;
END DELETE_ALL_SONG;

CREATE OR REPLACE PROCEDURE DELETE_SONG_BY_ID (P_SONG_ID INT)
AS
BEGIN
    -- Удаление из таблицы PLAYLIST_SONG
    DELETE FROM PLAYLIST_SONG WHERE SONG_ID = P_SONG_ID;

    -- Удаление из таблицы SONG_USER
    DELETE FROM SONG_USER WHERE SONG_ID = P_SONG_ID;

    -- Удаление из таблицы ALBUM_SONG
    DELETE FROM ALBUM_SONG WHERE SONG_ID = P_SONG_ID;

    -- Удаление из таблицы LISTENING_HISTORY
    DELETE FROM LISTENING_HISTORY WHERE SONG_ID = P_SONG_ID;

    -- Удаление из таблицы SONGS
    DELETE FROM SONGS WHERE SONG_ID = P_SONG_ID;

    -- COMMIT для фиксации изменений
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        -- Обрабатываем другие исключения
        RAISE;
END DELETE_SONG_BY_ID;
/


--//
-- Genres create or replace PROCEDURES 9
--/

    create or replace PROCEDURE create_genre (
        p_genre_name IN VARCHAR2
    )
    IS
    BEGIN
        INSERT INTO Genres (GENRE_NAME) VALUES (p_genre_name);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END create_genre;

    create or replace PROCEDURE update_genre (
        p_id GENRES.GENRE_ID%type,
        p_genre_name GENRES.GENRE_NAME%type
    )
    IS
    BEGIN
        UPDATE Genres
        SET GENRE_NAME = p_genre_name
        WHERE GENRE_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END update_genre;

    create or replace PROCEDURE delete_genre (
        p_id IN INT
    )
    IS
    BEGIN
        DELETE FROM Genres WHERE GENRE_ID = p_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END delete_genre;

--//

-- ListeningHistory create or replace PROCEDURES 10
--//

create or replace PROCEDURE add_listening_history (
        p_user_id IN INT,
        p_song_id IN INT,
        p_audition_date IN DATE
    )
    IS
    BEGIN
        INSERT INTO LISTENING_HISTORY (USER_ID, SONG_ID, AUDITION_DATE)
        VALUES (p_user_id, p_song_id, p_audition_date);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END add_listening_history;

    create or replace PROCEDURE update_listening_history_date (
        p_user_id IN INT,
        p_song_id IN INT,
        p_audition_date IN DATE
    )
    IS
    BEGIN
        UPDATE LISTENING_HISTORY
        SET AUDITION_DATE = p_audition_date
        WHERE USER_ID = p_user_id AND SONG_ID = p_song_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END update_listening_history_date;

    create or replace PROCEDURE delete_listening_history (
        p_user_id IN INT,
        p_song_id IN INT
    )
    IS
    BEGIN
        DELETE FROM LISTENING_HISTORY WHERE USER_ID = p_user_id AND SONG_ID = p_song_id;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('Error occurred: ' || SQLERRM);
            RAISE;
    END delete_listening_history;
--//



--==============---
--ТЕСТЫ
select * from SONGS;

begin
    DELETE_SONG();
end;

SELECT * FROM USERS;
SELECT * FROM GENRES;
SELECT * FROM SONGS;

BEGIN
    ADD_SONG('D', 'FFFF', 'FFF', 'FFF', 'Автор1');
end;



-------------
CREATE OR REPLACE PROCEDURE ADD_LISTENING_HISTORY
(
    P_SONG_ID INT,
    P_USER_ID INT
)
AS
BEGIN
    -- Увеличиваем счетчик прослушиваний у песни
    UPDATE SONGS
    SET LISTENING_COUNTER = LISTENING_COUNTER + 1
    WHERE SONG_ID = P_SONG_ID;

    -- Добавляем запись в LISTENING_HISTORY
    INSERT INTO LISTENING_HISTORY (USER_ID, SONG_ID, AUDITION_DATE)
    VALUES (P_USER_ID, P_SONG_ID, SYSDATE);

    COMMIT;
END ADD_LISTENING_HISTORY;