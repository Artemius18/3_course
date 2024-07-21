--1
with base_data as (
  select a.id account_id, 1 month_num, sum(cost) total_cost
    from Orders o join Accounts a on o.account_id = a.id
    where order_date between 
        to_date('2022-12-01', 'YYYY-MM-DD') and 
        to_date('2022-12-31', 'YYYY-MM-DD')
    group by a.id, extract(month from order_date)
)
select *
  from base_data 
  --where account_id = 50
  model 
    partition by (account_id) 
    dimension by (month_num) 
    measures (total_cost) 
    rules (
      total_cost[1] = total_cost[1] * 1.05, 
      total_cost[for month_num from 2 to 12 increment 1] = total_cost[CV()-1] * 1.05
    )
  order by account_id, month_num;

--2
with base_data as (
  select  
      oi.item_id item_id, 
      to_char(o.order_date, 'YYYY-MM') month, 
      sum(oi.price * oi.quantity) total_cost
    from OrderedItems oi join Orders o on oi.Order_id = o.id 
    group by oi.item_id, to_char(o.order_date, 'YYYY-MM')
)
select item_id, start0, growth1, fall2, growth3
  from base_data
  match_recognize (
    partition by item_id
    order by month
    measures 
      START_PATTERN.month as start0, 
      first(GROWTH.month) as growth1,
      FALL.month as fall2,
      last(GROWTH.month) as growth3
    one row per match
    after match skip to next row
    pattern (START_PATTERN GROWTH FALL GROWTH)
    define 
      START_PATTERN as total_cost is not null,
      GROWTH as total_cost > prev(total_cost),
      FALL as total_cost < prev(total_cost)
  );