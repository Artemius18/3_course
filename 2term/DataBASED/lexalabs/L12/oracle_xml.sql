create sequence seq_report_id;
/
create table Report (
  id int default seq_report_id.nextval not null primary key,
  xml_data xmltype
);
/
create or replace procedure GenerateXml (data out xmltype)
as begin
  select xmlelement("carts",
    xmlagg(
      xmlelement("cart",
        xmlattributes(a.login as "login"),
        xmlagg(
          xmlelement("item",
            xmlattributes(i.title as "title", ci.quantity as "quantity")
          )
        )
      )
    ))
    into data
    from Accounts a
      join CartItems ci on ci.account_id = a.id
      join Items i on ci.item_id = i.id
    group by a.login;
end;
/

create or replace procedure InsertReport as
  xml_data xmltype;
begin
  GenerateXml(xml_data);
  insert into Report(xml_data) values (xml_data);
end;
/
execute InsertReport;
select * from Report;
/
create index idx_report_xml_data on report(xml_data) indextype is xdb.xmlindex;
select * from report;
/
create or replace procedure QueryReportXml (xpath in nvarchar2)
as begin
  execute immediate 'select xml_data.extract(''' || xpath || ''') from Report';
end;
/

create or replace procedure QueryReportXml(xpath in varchar2, r_xml out xmltype)
as begin
  select xmlquery(xpath passing by value xml_data returning content)
    into r_xml
    from Report;
end;
/
declare
  xml_result xmltype;
begin
  QueryReportXml('//cart[@login="ciq_deqoqom"]/item', xml_result);
  DBMS_OUTPUT.put_line(xml_result.getclobval());
end;