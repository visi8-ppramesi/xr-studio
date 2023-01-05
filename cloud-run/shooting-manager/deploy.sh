# version="0.0.1"
# docker build -t asia.gcr.io/xr-studio-a9c5e/shooting-manager:$version .
# docker push asia.gcr.io/xr-studio-a9c5e/shooting-manager:$version

# gcloud run deploy \
#     --image asia.gcr.io/xr-studio-a9c5e/shooting-manager:$version \
#     --update-env-vars "MODE=production" \
#     --port 8080 \
#     --concurrency 80 \
#     --allow-unauthenticated \
#     --region asia-southeast2 \
#     --project "xr-studio-a9c5e"


# Use a regular expression to match the version string
# The regular expression matches a string that consists of one or more
# digits, followed by a period, followed by one or more digits, etc.

version=${1:-0.0.4}
if [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    docker build -t asia.gcr.io/xr-studio-a9c5e/shooting-manager:$version .
    docker push asia.gcr.io/xr-studio-a9c5e/shooting-manager:$version

    gcloud run deploy \
        --image asia.gcr.io/xr-studio-a9c5e/shooting-manager:$version \
        --update-env-vars "MODE=production" \
        --port 8080 \
        --concurrency 80 \
        --allow-unauthenticated \
        --region asia-southeast2 \
        --project "xr-studio-a9c5e"
else
    echo "Invalid version string"
fi