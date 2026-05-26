// Executa a migration inicial no Supabase
// Uso: node scripts/run-migration.mjs SERVICE_ROLE_KEY
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://yuidyidxswoqtcricsvk.supabase.co";
const SERVICE_ROLE_KEY = process.argv[2];

if (!SERVICE_ROLE_KEY) {
  console.error("❌  Uso: node scripts/run-migration.mjs <SERVICE_ROLE_KEY>");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const sql = readFileSync(
  join(__dirname, "../supabase/migrations/001_initial_schema.sql"),
  "utf8"
);

// Divide em statements individuais e executa um a um
const statements = sql
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith("--"));

console.log(`\n🚀  Executando ${statements.length} statements...\n`);

for (const stmt of statements) {
  const preview = stmt.slice(0, 60).replace(/\n/g, " ");
  try {
    const { error } = await supabase.rpc("exec_sql", { sql: stmt + ";" });
    if (error) {
      // Tenta via REST direto
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ sql: stmt + ";" }),
      });
      if (!res.ok) {
        console.warn(`⚠️   Aviso em: ${preview}...`);
      } else {
        console.log(`✅  OK: ${preview}...`);
      }
    } else {
      console.log(`✅  OK: ${preview}...`);
    }
  } catch (e) {
    console.warn(`⚠️   ${preview}... (${e.message})`);
  }
}

console.log("\n✅  Migration concluída!\n");
