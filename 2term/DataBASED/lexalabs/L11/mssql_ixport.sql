create or alter function export_orders(@d_start date, @d_end date) returns table
as return (
  select *
    from Orders
    where order_date between @d_start and @d_end
);
go
create or alter function export_items(@d_start date, @d_end date) returns table
as return (
  select *
    from Items
	where added_date between @d_start and @d_end
);
go
select * from ItemsImported;
select * from OrdersImported;

select * from imported_orders;