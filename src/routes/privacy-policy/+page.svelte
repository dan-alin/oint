<script>
	import HeaderMenu from '../../components/HeaderMenu.svelte';
	import { t } from '../../i18n/i18n';
</script>

<svelte:head>
	<title>Informativa sulla privacy</title>
	<meta name="description" content="A section to sign up" />
</svelte:head>

<div class="flex h-full flex-col gap-4 overflow-y-hidden px-4 pb-10 pt-6 text-xs">
	<HeaderMenu firstRow={'Informativa '} secondRow={'sulla privacy'} goto={'/sign-up'} />
	<div class="flex  flex-col overflow-auto p-2 shadow-inner">
		<p>
			Questa Informativa sulla privacy regola il modo in cui <strong>Oint</strong>
			raccoglie, utilizza, conserva e divulga le informazioni personali raccolte dagli utenti dell'applicazione
			mobile <strong>Oint</strong>. Questa politica si applica all'App e a tutti i prodotti e
			servizi offerti da
			<strong>Oint</strong>.
		</p>
		<br />
		<h2 class="font-bold">1. Informazioni che raccogliamo</h2>

		<p>
			Possiamo raccogliere informazioni personali dagli Utenti in vari modi, inclusi quando gli
			Utenti si registrano, effettuano l'accesso, creano eventi o invitano amici tramite la nostra
			App. I tipi di informazioni personali che possiamo raccogliere includono:
		</p>

		<ul>
			<li>Nome e informazioni di contatto (ad esempio, indirizzo e-mail)</li>
			<li>Credenziali di accesso (ad esempio, nome utente, password)</li>
			<li>Dettagli ed descrizioni degli eventi</li>
			<li>Elenco di amici e informazioni di contatto per inviti agli eventi</li>
		</ul>

		<br />
		<h2 class="font-bold">2. Uso delle informazioni raccolte</h2>

		<p>Possiamo utilizzare le informazioni personali raccolte dagli Utenti per i seguenti scopi:</p>

		<ul>
			<li>Registrare e gestire gli account degli Utenti</li>
			<li>Fornire esperienze personalizzate e migliorare i nostri servizi</li>
			<li>Creare e gestire eventi, inclusa l'invio di inviti agli eventi</li>
			<li>Comunicare importanti aggiornamenti, notifiche e offerte</li>
			<li>Analizzare e migliorare le prestazioni e l'utilizzo della nostra App</li>
			<li>Conformità a obblighi legali</li>
		</ul>
		<br />
		<h2 class="font-bold">3. Protezione delle informazioni</h2>

		<p>
			Adottiamo adeguate pratiche di raccolta, conservazione e trattamento dei dati, oltre a misure
			di sicurezza, per proteggere da accessi non autorizzati, alterazioni, divulgazioni o
			distruzioni delle vostre informazioni personali, nome utente, password e dati memorizzati
			sulla nostra App. Tuttavia, si prega di notare che nessuna trasmissione di dati su Internet o
			metodo di conservazione elettronica è sicuro al 100%.
		</p>
		<br />
		<h2 class="font-bold">4. Condivisione delle informazioni personali</h2>

		<p>
			Possiamo condividere le vostre informazioni personali con terze parti per i seguenti scopi:
		</p>

		<ul>
			<li>Per fornire i servizi e le funzionalità richieste dall'App</li>
			<li>Per facilitare inviti agli eventi e collaborazioni con altri Utenti</li>
			<li>Per analizzare i modelli di utilizzo e migliorare i nostri servizi</li>
			<li>Per conformità a obblighi legali o applicazione delle nostre politiche</li>
		</ul>

		<p>
			Non venderemo, commerceremo o affitteremo le informazioni personali degli Utenti a terze parti
			senza il loro esplicito consenso.
		</p>
		<br />
		<h2 class="font-bold">5. Diritti e scelte dell'Utente</h2>

		<p>
			Avete il diritto di <strong
				>accedere, modificare o cancellare le vostre informazioni personali</strong
			>. Potreste avere anche il diritto di
			<strong>limitare o opporvi a determinate attività di trattamento dei dati</strong>.
			<!-- Per
		esercitare questi diritti o per qualsiasi domanda relativa alle vostre informazioni personali, -->
			<!-- contattateci utilizzando le informazioni fornite nella Sezione 8. -->
		</p>
		<br />
		<h2 class="font-bold">6. Cookie e tecnologie simili</h2>

		<p>
			La nostra App potrebbe utilizzare cookie o tecnologie simili per migliorare l'esperienza degli
			Utenti. Gli Utenti possono scegliere di disabilitare i cookie attraverso le impostazioni del
			proprio browser, ma ciò potrebbe limitare alcune funzionalità dell'App.
		</p>
		<br />
		<h2 class="font-bold">7. Privacy dei bambini</h2>

		<p>
			La tutela della privacy dei bambini è fondamentale. La nostra App non è destinata a bambini di
			età inferiore ai 13 anni. Non raccogliamo consapevolmente informazioni personali da bambini.
			Se ritenete che abbiamo raccolto accidentalmente informazioni personali da un bambino di età
			inferiore ai 13 anni, contattateci immediatamente.
		</p>

		<!-- <h2 class="font-bold">8. Contattaci</h2> -->

		<!-- <p>
		Se avete domande, dubbi o richieste in merito a questa Informativa sulla privacy o al
		trattamento delle vostre informazioni personali, contattateci al seguente indirizzo:
	</p> -->

		<!-- <p class="font-bold">Oint</p> -->
	</div>
</div>
