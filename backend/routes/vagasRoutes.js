const express = require("express");
const router = express.Router();
const vagasController = require("../controllers/vagasController");

//  Rotas disponíveis
router.get("/", vagasController.getAllVagas);
router.get("/cidade/:cidade", vagasController.getVagasPorCidade);
router.get("/tipo/:tipo_vaga", vagasController.getVagasPorTipo);

module.exports = router;
