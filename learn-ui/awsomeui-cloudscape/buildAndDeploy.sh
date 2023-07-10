echo "___________BUILDING___________"
docker buildx build --push --platform linux/arm64  -t ajayedap/playground:awsomeui .
echo "___________DEPLOYING___________"
kubectl delete -f deployment/awsomeui-deploy.yaml
kubectl apply -f deployment/awsomeui-deploy.yaml