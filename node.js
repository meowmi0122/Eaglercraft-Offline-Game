const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "Games", "1.5.2");

const items = fs.readdirSync(baseDir);

let output = "";

items.forEach(name => {
    const fullPath = path.join(baseDir, name);

    const stat = fs.statSync(fullPath);
    if (!stat.isDirectory()) return;

    const urlName = encodeURIComponent(name);

    output += `### <a href="https://eaglercraft-game-offline.vercel.app/Games/1.5.2/${urlName}">
  <img src="https://eaglercraft-game-offline.vercel.app/SVG/game.svg" width="100">
</a>

### <a href="https://eaglercraft-game-offline.vercel.app/Games/1.5.2/${urlName}" style="color: inherit; text-decoration: none;">
  ${name}
</a>

---

`;
});

fs.writeFileSync(path.join(__dirname, "games.md"), output);

console.log("OK! : ", items.length);