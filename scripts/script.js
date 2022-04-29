// Variables
let borderWidth = widthRange.value,
  borderColor = "rgba(0, 0, 0, 1)",
  border = borderWidth.toString() + "px " + "solid " + borderColor,
  shadowColor = "rgba(0, 0, 0, 1)",
  shadowX = null,
  shadowY = null,
  shadowBlur = shadowBlurRange.value.toString() + "px" || "5px",
  shadowSpread = shadowSpreadRange.value.toString() + "px" || "0px",
  shadow = null,
  background = window.getComputedStyle(box).getPropertyValue("background"),
  gradientLeft = firstColorGradient?.value || "rgba(0, 0, 0, 1)",
  gradientRight = secondColorGradient?.value || "rgba(255, 255, 255, 1)",
  gradientDirection = directionRange?.value,
  backgroundImageUrl = backgroundUrlInput?.value,
  backgroundImageSettings = {
    size: null,
    position: null,
    repeat: null,
  };

// Border Radius Changer
[btr, btl, bbr, bbl].forEach((element) => {
  ["change", "input"].forEach((event) => {
    element.addEventListener(event, () => {
      box.style[element.getAttribute("data-border")] = `${element.value}px`;
    });
  });
});

const formatShadow = (selector, flag = true) => {
  const elem = selector.getAttribute("data-shadow");
  const styling = JSON.parse(decodeURIComponent(elem));
  shadowX = styling.x.toString() + "px";
  shadowY = styling.y.toString() + "px";
  flag
    ? (styling.blur = shadowBlur)
    : (shadowBlur = styling.blur.toString() + "px");
  flag
    ? (styling.spread = shadowSpread)
    : (shadowSpread = styling.spread.toString() + "px");
  shadow = (
    shadowX +
    " " +
    shadowY +
    " " +
    shadowBlur +
    " " +
    shadowSpread +
    " " +
    shadowColor
  ).toString();
};

const updateShadowColor = (color) => {
  shadowColor = color;
  shadowBtns.forEach((btn) => {
    if (btn.checked) {
      setTimeout(() => {
        formatShadow(btn);
        box.style.boxShadow = shadow;
      }, 0);
    }
  });
};

// Border type/width/color change
const init = () => {
  borderWidth = widthRange.value;
  border = borderWidth.toString() + "px " + "solid " + borderColor;
  borderAllBtn.checked ? (box.style.border = border) : null;
  borderBtns.forEach((btn) => {
    if (borderAllBtn.checked) {
      box.style.border = border;
    } else if (btn.checked) {
      box.style[btn.id] = border;
    }
  });
  updateBackgroundSlider();
  updateBackground();
};

borderAllBtn.addEventListener("click", (e) => {
  borderAllBtn.checked
    ? (box.style.border = border)
    : (box.style.border = "none");
  borderBtns.forEach((btn) => {
    btn.checked = false;
  });
});

borderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.checked && !borderAllBtn.checked) {
      box.style[btn.id] = border;
    } else if (btn.checked && borderAllBtn.checked) {
      box.style.border = "none";
      box.style[btn.id] = border;
      borderAllBtn.checked = false;
    } else {
      box.style[btn.id] = "none";
    }
  });
});

[widthRange, borderColorPicker].forEach((selector) => {
  selector.addEventListener("change", () => {
    init();
  });
});

// Box shadow
shadowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.checked && !removeShadowBtn.checked) {
      formatShadow(btn);
      box.style.boxShadow = shadow;
    }
  });
});

removeShadowBtn.addEventListener("click", () => {
  box.style.boxShadow = "none";
});

shadowBlurRange.addEventListener("change", () => {
  shadowBlur = shadowBlurRange.value.toString() + "px";
  shadowBtns.forEach((btn) => {
    if (btn.checked) {
      formatShadow(btn);
      box.style.boxShadow = shadow;
    }
  });
});

shadowSpreadRange.addEventListener("change", () => {
  shadowSpread = shadowSpreadRange.value.toString() + "px";
  shadowBtns.forEach((btn) => {
    if (btn.checked) {
      formatShadow(btn);
      box.style.boxShadow = shadow;
    }
  });
});

[backgroundBtn, backBackgroundBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn == backgroundBtn) {
      backgroundSlider.style.left = "0";
      removeBackgroundBtn.classList.remove("active-border");
    } else {
      backgroundSlider.style.left = "600px";
    }
  });
});

const updateBackgroundSlider = () => {
  switch (backgroundType.value) {
    case "solid":
      backgroundContainer.innerHTML = solidColors;
      palettesColors = document.querySelectorAll(".colorp");
      solidColorPicker = Pickr.create({
        el: "#solid-picker",
        theme: "classic",
        comparison: false,
        default: "#000",
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
      solidColorPicker.on("change", (color) => {
        updateBackgroundStyle(color.toRGBA().toString(0));
      });
      break;
    case "gradient":
      backgroundContainer.innerHTML = gardientColors;
      firstColorGradient = document.getElementById("firstColorGradient");
      secondColorGradient = document.getElementById("secondColorGradient");
      directionRange = document.querySelector(".directionRanger");
      gradientColor1Picker = Pickr.create({
        el: "#gradientColor1Picker",
        theme: "classic",
        comparison: false,
        default: `${gradientLeft || "#000"}`,
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
      gradientColor1Picker.on("change", (color) => {
        updateGradient(color.toRGBA().toString(0));
      });
      gradientColor2Picker = Pickr.create({
        el: "#gradientColor2Picker",
        theme: "classic",
        comparison: false,
        default: `${gradientRight || "#000"}`,
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
      gradientColor2Picker.on("change", (color) => {
        updateGradient(color.toRGBA().toString(0), false);
      });
      break;
    case "url":
      backgroundContainer.innerHTML = urlColors;
      backgroundUrlInput = document.getElementById("backgroundURL");
      backgroundImageSize = document.getElementById("backgroundImageSize");
      backgroundImagePosition = document.getElementById(
        "backgroundImagePosition",
      );
      backgroundImageRepeat = document.getElementById("backgroundImageRepeat");
      backgroundImageSettings.position = backgroundImagePosition.value;
      backgroundImageSettings.size = backgroundImageSize.value;
      backgroundImageSettings.repeat = backgroundImageRepeat.checked
        ? "repeat"
        : "no-repeat";
      break;
    default:
      backgroundContainer.innerHTML = solidColors;
      break;
  }
};

const updateBackgroundStyle = (bg) => {
  background = bg;
  box.style.background = background;
};

backgroundType.addEventListener("change", () => {
  updateBackgroundSlider();
  updateBackground();
});

removeBackgroundBtn.addEventListener("click", () => {
  updateBackgroundStyle(null);
  if (!removeBackgroundBtn.classList.contains("active-border")) {
    removeBackgroundBtn.classList.toggle("active-border");
  }
});

const updateBackground = async () => {
  await updateBackgroundSlider();
  palettesColors?.forEach((pallette) => {
    pallette.addEventListener("click", () => {
      background = window
        .getComputedStyle(pallette)
        .getPropertyValue("background");
      updateBackgroundStyle(background);
    });
  });

  directionRange?.addEventListener("input", () => {
    gradientDirection = directionRange.value;
    updateBackgroundStyle(
      `linear-gradient(${gradientDirection}deg,${gradientLeft}, ${gradientRight})`,
    );
  });
  backgroundUrlInput?.addEventListener("input", () => {
    backgroundImageUrl = backgroundUrlInput.value;
  });
  document.getElementById("loadUrl")?.addEventListener("click", (e) => {
    e.preventDefault();
    updateBackgroundStyle(`url("${backgroundImageUrl.toString()}")`);
  });
  backgroundImageSize?.addEventListener("change", () => {
    backgroundImageSettings.size = backgroundImageSize.value;
    box.style.backgroundSize = backgroundImageSettings.size;
  });
  backgroundImagePosition?.addEventListener("change", () => {
    backgroundImageSettings.position = backgroundImagePosition.value;
    box.style.backgroundPosition = backgroundImageSettings.position;
  });
  backgroundImageRepeat?.addEventListener("click", () => {
    backgroundImageSettings.repeat = backgroundImageRepeat.checked
      ? "repeat"
      : "no-repeat";
    box.style.backgroundRepeat = backgroundImageSettings.repeat;
  });
};

const updateGradient = (color, left = true) => {
  left ? (gradientLeft = color) : (gradientRight = color);
  updateBackgroundStyle(
    `linear-gradient(${
      gradientDirection || 0
    }deg,${gradientLeft}, ${gradientRight})`,
  );
};

window.onload = init();
