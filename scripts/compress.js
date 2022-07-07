const imagemin = require("imagemin");
const pngquant = require("imagemin-pngquant");
const webp = require("imagemin-webp");

const directory = "./src/assets/images";

(async () => {
  const files = await imagemin([directory], {
    destination: directory,
    plugins: [
      pngquant({ quality: [0.9, 0.9] }),
      webp({ quality: 90 }),
    ],
  });
  console.log(files);
})();
