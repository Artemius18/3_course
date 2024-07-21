create table Report (
  id int identity(1,1) primary key,
  xml_data xml
);
select * from Report;
go;

create or alter procedure GenerateXML
  @data xml output
as
begin
  set @data = (
      select 
        getdate() as [@date],
        (
          select 
              a.login as [@login],
              (
                select 
                  i.title as [@title],
                  ci.quantity as [@quantity]
                from CartItems ci
                  inner join Items i on ci.item_id = i.id
                where 
                  ci.account_id = a.id
                for xml path('item'), type
              )
            from Accounts a
            where exists (select 1 from CartItems ci where ci.account_id = a.id)
            for xml path('cart'), type
        )
        for xml path('carts')
  );
end
go;

create or alter procedure InsertReport
as begin
  declare @xml_data XML;
  exec dbo.GenerateXML @data = @xml_data output;
  insert into Report values(@xml_data);
end;
go;

execute InsertReport;
select * from Report;
go;

create primary xml index idx_report_xml_data_primary on Report(xml_data);
go;
create xml index idx_report_xml_data_path on Report(xml_data) using xml index idx_report_xml_data_primary for path;
go;
select * from Report;
go;

create or alter procedure QueryReportXml
  @xpath nvarchar(max)
as begin
  set nocount on;
  declare @sql nvarchar(max) = 'select xml_data.query(''' + @xpath + ''') from Report';
  exec sp_executesql @sql;
end;
go;

exec QueryReportXml  '//cart[@login="culip_qusicib"]/item';
go;