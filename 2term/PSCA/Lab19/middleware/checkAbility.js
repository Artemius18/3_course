function checkAbility(action, subject) {
  return (req, res, next) => {
    Object.assign(subject, req.params);
    return req.ability.can(action, subject) ? next() : res.status(403).send('Forbidden');
  };
}

module.exports = checkAbility;