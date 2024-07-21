from sympy.ntheory.residue_ntheory import primitive_root
from sympy import randprime, mod_inverse
from random import randint
import time

def generate_prime(digits):
    lower_bound = 10 ** (digits - 1)
    upper_bound = 10 ** digits - 1
    return randprime(lower_bound, upper_bound)

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Время выполнения функции {func.__name__}: {end_time - start_time} секунд")
        return result
    return wrapper


def fast_modular_exponentiation(base, exponent, modulus):
    result = 1
    base = base % modulus
    while exponent > 0:
        if exponent % 2 == 1:
            result = (result * base) % modulus
        exponent = exponent >> 1
        base = (base * base) % modulus
    return result

@timer_decorator
def encrypt(message, p, g, y):
    encrypted_message = []
    for char in message:
        k = randint(2, p - 2) # границы  входят, поэтому если 1 < k < p-1, в функцию надо передавать p-2
        a = fast_modular_exponentiation(g, k, p) # g^k mod p
        b = (fast_modular_exponentiation(y, k, p) * ord(char)) % p 
        encrypted_message.append((a, b))
    return encrypted_message

@timer_decorator
def decrypt(enc_message, p, x):
    decrypted_message = ""
    for pair in enc_message:
        a, b = pair
        inverse_a = pow(a, x, p) # (a^x) mod p
        inverse_a = mod_inverse(inverse_a, p) # (a^x)^(-1) mod p
        m = (b * inverse_a) % p
        decrypted_message += chr(m)
    return decrypted_message


p = generate_prime(100)
g = primitive_root(p)
x = randint(2, p - 1) # границы  входят, поэтому если 1 < x < p, в функцию надо передавать p-1
y = fast_modular_exponentiation(g, x, p)

message = "Pshenko Artyom Fyodorovich"
enc_message = encrypt(message, p, g, y)
print(enc_message)

print(decrypt(enc_message, p, x))

