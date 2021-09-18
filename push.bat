@echo off
color f0
echo commiting changes...
git add .
git commit -m %1
echo push to github...
git push
echo [OK]