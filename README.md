
# Prenotazioni teatro angular14+ - Progetto SSW2022

> Chiave per l'accesso al teatro: 73fd4c2c

Questa è una breve relazione del progetto per il corso di Sviluppo e Servizi Web 21/22.

Si elencano le specifiche richieste ed eseguite nel progetto finale :

> - Accesso alle prenotazioni per uno spettacolo specifico.
> - Impostazione del nominativo dell'utente.
> - Visualizzazione grafica della disposizione e disponibilità dei posti.
> - Messaggio di conferma di avvenuta prenotazione.
> - Viene verificato se il posto sia effettivamente libero, in tal caso avviene la prenotazione.
> - Un utente può prenotare un unico posto alla volta.
> - Il teatro è configurabile, con una configurazione minima di 2 File e 2 Posti e una massima di 4 File e 10 posti, per non pesare troppo sul database.
> - L'utente prenota un posto e riceve subito la conferma della prenotazione del posto.
> - Quando l'utente inserisce la chiave, viene creato un teatro con le misure default (Platea di 7 file e 10 posti, Palco di 4 file e 6 posti).

Il progetto è stato realizzato seguendo alcuni punti chiave visti a lezione:

- Le operazioni sugli endpoint sono state scritte in base alla lezione angular, dove vedevamo come si scriveva un service di un app.
- L'interfaccia grafica del teatro è basata sul progetto sviluppato in javascript dove andavamo a creare il teatro default.
- La gestione degli observable e le conseguenti subscribe hanno preso spunto dal progetto in Rxjs dove vedevamo come gestire le risposte e le chiamate al database.

## Descrizione dei file presenti e scelte eseguite

### Generale

Il file presenta quattro componenti, tre suggeriti dalle specifiche del progetto e uno sviluppato seguento i consigli visti a lezione.
Partendo dalla cartella **app** sono presenti:

- Tre component: newteatro, nominativo, posto (con relativi file .css, .html, .ts).
- Il component app con relativo file .css ...
- Il modulo app (app.module.ts).
- Il service per la gestione delle chiamate e risposte al database (db.service.ts).

### Component

Descritti brevemente i component consistono in:

#### app.component
- Gestisce l'accesso iniziale al teatro in base ad una chiave che l'utente ha o genera attraverso il **newteatro.component**, vengono gestiti alcuni errori come la non esistenza della chiave o il non inserimento del campo prima di premere il bottone conferma.
Inoltre, è presente una funzione che permette di aggiornare lo stato (valore che indica la progressione nell'app, **0** indica l'accesso, **1** indica l'inserimento del nominativo e **2** indica la prenotazione del posto) o la chiave scelta in base ad un **@Output()** passato dal child **newteatro.component**.

#### nominativo.component
- Gestisce l'inserimento del nominativo per la prenotazione, qua viene costruito il teatro default se si passa una chiave non generata da **newteatro.component**, viene impostata la configurazione del teatro scelta sulla chiave passata come **@Input()** da **app.component**. In seguito, quando il posto viene prenotato, ritorniamo sulla stessa pagina html con i dati passati da **posto.component** che sono la tipologia di posto prenotato e il nominativo passato come **@Input()** precedentemente.

#### posto.component
- Gestisce la prenotazione del posto da parte dell'utente, viene visualizzato il teatro secondo la configurazione scelta precedentemente, si visualizzano i posti liberi (indicati dal colore verde) e quelli occupati (indicati dal colore rosso). Se un utente prova a cliccare su un posto occupato, viene visualizzato un messaggio di avviso, con il nome dell'utente che ha occupato quel dato posto. Una volta scelto e cliccato il posto, torniamo su **nominativo.component** con i dati aggiornati. L'utente potrà prenotare ancora posti inserendo il nominativo scelto.

#### newteatro.component
- Gestisce la creazione di un teatro, configurato secondo dei criteri (misure minime e massime) pensati per non gravare troppo sulla memoria del database. Comunica sia in **@Input()** che in **@Output()** con **app.component** per la chiave che viene generata e l'aggiornamento dello stato, dopo aver generato un nuovo teatro e una chiave, si settano insieme in modo da poter passare la chiave al **nominativo.component** già impostata e pronta per visualizzare il teatro.
