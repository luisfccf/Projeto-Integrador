
const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

// Permite receber dados JSON
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "Servidor do Projeto Integrador funcionando!",
        projeto: "Monitoramento e controle de soprador termico",
        status: "online"
    });
});

// Receber leituras do ESP32 e salvar no SQLite
app.post("/api/readings", (req, res) => {
    const { device_id, timestamp, variables } = req.body || {};

    if (
        typeof device_id !== "string" ||
        !device_id.trim() ||
        typeof timestamp !== "string" ||
        !timestamp.trim() ||
        !variables ||
        typeof variables.temp !== "number" ||
        !Number.isFinite(variables.temp) ||
        typeof variables.nivel !== "number" ||
        !Number.isFinite(variables.nivel)
    ) {
        return res.status(400).json({
            erro: "Dados invalidos"
        });
    }

    try {
        const resultado = db.prepare(`
            INSERT INTO leituras
            (device_id, timestamp, temp, nivel)
            VALUES (?, ?, ?, ?)
        `).run(
            device_id,
            timestamp,
            variables.temp,
            variables.nivel
        );

        console.log("Leitura salva no SQLite!");

        res.status(201).json({
            mensagem: "Leitura salva com sucesso",
            id: Number(resultado.lastInsertRowid),
            leitura: { device_id, timestamp, variables }
        });
    } catch (erro) {
        console.error("Erro ao salvar leitura:", erro);
        res.status(500).json({
            erro: "Falha ao salvar leitura"
        });
    }
});

// Consultar leituras armazenadas
app.get("/api/readings", (req, res) => {
    try {
        const registros = db.prepare(`
            SELECT * FROM leituras ORDER BY id DESC
        `).all();

        const leituras = registros.map((registro) => ({
            id: registro.id,
            device_id: registro.device_id,
            timestamp: registro.timestamp,
            variables: {
                temp: registro.temp,
                nivel: registro.nivel
            }
        }));

        res.json(leituras);
    } catch (erro) {
        console.error("Erro ao consultar leituras:", erro);
        res.status(500).json({
            erro: "Falha ao consultar leituras"
        });
    }
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
