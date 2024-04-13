-------------------------------------Администраторский профиль--------------------------------------------
--все создано от ORCL
alter session set container = MusicShop
grant CTXAPP to MusicShop_ADMIN;

CREATE TABLESPACE MusicShop_PDB
DATAFILE 'MusicShop_PDB.dbf'
SIZE 100M
AUTOEXTEND ON NEXT 5M
BLOCKSIZE 8192
EXTENT MANAGEMENT LOCAL;

CREATE TEMPORARY TABLESPACE TS_MusicShop_TEMP
TEMPFILE 'TS_MusicShop_TEMP.dbf'
SIZE 100M
AUTOEXTEND ON NEXT 5M
BLOCKSIZE 8192
EXTENT MANAGEMENT LOCAL;

CREATE PROFILE MAIN_ADMIN_PROFILE LIMIT
PASSWORD_LIFE_TIME 120
SESSIONS_PER_USER 15
FAILED_LOGIN_ATTEMPTS 10
PASSWORD_LOCK_TIME 1
PASSWORD_REUSE_TIME 10
PASSWORD_GRACE_TIME DEFAULT
CONNECT_TIME 180
IDLE_TIME 30;


create user MusicShop_ADMIN identified by admin
default tablespace MusicShop_PDB
quota unlimited on MusicShop_PDB
temporary tablespace TS_MusicShop_TEMP
profile MAIN_ADMIN_PROFILE;

--grant create session, connect, create any table, create any view, create any procedure, drop any table, drop any view, drop any procedure to MusicShop_ADMIN;
--grant SYSDBA to MusicShop_ADMIN;
grant all privileges to MusicShop_ADMIN;

-------------------------------------Пользовательский профиль---------------------------------------------
CREATE TABLESPACE MusicShop_PDB_USER
DATAFILE 'MusicShop_PDB_USER.dbf'
SIZE 100M
AUTOEXTEND ON NEXT 5M
BLOCKSIZE 8192
EXTENT MANAGEMENT LOCAL;

CREATE TEMPORARY TABLESPACE TS_MusicShop_TEMP_USER
TEMPFILE 'TS_MusicShop_TEMP_USER.dbf'
SIZE 100M
AUTOEXTEND ON NEXT 5M
BLOCKSIZE 8192
EXTENT MANAGEMENT LOCAL;

CREATE PROFILE MAIN_USER_PROFILE LIMIT
PASSWORD_LIFE_TIME 120
SESSIONS_PER_USER 15
FAILED_LOGIN_ATTEMPTS 10
PASSWORD_LOCK_TIME 1
PASSWORD_REUSE_TIME 10
PASSWORD_GRACE_TIME DEFAULT
CONNECT_TIME 180
IDLE_TIME 30;


create user MusicShop_USER identified by 1234
default tablespace MusicShop_PDB_USER
quota unlimited on MusicShop_PDB_USER
temporary tablespace TS_MusicShop_TEMP_USER
profile MAIN_USER_PROFILE;

grant create session to MusicShop_USER;
GRANT EXECUTE ON MusicShop_ADMIN.ShowAllInstruments TO MusicShop_USER; --ok
GRANT EXECUTE ON MusicShop_ADMIN.ReserveInstrument TO MusicShop_USER; --??????
GRANT EXECUTE ON MusicShop_ADMIN.ShowTopInstruments TO MusicShop_USER; --
GRANT EXECUTE ON MusicShop_ADMIN.CreateReview TO MusicShop_USER;
GRANT EXECUTE ON MusicShop_ADMIN.ShowAllReviews TO MusicShop_USER;
GRANT CREATE TYPE TO MusicShop_USER;
