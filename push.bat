@echo off
echo commiting changes...
git add .
git commit --no-verify -m %1
echo push to github...
git push
echo [OK]