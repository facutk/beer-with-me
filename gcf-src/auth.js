const express = require("express");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();

const genJWT = require('./util').genJWT;
const config = require('./config');
const alphaID = require('./alphaID');

const authRoutes = express.Router();

authRoutes.get('/google', passport.authenticate('google', { scope: ['email'] }));

authRoutes.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const userJWT = genJWT(req.user);
	const singleUseTokenKey = datastore.key('SingleUseToken');

    const singleUseTokenEntity = {
      key: singleUseTokenKey,
      data: [
        {
          name: 'created',
          value: new Date().toJSON(),
        },
        {
          name: 'token',
          value: userJWT,
          excludeFromIndexes: true,
        }
      ]
    };

    console.log('callback user', req.user);

    datastore
      .save(singleUseTokenEntity)
      .then(() => {
    	const authcode = alphaID.encode(parseInt(singleUseTokenKey.id, 10));

	    res.redirect(`${config.REDIRECT_URL}/?authcode=${authcode}`);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err.message);
        return Promise.reject(err);
      });
  });

authRoutes.get('/token/:authcode',
  function(req, res) {
    let auth_token = '';
    if(req.params.authcode) {
      const singleUseTokenID = alphaID.decode(req.params.authcode);
      const singleUseTokenKey = datastore.key(['SingleUseToken', singleUseTokenID]);
      
      datastore
        .get(singleUseTokenKey)
        .then(([tokenEntity]) => {
          auth_token = tokenEntity.token;

          console.log(`tokenEntity: ${tokenEntity}`);
		  datastore
            .delete(singleUseTokenKey)
            .then(() => {
              res.status(200).json({auth_token: auth_token});
            });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send(err.message);
          return Promise.reject(err);
        });
    } else {
  	  const error_msg = 'no single use token found';
      res.status(500).send(error_msg);
      return Promise.reject(new Error(error_msg));
    }
  });

module.exports = authRoutes;
