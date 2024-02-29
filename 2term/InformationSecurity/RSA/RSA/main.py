from sympy import randprime, isprime, gcd, mod_inverse


def generate_prime(digits):
    '''Генерация больших простых чисел'''
    lower_bound = 10 ** (digits - 1)
    upper_bound = 10 ** digits - 1
    return randprime(lower_bound, upper_bound)


def euler_value(p, q):
    '''
    Расчет значения функции Эйлера.
    Она нужна для поиска открытой экспоненты
    '''
    fi = (p-1)*(q-1)
    return fi


def find_e(fi):
    '''
    Поиск открытой эскпоненты:
    1. простое число
    2. < fi
    3. взаимно простое с fi
    '''
    for e in range(2, fi):
        if isprime(e) and gcd(e, fi) == 1:
            return e
    return None


def generate_public_key(p, q, fi):
    '''
    Генерация публичного ключа
    '''
    mod = p * q
    print('p', p)
    print('q', q)

    e = find_e(fi)

    return [mod, e]


def generate_private_key(e, fi, mod):
    d = mod_inverse(e, fi) #(d*e)%euler_value(p, q)=1
    return [mod, d]


p = generate_prime(10)
q = generate_prime(10)
fi = euler_value(p, q)

public_key = generate_public_key(p, q, fi)
mod = public_key[0]
e = public_key[1]


print('public: ', public_key)

private_key = generate_private_key(e, fi, mod)
print('private: ', private_key)
