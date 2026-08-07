const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CitiesTab.tsx', 'utf8');

code = code.replace(
  "import { ImageUpload } from './ImageUpload';",
  "import { ImageUpload } from './ImageUpload';\nimport ReactQuill from 'react-quill';\nimport 'react-quill/dist/quill.snow.css';"
);

code = code.replace(
  '<textarea className="w-full border border-orange-200 p-2 rounded-lg dark:bg-slate-800 h-64 font-mono text-[10px]" value={form.articleContent} onChange={e => setForm({...form, articleContent: e.target.value})} placeholder="<h2>...</h2><p>...</p>" />',
  '<div className="bg-white text-black"><ReactQuill theme="snow" value={form.articleContent} onChange={(val) => setForm({...form, articleContent: val})} style={{height: \'300px\', marginBottom: \'50px\'}} /></div>'
);

fs.writeFileSync('src/components/admin/CitiesTab.tsx', code);
