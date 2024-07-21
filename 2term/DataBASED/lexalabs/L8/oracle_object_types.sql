--2
  -- Item
create or replace type Item as object (
  id number,
  title varchar2(255),
  description varchar2(2047),
  price number(10, 2),
  quantity number,
  is_available number(1),
  category_id number,
  image varchar2(255),
  publisher varchar2(255),
  min_players number,
  player_min_age number,

  constructor function Item(self in out nocopy Item, title varchar2, price number, quantity number) return self as result,
  order member function cmp_by_price(item Item) return integer deterministic,
  member function get_stock_cost return number deterministic,
  member procedure update_price(p_price number)
);
/
create or replace type body Item as
  --2a
  constructor function Item(self in out nocopy Item, title varchar2, price number, quantity number) return self as result as
  begin
    self.id := items_id_seq.nextval();
    self.title := title;
    self.description := '';
    self.price := price;
    self.quantity := quantity;
    self.is_available := 1;
    self.category_id := null;
    self.image := '';
    self.publisher := '';
    self.min_players := 0;
    self.player_min_age := 0;
    return;
  end;
  --2b
  order member function cmp_by_price(item Item) return integer deterministic as
  begin
    if price < item.price then return -1;
    elsif price > item.price then return 1;
    else return 0;
    end if;
  end;
  --2c
  member function get_stock_cost return number deterministic as
  begin
    return price * quantity;
  end;
  --2d
  member procedure update_price(p_price number) is
  begin
    price := p_price;
  end;
end;
/
  -- test procedure
declare
  it Item := new Item('temp', 12, 5);
begin
  DBMS_OUTPUT.put_line('Item price before update: '||it.price);
  it.update_price(100);
  DBMS_OUTPUT.put_line('Item price after update: '||it.price);
end;

  -- ClientOrder
create or replace type ClientOrder as object (
  id number,
  account_id number,
  order_date date,
  order_status varchar2(255),
  order_comment varchar2(255),
  client_fullname varchar2(255),
  client_email varchar2(255),
  client_address varchar2(255),
  cost number(10, 2),

  constructor function ClientOrder(self in out nocopy ClientOrder, account_id number, client_address varchar2, cost number) return self as result,
  map member function get_date return date deterministic,
  member function get_status return varchar2 deterministic,
  member procedure update_status(p_status varchar2)
);
/
create or replace type body ClientOrder as
  --2a
  constructor function ClientOrder(self in out nocopy ClientOrder, account_id number, client_address varchar2, cost number) return self as result as
  begin
    self.id := orders_id_seq.nextval();
    self.account_id := account_id;
    self.order_date := SYSDATE;
    self.order_status := 'processing';
    self.order_comment := '';
    self.client_fullname := null;
    self.client_email := null;
    self.client_address := client_address;
    self.cost := cost;
    return;
  end;
  --2b
  map member function get_date return date deterministic as
  begin
    return order_date;
  end;
  --2c
  member function get_status return varchar2 deterministic as
  begin
    return upper(order_status);
  end;
  --2d
  member procedure update_status(p_status varchar2) is
  begin
    order_status := p_status;
  end;
end;
/
  -- test procedure
declare
  co ClientOrder := new ClientOrder(1, '�. ̳���, ���. �������, �. 4, ��. 37', 123);
begin
  DBMS_OUTPUT.put_line('Client order status before update: '||co.order_status);
  co.update_status('delivered');
  DBMS_OUTPUT.put_line('Client order status after update: '||co.order_status);
end;

--3
  -- Item
create table ItemsObjects of Item;
insert into ItemsObjects
  select new Item(id, title, description, price, quantity, is_available, category_id, image, publisher, min_players, player_min_age)
    from Items;
commit;
select io.id, io.price, io.get_stock_cost() "STOCK_COST"
  from ItemsObjects io
  order by value(io);
/
  -- ClientOrder
create table ClientOrdersObjects of ClientOrder;
insert into ClientOrdersObjects
  select new ClientOrder(id, account_id, order_date, order_status, order_comment, client_fullname, client_email, client_address, cost)
    from Orders;
commit;
select coo.id, to_char(coo.order_date, 'DD.MM.YYYY') "DATE", substr(coo.get_status(), 0, 10) "STATUS"
  from ClientOrdersObjects coo
  order by value(coo);
/

--4
  -- Item
create or replace view V_CheapItems of Item with object oid(id) as
  select id, title, description, price, quantity, is_available, category_id, image, publisher, min_players, player_min_age
    from ItemsObjects
    where price < 20;
select id, title, price from V_CheapItems;
/
  -- ClientOrder
create or replace view V_DeliveredOrders of ClientOrder with object oid(id) as
  select id, account_id, order_date, order_status, order_comment, client_fullname, client_email, client_address, cost
    from ClientOrdersObjects
    where order_status = 'delivered';
select id, substr(order_status, 0, 10) "STATUS" from V_DeliveredOrders;
/

--5
  -- Item
create index idx_items_objects_price on ItemsObjects(price);
drop index idx_items_objects_price;
select /*+ INDEX(ItemsObjects idx_items_objects_price) */
    id, substr(title, 1, 10) "TITLE", price
  from ItemsObjects
  where price between 500 and 1000;
/
create bitmap index idx_items_objects_get_stock_cost on ItemsObjects io (io.get_stock_cost());
drop index idx_items_objects_get_stock_cost;
select /*+ INDEX(ItemsObjects idx_items_objects_get_stock_cost) */
    io.id, substr(io.title, 1, 10) "TITLE", io.get_stock_cost() "STOCK_COST"
  from ItemsObjects io
  where io.get_stock_cost() < 100000;
/
  -- ClientOrder
create index idx_client_orders_objects_cost on ClientOrdersObjects(cost);
drop index idx_client_orders_objects_cost;
select /*+ INDEX(ClientOrdersObjects idx_client_orders_objects_cost) */
    id, cost
  from ClientOrdersObjects
  where cost < 5000;
/
create index idx_client_orders_objects_get_status on ClientOrdersObjects coo (coo.get_status());
drop index idx_client_orders_objects_get_status;
select /*+ INDEX(ClientOrdersObjects idx_client_orders_objects_get_status) */
    coo.id, substr(coo.get_status(), 0, 10) "STATUS"
  from ClientOrdersObjects coo
  where coo.get_status() = 'DELIVERED';
/