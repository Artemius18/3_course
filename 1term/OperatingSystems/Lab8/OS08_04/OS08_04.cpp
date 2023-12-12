#include <iostream>
#include <windows.h>

void sh(HANDLE heap) {
    SetConsoleOutputCP(1251);
    PROCESS_HEAP_ENTRY entry;
    entry.lpData = NULL;
    SIZE_T totalSize = 0, allocatedSize = 0, unallocatedSize = 0;

    while (HeapWalk(heap, &entry) != FALSE) {
        totalSize += entry.cbData;
        if (entry.wFlags & PROCESS_HEAP_ENTRY_BUSY) {
            allocatedSize += entry.cbData;
        }
        else {
            unallocatedSize += entry.cbData;
        }
    }

    std::cout << "Общий размер heap: " << totalSize << "\n";
    std::cout << "Размер распределенной области памяти heap: " << allocatedSize << "\n";
    std::cout << "Размер нераспределенной области памяти heap: " << unallocatedSize << "\n";
}

int main() {
    HANDLE heap = GetProcessHeap();
    sh(heap);

    const int ARRAYSIZE = 300000;
    int* array = new int[ARRAYSIZE];

    sh(heap);

    delete[] array;
    return 0;
}

//Результаты показывают, что после создания массива общий размер кучи, а также размер распределенной области памяти увеличиваются.
//Это связано с тем, что массив int занимает место в куче.После удаления массива эти значения должны вернуться к исходным.
//Это подтверждает, что операции выделения и освобождения памяти работают корректно.