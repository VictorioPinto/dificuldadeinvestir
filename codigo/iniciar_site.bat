@echo off
cd /d "C:\Users\Cristiano\Downloads\dificuldade_investimento\codigo"
echo Iniciando o JSON Server...
npx json-server --watch db/db.json --port 3000
pause
