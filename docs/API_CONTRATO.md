# Contrato proposto de API REST — Atividade 01

**Prefixo:** `/api`  
**Formato:** JSON (`Content-Type: application/json`)  
**Autenticação inicial proposta:** `Authorization: Bearer <token>`; o valor real não deve ser armazenado em código público.  
**Observação:** estas rotas representam um contrato *planejado*, ainda não implementado.

## 1. POST `/api/readings` — receber leituras

Requisição (compatível com `cliente.py` fornecido):

```json
{
  "device_id": "ESP32_SIM_01",
  "timestamp": "2026-10-25 13:00:00",
  "variables": { "temp": 24.5, "nivel": 55.8 }
}
```

- `device_id`: texto que identifica o dispositivo.
- `timestamp`: data/hora de medição; o formato acima reproduz a simulação fornecida (sem fuso). Em produção, preferir ISO 8601 com fuso horário.
- `variables.temp`: temperatura de exemplo em °C; o sensor real e seus limites ainda serão definidos.
- `variables.nivel`: variável genérica presente no simulador do professor, não uma medida definida do soprador térmico.

Resposta proposta: `201 Created` com `{"status":"received"}`.

## 2. GET `/api/commands` — buscar comandos pendentes

O ESP32 consulta periodicamente a API. Para manter compatibilidade com o script do professor, a resposta deve ser uma lista JSON:

```json
[
  {"id": 1, "name": "setpoint", "value": "30"}
]
```

Na ausência de comandos, responder `200 OK` com `[]`. A associação dos comandos ao dispositivo pode ser definida por autenticação ou por identificador explícito em uma etapa futura.

## 3. POST `/api/commands/add` — cadastrar comando

Requisição (compatível com `usuario.py` fornecido):

```json
{ "name": "setpoint", "value": "30" }
```

Resposta proposta: `201 Created` com `{"id":1,"status":"pending"}`. Nomes e valores permitidos deverão ser validados pela API. `setpoint` é apenas exemplo de comando de controle, não ordem para operar o hardware nesta atividade.

## 4. POST `/api/commands/ack` — confirmar recebimento/processamento

Requisição (compatível com `cliente.py` fornecido):

```json
{ "device_id": "ESP32_SIM_01" }
```

Resposta proposta: `200 OK` com `{"status":"acknowledged"}`. **Limitação do script didático:** sem IDs de comandos, uma confirmação por dispositivo não distingue quais comandos foram processados; recomenda-se futuramente informar os IDs confirmados e o resultado da execução.

## 5. GET `/api/readings/history` — histórico (extensão proposta)

Resposta de exemplo:

```json
[
  {
    "device_id": "ESP32_SIM_01",
    "timestamp": "2026-10-25 13:00:00",
    "variables": { "temp": 24.5, "nivel": 55.8 }
  }
]
```

Essa rota é adicional ao código fornecido e servirá ao frontend planejado.

## 6. Respostas de erro previstas

- `400 Bad Request`: dados com valores ou formatos inválidos.
- `401 Unauthorized`: ausência de credenciais ou token inválido.
- `404 Not Found`: recurso inexistente, quando aplicável.
- `500 Internal Server Error`: falha inesperada no servidor.

## 7. Premissas de implantação

O endereço `http://localhost/api` nos scripts pressupõe que a API é acessível no próprio ambiente de execução dos clientes. Se a simulação rodar no Colab e o servidor rodar em outra máquina, `localhost` não apontará para esse servidor. Endereço, porta e token serão configurados durante a implementação.
## Status de implementação — Atividade 02

### Endpoints implementados
- GET / — Verificar funcionamento do servidor.
- POST /api/readings — Receber e salvar leituras no SQLite.
- GET /api/readings — Consultar leituras armazenadas.

### Endpoints planejados
- GET /api/commands — Consultar comandos pendentes.
- POST /api/commands/add — Cadastrar comandos.
- POST /api/commands/ack — Confirmar execução de co
mandos.
- GET /api/readings/history — Consultar histórico específico.

### Tecnologias utilizadas
- Backend: Node.js + Express
- Banco de dados: SQLite
- Simulador ESP32: Python
- Comunicação: HTTP REST e JSON
