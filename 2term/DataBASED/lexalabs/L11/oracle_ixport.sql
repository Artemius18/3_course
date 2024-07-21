create or replace type order_row as object (
  id int,
  account_id int,
  order_date date,
  order_status varchar2(255),
  order_comment varchar2(255),
  client_fullname varchar2(255),
  client_email varchar2(255),
  client_address varchar2(255),
  cost decimal(10, 2)
);
/
create or replace type item_row as object (
  id int,
  title varchar2(255),
  description varchar2(2047),
  price decimal(10, 2),
  quantity int,
  is_available number(1),
  category_id int,
  image varchar2(255),
  publisher varchar2(255),
  min_players int,
  player_min_age int,
  added_date date
);
/
create or replace type order_table as table of order_row;
/
create or replace type item_table as table of item_row;
/
create or replace function export_orders(d_start in date, d_end in date) 
return order_table pipelined
is
  r_order order_row;
begin
  for r in (select * from Orders where order_date between d_start and d_end) loop
    r_order := order_row(r.id, r.account_id, r.order_date, r.order_status, r.order_comment, r.client_fullname, r.client_email, r.client_address, r.cost);
    pipe row (r_order);
  end loop;
  return;
end;
/
create or replace function export_items(d_start in date, d_end in date) 
return item_table pipelined
is
  r_item item_row;
begin
  for r in (select * from Items where added_date between d_start and d_end) loop
    r_item := item_row(r.id, r.title, r.description, r.price, r.quantity, r.is_available, r.category_id, r.image, r.publisher, r.min_players, r.player_min_age, r.added_date);
    pipe row (r_item);
  end loop;
  return;
end;
/

set pagesize 0
set linesize 32767
set feedback off
set trimspool on
set termout off
set colsep '|'
spool oracle_orders_exported.csv
select * from table(export_orders(to_date('01.01.2022','DD.MM.YYYY'),to_date('01.02.2022','DD.MM.YYYY')));
spool off
set pagesize 0
set linesize 32767
set feedback off
set trimspool on
set termout off
set colsep '|'
spool oracle_items_exported.csv
select * from table(export_items(to_date('01.01.2022','DD.MM.YYYY'),to_date('01.02.2022','DD.MM.YYYY')));
spool off
/
create table OrdersImported of order_row;
/
create table ItemsImported of item_row;
/
select * from OrdersImported;
select * from ItemsImported;