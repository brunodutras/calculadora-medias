const { mkdirSync, rmSync, copyFileSync } = require('node:fs');
const { resolve, join } = require('node:path');
const root = resolve(__dirname, '..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'src'), { recursive: true });
for (const file of ['index.html', 'style.css', 'src/calculadora.js', 'src/app.js']) {
  copyFileSync(join(root, file), join(dist, file));
}
console.log('Build concluído: arquivos estáticos preparados em dist/.');
