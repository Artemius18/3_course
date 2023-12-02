#include <windows.h>
#include <iostream>

void sh(HANDLE heap) {
    PROCESS_HEAP_ENTRY entry;
    entry.lpData = NULL;
    SIZE_T totalSize = 0, allocatedSize = 0, unallocatedSize = 0;

    while (HeapWalk(heap, &entry) != 0) {
        if (entry.wFlags & PROCESS_HEAP_REGION) {
            totalSize += entry.Region.dwCommittedSize;
            allocatedSize += entry.Region.dwCommittedSize - entry.Region.dwUnCommittedSize;
            unallocatedSize += entry.Region.dwUnCommittedSize;
        }
    }

    std::cout << "Total heap size: " << totalSize << " bytes\n";
    std::cout << "Allocated memory size: " << allocatedSize << " bytes\n";
    std::cout << "Unallocated memory size: " << unallocatedSize << " bytes\n";
}

int main() {
    HANDLE heap = GetProcessHeap();
    if (heap == NULL) {
        std::cerr << "Failed to get process heap\n";
        return 1;
    }

    std::cout << "Before array allocation:\n";
    sh(heap);

    int* array = new int[6990000];

    //общий размер кучи и размер распределенной памяти увеличились
    //размер нераспределенной памяти может уменьшиться или остаться неизменным, в зависимости от того, была ли необходима 
    // дополнительная память для удовлетворения запроса на выделение памяти
    std::cout << "\nAfter array allocation:\n";
    sh(heap);

    delete[] array;

    return 0;
}
