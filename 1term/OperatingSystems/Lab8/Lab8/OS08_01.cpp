#include <iostream>
#include <Windows.h>
using namespace std;


int main()
{
	for (int i = 1; i <= 1000000; ++i)
	{
		system("chcp 1251>nul");
		cout << "ну длинный цикл, и шо (все можно показать и без него)" << "\n";
		Sleep(1000);
	}
}