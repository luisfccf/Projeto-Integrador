
const { DatabaseSync } = require("node:sqlite");
const path = require("path");

// Define o caminho do banco
const db = new DatabaseSync(
    path.join(__dirname, "database.sqlite")
);

// Cria a tabela se ela ainda nao existir
db.exec(`
    CREATE TABLE IF NOT EXISTS leituras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        temp REAL NOT NULL,
        nivel REAL NOT NULL
    )
`);

console.log("Banco SQLite inicializado com sucesso!");

module.exports = db;
