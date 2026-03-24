const fs = require('fs');

const path = 'c:\\Users\\yusuf\\OneDrive\\Desktop\\je2\\data.js';
let content = fs.readFileSync(path, 'utf8');

const sabetayStartStr = "const sabetayFamilies = [";
const sabetayStartIndex = content.indexOf(sabetayStartStr);
if(sabetayStartIndex === -1) {
    console.error("sabetayFamilies not found");
    process.exit(1);
}

// Find the end of the array. It ends before "const sabetayConnections ="
const connectionsIndex = content.indexOf("const sabetayConnections =");
if(connectionsIndex === -1) {
    console.error("sabetayConnections not found");
    process.exit(1);
}

// The slice containing sabetayFamilies
let sabetaySection = content.slice(sabetayStartIndex, connectionsIndex);

// Use a simple regex replacer since the lines follow a uniform format: { id: "...", name: "...", category: "...", description: "...", members: ["..."] },
// Or we can just parse the array by evaluating it, but since it's JS, let's just evaluate it and stringify back (though we'd lose comments).
// To keep comments, we can do string manipulation.

const lines = sabetaySection.split('\n');

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.trim().startsWith('{') && line.includes('id:') && line.includes('name:')) {
        // Determine origin based on description or id
        const lowerLine = line.toLowerCase();
        let origin = "Selanik";
        let coords = "[40.6401, 22.9444]";

        if (lowerLine.includes('sabad') || lowerLine.includes('safarad') || lowerLine.includes('sefarad') || lowerLine.includes('izmir') || lowerLine.includes('ispanya') || lowerLine.includes('uşşakizade') || lowerLine.includes('evliyazade') || lowerLine.includes('katipzade')) {
            // "Evliyazadeler" and "Uşşakizadeler" are prominent Izmir families
            origin = "Sefarad";
            coords = "[38.4237, 27.1428]"; // Izmir
        } else if (lowerLine.includes('balkan') || lowerLine.includes('bulgar') || lowerLine.includes('makedon') || lowerLine.includes('trakya') || lowerLine.includes('bosna') || lowerLine.includes('inegöllüzade')) {
            origin = "Balkan";
            coords = "[42.7339, 25.4858]"; // Balkans
        } else {
            origin = "Selanik";
            coords = "[40.6401, 22.9444]"; // Selanik
        }

        // Insert origin and coords after category
        line = line.replace(/category:\s*(["'][^"']+["'])/, `category: $1, origin: "${origin}", coords: ${coords}`);
        lines[i] = line;
    }
}

content = content.slice(0, sabetayStartIndex) + lines.join('\n') + content.slice(connectionsIndex);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated sabetayFamilies in data.js');
