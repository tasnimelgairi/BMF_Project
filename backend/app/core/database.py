import duckdb
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DB_DIR = BASE_DIR / "db"
DB_DIR.mkdir(parents=True, exist_ok=True)

DB_PATH = DB_DIR / "masterfile.duckdb"

print("Chemin de la base :", DB_PATH)
print("La base existe ?", DB_PATH.exists())


def get_connection():
    return duckdb.connect(str(DB_PATH))