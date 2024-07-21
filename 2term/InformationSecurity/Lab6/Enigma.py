from enigma.machine import EnigmaMachine

machine = EnigmaMachine.from_key_sheet(
   rotors='VIII II IV',
   reflector='B',
   ring_settings=[1, 0, 1],
   plugboard_settings='AV BS CG DL FU HZ IN KM OW RX')

machine.set_display('WXC')

message = 'Pshenko'
ciphertext = machine.process_text(message)
print(f'Зашифрованное сообщение: {ciphertext}')

machine.set_display('WXC')

plaintext = machine.process_text(ciphertext)
print(f'Расшифрованное сообщение: {plaintext}')