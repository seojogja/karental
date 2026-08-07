const fs = require('fs');

function updateFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import ReactQuill from 'react-quill';/g, "import ReactQuill from 'react-quill-new';");
  code = code.replace(/import 'react-quill\/dist\/quill.snow.css';/g, "import 'react-quill-new/dist/quill.snow.css';");
  fs.writeFileSync(filePath, code);
}

updateFile('src/components/admin/CitiesTab.tsx');
updateFile('src/components/admin/BlogsTab.tsx');
