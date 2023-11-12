let neuerName;
let ausfueheren = true;
let umbenennen = false;
let geraetAngewaehlt = false;
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
//
//   datenVerarbeiten(e);
// });

function knopfGedrueckt() {
  geraetAngewaehlt = false;
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
  document.getElementById("knopfAusfuehren").style.backgroundColor =
    "lightgrey";
}

//knopf zur bestätigung der Aktion
document.getElementById("knopfAusfuehren").onclick = function () {
  if (!geraetAngewaehlt) {
    ausfueheren = true;
    umbenennen = false;
    datenToJSON("ausfuehren");
    //datenSenden(datenToJSON("ausfuehren"));
    knoepfeZuruecksetzen();
  } else if (geraetAngewaehlt) {
    document.getElementById(
      "Statusanzeige"
    ).innerHTML = `Ein Gerät kann nicht ausgeführt werden, es muss eine Aktion ausgewählt sein!`;
  }
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
  } else {
    document.getElementById(
      "Statusanzeige"
    ).innerHTML = `Erst einen neuen namen eingeben`;
  }
};

//knopf um eingabe zu speichern
document.getElementById("KnopfBestaetigen").onclick = function () {
  neuerName = document.getElementById("frame").value;
};

//knopf zum Eingabe löschen
document.getElementById("knopfEingabeLoeschen").onclick = function () {
  neuerName = ``;
  document.getElementById("frame").value = ``;
};

document.getElementById("geraet1").onclick = function () {
  ausfuehrenAusgrauen();
};

document.getElementById("geraet2").onclick = function () {
  ausfuehrenAusgrauen();
};

document.getElementById("geraet3").onclick = function () {
  ausfuehrenAusgrauen();
};

document.getElementById("geraet4").onclick = function () {
  ausfuehrenAusgrauen();
};

function ausfuehrenAusgrauen() {
  knoepfeZuruecksetzen();
  document.getElementById("knopfAusfuehren").style.backgroundColor = "grey";
  geraetAngewaehlt = true;
}

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

function datenVerarbeiten(daten) {
  let obj = JSON.parse(daten);

  if (obj.grund === knoepfeUmbenennen) {
    //do something
  }
}
