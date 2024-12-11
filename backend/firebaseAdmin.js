const admin = require("firebase-admin");
const serviceAccount = require("./desafio-graodireto-firebase-adminsdk-k7xr5-dfb48bd600.json"); // Requer a chave privada JSON

// Verifica se o Firebase Admin já foi inicializado
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount), // Usa a chave privada para autenticar
    });
}

module.exports = admin;