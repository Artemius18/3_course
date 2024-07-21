import random
import math
import base64
from time import time

# Function to generate superincreasing sequence
def generate_superincreasing_sequence(n, m):
    max_number = 2 ** m
    sequence = []
    sum = 0
    next = 2

    for i in range(n):
        sequence.append(next)
        sum += next + 1
        next = sum

    return sequence

# Function to generate a number more than the sum of sequence elements
def more_than_seq_sum(seq):
    return sum(seq) + 4

# Function to calculate gcd
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

# Function to generate a
def generate_a(n):
    while True:
        a = random.randint(1, n - 1)
        if gcd(a, n) == 1:
            return a

# Function to generate open key
def generate_open_key(private_key, n, a):
    return [(elem * a) % n for elem in private_key]

# Function to convert message to ASCII to binary
def convert_message_to_ascii_to_binary(characters):
    return [format(ord(c), '08b') for c in characters]

# Function to convert message to Base64 to binary
def convert_message_to_base64_to_binary(characters):
    base64_bytes = base64.b64encode(characters.encode('utf-8'))
    base64_message = base64_bytes.decode('utf-8')
    return [format(ord(c), '08b') for c in base64_message]

# Function to encrypt message with private key
# умножаем каждый бит сообщения на соответствующий элемент открытого ключа и суммируя результаты
def encrypt(message, public_key):
    return [sum(int(bit) * key for bit, key in zip(msg, public_key)) for msg in message]

# Extended Euclidean Algorithm for finding modular inverse
def extended_euclidean(a, b):
    if a == 0:
        return b, 0, 1
    else:
        g, x, y = extended_euclidean(b % a, a)
        return g, y - (b // a) * x, x

# Function to find modular inverse
def mod_inverse(a, n):
    g, x, _ = extended_euclidean(a, n)
    if g == 1:
        return x % n

# Function to decrypt message with open key
def decrypt(encrypted_message, private_key, n, a):
    k = mod_inverse(a, n) # (a * k) % n = 1
    decrypted_message = [(e * k) % n for e in encrypted_message]
    result = []

    # преобр числа в двоичн формат
    for num in decrypted_message:
        binary = ''
        for key in reversed(private_key):
            if num >= key:
                num -= key
                binary = '1' + binary
            else:
                binary = '0' + binary
        result.append(binary)

    return result

# Function to convert binary to ASCII to message
def convert_binary_to_ascii_to_message(binary_strings):
    return ''.join(chr(int(binary, 2)) for binary in binary_strings)

# Function to convert binary to Base64 to message
def convert_binary_to_base64_to_message(binary_strings):
    base64_message = ''.join(chr(int(binary, 2)) for binary in binary_strings)
    base64_bytes = base64_message.encode('utf-8')
    message_bytes = base64.b64decode(base64_bytes)
    return message_bytes.decode('utf-8')



#Создание тайного ключа
start = time()

size = 8  # Размер последовательности
bits = 100  # Количество бит
private_key = generate_superincreasing_sequence(size, bits)

#Генерация n и a
n = more_than_seq_sum(private_key)
a = generate_a(n)

#Генерация открытого ключа (Нормальная последовательность чисел)
public_key = generate_open_key(private_key, n, a)
print('publicKey:', public_key)

end = time()
print('Время генерации последовательностей', (end-start))

#Перевод сообщения в ASCII
start1 = time()
message = "Pshenko Artyom Fyodorovich"
conv_mes = convert_message_to_ascii_to_binary(message)

#Шифрование сообщения
start_encr_acsii = time()
encrypt_mes = encrypt(conv_mes, public_key)
end_encr_acsii = time()
print("EncryptMes", encrypt_mes)
print('Время шифрации в ASCII:', end_encr_acsii-start_encr_acsii)

#Расшифрование сообщения
start_decr_acsii = time()
decrypted_message = decrypt(encrypt_mes, private_key, n, a)
end_decr_acsii = time()
print('Время дешифрации в ASCII:', end_decr_acsii-start_decr_acsii)

#Перевод из двоичной в char
decr_mess = convert_binary_to_ascii_to_message(decrypted_message)
print("decrMess", decr_mess)


#Перевод сообщения в Base64
start2 = time()
conv_base64 = convert_message_to_base64_to_binary(message)

#Шифрование сообщения
start_encr_base64 = time()
encrypt_mes2 = encrypt(conv_base64, public_key)
end_encr_base64 = time()
print(encrypt_mes2)
print('Время шифрации в BASE64:', end_encr_base64-start_encr_base64)

#Расшифрование сообщения
start_decr_base64 = time()
decrypted_message2 = decrypt(encrypt_mes2, private_key, n, a)
end_decr_base64 = time()
print('Время дешифрации в BASE64:', end_decr_base64-start_decr_base64)

#Перевод из 2 в char
decr_mess2 = convert_binary_to_base64_to_message(decrypted_message2)
print("decrMess", decr_mess2)


