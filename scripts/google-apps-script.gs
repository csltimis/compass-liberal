/**
 * Compass Liberal | CSL Timis
 * Google Apps Script Web App endpoint for static-site submissions.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Paste this file.
 * 4. Run setup().
 * 5. Deploy -> New deployment -> Web app.
 * 6. Execute as: Me. Access: Anyone.
 * 7. Copy the Web App URL into assets/app.js -> CONFIG.googleScriptUrl.
 */

const SPREADSHEET_ID = "";
const SHEET_NAME = "Raspunsuri";
const ERROR_SHEET_NAME = "Erori";
const PLATFORM_VERSION = "csl-timis-compass-v1";

const BASE_HEADERS = [
  "Server timestamp",
  "Client submittedAt",
  "Platform version",
  "Page URL",
  "Nume",
  "Prenume",
  "Telefon",
  "Email",
  "Data nasterii",
  "Universitate",
  "Facultate",
  "An studiu",
  "Specializare",
  "Sursa",
  "Acord rezultat",
  "Acord politic explicit",
  "Confirmare varsta",
  "Acord contact",
  "Compatibilitate PNL",
  "Banda rezultat",
  "Profil",
  "Valori dominante",
  "Compas X",
  "Compas Y",
  "Axa economie",
  "Axa fiscal",
  "Axa stat",
  "Axa social",
  "Axa geo",
  "Axa institutional",
  "Dim piata",
  "Dim fiscalitate",
  "Dim stat suplu",
  "Dim UE NATO",
  "Dim antreprenoriat",
  "Dim stat de drept",
  "Dim traditie democratica",
  "Answers JSON",
  "Scores JSON",
  "User agent"
];

const META_HEADERS = [
  "Submission ID",
  "Submission stage",
  "Profile submittedAt",
  "Result submittedAt",
  "Last updated at"
];

function setup() {
  const sheet = getSheet_();
  ensureHeader_(sheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, sheet.getLastColumn())
    .setFontWeight("bold")
    .setBackground("#163579")
    .setFontColor("#ffffff");
  sheet.autoResizeColumns(1, sheet.getLastColumn());

  const errorSheet = getOrCreateSheet_(ERROR_SHEET_NAME);
  if (errorSheet.getLastRow() === 0) {
    errorSheet.appendRow(["Timestamp", "Error", "Raw payload"]);
    errorSheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    payload.stage = normalizeStage_(payload);

    if (payload.profile && payload.profile.website) {
      return json_({ ok: true, ignored: true, reason: "honeypot" });
    }

    validatePayload_(payload);

    const sheet = getSheet_();
    ensureHeader_(sheet);
    const row = rowFromPayload_(payload);
    const existingRow = findRowBySubmissionId_(sheet, payload.submissionId);

    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return json_({
      ok: true,
      stage: payload.stage,
      mode: existingRow ? "updated" : "created",
      storedAt: new Date().toISOString(),
      sheet: SHEET_NAME
    });
  } catch (error) {
    logError_(error, e);
    return json_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

function testPost() {
  const sample = {
    version: PLATFORM_VERSION,
    stage: "result",
    submissionId: "local-test-" + Date.now(),
    profileSubmittedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    pageUrl: "local-test",
    userAgent: "Apps Script test",
    profile: {
      lastName: "Test",
      firstName: "CSL",
      phone: "0700000000",
      email: "test@example.com",
      birthDate: "2002-01-01",
      university: "Universitatea Test",
      faculty: "Facultatea Test",
      studyYear: "Anul II",
      specialization: "Test",
      source: "Test",
      website: "",
      consents: {
        resultProcessing: true,
        politicalExplicit: true,
        ageConfirmation: true,
        contact: false
      }
    },
    consents: {
      resultProcessing: true,
      politicalExplicit: true,
      ageConfirmation: true,
      contact: false
    },
    answers: Array.from({ length: 40 }, (_, index) => ({
      index: index + 1,
      question: "Intrebare test " + (index + 1),
      category: "Test",
      answer: index % 5 - 2
    })),
    scores: {
      pnlCompatibility: 82.4,
      band: "Compatibilitate liberala ridicata",
      profileName: "Liberal civic",
      axes: {
        economy: 42,
        fiscal: 61,
        state: 58,
        social: 22,
        geo: 76,
        institutional: 68
      },
      dimensions: {
        market: 71,
        lowTax: 80.5,
        leanState: 79,
        euroAtlantic: 88,
        ownershipEntrepreneurship: 75,
        ruleOfLawMerit: 84,
        democraticTradition: 93
      },
      compass: { x: 51, y: 38 },
      values: ["UE si NATO", "Merit si competenta"]
    }
  };

  const fakeEvent = {
    parameter: {
      payload: JSON.stringify(sample)
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}

function testProfilePost() {
  const sample = {
    version: PLATFORM_VERSION,
    stage: "profile",
    submissionId: "local-profile-test-" + Date.now(),
    submittedAt: new Date().toISOString(),
    pageUrl: "local-profile-test",
    userAgent: "Apps Script test",
    profile: {
      lastName: "Test",
      firstName: "Profil",
      phone: "0700000000",
      email: "profil@example.com",
      birthDate: "2002-01-01",
      university: "Universitatea Test",
      faculty: "Facultatea Test",
      studyYear: "Anul II",
      specialization: "Test",
      source: "Test",
      website: "",
      consents: {
        resultProcessing: true,
        politicalExplicit: true,
        ageConfirmation: true,
        contact: false
      }
    }
  };

  const fakeEvent = {
    parameter: {
      payload: JSON.stringify(sample)
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}

function parsePayload_(e) {
  const body = e && e.parameter && e.parameter.payload
    ? e.parameter.payload
    : e && e.postData && e.postData.contents
      ? e.postData.contents
      : "";

  if (!body) {
    throw new Error("Payload lipsa.");
  }

  return JSON.parse(body);
}

function validatePayload_(payload) {
  if (!payload || payload.version !== PLATFORM_VERSION) {
    throw new Error("Versiune platforma invalida.");
  }

  if (!payload.submissionId) {
    throw new Error("Submission ID lipsa.");
  }

  const profile = payload.profile || {};
  const consents = profile.consents || payload.consents || {};

  if (!profile.email || !profile.firstName || !profile.lastName) {
    throw new Error("Date personale obligatorii lipsa.");
  }

  if (!consents.resultProcessing || !consents.politicalExplicit || !consents.ageConfirmation) {
    throw new Error("Consimtamant obligatoriu lipsa.");
  }

  if (payload.stage === "result" && (!Array.isArray(payload.answers) || payload.answers.length !== 40)) {
    throw new Error("Set incomplet de raspunsuri.");
  }
}

function normalizeStage_(payload) {
  return payload && payload.stage === "profile" ? "profile" : "result";
}

function rowFromPayload_(payload) {
  const profile = payload.profile || {};
  const consents = profile.consents || payload.consents || {};
  const scores = payload.scores || {};
  const axes = scores.axes || {};
  const dimensions = scores.dimensions || {};
  const compass = scores.compass || {};
  const answers = payload.answers || [];
  const qMap = {};

  answers.forEach((item) => {
    qMap["Q" + pad2_(item.index)] = item.answer;
  });

  const row = [
    new Date(),
    safe_(payload.submittedAt),
    safe_(payload.version),
    safe_(payload.pageUrl, 1200),
    safe_(profile.lastName),
    safe_(profile.firstName),
    safe_(profile.phone),
    safe_(profile.email),
    safe_(profile.birthDate),
    safe_(profile.university),
    safe_(profile.faculty),
    safe_(profile.studyYear),
    safe_(profile.specialization),
    safe_(profile.source),
    Boolean(consents.resultProcessing),
    Boolean(consents.politicalExplicit),
    Boolean(consents.ageConfirmation),
    Boolean(consents.contact),
    numberOrBlank_(scores.pnlCompatibility),
    safe_(scores.band),
    safe_(scores.profileName),
    Array.isArray(scores.values) ? scores.values.join(", ") : "",
    numberOrBlank_(compass.x),
    numberOrBlank_(compass.y),
    numberOrBlank_(axes.economy),
    numberOrBlank_(axes.fiscal),
    numberOrBlank_(axes.state),
    numberOrBlank_(axes.social),
    numberOrBlank_(axes.geo),
    numberOrBlank_(axes.institutional),
    numberOrBlank_(dimensions.market),
    numberOrBlank_(dimensions.lowTax),
    numberOrBlank_(dimensions.leanState),
    numberOrBlank_(dimensions.euroAtlantic),
    numberOrBlank_(dimensions.ownershipEntrepreneurship),
    numberOrBlank_(dimensions.ruleOfLawMerit),
    numberOrBlank_(dimensions.democraticTradition),
    JSON.stringify(answers),
    JSON.stringify(scores),
    safe_(payload.userAgent, 1200)
  ];

  questionHeaders_().forEach((header) => row.push(qMap[header] === undefined ? "" : qMap[header]));
  row.push(
    safe_(payload.submissionId, 200),
    safe_(payload.stage),
    safe_(payload.stage === "profile" ? payload.submittedAt : payload.profileSubmittedAt),
    safe_(payload.stage === "result" ? payload.submittedAt : ""),
    new Date()
  );
  return row;
}

function ensureHeader_(sheet) {
  const headers = headers_();
  const hasHeader = sheet.getLastRow() > 0;

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
  const needsRewrite = headers.some((header, index) => existing[index] !== header);

  if (needsRewrite) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function questionHeaders_() {
  return Array.from({ length: 40 }, (_, index) => "Q" + pad2_(index + 1));
}

function headers_() {
  return BASE_HEADERS.concat(questionHeaders_(), META_HEADERS);
}

function findRowBySubmissionId_(sheet, submissionId) {
  if (!submissionId || sheet.getLastRow() < 2) {
    return null;
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const column = headers.indexOf("Submission ID") + 1;

  if (!column) {
    return null;
  }

  const values = sheet.getRange(2, column, sheet.getLastRow() - 1, 1).getValues();
  for (let index = 0; index < values.length; index += 1) {
    if (String(values[index][0]) === String(submissionId)) {
      return index + 2;
    }
  }

  return null;
}

function getSheet_() {
  return getOrCreateSheet_(SHEET_NAME);
}

function getOrCreateSheet_(name) {
  const spreadsheet = getSpreadsheet_();
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("Nu exista spreadsheet activ. Completeaza SPREADSHEET_ID.");
  }
  return spreadsheet;
}

function logError_(error, e) {
  try {
    const sheet = getOrCreateSheet_(ERROR_SHEET_NAME);
    const raw = e && e.parameter && e.parameter.payload
      ? e.parameter.payload
      : e && e.postData && e.postData.contents
        ? e.postData.contents
        : "";
    sheet.appendRow([new Date(), String(error && error.stack ? error.stack : error), safe_(raw, 45000)]);
  } catch (logError) {
    Logger.log(logError);
  }
}

function json_(object) {
  return ContentService
    .createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}

function safe_(value, limit) {
  const max = limit || 500;
  return String(value === undefined || value === null ? "" : value).slice(0, max);
}

function numberOrBlank_(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function pad2_(number) {
  return String(number).padStart(2, "0");
}
