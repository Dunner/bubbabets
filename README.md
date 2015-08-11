# bubbabets
bubba bets moval project



skapa mappen C:/projects
skapa mappen C:/projects/mongo
skapa mappen C:/projects/mongo/data
skapa filen C:/projects/mongo/startdb.bat
redigera filen startdb.bat och lägg nedanstående två rader inuti:
	"bin\mongod.exe" --dbpath "C:\projects\mongo\data"
	pause

ladda ner mongodb och välj att installera i C:/projects/mongo (när det är installerat bör bin mappen ligga C:\projects\mongo\bin)
starta filen, nu borde databasen vara igång

spara C:/projects/mongo/startdb.bat filen, nu borde databasen vara igång.

GUIDE

ladda ner nodejs
när det är klart, öppna en kommandotolk och kolla så det fungerar (testa igenom att skriva node --version)
kör 'npm install bower -g'
kör 'npm install grunt-cli -g'


öppna en kommandotolk med gitstöd (testa igenom att skriva git --version) Git shell är ett alternativ om du inte har git i PATH


ta dig in i projects mappen via kommandotolken 'cd C:/projects'
skriv 'git clone https://github.com/Dunner/bubbabets.git'
detta kommer att placera projektet i
C:/projects/bubbabets

i den mappen finns två mappar, client och server.

cd C:/projects/bubbabets/server och skriv 'npm install'

cd C:/projects/bubbabets/client och skriv 'npm install' samt 'bower install'

nu ska hela setupen vara klar, för att köra igång hela projektet krävs 3 kommandotolkar
en för mongodb: cd C:/projects/mongo && startdb.bat
en för webbservern: cd C:/projects/bubbabets/server && node server
en för grunt frontendutveckling: cd C:/projects/bubbabets/client && grunt serve

nu är det bara att koda på
