import hashlib
import time

# Входные данные
data = "Pshenko Artyom Fyodorovich"

# Создаем хеш md5
start_time = time.time()
md5_hash = hashlib.md5()

# Обновляем хеш с помощью входных данных
md5_hash.update(data.encode())

# Получаем конечный хеш
digest = md5_hash.hexdigest()
end_time = time.time()

print(f"MD5 Hash: {digest}")
print(f"Время выполнения: {end_time - start_time} секунд")

