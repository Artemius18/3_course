#include <iostream>
#include <ctime>
#include <iomanip>

int main() {
    // Получаем текущее время
    std::time_t currentTime;
    std::time(&currentTime);

    // Используем localtime_s для безопасного преобразования в локальное время
    std::tm localTime;
    localtime_s(&localTime, &currentTime);

    // Выводим локальную дату и время в заданном формате
    std::cout << std::setfill('0') << std::setw(2) << localTime.tm_mday << "."
        << std::setw(2) << localTime.tm_mon + 1 << "."
        << std::setw(4) << localTime.tm_year + 1900 << " "
        << std::setw(2) << localTime.tm_hour << ":"
        << std::setw(2) << localTime.tm_min << ":"
        << std::setw(2) << localTime.tm_sec << std::endl;

    return 0;
}
