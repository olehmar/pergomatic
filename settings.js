"use strict";

import { changeURL, initStateFromUrl } from "./customFunctions/paramsURL";

export const BACKGROUND_COLOR = 0xffffff;
export const ENVIRONMENT_MAP = "public/environment/neutral_2.hdr";
export const ENVIRONMENT_MAP_INTENSITY = 1.0;
export const SHADOW_TRANSPARENCY = 0.2;
export const TONE_MAPPING_EXPOSURE = 1;

export const settingsLouver = {
  countLouver: 0,
  width: 0,
  correction: 0,
  morphValueOrigin: 0,
};

export const log = false;
export let pdfImg = { img: "" };

//#region URL AND STATE
let isBatchUpdating = false;
const delay = 100;

function triggerCallback() {
  if (isBatchUpdating) {
    return;
  }

  isBatchUpdating = true;

  setTimeout(() => {
    changeURL();
    isBatchUpdating = false;
  }, delay);
}

function createNestedProxy(target) {
  return new Proxy(target, {
    set(target, key, value) {
      target[key] = value;

      triggerCallback();

      return true;
    },

    get(target, key) {
      const value = target[key];
      if (typeof value === "object" && value !== null) {
        if (value instanceof Set) {
          return createSetProxy(value); // STATE PARAM === SET
        } else if (Array.isArray(value)) {
          return createArrayProxy(value); // STATE PARAM === ARRAY
        } else {
          return createNestedProxy(value); // STATE PARAM === ...
        }
      }
      return value;
    },
  });
}

function createSetProxy(set) {
  //DESCRIPTION OWN METHOD FOR PROXY COVER
  return new Proxy(set, {
    get(target, prop) {
      if (prop === "add") {
        return (value) => {
          target.add(value);
          triggerCallback();
          return target;
        };
      }

      if (prop === "delete") {
        return (value) => {
          const result = target.delete(value);
          triggerCallback();
          return result;
        };
      }

      if (prop === "clear") {
        return () => {
          target.clear();
          triggerCallback();
        };
      }

      if (prop === "has") {
        return (value) => {
          const result = target.has(value);
          triggerCallback();
          return result;
        };
      }

      if (prop === "forEach") {
        return (...args) => {
          target.forEach(...args);
          triggerCallback();
        };
      }

      if (prop === "from") {
        return (iterable) => {
          const newSet = Set.from(iterable);
          triggerCallback();
          return newSet;
        };
      }

      if (prop === "values") {
        return () => {
          const result = Set.prototype.values.call(target);
          triggerCallback();
          return result;
        };
      }

      return target[prop];
    },

    set(target, prop, value) {
      target[prop] = value;
      triggerCallback();
      return true;
    },
  });
}

function createArrayProxy(array) {
  return new Proxy(array, {
    set(target, key, value) {
      target[key] = value;

      triggerCallback();

      return true;
    },
    get(target, key) {
      if (
        key === "push" ||
        key === "pop" ||
        key === "shift" ||
        key === "unshift" ||
        key === "splice" ||
        key === "filter"
      ) {
        return (...args) => {
          const result = Array.prototype[key].apply(target, args);
          triggerCallback();
          return result;
        };
      }
      return target[key];
    },
  });
}

export const stateForProxy = {
  model: true,
  currentRotationZ: 45,
  isRotated: false,
  height: 9,
  length: 10,
  width: 10,
  initValuePostSize: `6" x 6"`,
  backWall: false,
  leftWall: false,
  rightWall: false,
  colorRoof: "Textured Black",
  colorBody: "Textured Black",
  electro: new Set(),
  dayMode: true,
  recessedLighting: 2,
  typeLiteShadeRoof: "Screens",
  currentSubSystem: [],
  fanAvatarHeight: 0.4,
  fanAvatarWidth: 0.8,
  portalOption: null,
  roofScreenColor: "Black",
  subSystem: new Set(),
  patternScreen: "Rain",
  patternScreenRoof: "Dash",
  colorScreen: "Black",
  preMaterial: null,
  defaultShadesMorph: 45,
  offsetForShade: 0,
  midPointForScreenZ: 0,
  midPointForScreenX: 0,
  xTalScreen: 0.5,
  zTalScreen: 0.5,
  currentActiveSpans: [],
  imgForPdf: null,
};

export const state = new Proxy(stateForProxy, {
  get(target, key) {
    const value = target[key];
    if (typeof value === "object" && value !== null) {
      if (value instanceof Set) {
        return createSetProxy(value); // COVER FOR SET
      } else if (Array.isArray(value)) {
        return createArrayProxy(value); // COVER FOR ARRAY
      } else {
        return createNestedProxy(value); // COVER FOR ANOTHER ...
      }
    }
    return value;
  },

  set(target, key, value) {
    target[key] = value;

    triggerCallback();

    return true;
  },
});

state.model = !state.model;

await initStateFromUrl();
//#endregion

export const MODEL_PATHS = ["public/models/hide_away_01.glb"];

export const MODEL_CENTER_POSITION = -1;

export const DATA_CONCTRUCTION = {
  widthToPillar: 44, // inch
  depthToPillar: 24, // inch
  roofGlassWidthMin: 100 / 2.54, // inch
  roofGlassWidthMax: 150 / 2.54, // inch
};

export const MORPH_DATA = {
  width: {
    min: 6,
    initValue: state.width,
    max: 40,
  },
  length: {
    min: 6,
    initValue: state.length,
    max: 40,
  },
  height: {
    min: 8,
    initValue: state.height,
    max: 12,
  },
};

export const MORPH_DATA_SI = {
  width: {
    min: 1,
    max: 6.4,
  },
  length: {
    min: 1,
    max: 8.5,
  },
  height: {
    min: 2.65,
    max: 4.57,
  },
  frameWidth: {
    min: 1.73,
    max: 9.96,
  },
  frameLength: {
    min: 1.73,
    max: 4.37,
  },
  louverLength: {
    min: 1.67,
    max: 4.26,
  },
};

export const WALL_OFFSETS = {
  height_8: {
    sideWallOffsetY: 0,
    backWallOffsetY: 0,
  },
  height_9: {
    sideWallOffsetY: 0.0217,
    backWallOffsetY: 0.4015,
  },
  height_10: {
    sideWallOffsetY: 0.045,
    backWallOffsetY: 0.4965,
  },
  height_11: {
    sideWallOffsetY: 0.067,
    backWallOffsetY: 0.513,
  },
  height_12: {
    sideWallOffsetY: 0.09,
    backWallOffsetY: 0.5315,
  },
  height_13: {
    sideWallOffsetY: 0.035,
    backWallOffsetY: 0.5485,
  },
  height_14: {
    sideWallOffsetY: 0.0575,
    backWallOffsetY: 0.566,
  },
  height_15: {
    sideWallOffsetY: 0.0035,
    backWallOffsetY: 0.2,
  },
};
