# Compass Liberal | CSL Timiș

Platformă statică de orientare civică pentru studenți, creată pentru CSL Timiș.

## Ce conține

- test politic cu 40 de afirmații;
- scor pe 6 axe ideologice;
- compatibilitate doctrinară PNL calculată transparent;
- compas vizual cu repere doctrinare pentru partidele parlamentare;
- raport imprimabil ca PDF din browser;
- secțiune de metodologie;
- secțiune CSL Timiș și timeline cu lideri istorici;
- informare GDPR și acorduri separate;
- integrare Google Sheets prin Apps Script, cu salvare în două etape: profil inițial și rezultat final.

## Fișiere importante

- `index.html` - pagina principală.
- `assets/styles.css` - designul platformei.
- `assets/app.js` - logica testului, scoring, compas și trimitere Google Sheets.
- `scripts/google-apps-script.gs` - codul de lipit în Google Apps Script.
- `docs/google-sheets-setup.md` - pașii concreți pentru integrarea cu Google Sheets.
- `_legacy_httrack_index.html` - indexul HTTrack vechi, păstrat ca backup.
- `.gitignore` - exclude mirror-ul local PNL/HTTrack din repository.

Folderul conține și copia locală `pnl.ro/`, folosită ca sursă de inspirație și asseturi. Ea nu este necesară pentru rularea platformei și este exclusă din Git prin `.gitignore`.

## Configurare Google Sheets

Urmează pașii din `docs/google-sheets-setup.md`, apoi conectează URL-ul Web App în `assets/app.js`:

```js
const CONFIG = {
  googleScriptUrl: "https://script.google.com/macros/s/ID_DEPLOYMENT/exec",
  platformVersion: "csl-timis-compass-v1"
};
```

## Lansare

Site-ul nu are build step. Poate fi deschis direct din `index.html` sau publicat pe GitHub Pages.

Înainte de publicarea linkului, conectează Web App-ul Google Apps Script, fă un test complet și verifică în Sheet apariția rândului după datele personale și completarea aceluiași rând după rezultat. Textele publice de confidențialitate folosesc contactele afișate în footer și politica de protecție a datelor inclusă în `assets/downloads/`.
