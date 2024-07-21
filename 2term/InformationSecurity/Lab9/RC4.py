import time

def KSA(key):
    key_length = len(key)
    S = list(range(256))
    j = 0
    for i in range(256):
        j = (j + S[i] + key[i % key_length]) % 256
        S[i], S[j] = S[j], S[i]  
    return S

def PRGA(S):
    i = 0
    j = 0
    while True:
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]  
        t = (S[i] + S[j]) % 256
        K = S[t]
        yield K

def RC4(key):
    S = KSA(key)
    return PRGA(S)

def generate_keystream(key, n):
    keystream = []
    rc4 = RC4(key)
    for _ in range(n):
        keystream.append(next(rc4))
    return keystream

def evaluate_speed(key, n, iterations=100):
    start_time = time.time()
    for _ in range(iterations):
        generate_keystream(key, n)
    end_time = time.time()
    total_time = end_time - start_time
    avg_time_per_iteration = total_time / iterations
    print("Total time for", iterations, "iterations:", total_time, "seconds")
    print("Average time per iteration:", avg_time_per_iteration, "seconds")

key = [61, 60, 23, 22, 21, 20]
n = 8

keystream = generate_keystream(key, n)
print("Generated keystream:", keystream)
evaluate_speed(key, n)


# def encrypt_decrypt(text, key):
#     keystream = generate_keystream(key, len(text))
#     encrypted_text = [a ^ b for a, b in zip(text, keystream)]
#     decrypted_text = [a ^ b for a, b in zip(encrypted_text, keystream)]
#     return encrypted_text, decrypted_text

# key = [61, 60, 23, 22, 21, 20]
# plaintext = [72, 69, 76, 76, 79]  # "HELLO"

# encrypted_text, decrypted_text = encrypt_decrypt(plaintext, key)

# print("Original Text:", plaintext)
# print("Encrypted Text:", encrypted_text)
# print("Decrypted Text:", decrypted_text)
