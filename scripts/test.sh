RESULT=$(npm run ci:lint 2>&1 || echo "job_status:failed")

            if echo "$RESULT" | grep -q "job_status:failed"; then
              echo 'status=x'
              exit 1
            else
              echo 'status=white_check_mark'
            fi
