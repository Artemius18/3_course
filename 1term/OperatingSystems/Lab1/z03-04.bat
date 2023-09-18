@echo off
@echo строка параметров: %1 %2 %3
@echo -- параметр 1: %1
@echo -- параметр 2: %2
@echo -- параметр 3: %3

set /A sum = %1 + %2
@echo -- %1 + %2 = %sum%

set /A mult = %1 * %2
@echo -- %1 * %2 = %mult%

set /A div = %3 / %2
@echo -- %1 / %2 = %div%

set /A diff = %2 - %1
@echo -- %2 - %1 = %diff%

set /A res = (%2-%1)*(%1-%2)
@echo -- (%2-%1)*(%1-%2) = %res%