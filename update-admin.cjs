const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');

code = code.replace(
  '<strong>Petunjuk:</strong> Username Default: <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">vian</code> | Password: <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">eMonJal!%E&5097JakAL</code>',
  '<strong>User admin:</strong> <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">vastromedia@gmail.com</code> | Password: <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">eMonJal!%E&5097JakAL</code>'
);

code = code.replace(
  "const [username, setUsername] = useState('vian');",
  "const [username, setUsername] = useState('vastromedia@gmail.com');"
);

fs.writeFileSync('src/pages/AdminDashboardPage.tsx', code);

// Update AppContext.tsx to allow login
let app = fs.readFileSync('src/context/AppContext.tsx', 'utf8');
app = app.replace(
  "(user === 'vian' && pass === 'eMonJal!%E&5097JakAL')",
  "(user === 'vastromedia@gmail.com' && pass === 'eMonJal!%E&5097JakAL')"
);
fs.writeFileSync('src/context/AppContext.tsx', app);

