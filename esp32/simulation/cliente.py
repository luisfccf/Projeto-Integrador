
import requests
import time
import random

# Endereco do nosso backend Node.js
SERVER = "http://localhost:3000/api/readings"

# Identificacao do ESP32 simulado
DEVICE_ID = "ESP32_SIM_01"

print("Simulador ESP32 iniciado!")

while True:
    # Simula as leituras dos sensores
    dados = {
        "device_id": DEVICE_ID,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "variables": {
            "temp": round(22 + random.random() * 4, 2),
            "nivel": round(50 + random.random() * 10, 2)
        }
    }

    try:
        # Envia os dados para o backend
        resposta = requests.post(
            SERVER,
            json=dados,
            timeout=5
        )

        print(
            "[POST]",
            resposta.status_code,
            resposta.text
        )

    except requests.RequestException as erro:
        print("Erro de comunicacao:", erro)

    # Aguarda 5 segundos
    time.sleep(5)
