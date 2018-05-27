const jwt = require('jsonwebtoken');
const config = require('./config');

const genJWT = (profile) => {
  const email = profile.emails[0].value;
  const { id, displayName } = profile;

  const userInfo = {
    email,
    displayName
  };

  console.log('cert', config.cert);
  return jwt.sign(userInfo, config.cert);
}

module.exports = {
  genJWT
}
