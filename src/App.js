import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";  // Para incluir o estilo

function App() {
    const [vagas, setVagas] = useState([]);
    const [cidade, setCidade] = useState("");
    const [tipo, setTipo] = useState("");
    const [vagaSelecionada, setVagaSelecionada] = useState(null);  // Para armazenar a vaga selecionada

    useEffect(() => {
        axios.get("http://localhost:3001/vagas")
            .then(response => setVagas(response.data))
            .catch(error => console.error("Erro ao buscar vagas:", error));
    }, []);

    const buscarPorCidade = () => {
        axios.get(`http://localhost:3001/vagas/cidade/${cidade}`)
            .then(response => setVagas(response.data))
            .catch(error => console.error("Erro ao buscar por cidade:", error));
    };

    const buscarPorTipo = () => {
        axios.get(`http://localhost:3001/vagas/tipo/${tipo}`)
            .then(response => setVagas(response.data))
            .catch(error => console.error("Erro ao buscar por tipo:", error));
    };

    const selecionarVaga = (vaga) => {
        setVagaSelecionada(vaga);  // Ao clicar na vaga, armazena ela no estado
    };

    const fecharCard = () => {
        setVagaSelecionada(null);  // Para fechar o card
    };

    return (
        <div className="app">
            <h1>Vagas</h1>

            <div className="search-container">
                <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                <button onClick={buscarPorCidade}>Buscar por Cidade</button>

                <input type="text" placeholder="Tipo da Vaga" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                <button onClick={buscarPorTipo}>Buscar por Tipo</button>
            </div>

            <div className="vagas-list">
                {vagas.length > 0 ? (
                    vagas.map((vaga, index) => (
                        <div key={index} className="vaga-item" onClick={() => selecionarVaga(vaga)}>
                            <strong>{vaga.vaga || "Nome não informado"}</strong> - {vaga.cidade || "Cidade não informada"}
                        </div>
                    ))
                ) : (
                    <p>Nenhuma vaga encontrada</p>
                )}
            </div>

            {vagaSelecionada && (
                <div className="vaga-card">
                    <button className="close-btn" onClick={fecharCard}>X</button>
                    <h2>{vagaSelecionada.vaga}</h2>
                    <p><strong>Cidade:</strong> {vagaSelecionada.cidade}</p>
                    <p><strong>Tipo de Vaga:</strong> {vagaSelecionada.tipo_vaga}</p>
                    <p><strong>Salário:</strong> {vagaSelecionada.no_salario_inicio} - {vagaSelecionada.no_salario_limite}</p>
                    <p><strong>Carga Horária:</strong> {vagaSelecionada.carga_horaria} horas</p>
                    <p><strong>Data de Vigência:</strong> {vagaSelecionada.dt_vigencia_inicio} até {vagaSelecionada.dt_vigencia_limite}</p>
                    <p><strong>Quantidade de Vagas:</strong> {vagaSelecionada.no_qtd_vagas}</p>
                </div>
            )}
        </div>
    );
}

export default App;
