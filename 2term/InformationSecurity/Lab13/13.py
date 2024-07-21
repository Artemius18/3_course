from stegano import lsb

# реализовать осаждаемое/извлекаемое сообщения
def embed_message(container_file, message):
    secret = lsb.hide(container_file, message)
    secret.save("embedded_" + container_file)
    return secret

def extract_message(embedded_container_file):
    message = lsb.reveal(embedded_container_file)
    return message

container_file = 'container.jpg'
message_own_info = 'Pshenko Artyom Fyodorovich'
embedded_container = embed_message(container_file, message_own_info)
extracted_message = extract_message(embedded_container)
print("Извлеченное сообщение:", extracted_message)


