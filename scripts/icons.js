const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const directory = "public/icons";
const regExp = /(image\/svg\+xml|image\/png)/;
const dom = require("cheerio");

const $ = dom.load(
  '<svg width="0" height="0" style="position: absolute" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>',
  null,
  false
);

const ICON_TYPES = {
  COLORFUL: "colorful",
  LINEAR: "linear",
  FLAT: "flat",
  FLAGS: "flags",
};

const toCamelCase = (str) => {
  return str
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

const clean = (node, type) => {
  // Modify root SVG element
  if(node.attr("fill") !== "none") node.attr("fill", type === "linear" ? "none" : "currentColor");
  if(node.attr("stroke") !== "none") node.attr("stroke", type === "linear" ? "none" : "currentColor");
  
  node.removeAttr("style");

  // Clean children elements
  node.find("*").each((i, el) => {
    const element = $(el);

    // Clear fill attribute
    if(element.attr("fill") !== "none") element.removeAttr("fill");

    // Clear stroke attribute
    const strokeAttr = element.attr("stroke");
    if (strokeAttr && strokeAttr.indexOf("url") === -1 && strokeAttr !== "none") {
      element.removeAttr("stroke");
    }

    // Remove style attribute
    element.removeAttr("style");
  });
};

const cleanFolders = () => {
  const iconsFolderPath = path.join(__dirname, `../src/icons`);
  if (fs.existsSync(iconsFolderPath)) {
    fs.rmdirSync(iconsFolderPath, { recursive: true });
  }
};

const generator = (p = "") => {
  const files = fs.readdirSync(
    path.join(__dirname, "../", `${directory}/${p}`)
  );
  files.forEach((file) => {
    const mt = mime.lookup(file);
    if ((mt && !regExp.test(mt)) || file.indexOf(".") === 0) {
      return;
    } else if (
      fs
        .lstatSync(`../${directory}/${p}/${file}`.replace(/\/\//g, "/"))
        .isDirectory()
    ) {
      generator(`${p}/${file}`);
    } else {
      const element = fs.readFileSync(
        path.join(__dirname, "../", `${directory}/${p}`, file),
        "utf8"
      );
      const fileType = mime.lookup(`${p}/${file}`);
      const extension = mime.extension(fileType);
      const rext = new RegExp(`\.${extension}$`, "g");
      const key = `${p}/${file}`.replace(/\//, "").replace(rext, "");
      const svgNode = $(element);
      svgNode.attr("width", 0);
      svgNode.attr("height", 0);

      const { 0: iconType } = key?.split("/");

      // Create folder if it doesn't exist
      const iconFolderPath = path.join(
        __dirname,
        `../src/icons/generated/${iconType}`
      );
      if (!fs.existsSync(iconFolderPath)) {
        fs.mkdirSync(iconFolderPath, { recursive: true });
      }

      // Apply cleaning if necessary
      if (
        iconType.includes(ICON_TYPES.FLAT) ||
        iconType.includes(ICON_TYPES.LINEAR)
      ) {
        clean(svgNode, p.slice(1), key);
      }

      // Update the original file with the modified content
      fs.writeFileSync(
        path.join(__dirname, `../src/icons/generated/${iconType}`, `${file}r`),
        svgNode.toString(),
        { encoding: "utf8", flag: "w" }
      );
    }
  });
};

const generateImports = () => {
  const iconFolderPath = path.join(__dirname, "../src/icons/generated");
  const folders = fs
    .readdirSync(iconFolderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const importsByFolder = {};
  const exportsByFolder = {};

  folders.forEach((folder) => {
    const folderPath = path.join(iconFolderPath, folder);
    const files = fs.readdirSync(folderPath);

    const imports = [];
    const exports = {};

    files.forEach((file) => {
      const fullPath = path.join(folderPath, file);
      const mt = mime.lookup(file);

      if (
        (mt && !regExp.test(mt)) ||
        file.indexOf(".") === 0 ||
        fs.lstatSync(fullPath).isDirectory()
      ) {
        return;
      }

      const iconName = path.basename(file, path.extname(file));
      const camelIconName = toCamelCase(iconName);

      // Add special handling for icon names with "-"
      const isIconKebabCase = iconName.includes("-");
      const importKey = iconName.includes("-") ? iconName : camelIconName;

      imports.push(
        `import ${camelIconName} from './generated/${folder}/${file}';`
      );
      exports[isIconKebabCase ? `'${importKey}'` : importKey] = camelIconName;
    });

    importsByFolder[folder] = imports.join("\n");
    exportsByFolder[folder] = exports;
  });

  const importsContent = Object.keys(importsByFolder)
    .map((folder) => importsByFolder[folder])
    .join("\n\n");

  const exportsContent = Object.keys(exportsByFolder)
    .map((folder) => {
      const exports = exportsByFolder[folder];
      const exportsString = Object.keys(exports)
        .map((key) =>
          key === exports[key] ? `    ${key}` : `    ${key}: ${exports[key]}`
        )
        .join(",\n");
      return `  ${folder}: {\n${exportsString}\n  }`;
    })
    .join(",\n");

  const content = `${importsContent}

const icons = {
${exportsContent}
};

export default icons;`;

  fs.writeFileSync(path.join(__dirname, "../src/icons", "index.ts"), content, {
    encoding: "utf8",
    flag: "w",
  });
};

cleanFolders();

generator();

generateImports();

process.exit();
