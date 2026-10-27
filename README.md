# Projeto-Integrador
Sistema Web para Controle Remoto e Monitoramento em Tempo Real de um Soprador Térmico via ESP32.
## Tecnologias utilizadas

O projeto utiliza as seguintes tecnologias para desenvolver o sistema web de controle e monitoramento de um soprador térmico via ESP32.

### Backend
- **Node.js:** ambiente de execução do servidor.
- **Express.js:** framework utilizado para implementar a API REST e gerenciar requisições HTTP.

### Banco de dados
- **SQLite:** banco de dados relacional utilizado para armazenar as leituras dos sensores e permitir consultas ao histórico.

### ESP32 e simulação
- **ESP32:** microcontrolador previsto para aquisição de dados e controle do sistema físico.
- **Python 3:** utilizado para simular o comportamento do ESP32 durante o desenvolvimento.
- **Requests:** biblioteca Python utilizada para enviar requisições HTTP ao backend.

### Comunicação
- **HTTP REST:** protocolo utilizado para comunicação entre o ESP32 simulado e o servidor.
- **JSON:** formato utilizado na troca de informações entre os módulos.

### Frontend (planejado)
- **HTML, CSS e JavaScript:** tecnologias previstas para desenvolver a interface web de monitoramento e controle.

## Estado atual do desenvolvimento

- **Atividade 01:** definição da arquitetura, organização do repositório e documentação da API.
- **Atividade 02:** implementação do backend com Node.js e Express, armazenamento em SQLite e comunicação HTTP com o ESP32 simulado.

As próximas etapas incluem o desenvolvimento do dashboard, o envio de comandos ao ESP32, a autenticação e os recursos de segurança exigidos pelo projeto.
