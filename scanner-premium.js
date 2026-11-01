// =========================================================
// AgroSmart - Premium Leaf Scanner (app.js replacement)
// app.js theke ei 2 ta function DELETE koro:
//   1) function showScannerMessage(en, bn) { ... }
//   2) function renderScannerResult(result) { ... }
// tarpor ei puro file-er code ta tader jaygay paste koro.
// (submitScanner, pestLabel, diseaseLabel agerr moto thakbe)
// =========================================================

let scanSafetyTimer = null;

function stopScanBeam() {
  clearTimeout(scanSafetyTimer);
  elements.leafPreview?.classList.remove("scanning");
  elements.leafPreview?.querySelector(".scan-beam")?.remove();
}

function startScanBeam() {
  const box = elements.leafPreview;
  if (!box) return;

  box.classList.add("scanning");

  if (!box.querySelector(".scan-beam")) {
    const beam = document.createElement("div");
    beam.className = "scan-beam";
    box.appendChild(beam);
  }

  // safety: kono karone result na ashle 45s pore bondho hobe
  clearTimeout(scanSafetyTimer);
  scanSafetyTimer = setTimeout(stopScanBeam, 45000);
}

// Loading ("Analyzing...") hole animated orbit + laser; onnothay normal message.
function showScannerMessage(en, bn) {
  const text = isBn() ? bn : en;
  const loading = /^Analyzing/i.test(en);

  if (loading) {
    startScanBeam();
    elements.scannerResult.innerHTML = `
      <div class="sc-loading">
        <div class="sc-orbit"></div>
        <strong>${escapeHtml(text)}</strong>
        <span>${escapeHtml(
          isBn() ? "রোগ ও পোকার লক্ষণ মিলিয়ে দেখা হচ্ছে" : "Matching leaf patterns against 10 rice conditions"
        )}</span>
      </div>`;
    return;
  }

  stopScanBeam();
  elements.scannerResult.innerHTML = `<div class="empty-state">${escapeHtml(text)}</div>`;
}

function severityClass(severity) {
  const s = String(severity || "").toLowerCase();
  if (s === "none" || s === "low") return "ok";
  if (s.includes("high")) return "high";
  if (s.includes("medium") || s.includes("low-medium")) return "mid";
  return "unk";
}

function ringColor(cls) {
  return { ok: "#3ddc84", mid: "#ffb84d", high: "#ff6b5b", unk: "#8fb5a4" }[cls];
}

function renderScannerResult(result) {
  if (!elements.scannerResult) return;
  stopScanBeam();

  const bn = isBn() && result.bn ? result.bn : null; // paddy model Bangla data

  const issue = bn?.issue || bnIssue(result.issue);
  const severityText = bn?.severity || bnSeverity(result.severity);
  const description = bn?.description || result.description || "";
  const symptoms = bn?.symptoms?.length ? bn.symptoms : result.symptoms || result.visibleSymptoms || [];
  const cause = bn?.cause || result.cause || "";
  const treatment = bn?.treatment || bnTreatment(result.issue, result.treatment);
  const prevention = bn?.prevention || bnPrevention(result.issue, result.prevention);
  const disclaimer = bn?.disclaimer || bnDisclaimer(result.disclaimer);

  const confidence = Math.max(0, Math.min(100, Number(result.confidence) || 0));
  const sevCls = result.lowConfidence ? "unk" : severityClass(result.severity);

  const others = (result.topPredictions || []).slice(1, 4);
  const cropRisks = result.cropRisks || {};
  const tags = [
    ...(cropRisks.pests || []).map(pestLabel),
    ...(cropRisks.diseases || []).map(diseaseLabel)
  ];

  const L = isBn()
    ? { conf: "নির্ভরতা", symptoms: "যা দেখা গেছে", cause: "কারণ", treat: "করণীয়", prevent: "প্রতিরোধ", other: "অন্য সম্ভাবনা", pest: "কীটনাশক তথ্য", sev: "ঝুঁকি" }
    : { conf: "match", symptoms: "What the scan found", cause: "Cause", treat: "What to do", prevent: "Prevention", other: "Other possibilities", pest: "Pesticide note", sev: "Severity" };

  elements.scannerResult.innerHTML = `
    <section class="sc-result">

      <div class="sc-head">
        <div class="sc-ring" style="--p:${confidence};--c:${ringColor(sevCls)}">
          <b>${escapeHtml(confidence)}<small>%</small></b>
          <span>${escapeHtml(L.conf)}</span>
        </div>
        <div class="sc-id">
          <p class="sc-crop">${escapeHtml(bnName(result.crop))}</p>
          <h3>${escapeHtml(issue)}</h3>
          <span class="sc-sev ${sevCls}">${escapeHtml(L.sev)}: ${escapeHtml(severityText)}</span>
        </div>
      </div>

      ${description ? `<p class="sc-desc">${escapeHtml(description)}</p>` : ""}

      ${
        symptoms.length || cause
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.symptoms)}</h4>
              ${symptoms.length ? `<div class="sc-tags">${symptoms.map((s) => `<span>${escapeHtml(s)}</span>`).join("")}</div>` : ""}
              ${cause ? `<p style="margin-top:10px"><strong>${escapeHtml(L.cause)}:</strong> ${escapeHtml(cause)}</p>` : ""}
            </article>`
          : ""
      }

      ${
        treatment.length
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.treat)}</h4>
              <ol class="sc-steps">${treatment.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
            </article>`
          : ""
      }

      ${
        prevention && prevention !== "N/A"
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.prevent)}</h4>
              <p>${escapeHtml(prevention)}</p>
              ${result.pesticideNote ? `<p><strong>${escapeHtml(L.pest)}:</strong> ${escapeHtml(result.pesticideNote)}</p>` : ""}
              ${cropRisks.pesticide ? `<p><strong>${escapeHtml(L.pest)}:</strong> ${escapeHtml(bnPesticide(result.crop, cropRisks.pesticide))}</p>` : ""}
            </article>`
          : ""
      }

      ${
        tags.length
          ? `<article class="sc-card"><div class="sc-tags">${tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div></article>`
          : ""
      }

      ${
        others.length
          ? `<article class="sc-card">
              <h4>${escapeHtml(L.other)}</h4>
              <div class="sc-bars">
                ${others
                  .map((p) => {
                    const info = typeof PADDY_BN_ISSUE !== "undefined" ? PADDY_BN_ISSUE[p.label] : null;
                    const name = (isBn() && info) || p.issue || p.label;
                    const w = Math.max(2, Math.min(100, Math.round(p.confidence)));
                    return `<div class="sc-bar">
                      <div><span>${escapeHtml(name)}</span><em>${w}%</em></div>
                      <div class="sc-track"><i style="--w:${w}%"></i></div>
                    </div>`;
                  })
                  .join("")}
              </div>
            </article>`
          : ""
      }

      <p class="sc-note">${escapeHtml(disclaimer)}</p>

    </section>
  `;
}

// ---------------------------------------------------------
// Drag & drop upload (optional but premium feel).
// app.js-er setupEventListeners() er shesh-e ei function call koro:
//   setupLeafDropzone();
// ---------------------------------------------------------
function setupLeafDropzone() {
  const zone = document.querySelector(".leaf-upload");
  const input = elements.leafImageInput;
  if (!zone || !input) return;

  ["dragenter", "dragover"].forEach((evt) =>
    zone.addEventListener(evt, (e) => {
      e.preventDefault();
      zone.classList.add("drag");
    })
  );

  ["dragleave", "drop"].forEach((evt) =>
    zone.addEventListener(evt, (e) => {
      e.preventDefault();
      zone.classList.remove("drag");
    })
  );

  zone.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
