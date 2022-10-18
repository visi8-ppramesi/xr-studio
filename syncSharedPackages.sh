cp -R ./shared/firebase/ ./user-frontend/src/
cp -R ./shared/firebase/ ./admin-frontend/src/
cp -R ./shared/emitter/ ./user-frontend/src/
cp -R ./shared/emitter/ ./admin-frontend/src/
node ./shared/cryptography/buildCrypto.js
cp ./shared/cryptography/browser/crypto.js ./user-frontend/src/utils/crypto.js
cp ./shared/cryptography/browser/crypto.js ./admin-frontend/src/utils/crypto.js
cp ./shared/cryptography/nodejs/crypto.js ./factory/utils/crypto.js
cp ./shared/cryptography/nodejs/crypto.js ./functions/utils/crypto.js