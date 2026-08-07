const fs = require('fs');
let code = fs.readFileSync('src/components/admin/BlogsTab.tsx', 'utf8');

code = code.replace(
  "import { ImageUpload } from './ImageUpload';",
  "import { ImageUpload } from './ImageUpload';\nimport ReactQuill from 'react-quill';\nimport 'react-quill/dist/quill.snow.css';"
);

code = code.replace(
  '<textarea className="w-full border p-2 rounded-lg dark:bg-slate-800 h-32 font-mono text-[10px]" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />',
  '<div className="bg-white text-black"><ReactQuill theme="snow" value={form.content} onChange={(val) => setForm({...form, content: val})} style={{height: \'300px\', marginBottom: \'50px\'}} /></div>'
);

fs.writeFileSync('src/components/admin/BlogsTab.tsx', code);
