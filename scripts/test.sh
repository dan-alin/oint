RESULT=$(npm run ci:lint 2>&1 || echo "job_status:failed")

echo "$RESULT"
