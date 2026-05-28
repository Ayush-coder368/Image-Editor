const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 10,
        unit: "px",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    }
};
const filter_container = document.querySelector(".filters");
const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("image-input");
const CanvasCtx = imageCanvas.getContext("2d");
let file = null;
let image = null;
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");
const presetSelect = document.querySelector(".presets");
function createFilterElement(name, unit = "%", value, min, max) { 
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.textContent = name;

    div.appendChild(p);
    div.appendChild(input);
    input.addEventListener("input", (e) => {
        filters[name].value = input.value;
        applyFilters();
    }); 
    return div;
}

Object.keys(filters).forEach(filter => {
    const { value, min, max, unit } = filters[filter];
    const filterElement = createFilterElement(filter, unit, value, min, max);
    filter_container.appendChild(filterElement);
});
imageInput.addEventListener("change", (e) => {
    imageCanvas.style.display = "initial";
    file = e.target.files[0];
    const placeholder = document.querySelector(".placeholder");
    placeholder.style.display = "none";
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        CanvasCtx.drawImage(img, 0, 0);
    }
});
function applyFilters() {
    CanvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    CanvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    `;
    CanvasCtx.drawImage(image, 0, 0);
}function applyFilters() {
    CanvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    CanvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    `;
    CanvasCtx.drawImage(image, 0, 0);
}
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});
resetBtn.addEventListener("click", () => {
    Object.keys(filters).forEach(filter => {
        const input = document.getElementById(filter);
        filters[filter].value =
            filter === "brightness" ||
            filter === "contrast" ||
            filter === "saturation" ||
            filter === "opacity"
                ? 100
                : 0;

        input.value = filters[filter].value;
    });

    applyFilters();
});

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
    },

    vintage: {
        brightness: 110,
        contrast: 120,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        sepia: 40,
        grayscale: 10,
        invert: 0,
        opacity: 100,
    },

    noir: {
        brightness: 100,
        contrast: 140,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        sepia: 0,
        grayscale: 100,
        invert: 0,
        opacity: 100,
    },

    cool: {
        brightness: 105,
        contrast: 110,
        saturation: 120,
        hueRotation: 180,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 130,
        hueRotation: 330,
        blur: 0,
        sepia: 20,
        grayscale: 0,
        invert: 0,
        opacity: 100,
    },

    dreamy: {
        brightness: 120,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 2,
        sepia: 10,
        grayscale: 0,
        invert: 0,
        opacity: 90,
    },

    dramatic: {
        brightness: 90,
        contrast: 160,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
    },

    cyberpunk: {
        brightness: 110,
        contrast: 150,
        saturation: 180,
        hueRotation: 270,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
    },

    faded: {
        brightness: 115,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        sepia: 15,
        grayscale: 20,
        invert: 0,
        opacity: 100,
    },

    inverted: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 100,
        opacity: 100,
    }
};

Object.keys(presets).forEach(presetName => {
    const presetBtn = document.createElement("button");
    presetBtn.classList.add("btn");
    presetBtn.textContent = presetName;
    presetSelect.appendChild(presetBtn);
    presetBtn.addEventListener("click", () => {
        const preset = presets[presetName];
        Object.keys(preset).forEach(filterName => {
            const input = document.getElementById(filterName);
            filters[filterName].value = preset[filterName];
            input.value = filters[filterName].value;
        });
        applyFilters();
    });
});