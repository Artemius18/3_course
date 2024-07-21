from Crypto.Cipher import DES
from Crypto.Util.Padding import pad, unpad
from time import time

key = "Artyomps".encode()

def des_encrypt_decrypt(message, key, mode='encrypt'):
    cipher = DES.new(key, DES.MODE_ECB)
    if mode == 'encrypt':
        start_time = time()
        ct_bytes = cipher.encrypt(pad(message.encode(), DES.block_size))
        end_time = time()
        print(f"Encryption time: {end_time - start_time} seconds")
        return ct_bytes
    elif mode == 'decrypt':
        start_time = time()
        pt = unpad(cipher.decrypt(message), DES.block_size).decode()
        end_time = time()
        print(f"Decryption time: {end_time - start_time} seconds")
        return pt


message = "Pshenko Artyom Fyodorovich"
cipher_text = des_encrypt_decrypt(message, key, 'encrypt')
print("Cipher text:", cipher_text)
plain_text = des_encrypt_decrypt(cipher_text, key, 'decrypt')
print("Plain text:", plain_text)
