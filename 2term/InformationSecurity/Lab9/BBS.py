from sympy import *
from random import randint
from math import gcd

def generate_BBS_sequence(p, q, x_0, length):
    N = p * q
    x = x_0
    result = []
    for _ in range(length):
        x = pow(x, 2, N)
        print('x = ', x)
        result.append(x % 2)
        print('result = ', result, '\n')
    return result   

p = randprime(10**6, 10**7)
q = randprime(10**6, 10**7)
    
while p % 4 != 3 and q % 4 != 3:
    p = randprime(10**6, 10**7)
    q = randprime(10**6, 10**7)
    
N = p * q
x_0 = randint(2, N - 1)

while gcd(x_0, N) != 1:
    x_0 = randint(2, N - 1)
    
length = 10 
    
bbs_sequence = generate_BBS_sequence(p, q, x_0, length)
print("BBS Sequence:", bbs_sequence)
