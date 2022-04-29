const borderPicker = Pickr.create({
  el: "#border-color",
  theme: "monolith",
  comparison: false,
  default: "#000",

  swatches: [
    "rgba(244, 67, 54, 1)",
    "rgba(233, 30, 99, 0.95)",
    "rgba(156, 39, 176, 0.9)",
    "rgba(139, 195, 74, 0.85)",
    "rgba(205, 220, 57, 0.9)",
    "rgba(255, 235, 59, 0.95)",
    "rgba(255, 193, 7, 1)",
  ],

  components: {
    opacity: true,
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      input: true,
    },
  },
});

const shadowPicker = Pickr.create({
  el: "#shadow-picker",
  theme: "monolith",
  comparison: false,
  default: "#000",

  swatches: [
    "rgba(244, 67, 54, 1)",
    "rgba(233, 30, 99, 0.95)",
    "rgba(156, 39, 176, 0.9)",
    "rgba(139, 195, 74, 0.85)",
    "rgba(205, 220, 57, 0.9)",
    "rgba(255, 235, 59, 0.95)",
    "rgba(255, 193, 7, 1)",
  ],

  components: {
    opacity: true,
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      input: true,
    },
  },
});

borderPicker.on("change", (color) => {
  borderColor = color.toRGBA().toString(0);
  init();
});

shadowPicker.on("change", (color) => {
  updateShadowColor(color.toRGBA().toString(0));
});
