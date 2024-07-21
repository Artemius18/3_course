load data
infile 'oracle_items_exported.csv' "str '\r\n'"
replace
into table ITEMSIMPORTED
fields terminated by '|'
OPTIONALLY ENCLOSED BY '"' AND '"'
trailing nullcols
           ( ID,
             TITLE "UPPER(:TITLE)",
             DESCRIPTION "UPPER(:DESCRIPTION)",
             PRICE "ROUND(TO_NUMBER(:PRICE, '9999999D99', 'NLS_NUMERIC_CHARACTERS='',.'''), 1)",
             QUANTITY,
             IS_AVAILABLE,
             CATEGORY_ID,
             IMAGE "UPPER(:IMAGE)",
             PUBLISHER "UPPER(:PUBLISHER)",
             MIN_PLAYERS,
             PLAYER_MIN_AGE,
             ADDED_DATE DATE "dd/mm/yyyy"
           )