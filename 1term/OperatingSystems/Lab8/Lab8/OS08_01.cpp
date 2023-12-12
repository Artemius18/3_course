#include <iostream>
#include <Windows.h>
using namespace std;

int main()
{


    // Debug -> Windows -> Modules
    for (int i = 1; i <= 1000000; ++i)
    {
        system("chcp 1251>nul");
        cout << "абоба" << "\n";
        Sleep(1000);
    }

}
