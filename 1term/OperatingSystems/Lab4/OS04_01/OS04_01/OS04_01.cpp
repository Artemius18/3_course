#include <iostream>
#include <thread>
#include <Windows.h>
using namespace std;

int main()
{
	system("chcp 1251 > nul");
	for (short i = 1; i <= 10000; ++i)
	{
		cout << "PID: " << GetCurrentProcessId() << "\n";
		cout << "TID: " << GetCurrentThreadId() << "\n";
		Sleep(1000);
	}
	return 0;

}
//(Get - Process OS04_02).Threads