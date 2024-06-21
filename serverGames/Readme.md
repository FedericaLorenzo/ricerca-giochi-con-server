# Come usare il server

## Scaricare ed installare Node
https://nodejs.org/en/download

## Aprire il terminale all'interno della cartella `serverGames`
1. digitare `node -v` per controllare che node sia installato correttamente
2. se node è installato correttamente riceveremo un messaggio con la versione di node installata
3. digitare `npm install` per installare le dipendenze del server
4 .avviare il server con il comando `npm run start`

## A questo punto il server è attivo e pronto per ricevere richieste
Le url da chiamare sono le seguenti:
- `http://localhost:3001/games` tutti i games
- `http://localhost:3001/games/id` un game specifico


Per far funzionare correttamente il Server della API dobbiamo aprire il file `index.html` senza utilizzare LiveServer.