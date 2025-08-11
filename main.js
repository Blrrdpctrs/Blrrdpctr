async function loadData() {
  const res = await fetch("data.json");
  return res.json();
}

function sectionStart(profile) {
  return `
    <h1>${profile.name}</h1>
    <p>${profile.tagline}</p>
  `;
}

function sectionLatest(latest) {
  return `
    <h2>Latest Song(s)</h2>
    ${latest.map(song => `
      <div class="card">
        <h3>${song.title}</h3>
        ${song.embed ? `<iframe src="${song.embed}" height="152" allow="encrypted-media"></iframe>` : ""}
        <div>${song.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join(" | ")}</div>
      </div>
    `).join("")}
  `;
}

function sectionReleases(releases) {
  return `
    <h2>Upcoming Releases</h2>
    ${releases.length ? releases.map(r => `
      <div class="card">
        <h3>${r.title}</h3>
        <p>Release: ${r.date}</p>
        ${r.preSave ? `<a href="${r.preSave}" target="_blank">Pre-Save</a>` : ""}
      </div>
    `).join("") : "<p>Keine Releases eingetragen.</p>"}
  `;
}

function sectionAbout(profile) {
  return `<h2>Wer ich bin</h2><p>${profile.bio}</p>`;
}

function sectionAchievements(list) {
  return `
    <h2>Achievements</h2>
    <ul>${list.map(a => `<li>${a}</li>`).join("")}</ul>
  `;
}

function sectionShows(shows) {
  return `
    <h2>Shows</h2>
    ${shows.length ? shows.map(s => `
      <div class="card">
        <strong>${s.date}</strong> – ${s.city} (${s.venue})
        ${s.ticket ? `<br><a href="${s.ticket}" target="_blank">Tickets</a>` : ""}
      </div>
    `).join("") : "<p>Keine Shows eingetragen.</p>"}
  `;
}

function sectionContact(profile) {
  return `
    <h2>Kontakt</h2>
    <p>Email: <a href="mailto:${profile.email}">${profile.email}</a></p>
    <p>Phone: ${profile.phone}</p>
  `;
}

function sectionLegal(legal) {
  return `
    <h2>Impressum</h2>
    <pre>${legal.impressum}</pre>
    <h2>Datenschutz</h2>
    <pre>${legal.datenschutz}</pre>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData();
  document.getElementById("start").innerHTML = sectionStart(data.profile);
  document.getElementById("latest").innerHTML = sectionLatest(data.latest);
  document.getElementById("releases").innerHTML = sectionReleases(data.releases);
  document.getElementById("about").innerHTML = sectionAbout(data.profile);
  document.getElementById("achievements").innerHTML = sectionAchievements(data.achievements);
  document.getElementById("shows").innerHTML = sectionShows(data.shows);
  document.getElementById("contact").innerHTML = sectionContact(data.profile);
  document.getElementById("legal").innerHTML = sectionLegal(data.legal);
});
