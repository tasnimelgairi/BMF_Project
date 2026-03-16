from app.core.database import get_connection

def init_db():
    conn = get_connection()

    conn.execute("DROP TABLE IF EXISTS uploaded_files")
    conn.execute("DROP SEQUENCE IF EXISTS uploaded_files_seq")

    conn.execute("CREATE SEQUENCE uploaded_files_seq START 1")

    conn.execute("""
        CREATE TABLE uploaded_files (
            id BIGINT DEFAULT nextval('uploaded_files_seq'),
            file_name VARCHAR,
            file_path VARCHAR,
            supplier VARCHAR,
            run_date DATE,
            status VARCHAR,
            uploaded_at TIMESTAMP
        )
    """)

    conn.close()

if __name__ == "__main__":
    init_db()