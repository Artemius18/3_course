const { Ability, AbilityBuilder } = require('casl');
const Role = require('../security/role');
const Action = require('../security/action');
const Subject = require('../security/subject');

function authorize(req, res, next) {
  const { rules, can } = AbilityBuilder.extract();
  const role = req.user.role;

  switch (role) {
    case Role.Guest:
      can(Action.Read, Subject.Ability.name);
      can(Action.Read, [Subject.ReposAll.name, Subject.CommitsAll.name]);
      can(Action.Read, [Subject.Repos.name, Subject.Commits.name]);
      break;
    case Role.User:
      can(Action.Read, Subject.Ability.name);
      can(Action.Read, [Subject.ReposAll.name, Subject.CommitsAll.name]);
      can(Action.Read, Subject.User.name, { id: req.user.userId, });
      can(Action.Read, [Subject.Repos.name, Subject.Commits.name]);
      can(Action.Create, [Subject.Repos.name, Subject.Commits.name]);
      can([Action.Update], [Subject.Repos.name, Subject.Commits.name], { authorId: req.user.userId, });
      break;
    case Role.Admin:
      can(Action.Read, Subject.Ability.name);
      can(Action.Read, [Subject.ReposAll.name, Subject.CommitsAll.name, Subject.UsersAll.name]);
      can(Action.Read, [Subject.User.name, Subject.Repos.name, Subject.Commits.name]);
      can([Action.Update, Action.Delele], [Subject.Repos.name, Subject.Commits.name]);
      break;
    default:
      break;
  }
  req.ability = new Ability(rules);
  next();
}

module.exports = authorize;