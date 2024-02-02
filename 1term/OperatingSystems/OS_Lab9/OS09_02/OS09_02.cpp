#define _CRT_SECURE_NO_WARNINGS
#include <Windows.h>
#include <iostream>
using namespace std;

#define FILE_PATH L"E:/BSTU/3_course/1term/OperatingSystems/OS_Lab9/OS09_01.txt"
// Количество байт для чтения из файла
#define READ_BYTES 500

// Функция для вывода содержимого файла
BOOL printFileText(LPWSTR fileName)
{
    try
    {
        // Открытие файла для чтения
        HANDLE hf = CreateFile(fileName, GENERIC_READ, NULL, NULL, OPEN_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
        // Проверка на успешное открытие файла
        if (hf == INVALID_HANDLE_VALUE)
            throw "[ERROR] Create or open file failed.";

        DWORD n = NULL;
        char buf[1024];

        // Очистка буфера перед чтением
        ZeroMemory(buf, sizeof(buf));
        // Чтение данных из файла
        BOOL b = ReadFile(hf, &buf, READ_BYTES, &n, NULL);
        if (!b)
            throw "[ERROR] Read file failed";

        cout << buf << endl;
        CloseHandle(hf);
        return true;
    }
    catch (const char* em)
    {
        cout << em << endl;
        return false;
    }
}

// Функция для удаления строки из файла
BOOL delRowFileTxt(LPWSTR fileName, DWORD row)
{
    // Преобразование пути файла в строку
    char filepath[20];
    filepath[19] = '\0';
    wcstombs(filepath, fileName, 20);
    // Вывод информации о текущей операции
    cout << "\nRow for delete: " << row << "\n\n";

    try
    {
        // Открытие файла для чтения
        HANDLE hf = CreateFile(fileName, GENERIC_READ, NULL, NULL, OPEN_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
        // Проверка на успешное открытие файла
        if (hf == INVALID_HANDLE_VALUE)
        {
            CloseHandle(hf);
            throw "[ERROR] Create or open file failed";
        }

        DWORD n = NULL;
        char buf[1024];
        BOOL b;

        // Очистка буфера перед чтением
        ZeroMemory(buf, sizeof(buf));
        // Чтение данных из файла
        b = ReadFile(hf, &buf, sizeof(buf), &n, NULL);
        if (!b)
        {
            CloseHandle(hf);
            throw ("[ERROR] Read file unsuccessful");
        }
        CloseHandle(hf);

        // Открытие файла для записи
        HANDLE hAppend = CreateFile(fileName, GENERIC_WRITE, NULL, NULL, OPEN_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
        char editedBuf[1024];
        // Очистка буфера перед записью
        ZeroMemory(editedBuf, sizeof(editedBuf));

        int line = 1;
        int j = 0;
        bool rowFound = false;
        for (int i = 0; i < n; i++)
        {
            if (line == row)
                rowFound = true;
            else
            {
                // Копирование строки в буфер, если не строка для удаления
                editedBuf[j] = buf[i];
                j++;
            }

            if (buf[i] == '\n')
                line++;
        }
        // Проверка, была ли найдена строка для удаления
        if (!rowFound)
        {
            CloseHandle(hAppend);
            throw ("[ERROR] Can't find this row.\n");
        }

        // Запись отредактированного буфера обратно в файл
        b = WriteFile(hAppend, editedBuf, n, &n, NULL);
        if (!b)
        {
            CloseHandle(hAppend);
            throw ("[ERROR] Write file unsuccessful\n");
        }
        cout << editedBuf << endl;
        CloseHandle(hAppend);
        cout << "\n";
        return true;
    }
    catch (const char* em)
    {
        cout << em << " \n";
        cout << "==========================================\n";
        return false;
    }
}

int main()
{
    setlocale(LC_ALL, "ru");
    LPWSTR file = (LPWSTR)FILE_PATH;

    delRowFileTxt(file, 1);
    delRowFileTxt(file, 3);
    delRowFileTxt(file, 8);
    delRowFileTxt(file, 10);

    printFileText(file);

    return 0;
}
