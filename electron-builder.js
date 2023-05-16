const config = {
  appId: "com.timmyg.serenity",
  productName: "Serenity",
  directories: {
    output: "build",
  },
  files: ["package.json", "main.js", "index.html"],
  mac: {
    category: "public.app-category.utilities",
    target: [
      {
        target: "dmg",
        arch: "arm64",
      },
    ],
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220,
      },
      {
        x: 410,
        y: 220,
        type: "link",
        path: "/Applications",
      },
    ],
  },
};

module.exports = config;
