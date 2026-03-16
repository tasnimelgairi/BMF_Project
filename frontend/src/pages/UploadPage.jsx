import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [supplier, setSupplier] = useState("");
  const [runDate, setRunDate] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file || !supplier || !runDate) {
    setMessage("Veuillez remplir tous les champs.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("supplier", supplier);
  formData.append("run_date", runDate);

  try {
    const response = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    console.log("Status HTTP :", response.status);

    const text = await response.text();
    console.log("Réponse brute backend :", text);

    let data = {};
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      setMessage("Réponse invalide du backend.");
      console.error("Erreur JSON :", parseError);
      return;
    }

    if (response.ok) {
  setMessage(
    `${data.message}
    - Feuilles : ${data.sheet_names.join(", ")}
    - Colonnes feuille 1 : ${data.columns_by_sheet["Supplier all countries values"].join(", ")}
    - Colonnes feuille 2 : ${data.columns_by_sheet["Supplier values by country"].join(", ")}`
  );

    } else {
      const errorMessage =
        typeof data.detail === "string"
          ? data.detail
          : data.detail?.message || "Erreur inconnue";

      setMessage(`Erreur : ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erreur frontend :", error);
    setMessage(`Erreur de connexion avec backend : ${error.message}`);
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h2>Upload fichier EQT / PRC</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Fichier Excel :</label><br />
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Fournisseur :</label><br />
          <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
            <option value="">-- Choisir --</option>
            <option value="BOSCH">BOSCH</option>
            <option value="VALEO">VALEO</option>
            <option value="DELPHI">DELPHI</option>
          </select>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Date d’exécution :</label><br />
          <input
            type="date"
            value={runDate}
            onChange={(e) => setRunDate(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          Lancer le traitement
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}