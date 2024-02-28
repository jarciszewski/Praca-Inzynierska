Pobrać ZIPa  
W pliku config.json ustawić hosta i hasło bazy danych, pod które będzie łączył się serwer  
Stworzyć plik konfiguracyjny .env i uzupełnić o dane:
```
DB_NAME:
DB_HOST:
DB_PASS:
PORT=8080
JWTPRIVATEKEY=
SALT=
```
Przejść do folderów (client i server), w celu pobrania node_modules przy pomocy  
```
server> npm i
client> npm i
```  
Stworzyć bazę przy pomocy sequelize-cli
```
server> npx sequelize-cli db:create
server> npx sequelize-cli db:migrate
```
Przy pomocy skryptu Inzynierka.sql załadować dane do bazy (np. w MySQL Workbench)
Postawić serwer i klienta
```
server> npm start
client> npm start
```
