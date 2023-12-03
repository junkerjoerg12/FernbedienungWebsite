let neuerName;

let ausfueheren = true;
let umbenennen = false;

let geraetAngewaehlt = false;
let loggetIn = true; //wieder zurückändern

let ausgewaehlterKnopf = document.getElementById("k0");
ausgewaehlterKnopf = null;
let passwort = 1216985771;

let socket = new WebSocket("ws://" + window.location.hostname + ":81/");

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

//Allen knöpfen wird eventlistener hinzugefügt
for (let i = 0; i < knoepfe.length; i++) {
  knoepfe[i].addEventListener("click", knopfGedrueckt);
}

let geraete = [
  document.getElementById("geraet1"),
  document.getElementById("geraet2"),
  document.getElementById("geraet3"),
  document.getElementById("geraet4"),
];

for (let i = 0; i < geraete.length; i++) {
  geraete[i].addEventListener("click", knopfGedrueckt);
}

document.getElementById("frame").value = ``;

//Knöpfe, die das Gerät anzeigen erhalten click Lilstener
document.getElementById("geraet1").onclick = function () {
  ausfuehrenAusgrauen();
  ausgewaehlterKnopf = document.getElementById("geraet1");
};

socket.addEventListener("open", () => {
  console.log("Connected");
});

socket.onmessage = function (event) {
  console.log("HAllo, bitte");
  statusbarAnzeigeAendern(`Das würde ich mir wünschen`);
  datenVerarbeiten(event);
};

function knopfGedrueckt() {
  //aus mir unerfindlichen Gründen wird das Ertse Gerät beim anklicken nicht hell umrandet, obwohl das bei console.log da aber steht
  console.log(`Knopf gedrückt`);
  if (knoepfe.includes(this)) {
    geraetAngewaehlt = false;
    console.log("knöpfe");
  } else if (geraete.includes(this)) {
    geraetAngewaehlt = true;
    ausfuehrenAusgrauen();
    console.log(this);
  }

  knoepfeZuruecksetzen();
  //Ausgewählter knopf wird hell umrandet
  if (this !== ausgewaehlterKnopf) {
    ausgewaehlterKnopf = this;
    ausgewaehlterKnopf.style.borderColor = "white";
    ausgewaehlterKnopf.style.backgroundColor = " white";
  } else {
    ausgewaehlterKnopf = null;
  }
  console.log(this);
}

//Alle knöpfe werden wieder auf default css gesetzt
function knoepfeZuruecksetzen() {
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].style.backgroundColor = "lightgrey";
    knoepfe[i].style.borderColor = "black";
  }
  for (let i = 0; i < geraete.length; i++) {
    geraete[i].style.backgroundColor = "lightgrey";
    geraete[i].style.borderColor = "black";
  }
  if (!geraetAngewaehlt) {
    document.getElementById("knopfAusfuehren").style.backgroundColor =
      "lightgrey";
  }
}

//knopf zur bestätigung der Aktion
document.getElementById("knopfAusfuehren").onclick = function () {
  if (!loggetIn) {
    statusbarAnzeigeAendern(`Bitte erst einloggen!`);
  } else if (!geraetAngewaehlt) {
    ausfueheren = true;
    umbenennen = false;
    datenSenden(datenToJSON("ausfuehren", let));
    knoepfeZuruecksetzen();
    setTimeout(statusbarAnzeigeAuswaehlen, 3000);
    statusbarAnzeigeAendern(`Aktion ausgeführt`);
  } else if (geraetAngewaehlt) {
    statusbarAnzeigeAendern(
      `Ein Gerät kann nicht ausgeführt werden, es muss eine Aktion ausgewählt sein!`
    );
  }
};

function statusbarAnzeigeAendern(anzeige) {
  document.getElementById("Statusanzeige").innerHTML = anzeige;
}
function statusbarAnzeigeAuswaehlen() {
  document.getElementById("Statusanzeige").innerHTML = `Aktion auswählen`;
}

//knopf um einen der Knöpfe umzubenennen
document.getElementById("knopfUmbenennen").onclick = function () {
  if (loggetIn === true) {
    if (neuerName) {
      let grund;
      let toBeSend;
      if (geraetAngewaehlt) {
        grund = "geraetUmbenennen";
        toBeSend = geraete;
      } else {
        grund = "knoepfeUmbenennen";
        toBeSend = knoepfe;
      }
      ausfueheren = false;
      umbenennen = true;
      ausgewaehlterKnopf.innerText = neuerName;
      datenSenden(datenToJSON(grund, toBeSend));
      knoepfeZuruecksetzen();
      neuerName = ``;
      document.getElementById("frame").value = ``;
    } else {
      statusbarAnzeigeAendern(`Erst einen neuen namen eingeben`);
    }
  } else {
    statusbarAnzeigeAendern(`Bitte erst einloggen`);
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

document.getElementById("login").onclick = function () {
  if (loggetIn === false) {
    let pw = window.prompt("Passwort");
    if (toHash(pw) === passwort) {
      loggetIn = true;
      statusbarAnzeigeAendern(`Eingeloggt`);
      //document.getElementById("login").style.visibility = `hidden`;
      document.getElementById("login").innerText = "  Logout  ";
      document.getElementById("login").style.backgroundColor = "red";
    } else {
      statusbarAnzeigeAendern(`Falsches Passwort`);
    }
  } else {
    loggetIn = false;
    statusbarAnzeigeAendern(`Ausgeloggt`);
    document.getElementById("login").innerText = "  Login  ";
    document.getElementById("login").style.backgroundColor = "green";
  }
};

function ausfuehrenAusgrauen() {
  knoepfeZuruecksetzen();
  document.getElementById("knopfAusfuehren").style.backgroundColor = "grey";
  geraetAngewaehlt = true;
}

function datenToJSON(grund, arr) {
  let datenArr = [];
  if (umbenennen) {
    for (let i = 0; i < arr.length; i++) {
      let button = {
        innerText: arr[i].innerText,
      };
      datenArr.push(button);
    }
  } else if (ausfueheren) {
    console.log(ausgewaehlterKnopf);
    let button = {
      auszufuehrenderKnopf: ausgewaehlterKnopf.innerText,
    };
    datenArr.push(button);
  }
  console.log(datenArr);
  let daten = JSON.stringify({ grund, datenArr });
  console.log(daten);
  return daten;
}

function datenSenden(daten) {
  statusbarAnzeigeAendern(`Gesendet`);
  socket.send(daten);
  console.log(`Sende Daten`);
}

function datenVerarbeiten(daten) {
  console.log(`Daten Empfangen`);

  // let obj = JSON.parse(daten);

  // if (obj.grund === "knoepfeUmbenennen") {
  //   for (let i = 0; i < obj.datenArr.length; i++) {
  //     knoepfe[i].innerText = obj.datenArr[i];
  //   }
  // }
}

function toHash(string) {
  //set variable hash as 0
  var hash = 0;
  // if the length of the string is 0, return 0
  if (string.length == 0) return hash;
  for (i = 0; i < string.length; i++) {
    ch = string.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
