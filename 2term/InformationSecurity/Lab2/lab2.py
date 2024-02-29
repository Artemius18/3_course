import collections
from math import *
import matplotlib.pyplot as plt
from base64 import *

def draw_hist(probabilities):
    plt.bar(probabilities.keys(), probabilities.values())
    plt.xlabel("Символ")
    plt.ylabel("Вероятность")
    plt.title("Вероятности символов")
    plt.show()


#==========================РАСЧЕТ ЭНТРОПИИ======================================
histograms = {}
def calculate_Shannon_entropy(file_name):
  with open(file_name, 'r') as f:
      text = f.read()
      symbol_counts = collections.Counter(text)
      total_symbols = len(text)
      probabilities = {symbol: count / total_symbols for symbol, count in symbol_counts.items()}
      if file_name not in histograms:
          draw_hist(probabilities)
          histograms[file_name] = probabilities

      entropy = -sum(p * log2(p) for p in probabilities.values()) # ф-ла 2.1
      return entropy


def calculate_Hartley_entropy(file_name):
  with open(file_name, 'r') as f:
      text = f.read()
  N = len(set(text))
  return log2(N)


#========================ФУНКЦИЯ ПЕРЕВОДА ФАЙЛА В BASE64========================
def convert_to_base64(file):
  with open(file, 'rb') as f:
      text = f.read()
  encoded_text = b64encode(text)

  with open('./base64.txt', 'wb') as f:
      f.write(encoded_text)
  return encoded_text


convert_to_base64('./eng.txt')

#------------расчет энтропии Хартли и Шеннона для латиницы и base64------------
#Шеннона
Hs_eng = calculate_Shannon_entropy('./eng.txt')
Hs_base64 = calculate_Shannon_entropy('base64.txt')

print(f'Энтропия Шеннона файла на латинице: {Hs_eng:.3f}')
print(f'Энтропия Шеннона файла base64: {Hs_base64:.3f}\n')

#Хартли
Hch_eng = calculate_Hartley_entropy('./eng.txt')
Hch_base64 = calculate_Hartley_entropy('base64.txt')

print(f'Энтропия Хартли файла на латинице: {Hch_eng:.3f}')
print(f'Энтропия Хартли файла base64: {Hch_base64:.3f}\n')


#-----------------избыточность алфавитов латиницы и base64----------------------
R_eng = (Hch_eng-Hs_eng/Hch_eng)*100
print(f'Избыточность алфавита (eng): {R_eng:.3f}')

R_base64 = (Hch_base64-Hs_base64/Hch_base64)*100
print(f'Избыточность алфавита (base64): {R_base64:.3f}\n')

#zip = [(P, A), (s, r), ... ]
def xor(a, b, is_base64=False):
  if is_base64:
    a = b64decode(a)
    b = b64decode(b)
  if len(a) != len(b):
    if len(a) < len(b):
      a += b'0' * (len(b) - len(a))
      print(f'Заполнение нулями, чтобы параметры были одинаковы по длине: {a}')
    else:
      b += b'0' * (len(a) - len(b))
      print(f'Заполнение нулями, чтобы параметры были одинаковы по длине: {b}')
  result = [(a ^ b) for a, b in zip(a, b)]
  return result

name = 'Pshenko'
surname = 'Artyom'
name_bytes = name.encode('ascii')
surname_bytes = surname.encode('ascii')

print('=====XOR на латинице=====')
print(f'Фамилия: {surname}')
print(f'Имя: {name}')
lst = xor(surname_bytes, name_bytes)
print(lst)
print([chr(number) for number in lst], '\n')


print('=====XOR в base64=====')
print(f'Фамилия: {b64encode(surname_bytes)}')
print(f'Имя: {b64encode(name_bytes)}')
lst = xor(b64encode(surname_bytes), b64encode(name_bytes), True)
print(lst)
print([chr(number) for number in lst], '\n')