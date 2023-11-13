#include <Windows.h>
#include <iostream>
#include <ctime>
using namespace std;



int main() {
	DWORD pid = GetCurrentProcessId();
	//cout << "Main process ID: " << pid << '\n';

	long long it = -60 * 10000000;
	HANDLE htimer = CreateWaitableTimer(NULL, FALSE, L"os08_04");
	if (!SetWaitableTimer(htimer, (LARGE_INTEGER*)&it, 60000, NULL, NULL, FALSE))
		throw "SetWaitableTimer Error";

	LPCWSTR path = L"E:\\BSTU\\3_course\\1term\\OperatingSystems\\Lab7\\x64\\Debug\\OS07_04x.exe";

	PROCESS_INFORMATION pi1, pi2;
	clock_t start = clock();
	pi1.dwThreadId = 1; pi2.dwThreadId = 2;
	{
		STARTUPINFO si; ZeroMemory(&si, sizeof(STARTUPINFO)); si.cb = sizeof(STARTUPINFO);
		CreateProcess(path, NULL, NULL, NULL, FALSE, CREATE_NEW_CONSOLE, NULL, NULL, &si, &pi1) ?
			cout << "Process os07_04x #1 was created\n" : cout << "Process os07_04x #1 wasn't created\n";
	}
	{
		STARTUPINFO si; ZeroMemory(&si, sizeof(STARTUPINFO)); si.cb = sizeof(STARTUPINFO);
		CreateProcess(path, NULL, NULL, NULL, FALSE, CREATE_NEW_CONSOLE, NULL, NULL, &si, &pi2) ?
			cout << "Process os07_04x #2 was created\n" : cout << "Process os07_04x #2 wasn't created\n";
	}

	WaitForSingleObject(pi1.hProcess, INFINITE);
	WaitForSingleObject(pi2.hProcess, INFINITE);

	CloseHandle(htimer);
	system("pause");
	return 0;
}