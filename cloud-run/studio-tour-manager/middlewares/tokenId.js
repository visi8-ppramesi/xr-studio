'use strict';

const isNil = require('lodash/isNil');
const {admin} = require('../utils/initializeAdmin');

exports.tokenIdMiddleware = async function(req, res, next) {
  const auth = admin.auth();
  const db = admin.firestore();
  const findHeader = () => {
    const authHeader = req.header('Authorization');
    if (isNil(authHeader)) {
      return null;
    }
    if (!authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.substring(7);
  };

  req.tokenId = findHeader();
  try {
    const decodedToken = await auth.verifyIdToken(req.tokenId);
    req.uid = decodedToken.uid;
  } catch (error) {
    req.uid = null;
  }
  if (!isNil(req.uid)) {
    try {
      const rolesSnap = await db.collection('user_roles').doc(req.uid).get();
      req.roles = [...(rolesSnap.get('roles') ?? [])];
    } catch (error) {
      req.roles = [];
    }
  } else {
    req.roles = [];
  }

  next();
};
