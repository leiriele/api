const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const vagasRoutes = require("./routes/vagasRoutes");

const app = express();
app.use(cors());

app.use("/vagas", vagasRoutes);


app.listen(config.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${config.PORT}`);
});
