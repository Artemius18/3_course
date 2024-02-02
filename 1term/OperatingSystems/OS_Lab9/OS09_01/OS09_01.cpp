#include <Windows.h>
#include <iostream>
#include <string>
using namespace std;

#define FILE_PATH L"E:/BSTU/3_course/1term/OperatingSystems/OS_Lab9/OS09_01.txt"
#define READ_BUFFER_SIZE 1024

string getFileName(wchar_t* filePath)
{
    wstring ws(filePath);
    string filename(ws.begin(), ws.end());
    const size_t last_slash_idx = filename.find_last_of("\\/");
    if (string::npos != last_slash_idx)
        filename.erase(0, last_slash_idx + 1);
    return filename;
}

LPCWSTR getFileType(HANDLE file)
{
    switch (GetFileType(file))
    {
    case FILE_TYPE_UNKNOWN:
        return L"FILE_TYPE_UNKNOWN";
    case FILE_TYPE_DISK:
        return L"FILE_TYPE_DISK";
    case FILE_TYPE_CHAR:
        return L"FILE_TYPE_CHAR";
    case FILE_TYPE_PIPE:
        return L"FILE_TYPE_PIPE";
    case FILE_TYPE_REMOTE:
        return L"FILE_TYPE_REMOTE";
    default:
        return L"[ERROR]: WRITE FILE TYPE";
    }
}

BOOL printFileInfo(LPWSTR path)
{
    HANDLE file = CreateFile(
        path,
        GENERIC_READ,
        FILE_SHARE_READ,
        NULL,
        OPEN_ALWAYS,
        FILE_ATTRIBUTE_NORMAL,
        NULL);

    if (file == INVALID_HANDLE_VALUE)
    {
        wcout << "Error opening file: " << GetLastError() << endl;
        return false;
    }

    SYSTEMTIME sysTime;
    BY_HANDLE_FILE_INFORMATION fi;
    BOOL fResult = GetFileInformationByHandle(file, &fi);
    if (fResult)
    {
        cout << "File name:\t" << getFileName(path);
        wcout << "\nFile type:\t" << getFileType(file);
        wcout << "\nFile size:\t" << fi.nFileSizeLow << " bytes";
        FileTimeToSystemTime(&fi.ftCreationTime, &sysTime);
        wcout << "\nCreate time:\t" << sysTime.wDay << '.' << sysTime.wMonth << '.' << sysTime.wYear << " " << sysTime.wHour + 3 << '.' << sysTime.wMinute << '.' << sysTime.wSecond;
        FileTimeToSystemTime(&fi.ftLastWriteTime, &sysTime);
        wcout << "\nUpdate time:\t" << sysTime.wDay << '.' << sysTime.wMonth << '.' << sysTime.wYear << " " << sysTime.wHour + 3 << '.' << sysTime.wMinute << '.' << sysTime.wSecond;
    }
    CloseHandle(file);
    return true;
}

BOOL printFileTxt(LPWSTR path)
{
    HANDLE file = CreateFile(
        path,
        GENERIC_READ,
        FILE_SHARE_READ,
        NULL,
        OPEN_ALWAYS,
        FILE_ATTRIBUTE_NORMAL,
        NULL);

    if (file == INVALID_HANDLE_VALUE)
    {
        wcout << "Error opening file: " << GetLastError() << endl;
        return false;
    }

    char buf[READ_BUFFER_SIZE];
    DWORD bytesRead = 0;

    while (ReadFile(file, buf, READ_BUFFER_SIZE, &bytesRead, NULL) && bytesRead > 0)
    {
        cout.write(buf, bytesRead);
    }

    CloseHandle(file);

    return true;
}

int main()
{
    setlocale(LC_ALL, "ru");
    SetConsoleOutputCP(65001);  

    LPWSTR path = (LPWSTR)FILE_PATH;
    wcout << "\nInfo about file:\n\n";
    printFileInfo(path);
    wcout << "\n\n\n";
    printFileTxt(path);
}
