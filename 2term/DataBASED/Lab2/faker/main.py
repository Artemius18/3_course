import json
from faker import Faker
import random

fake = Faker()
data = []

for i in range(100):
    instrument = {
        "InstrumentName": fake.name() + ' ' + fake.word(),
        "CategoryID": random.randint(1, 5),
        "ManufacturerID": random.randint(1, 29),
        "Availability": random.choice([True, False]),
        "Price": round(random.uniform(100, 10000), 2)
    }
    data.append(instrument)

json_file_path = 'E:/BSTU/3_course/2term/DataBASED/Lab2/Instruments.json'
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=2)
