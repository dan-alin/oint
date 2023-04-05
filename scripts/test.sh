RESULT=$(npm run ci:format 2>&1 || echo "failed")

echo "xd"
echo "$RESULT"