from enigma.machine import EnigmaMachine

# Настройка машины Энигма с роторами VIII, II, IV и отражателем B
machine = EnigmaMachine.from_key_sheet(
   rotors='VIII II IV',
   reflector='B',
   ring_settings='AAA',  # начальные настройки роторов
   plugboard_settings='AV BS CG DL FU HZ IN KM OW RX'  # настройки коммутационной панели
)

def enigma_simulator(input_text):
    # Установка начального положения роторов
    machine.set_display('WXC')

    # Шифрование входного текста
    cipher_text = machine.process_text(input_text)

    return cipher_text

# Тестирование симулятора
print(enigma_simulator('HELLO'))