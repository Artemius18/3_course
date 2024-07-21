from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa

## алгоритм RSA для генерации пары ключей: приватного и публичного.
## приватный - для созд подписи, публичный - для проверки
def generate_keys():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()
    return private_key, public_key


# принимает приватный ключ и сообщение, которое нужно подписать. Она создаёт подпись, используя алгоритм 
# SHA256 и схему заполнения PSS (Probabilistic Signature Scheme). Эта схема добавляет случайность в процесс подписи, что увеличивает безопасность.
def sign(private_key, message):
    signature = private_key.sign(
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    return signature

# принимает публичный ключ, сообщение и подпись. Она пытается проверить подпись с использованием того же алгоритма и схемы заполнения, 
# что и при создании подписи. Если подпись верна, функция выводит “Подпись верна”. В противном случае - “Подпись неверна”.
def verify(public_key, message, signature):
    try:
        public_key.verify(
            signature,
            message,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        print("Подпись верна.")
    except:
        print("Подпись неверна.")


private_key, public_key = generate_keys()
message = b"Hello, World!"
signature = sign(private_key, message)
verify(public_key, message, signature)
