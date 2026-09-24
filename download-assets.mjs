import fs from "fs";
import path from "path";

const propertyFile = fs.readFileSync("./src/data/property.js", "utf8");

const matches = [
  ...propertyFile.matchAll(/IMG\(["'`](.*?)["'`]\)/g),
  ...propertyFile.matchAll(/photo\(["'`](.*?)["'`],/g),
];

const assets = [...new Set(matches.map((m) => m[1]))];

console.log(`Found ${assets.length} assets.`);

for (const asset of assets) {
  const url = `https://airbnb-clone-umber-two.vercel.app/assets/images/${asset}`;

  const outputPath = path.join("public", "assets", "images", asset);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  try {
    const response = await fetch(url, {
      headers: {
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      console.log(`❌ ${response.status}: ${asset}`);
      continue;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ ${asset}`);
  } catch (error) {
    console.log(`❌ Failed: ${asset}`);
  }
}

console.log("\nDone!");
