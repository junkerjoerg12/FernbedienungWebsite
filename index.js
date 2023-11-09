let neuerName;
let ausfueheren = true;
let umbenennen = false;
let ausgewaehlterKnopf;

let knoepfe = [
  document.getElementById("k0"),
  document.getElementById("k1"),
  document.getElementById("k2"),
  document.getElementById("k3"),
  document.getElementById("k4"),
  document.getElementById("k5"),
  document.getElementById("k6"),
  document.getElementById("k7"),
  document.getElementById("k8"),
  document.getElementById("k9"),
  document.getElementById("k10"),
  document.getElementById("k11"),
  document.getElementById("k12"),
  document.getElementById("k13"),
  document.getElementById("k14"),
  document.getElementById("k15"),
];
document.getElementById("frame").value = ``;

// document.getElementById("k1").style.color = "green";

for (let i = 0; i < knoepfe.length; i++) {
  knoepfe[i].addEventListener("click", knopfGedrueckt);
}

function knopfGedrueckt() {
  ausgewaehlterKnopf = this;

  if (document.getElementById("knopfUmbenennen")) {
    console.log(`umbenennen`);
    this.innerText = neuerName;
  } else if (document.getElementById("knopfAusfuehren")) {
    console.log(`Ausführen`);
  }
}

document.getElementById("KnopfBestaetigen").onclick = function () {
  if (umbenennen) {
    neuerName = document.getElementById("frame").value;
  }
  console.log(neuerName);
};

document.getElementById("knopfEingabeLoeschen").onclick = function () {
  document.getElementById("frame").value = ``;
};
