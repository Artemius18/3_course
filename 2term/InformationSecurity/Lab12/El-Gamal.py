import random
import hashlib
from sympy import mod_inverse
from math import gcd

def generate_keys(p, g, x):
    y = pow(g, x, p)
    return y

def sign_message(p, g, x, message):
    while True:
        k = random.randint(1, p-2) #  случайное число k, взаимно простое с (р – 1)
        a = pow(g, k, p) ## a = g^k mod p
        h = int(hashlib.sha256(message.encode('utf-8')).hexdigest(), 16) #вычисление хеша полученного сообщ
        if gcd(k, p-1) == 1:
            inverse_k = mod_inverse(k, p-1)
            if inverse_k is not None:
                break
    b = ((h - x*a) * inverse_k) % (p-1) ## Н(Mо) = (x^a + k^b) mod (p – 1) - отсюда ищем b
    return a, b

def verify_signature(p, g, y, a, b, message):
    h = int(hashlib.sha256(message.encode('utf-8')).hexdigest(), 16) #вычисление хеша полученного сообщ
    if (pow(y, a, p) * pow(a, b, p)) % p == pow(g, h, p): ## y^a * a^b ≡ g^h mod p. 
        return True
    else:
        return False

p = 23
g = 5

# тайный ключ 
x = 6

message = 'Hello, world!'

y = generate_keys(p, g, x)
a, b = sign_message(p, g, x, message)
print('Подпись верна:', verify_signature(p, g, y, a, b, message))
