let neuerName;
let ausfueheren = true;
let umbenennen = false;
let ausgewaehlterKnopf = document.getElementById("k0");
//Hier noich richtiege url einsetzten
// const socket = new WebSocket("ws://localhost:8082");

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

//Allen knöpfen wird eventlistener hinzugefügt
for (let i = 0; i < knoepfe.length; i++) {
  knoepfe[i].addEventListener("click", knopfGedrueckt);
}

// socket.addEventListener("open", () => {
//   console.log("Connected");
// });

// socket.addEventListener("message", (e) => {
//   let daten = e;
// });

function knopfGedrueckt() {
  knoepfeZuruecksetzen();

  //Ausgewählter knopf wird hell umrandet
  if (this !== ausgewaehlterKnopf) {
    ausgewaehlterKnopf = this;
    ausgewaehlterKnopf.style.borderColor = "white";
    ausgewaehlterKnopf.style.backgroundColor = " white";
  } else {
    ausgewaehlterKnopf = null;
  }
}

//Alle knöpfe werden wieder auf default css gesetzt
function knoepfeZuruecksetzen() {
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].style.backgroundColor = "lightgrey";
    knoepfe[i].style.borderColor = "black";
  }
}

//knopf zur bestätigung der Aktion
document.getElementById("knopfAusfuehren").onclick = function () {
  ausfueheren = true;
  umbenennen = false;
  datenToJSON("ausfuehren");
  //datenSenden(datenToJSON("ausfuehren"));
  knoepfeZuruecksetzen();
};

//knopf um einen der Knöpfe umzubenennen
document.getElementById("knopfUmbenennen").onclick = function () {
  if (neuerName) {
    ausfueheren = false;
    umbenennen = true;
    ausgewaehlterKnopf.innerText = neuerName;
    datenToJSON("knoepfeUmbenennen");
    // datenSenden(datenToJSON());
    knoepfeZuruecksetzen();
    neuerName = ``;
  }
};

//knopf um eingabe zu speichern
document.getElementById("KnopfBestaetigen").onclick = function () {
  neuerName = document.getElementById("frame").value;
};

//knopf zum Eingabe löschen
document.getElementById("knopfEingabeLoeschen").onclick = function () {};

function datenToJSON(grund) {
  let datenArr = [];
  if (umbenennen) {
    for (let i = 0; i < knoepfe.length; i++) {
      let button = {
        // id: knoepfe[i].id,
        innerText: knoepfe[i].innerText,
        //hintergrundFarbe: knoepfe[i].style.backgroundColor,
        // randFarbe: knoepfe[i].style.borderColor,
      };
      datenArr.push(button);
    }
  }

  console.log(datenArr);
  let daten = JSON.stringify({ grund, datenArr });
  console.log(daten);
  return daten;
}

// function datenSenden() {
//   socket.send(daten);
// }
