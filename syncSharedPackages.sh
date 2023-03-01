cp -R ./shared/firebase/ ./user-frontend/src/
cp -R ./shared/firebase/ ./admin-frontend/src/
cp ./shared/emitter/emitter.js ./user-frontend/src/utils/emitter.js
cp ./shared/emitter/emitter.js ./admin-frontend/src/utils/emitter.js

cp ./shared/bufferEncoder/bufferEncoder.js ./cloud-run/shooting-manager/utils/bufferEncoder.js
cp ./shared/bufferEncoder/bufferEncoder.js ./cloud-run/api-gateway/utils/bufferEncoder.js

node ./shared/cryptography/buildCrypto.js
cp ./shared/cryptography/browser/crypto.js ./user-frontend/src/utils/crypto.js
cp ./shared/cryptography/browser/crypto.js ./admin-frontend/src/utils/crypto.js
cp ./shared/cryptography/nodejs/crypto.js ./factory/utils/crypto.js
cp ./shared/cryptography/nodejs/crypto.js ./functions/utils/crypto.js

node ./shared/dateRangeHash/buildDateRangeHash.js
cp ./shared/dateRangeHash/browser/dateRangeHash.js ./user-frontend/src/utils/dateRangeHash.js
cp ./shared/dateRangeHash/browser/dateRangeHash.js ./admin-firecms/src/utils/dateRangeHash.js
cp ./shared/dateRangeHash/nodejs/dateRangeHash.js ./factory/utils/dateRangeHash.js
cp ./shared/dateRangeHash/nodejs/dateRangeHash.js ./cloud-run/shooting-manager/utils/dateRangeHash.js
cp ./shared/dateRangeHash/nodejs/dateRangeHash.js ./cloud-run/studio-tour-manager/utils/dateRangeHash.js
cp ./shared/dateRangeHash/nodejs/dateRangeHash.js ./shared/cloudRunUtils/dateRangeHash.js

node ./shared/betterStableStringify/buildBetterStableStringify.js
cp ./shared/betterStableStringify/nodejs/betterStableStringify.js ./cloud-run/shooting-manager/utils/betterStableStringify.js
cp ./shared/betterStableStringify/browser/betterStableStringify.js ./user-frontend/src/utils/betterStableStringify.js

cd ./user-frontend
npm run lint -- --fix

cd ..
cd ./admin-frontend
npm run lint -- --fix