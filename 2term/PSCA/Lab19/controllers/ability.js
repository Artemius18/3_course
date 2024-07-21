async function handleAbility(req, res, next) {
  res.json(req.ability.rules);
}

module.exports = { handleAbility };