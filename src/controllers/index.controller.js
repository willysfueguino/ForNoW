const ctlrIndex = {};

ctlrIndex.renderIndex = (req, res) => {
  res.render("index", { title: "Pag Inicio" });
};

module.exports = { ctlrIndex };
