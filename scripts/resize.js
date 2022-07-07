const sharp = require("sharp");
const fs = require("fs");
const directory = "./src/assets/images";

fs.readdirSync(directory).forEach((file) => {
  const name = file.split(".")[0];
  const ext = file.split(".")[1];
  if (!name.includes("small") && !name.includes("medium")) {
    sharp(`${directory}/${file}`)
      .resize(450, 450) // width
      .toFile(`${directory}/${name}-small.${ext}`);

    sharp(`${directory}/${file}`)
      .resize(750) // width
      .toFile(`${directory}/${name}-medium.${ext}`);
  }
});
