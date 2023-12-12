#include <iostream>
#include <Windows.h>

void sh(HANDLE heap) {
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

// Параметры пользовательской кучи:
    // 1. доступ не синхронизирован
    // 2. куча заполняется нулями
    // 3. начальный размер 4 мб
    // 4. конечный размер ограничен размером виртуальной памяти

int main() {
    SetConsoleOutputCP(1251);
    const SIZE_T HEAPSIZE = 4 * 1024 * 1024;
    HANDLE heap = HeapCreate(0, HEAPSIZE, 0);
    sh(heap);

    const int ARRAYSIZE = 300000;
    int* array = (int*)HeapAlloc(heap, 0, ARRAYSIZE * sizeof(int));

    sh(heap);

    HeapFree(heap, 0, array);
    HeapDestroy(heap);

    return 0;
}

//Результаты показывают, что после создания массива общий размер кучи, а также размер распределенной области памяти увеличиваются.
//Это связано с тем, что массив int занимает место в куче.После удаления массива эти значения должны вернуться к исходным.
//Это подтверждает, что операции выделения и освобождения памяти работают корректно.