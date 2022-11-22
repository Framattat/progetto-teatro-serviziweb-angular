
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
- Gestisce la creazione di un teatro, configurato secondo dei criteri (misure minime e massime) pensati per non gravare troppo sulla memoria del database. Comunica sia in **@Input()** che in **@Output()** con **app.component** per la chiave che viene generata e l'aggiornamento dello stato, dopo aver generato un nuovo teatro e una chiave, si settano insieme in modo da poter passare la chiave al **nominativo.component** già impostata e pronta per visualizzare il teatro. Viene aggiornata dinamicamente la configurazione del teatro grazie alla funzione **valore_selezionato** e non si permette all'utente (grazie alle select) di decidere tale configurazione violando i criteri scelti.


### Descrizione generale di alcune funzioni 
Si menzionano alcune funzioni particolari:

#### controllo_accesso() (situata in nominativo.component.ts)
- Funzione che prende come parametro il nome dell'utente che esegue la prenotazione ed esegue una get, con la chiave passata come input da **app.component**, se la chiave non ha ancora un teatro settato in essa, si setta con un teatro default (7x10 - 4x6) e si ritorna sulla funzione (viene controllato con un if se la risposta della subscribe è nulla, se non lo è la chiave è settata). dove vengono impostati i dati necessari al passaggio della prenotazione del posto. Viene eseguito anche un controllo sul campo, se è vuoto si 'appende' un avviso.

#### costruzione_teatro() (situata in nominativo.component.ts)
- Funzione che prende come parametri default le file e posti della platea e del palco, configura il teatro (in base al 'metodo' visto a lezione) e restituisce il teatro così configurato (un oggetto di array di array).

#### prenotazione_posto() (situata in posto.component.ts)
- Funzione che prende come parametri fila posto e zona scelti dall'utente. In base alla zona (in questo caso platea e palco) lo switch setta il posto scelto dall'utente (cambia il valore default **x** con il nome della prenotazione). Dopodichè, viene aggiornato il teatro con il posto settato e si torna alla pagina del nominativo, con il posto e nominativo visualizzati.

#### valore_selezionato() e nuovo_teatro() (situata in newteatro.component.ts)
- La funzione **valore_selezionato()** gestisce l'aggiornamento dinamico della configurazione del teatro e ne permette la memorizzazione, ha come parametri il valore selezionato in quel dato momento e la select di provenienza. La funzione **nuovo_teatro()** crea una nuova chiave dove impostare la configurazione scelta da parte dell'utente. Si istanzia la classe NominativoComponent e si richiamano due metodi di essa (**costruzione_teatro(), imposta_teatro()**), così da impostare il teatro scelto sulla chiave appena generata.

## Conclusioni (personali)

Il progetto è stato molto interessante, mi ha permesso di lavorare in un piccolo progetto angular14+ imparando la gestione dinamica di un applicazione web. Il corso è stato molto utile e ho gradito le dispense messe a disposizione dal professore, comprese di registrazioni delle lezioni. 
