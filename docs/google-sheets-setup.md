# Integrare Google Sheets pentru Compass Liberal

Acest site este static și poate fi publicat pe GitHub Pages. Trimiterea datelor se face printr-un Google Apps Script publicat ca Web App.

Fluxul de date este în două etape:

- după completarea datelor personale și a acordurilor, site-ul trimite profilul inițial în Sheet;
- după finalizarea testului, site-ul trimite răspunsurile, scorurile și rezultatul, iar Apps Script actualizează același rând prin `Submission ID`.

## 1. Creează Google Sheet-ul

1. Intră în Google Drive.
2. Creează un Google Sheet nou.
3. Denumește-l, de exemplu: `Compass Liberal - Răspunsuri`.
4. Păstrează-l privat și acordă acces doar persoanelor autorizate.

## 2. Adaugă Apps Script-ul

1. Din Google Sheet: `Extensions` -> `Apps Script`.
2. Șterge codul existent din editor.
3. Copiază conținutul fișierului `scripts/google-apps-script.gs`.
4. Lipește-l în editorul Apps Script.
5. Salvează proiectul.

Dacă ai deja o versiune mai veche publicată, înlocuiește codul din Apps Script cu versiunea nouă, rulează din nou `setup`, apoi publică o versiune nouă din `Deploy` -> `Manage deployments` -> `Edit` -> `New version`.

## 3. Inițializează taburile

1. În Apps Script, alege funcția `setup`.
2. Apasă `Run`.
3. Acceptă permisiunile cerute de Google.
4. Întoarce-te în Sheet și verifică dacă au apărut taburile `Raspunsuri` și `Erori`.

## 4. Publică Web App-ul

1. În Apps Script: `Deploy` -> `New deployment`.
2. La tip, selectează `Web app`.
3. Setări recomandate:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
4. Apasă `Deploy`.
5. Copiază URL-ul de tip `https://script.google.com/macros/s/.../exec`.

## 5. Leagă site-ul de Sheet

Deschide `assets/app.js` și completează:

```js
const CONFIG = {
  googleScriptUrl: "https://script.google.com/macros/s/ID_DEPLOYMENT/exec",
  platformVersion: "csl-timis-compass-v1"
};
```

Folosește URL-ul exact primit la deploy, inclusiv terminația `/exec`.

## 6. Testează

1. Deschide `index.html` local sau publică site-ul pe GitHub Pages.
2. Completează datele personale cu date de probă și intră în test.
3. Verifică în Google Sheet dacă a apărut un rând cu `Submission stage` = `profile`.
4. Finalizează testul.
5. Verifică dacă același rând, identificat prin `Submission ID`, a fost actualizat cu `Submission stage` = `result`, răspunsurile `Q01`-`Q40`, scorurile și rezultatul.
6. Dacă nu apare sau nu se actualizează, verifică tabul `Erori`, URL-ul din `assets/app.js` și deploy-ul curent din Apps Script.

## 7. Publicare pe GitHub Pages

1. Pune fișierele din acest folder într-un repository GitHub.
2. În GitHub: `Settings` -> `Pages`.
3. La `Build and deployment`, alege `Deploy from a branch`.
4. Selectează branch-ul `main` și folderul `/root`.
5. După publicare, testează fluxul complet de pe URL-ul GitHub Pages.

## 8. Reguli operaționale pentru date

- Google Sheet-ul rămâne privat.
- Accesul se acordă doar persoanelor autorizate din echipa care administrează platforma.
- Răspunsurile politice se folosesc pentru generarea rezultatului și analiza agregată a interesului civic.
- Contactarea participanților se face doar pentru persoanele care au bifat acordul separat de contact.
- Cererile privind accesul, rectificarea, ștergerea sau retragerea consimțământului se gestionează prin datele de contact afișate pe site.
- După finalizarea campaniei, exportă sau arhivează datele conform deciziei interne de retenție și elimină accesul persoanelor care nu mai au nevoie de Sheet.
