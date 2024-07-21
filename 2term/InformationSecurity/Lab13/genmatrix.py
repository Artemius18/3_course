from PIL import Image
from stegano import lsb
import numpy as np
import matplotlib.pyplot as plt

def generate_message():
    return "Pshenko Artyom Fyodorovich"

def embed_message_LSB(container_file, message):
    # Метод размещения битового потока с использованием младших значащих битов
    secret = lsb.hide(container_file, message)
    secret.save("embedded_LSB.jpg")
    print("Сообщение успешно осаждено методом LSB.")

def embed_message_with_password(container_file, message, password):
    # Метод размещения сообщения с использованием пароля
    binary_message = ''.join([format(ord(char), '08b') for char in message])
    binary_message += '00000000'  # Null byte to indicate end of message

    img = Image.open(container_file)
    img_data = np.array(img)
    stego_image_data = img_data.copy()

    # Преобразование пароля в бинарный формат
    password_binary = ''.join(format(ord(char), '08b') for char in password)
    password_length = len(password_binary)

    # Осаждение сообщения с использованием пароля
    idx = 0
    for i in range(len(img_data)):
        for j in range(len(img_data[0])):
            for k in range(3):  # 3 цветовых канала
                if idx < len(binary_message):
                    # Применяем XOR шифрование с битами пароля к битам сообщения
                    stego_image_data[i][j][k] = (img_data[i][j][k] & ~1) | (int(binary_message[idx]) ^ int(password_binary[idx % password_length]))
                    idx += 1
                else:
                    break

    stego_image = Image.fromarray(stego_image_data)
    stego_image.save("embedded_with_password.png")
    print("Сообщение успешно осаждено с использованием пароля.")

    # Извлечение сообщения с использованием пароля
    img = Image.open(container_file)
    img_data = np.array(img)

    # Преобразование пароля в бинарный формат
    password_binary = ''.join(format(ord(char), '08b') for char in password)
    password_length = len(password_binary)

    extracted_message = ""
    idx = 0
    for i in range(len(img_data)):
        for j in range(len(img_data[0])):
            for k in range(3):  # 3 цветовых канала
                if idx < 8:  # Пропускаем первые 8 бит (маркер конца сообщения)
                    idx += 1
                    continue
                # Применяем XOR шифрование с битами пароля к битам сообщения
                extracted_bit = (img_data[i][j][k] & 1) ^ int(password_binary[idx % password_length])
                extracted_message += str(extracted_bit)
                idx += 1

    # Находим маркер конца сообщения и извлекаем только биты сообщения
    end_idx = extracted_message.find("00000000")
    extracted_message = extracted_message[8:end_idx]

    # Преобразуем бинарное сообщение в строку символов ASCII
    extracted_text = ""
    for i in range(0, len(extracted_message), 8):
        extracted_text += chr(int(extracted_message[i:i+8], 2))

    return extracted_text

def generate_color_matrix(container_file):
    # Формирование цветовой матрицы
    img = Image.open(container_file)
    img_data = np.array(img)
    
    # Создаем пустую матрицу для каждого канала цвета (R, G, B)
    color_matrices = { "R": np.zeros_like(img_data[:,:,0]), 
                       "G": np.zeros_like(img_data[:,:,1]), 
                       "B": np.zeros_like(img_data[:,:,2]) }
    
    # Заполняем матрицы значениями младших битов каждого канала
    for channel, matrix in color_matrices.items():
        matrix.flat = img_data[:,:,["R", "G", "B"].index(channel)].flatten() & 1
    
    # Отображение цветовых матриц
    fig, axs = plt.subplots(1, 3, figsize=(15, 5))
    for i, (channel, matrix) in enumerate(color_matrices.items()):
        axs[i].imshow(matrix, cmap='gray')
        axs[i].set_title(f"Channel: {channel}")
        axs[i].axis('off')
    plt.show()

# Генерация сообщения и выбор пароля
message = generate_message()
password = "mysecretpassword"

# Выбор и применение методов размещения сообщения
embed_message_LSB("container.jpg", message)
embed_message_with_password("container.jpg", message, password)

# Формирование цветовых матриц
generate_color_matrix("container.jpg")
