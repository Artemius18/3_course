#include <iostream>
#include <Windows.h>
using namespace std;

// Объявление функций
HANDLE createThread(LPTHREAD_START_ROUTINE func);
void close_timer_watcher();
void print_timer_watcher();


// Глобальные переменные для управления таймерами и циклом
HANDLE print_timer = CreateWaitableTimer(NULL, FALSE, L"os08_04v2_print");
HANDLE close_timer = CreateWaitableTimer(NULL, FALSE, L"os08_04v2_close");

bool print = false, iterate = true;




int main()
{
	// Массив функций для потоков
	LPTHREAD_START_ROUTINE funcs[] = { (LPTHREAD_START_ROUTINE)close_timer_watcher, (LPTHREAD_START_ROUTINE)print_timer_watcher };

	const int size = sizeof(funcs) / sizeof(LPTHREAD_START_ROUTINE);
	HANDLE threads[size];

	// Временные интервалы для таймеров
	LARGE_INTEGER close_timeout;
	close_timeout.QuadPart = -150000000LL; // 15 секунд

	LARGE_INTEGER print_timeout;
	print_timeout.QuadPart = -30000000LL; // 3 секунды

	// Замер времени для подсчета длительности цикла
	clock_t current_time, start_time = clock();

	unsigned long int i;

	// Создание потоков
	for (i = 0; i < size; i++)
		threads[i] = createThread(funcs[i]);

	// Установка таймеров
	SetWaitableTimer(print_timer, &print_timeout, 3000, NULL, NULL, FALSE);
	SetWaitableTimer(close_timer, &close_timeout, 0, NULL, NULL, 0);


	// Бесконечный цикл
	for (i = 0; iterate; i++)
	{
		// Замер текущего времени
		current_time = ((clock() - start_time) / CLOCKS_PER_SEC);

		// Если флаг print установлен в true, выводим значения счетчика итераций и времени
		if (print)
		{
			cout << "Time:  " << current_time << "\tIterations: " << i << '\n';
			print = false;
		}
	}
	// Вывод итогового значения счетчика итераций
	cout << "Final: " << i << '\n';

	// Закрытие дескрипторов потоков
	for (i = 0; i < size; i++)
		CloseHandle(threads[i]);

	system("pause");
	return 0;
}

// Функция для создания потока
HANDLE createThread(LPTHREAD_START_ROUTINE func)
{
	DWORD thread_id = NULL;
	HANDLE thread = CreateThread(NULL, 0, func, NULL, 0, &thread_id);

	if (thread == NULL) {
		throw "Error creating child thread";
	}

	return thread;
}
// Функция для создания потока
void close_timer_watcher()
{
	WaitForSingleObject(close_timer, INFINITE);

	iterate = false;

	CloseHandle(close_timer);
}
// Функция для создания потока
void print_timer_watcher()
{
	for (;;)
	{
		WaitForSingleObject(print_timer, INFINITE);

		print = true;
	}

	CloseHandle(print_timer);
}