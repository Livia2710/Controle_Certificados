import fs from "fs";
import path from "path";

export function renderTemplate(templateName, data) {
  const filePath = path.resolve(`src/templates/${templateName}.html`);

  let html = fs.readFileSync(filePath, "utf-8");

  Object.entries(data).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value || "");
  });

  return html;
}