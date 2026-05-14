const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const { dir = '.' } = req.query;
    // 防止路徑遍歷攻擊 (Security)
    const safeDir = dir.replace(/\.\.\//g, '');
    const fullPath = path.join(process.cwd(), safeDir);

    try {
        const items = fs.readdirSync(fullPath, { withFileTypes: true });
        
        const files = items
            .filter(item => {
                const name = item.name;
                return !name.startsWith('.') && 
                       !['node_modules', 'api', 'package.json', 'package-lock.json', 'vercel.json'].includes(name);
            })
            .map(item => {
                const isDir = item.isDirectory();
                const ext = path.extname(item.name).toLowerCase();
                return {
                    name: item.name,
                    isDir: isDir,
                    path: path.join(safeDir, item.name).replace(/\\/g, '/'),
                    ext: isDir ? 'folder' : ext.replace('.', ''),
                    displayName: (isDir || ext !== '.html') ? item.name : item.name.replace('.html', '')
                };
            });

        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ error: "Unable to scan directory", details: err.message });
    }
}