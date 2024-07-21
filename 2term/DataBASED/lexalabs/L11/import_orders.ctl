load data
infile 'exported.csv' "str '\r\n'"
replace
into table ORDERSIMPORTED
fields terminated by '|'
OPTIONALLY ENCLOSED BY '"' AND '"'
trailing nullcols
           ( ID,
             ACCOUNT_ID,
             ORDER_DATE DATE "dd/mm/yyyy",
             ORDER_STATUS "UPPER(:ORDER_STATUS)",
             ORDER_COMMENT "UPPER(:ORDER_COMMENT)",
             CLIENT_FULLNAME "UPPER(:CLIENT_FULLNAME)",
             CLIENT_EMAIL "UPPER(:CLIENT_EMAIL)",
             CLIENT_ADDRESS "UPPER(:CLIENT_ADDRESS)",
             COST "ROUND(TO_NUMBER(:COST, '9999999D99', 'NLS_NUMERIC_CHARACTERS='',.'''), 1)"
           )