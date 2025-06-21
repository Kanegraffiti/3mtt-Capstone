#!/bin/bash
# Reset git history - use only in Codespaces
set -e

git checkout --orphan latest_branch
git add -A
git commit -am "fresh history"
git branch -D main
git branch -m main
git push -f origin main
