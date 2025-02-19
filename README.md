
# Web Application: Busca de Vagas de Emprego e Estágio

Esta aplicação permite aos usuários buscar vagas de emprego e estágio por **cidade** ou **tipo de vaga**. A interface é simples e intuitiva, com campos de pesquisa para filtrar as vagas disponíveis. Ao realizar a busca, as vagas correspondentes são exibidas em uma lista. Caso não haja resultados, um **modal** de erro é exibido informando o usuário sobre a indisponibilidade das vagas para o filtro selecionado.

As vagas são extraídas de um **banco de dados público** disponibilizado pelo **dados.gov.br**, no formato **CSV**, que contém informações sobre oportunidades de estágio e emprego disponíveis em maio de 2024.

---

## Funcionalidades:
- Busca por **cidade** ou **tipo** de vaga.
- Exibição das vagas filtradas com informações como nome da vaga e cidade.

## Tecnologias:
- **Frontend**: React
- **Backend**: Node.js com Express
- **Banco de Dados**: CSV (dados públicos do portal dados.gov.br)
- **Estilização**: CSS 
