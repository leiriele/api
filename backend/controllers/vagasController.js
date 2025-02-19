const fs = require("fs");
const csv = require("csv-parser");
const config = require("../config/config");

let vagas = [];

// Carrega o CSV na inicialização
fs.createReadStream(config.CSV_FILE_PATH)
    .pipe(csv({ separator: "," }))
    .on("data", (data) => {
        const vagaFormatada = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key.trim(), value ? value.trim().toUpperCase() : ""])
        );
        vagas.push(vagaFormatada);
    })
    .on("end", () => {
        console.log("CSV carregado! Total de vagas:", vagas.length);
    })
    .on("error", (error) => console.error("Erro ao carregar CSV:", error));

exports.getAllVagas = (req, res) => {
    console.log("Buscando todas as vagas!");
    res.json(vagas);
};

exports.getVagasPorCidade = (req, res) => {
    const cidade = req.params.cidade.toUpperCase().trim();
    console.log(`🔍 Buscando vagas para a cidade: ${cidade}`);

    const filtradas = vagas.filter((vaga) => vaga.cidade === cidade);
    console.log("Total de vagas encontradas:",filtradas.length);


    if (filtradas.length === 0) {
        console.warn("⚠️ Nenhuma vaga encontrada para esta cidade:", cidade);
        return res.status(404).json({ mensagem: `Nenhuma vaga encontrada para ${cidade}.` });
    }

    res.json(filtradas);
};

exports.getVagasPorTipo = (req, res) => {
    const tipo_vaga = req.params.tipo_vaga.toUpperCase().trim();
    console.log(`🔍 Buscando vagas por tipo: ${tipo_vaga}`);

    const filtradas = vagas.filter((vaga) => vaga.tipo_vaga.toUpperCase() === tipo_vaga); // Certificando-se de que o tipo_vaga da vaga seja comparado de forma consistente
    console.log("Total de vagas encontradas:", filtradas.length);

    if (filtradas.length === 0) {
        console.warn("⚠️ Nenhuma vaga encontrada deste tipo:", tipo_vaga); // Usando 'tipo_vaga' corretamente
        return res.status(404).json({ mensagem: `Nenhuma vaga encontrada para o tipo ${tipo_vaga}.` });
    }

    res.json(filtradas);
};
