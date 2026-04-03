const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const DATA_FILE = "data.json";

// ?? wczytaj dane z pliku
function loadData() {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// ?? zapisz dane
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ?? API – odbieranie z Roblox
app.post("/api/users", (req, res) => {
    let users = loadData();

    const { imie, nazwisko, data, pesel, robloxNick } = req.body;

    users.push({
        imie,
        nazwisko,
        data,
        pesel,
        robloxNick,
        status: "czysty",
        mandaty: [],
        sprawy: []
    });

    saveData(users);

    console.log("Zapisano:", imie, nazwisko);
    res.sendStatus(200);
});

// ?? API – pobieranie
app.get("/api/users", (req, res) => {
    const users = loadData();
    res.json(users);
});

// ?? strona
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log("Serwer dzia³a"));