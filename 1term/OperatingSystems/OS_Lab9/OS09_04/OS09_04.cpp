#define _CRT_SECURE_NO_WARNINGS
#define _CRT_NON_CONFORMING_WCSTOK
using namespace std;
#include <iostream>
#include <cstdlib>
#include "Windows.h"

#define FILE_PATH L"E:/BSTU/3_course/1term/OperatingSystems/OS_Lab9/OS09_01.txt"
#define DIR_PATH L"E:/BSTU/3_course/1term/OperatingSystems/OS_Lab9"
// Счетчик строк
int rowC = 0;

// Функция для отслеживания изменений в файле
BOOL printWatchRowFileTxt(LPWSTR FileName, DWORD mlsec)
{
    // Структура для хранения размера файла
    PLARGE_INTEGER fileSize = new LARGE_INTEGER();
    // Преобразование пути директории в строку
    LPWSTR path = (LPWSTR)DIR_PATH;
    // Преобразование пути файла в строку
    char* cFileName = new char[wcslen(FileName) * sizeof(char) + 1];
    wcstombs(cFileName, FileName, strlen(cFileName));

    try
    {
        // Получение уведомлений об изменениях в директории
        HANDLE notif = FindFirstChangeNotification(path, false, FILE_NOTIFY_CHANGE_LAST_WRITE);
        DWORD err = GetLastError();
        // Получение текущего времени
        clock_t t1 = clock();
        clock_t t2 = clock();
        DWORD dwWaitStatus;
        cout << "\n\n";
        printf("\tStarted filewatch (timestamp %d)", t1);

        // Цикл отслеживания изменений
        while (true)
        {
            // Ожидание изменений в директории
            dwWaitStatus = WaitForSingleObject(notif, mlsec);
            switch (dwWaitStatus)
            {
            case WAIT_OBJECT_0:
            {
                // Проверка изменений в файле
                if (FindNextChangeNotification(notif) == FALSE)
                    break;
                else
                {
                    int position = 0;
                    int rowCount = 0;
                    // Открытие файла для чтения
                    HANDLE of = CreateFile(
                        FileName,
                        GENERIC_READ,
                        FILE_SHARE_READ,
                        NULL,
                        OPEN_ALWAYS,
                        FILE_ATTRIBUTE_NORMAL,
                        NULL);
                    if (of == INVALID_HANDLE_VALUE)
                    {
                        CloseHandle(of);
                        throw "[ERROR] Open file failed";
                    }

                    // Получение размера файла
                    if (GetFileSizeEx(of, fileSize))
                    {
                        // Чтение файла и подсчет строк
                        char* buf = new char[(fileSize->QuadPart + 1) * sizeof(char)];
                        ZeroMemory(buf, (fileSize->QuadPart + 1) * sizeof(char));
                        DWORD n = NULL;
                        if (ReadFile(of, buf, fileSize->QuadPart, &n, NULL))
                            while (buf[position++] != '\0')
                                if (buf[position] == '\n')
                                    rowCount++;
                    }

                    // Вывод информации о числе строк, если число строк изменилось
                    if (rowC != rowCount)
                    {
                        printf("\n\t\t      Rows: %d", rowCount);
                        rowC = rowCount;
                    }
                    CloseHandle(of);
                }
            }
            }
            t2 = clock();
            // Прекращение отслеживания по прошествии заданного времени
            if (t2 - t1 > mlsec)
                break;
        }
        CloseHandle(notif);
        printf("\n\tEnded filewatch (timestamp %d)\n", t2);
    }
    catch (const char* err)
    {
        cout << "[ERROR] " << err << "\n";
        return false;
    }
    return true;
}

int main()
{
    setlocale(LC_ALL, "ru");
    SetConsoleCP(1251);
    SetConsoleOutputCP(1251);

    // Путь к отслеживаемому файлу
    LPWSTR fileName = (LPWSTR)FILE_PATH;

    // Вызов функции для отслеживания изменений в файле
    printWatchRowFileTxt(fileName, 30000);
}
