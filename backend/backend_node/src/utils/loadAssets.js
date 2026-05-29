import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Para PNG/JPG (continua usando)
export function loadImageBase64(relativePath) {
  const fullPath = path.resolve(__dirname, "..", relativePath);

  const file = fs.readFileSync(fullPath);
  const ext = path.extname(fullPath).replace(".", "");

  return `data:image/${ext};base64,${file.toString("base64")}`;
}

//  NOVO: para SVG (IMPORTANTE)
export function loadSvgRaw(relativePath) {
  const fullPath = path.resolve(__dirname, "..", relativePath);

  return fs.readFileSync(fullPath, "utf-8");
}

//FONTS
export function loadFontBase64(relativePath){
  const fullPath = path.resolve(__dirname, "..", relativePath);
  const file = fs.readFileSync(fullPath);
  return file.toString("base64");
}