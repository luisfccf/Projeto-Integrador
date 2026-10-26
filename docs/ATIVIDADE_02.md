
# Atividade 02 — Comunicação Básica e Protótipo de Backend

## 1. Objetivo

Implementar a comunicação HTTP entre um ESP32 simulado
e um servidor web para monitoramento de um soprador
térmico, com recebimento, armazenamento e consulta
de dados.

## 2. Tecnologias utilizadas

- Node.js: ambiente de execução do backend.
- Express: framework para desenvolvimento da API REST.
- SQLite: banco de dados relacional.
- Python: simulação do ESP32.
- Requests: biblioteca para comunicação HTTP.

## 3. Arquitetura

ESP32 simulado (Python)
        |
        | HTTP POST /api/readings
        v
Servidor Node.js + Express
        |
        | INSERT
        v
Banco de dados SQLite
        |
        | SELECT
        v
API GET /api/readings

## 4. Endpoints implementados

### GET /

Verifica o funcionamento do servidor.

### POST /api/readings

Recebe e armazena leituras do ESP32.

Exemplo de JSON:

```json
{
  "device_id": "ESP32_SIM_01",
  "timestamp": "2026-10-25 22:00:00",
  "variables": {
    "temp": 24.5,
    "nivel": 55.8
  }
}
```

Resposta de sucesso: HTTP 201.

### GET /api/readings

Retorna as leituras armazenadas no banco SQLite,
ordenadas da mais recente para a mais antiga.

## 5. Banco de dados

Arquivo local: backend/database.sqlite

Tabela: leituras

Campos:
- id: identificador único
- device_id: identificação do dispositivo
- timestamp: data e horário
- temp: temperatura simulada
- nivel: variável de nível simulada

## 6. Simulação do ESP32

O arquivo esp32/simulation/cliente.py simula um ESP32.

O programa gera leituras automaticamente e realiza
requisições HTTP POST a cada 5 segundos.

A variável nivel ainda é fictícia e poderá ser
adaptada às características do soprador térmico.

## 7. Execução

Na pasta backend:

node --experimental-sqlite index.js

Na pasta principal do projeto:

python esp32/simulation/cliente.py

O backend precisa estar ativo durante a simulação.

## 8. Resultados dos testes

- Servidor Express iniciado com sucesso.
- Endpoint POST testado com PowerShell.
- Endpoint GET testado no navegador.
- Leituras armazenadas no SQLite.
- Persistência confirmada após reiniciar o servidor.
- Simulador Python enviando leituras a cada 5 segundos.
- Respostas HTTP 201 recebidas com sucesso.
- Foram observados pelo menos 12 registros no banco.

## 9. Limitações e próximas etapas

A comunicação foi testada localmente, utilizando
um ESP32 simulado em Python.

A autenticação, a comunicação com o ESP32 físico,
a interface web e o gerenciamento de comandos
ainda não foram implementados.

O módulo node:sqlite utilizado no Node.js 22.11.0
é experimental e requer --experimental-sqlite.

## 10. Conclusão

O protótipo de backend foi desenvolvido e testado
com sucesso, permitindo receber, armazenar e
consultar leituras simuladas de sensores.

A implementação estabelece a comunicação básica
necessária para as próximas etapas do projeto.
