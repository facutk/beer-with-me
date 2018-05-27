const fs = require('fs');

const GOOGLE_CLIENT_ID = '1022804290862-vtgohm62gclsb0tphvlda0lj684rq84d.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'WyYcx2nE92bbBVsjUJMe1BPP';
const GOOGLE_CALLBACK_URL = 'https://us-central1-lsi7571.cloudfunctions.net/hello-world/auth/google/callback';
const GOOGLE_SIGNIN_URL = 'https://us-central1-lsi7571.cloudfunctions.net/hello-world/auth/google';
const REDIRECT_URL = 'https://react-gcf-oauth.surge.sh';

const KEY_LOCATION = './private.key';
const cert = fs.readFileSync(KEY_LOCATION).toString();

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_SIGNIN_URL,
  REDIRECT_URL,
  cert
}
