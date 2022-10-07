for var in "$@"
do
    cd "$var"
    npm install cors dotenv express firebase-admin lodash
    cd ..
done