create tablespace LOB_TBS
datafile '/opt/oracle/oradata/ORCLCDB/RAM_PDB/lab10_lob_tbs.dbf' SIZE 70M;
create directory bfile_dir as '/opt/oracle/oradata/ORCLCDB/RAM_PDB/lab10_bfile_dir';

create user lob_user
identified by "1111";
grant create session, create tablespace, create table, create any directory, drop any directory to lob_user;
grant read, write on directory bfile_dir to lob_user;
alter user lob_user quota unlimited on LOB_TBS;

create table tbl1
(
  FOTO blob,
  DOC bfile
)
tablespace LOB_TBS;

insert into tbl1
values
  (bfilename('BFILE_DIR', 'img1.jpg'), bfilename('BFILE_DIR', 'doc1.doc'));
insert into tbl1
values
  (bfilename('BFILE_DIR', 'img2.jpg'), bfilename('BFILE_DIR', 'doc2.doc'));
insert into tbl1
values
  (bfilename('BFILE_DIR', 'img3.jpg'), bfilename('BFILE_DIR', 'doc3.doc'));
commit;

select * from tbl1;