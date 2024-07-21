from sympy import randprime, isprime, gcd, mod_inverse
import time

def generate_prime(digits):
    lower_bound = 10 ** (digits - 1)
    upper_bound = 10 ** digits - 1
    return randprime(lower_bound, upper_bound)

def euler_value(p, q):
    fi = (p-1)*(q-1)
    return fi

def find_e(fi):
    for e in range(2, fi):
        if isprime(e) and gcd(e, fi) == 1:
            return e
    return None

def generate_public_key(p, q, fi):
    n = p * q
    e = find_e(fi)
    return n, e

def generate_private_key(e, fi, n):
    d = mod_inverse(e, fi) # d = e^(-1) mod fi
    return n, d

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Время выполнения функции {func.__name__}: {end_time - start_time} секунд")
        return result
    return wrapper

@timer_decorator
def encrypt(message, e, n):
    encrypted_message = [pow(ord(char), e, n) for char in message]
    return encrypted_message

@timer_decorator
def decrypt(encrypted_message, d, n):
    decrypted_message = ''.join([chr(pow(el, d, n)) for el in encrypted_message])
    return decrypted_message

 

p = generate_prime(100)
q = generate_prime(100)
fi = euler_value(p, q)

n, e = generate_public_key(p, q, fi)
n, d = generate_private_key(e, fi, n)

message = "Pshenko Artyom Fyodorovich"
print("Original Message:", message)

encrypted_message = encrypt(message, e, n)
print("Encrypted Message:", encrypted_message)

decrypted_message = decrypt(encrypted_message, d, n)
print("Decrypted Message:", decrypted_message)

print(generate_private_key(79, 3220, 3337))