for var in "$@"
do
    mkdir "$var"
done

# find . -type d -not -path "." -exec npm --prefix {} init -y \;
# find . -type d -not -path "." -exec npm --prefix {} install cors dotenv express firebase-admin lodash \;
# find . -type d -not -path "." -exec bash -c "printf \"/creds/\n/assets/\n/backups/\n/node_modules/\n.env\n.env.*\ndeploy_notes\" >> {}/.gitignore" \;
# find . -type d -not -path "." -exec bash -c "printf \"creds\nassets\nbackups\nnode_modules\n.env\n.env.*\ndeploy_notes\" >> {}/.dockerignore" \;
# find . -type d -not -path "." -exec bash -c "printf \"creds/\nassets/\nbackups/\nnode_modules/\n.env\n.env.*\n.gcloudignore\n.git\n.gitignore\ndeploy.sh\ndeploy_notes\" >> {}/.gcloudignore" \;
# find . -type d -not -path "." -exec touch {}/deploy.sh \;
# find . -type d -not -path "." -exec touch {}/Dockerfile \;
# find . -type d -not -path "." -exec touch {}/index.js \;
# find . -type d -not -path "." -exec touch {}/.env \;

for var in "$@"
do
    cd "$var"
    mkdir creds
    printf "/creds/\n/assets/\n/backups/\n/node_modules/\n.env\n.env.*\ndeploy_notes" >> ./.gitignore
    printf "creds\nassets\nbackups\nnode_modules\n.env\n.env.*\ndeploy_notes" >> ./.dockerignore
    printf "creds/\nassets/\nbackups/\nnode_modules/\n.env\n.env.*\n.gcloudignore\n.git\n.gitignore\ndeploy.sh\ndeploy_notes" >> ./.gcloudignore
    touch ./deploy.sh
    touch ./Dockerfile
    touch ./index.js
    touch ./.env
    npm init -y
    npm install cors dotenv express firebase-admin lodash
    cd ..
done