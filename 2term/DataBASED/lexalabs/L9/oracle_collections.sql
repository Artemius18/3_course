--2
create or replace type L9_ClientOrder as object (
  id number,
  account_id number,
  order_date date,
  order_status varchar2(255),
  order_comment varchar2(255),
  client_fullname varchar2(255),
  client_email varchar2(255),
  client_address varchar2(255),
  cost number(10, 2),

  constructor function L9_ClientOrder(self in out nocopy L9_ClientOrder, account_id number, client_address varchar2, cost number) return self as result,
  map member function get_date return date deterministic,
  member function get_status return varchar2 deterministic,
  member procedure update_status(p_status varchar2),
  member function to_varchar2 return varchar2
);
/
create or replace type body L9_ClientOrder as
  constructor function L9_ClientOrder(self in out nocopy L9_ClientOrder, account_id number, client_address varchar2, cost number) return self as result as
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
  map member function get_date return date deterministic as
  begin
    return order_date;
  end;
  member function get_status return varchar2 deterministic as
  begin
    return upper(order_status);
  end;
  member procedure update_status(p_status varchar2) is
  begin
    order_status := p_status;
  end;
  member function to_varchar2 return varchar2 is
  begin
    return client_address;
  end;
end;
/
create or replace type ClientOrdersCollection is table of L9_ClientOrder;
/
create or replace type L9_Item is object (
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

  client_orders ClientOrdersCollection,

  constructor function L9_Item(self in out nocopy L9_Item, title varchar2, price number, quantity number, client_orders ClientOrdersCollection) return self as result,
  map member function get_id return number deterministic,
  member function get_stock_cost return number deterministic,
  member procedure update_price(p_price number),
  member function to_varchar2 return varchar2
);
/
create or replace type body L9_Item as
  constructor function L9_Item(self in out nocopy L9_Item, title varchar2, price number, quantity number, client_orders ClientOrdersCollection) return self as result as
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
    self.client_orders := client_orders;
    return;
  end;
  map member function get_id return number deterministic as
  begin
    return id;
  end;
  member function get_stock_cost return number deterministic as
  begin
    return price * quantity;
  end;
  member procedure update_price(p_price number) is
  begin
    price := p_price;
  end;
  member function to_varchar2 return varchar2 is
  begin
    return title;
  end;
end;
/
create or replace type ItemsCollection is table of L9_Item;
/
create table ClientOrdersCollections(
  co_collection ClientOrdersCollection
) nested table co_collection store as co_collection;
/
create table ClientOrders of L9_ClientOrder;
/
declare
  co1 L9_ClientOrder := new L9_ClientOrder(12, '�. �������, ���. �������, �. 4, ��. 37', 100);
  co2 L9_ClientOrder := new L9_ClientOrder(34, '�. �����, ���. ����������, �. 101, ��. 2', 45);
  co3 L9_ClientOrder := new L9_ClientOrder(23, '�. ³�����, ���. ����������, �. 23, ��. 56', 220);
  co_collection ClientOrdersCollection := new ClientOrdersCollection(co1, co2, co3);
  i1 L9_Item := new L9_Item('item 1', 10, 10, new ClientOrdersCollection(co_collection(1), co_collection(2)));
  i2 L9_Item := new L9_Item('item 2', 20, 10, new ClientOrdersCollection());
  i3 L9_Item := new L9_Item('item 3', 30, 10, new ClientOrdersCollection(co_collection(2), co_collection(3)));
  i4 L9_Item := new L9_Item('item 4', 40, 10, new ClientOrdersCollection());
  i5 L9_Item := new L9_Item('item 5', 50, 10, new ClientOrdersCollection());
  i_collection ItemsCollection := new ItemsCollection(i1, i2, i3, i4);
  is_member boolean;
begin
  if i2 member of i_collection then DBMS_OUTPUT.put_line('i2 is a member of i_collection');
  else DBMS_OUTPUT.put_line('i2 is not a member of i_collection');
  end if;
  if i5 member of i_collection then DBMS_OUTPUT.put_line('i5 is a member of i_collection');
  else DBMS_OUTPUT.put_line('i5 is not a member of i_collection');
  end if;

  for i in 1..i_collection.count loop
    if i_collection(i).client_orders is empty then
      DBMS_OUTPUT.put_line('Item "'||i_collection(i).title||'" has empty client_orders collection.');
    end if;
  end loop;

  delete from ClientOrdersCollections;
  insert into ClientOrdersCollections values (co_collection);
  commit;

  delete from ClientOrders;
  for i in 1..co_collection.count loop
    insert into ClientOrders values co_collection(i);
  end loop;
end;
/
select * from table(select co_collection from ClientOrdersCollections where rownum = 1);
/
create or replace type ClientAddressesCollection is table of varchar2(255);
/
create or replace type StringsCollection is table of varchar2(255);
/
select
    cast(
        cast(
            multiset(select co.to_varchar2() from ClientOrders co)
          as ClientAddressesCollection)
      as StringsCollection)
  from dual;
/
declare
  co_collection ClientOrdersCollection;
begin
  select value(co) bulk collect into co_collection from ClientOrders co;
  for i in 1..co_collection.count loop
    DBMS_OUTPUT.put_line(''||i||'. '||co_collection(i).to_varchar2());
  end loop;
end;