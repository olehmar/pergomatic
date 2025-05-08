/* eslint-disable no-global-assign */
// eslint-disable-next-line no-unused-vars
/* global delegate_viewerReady, delegate_textureChanged, delegate_beforeChange, delegate_afterChange, delegate_optionsAllowed, delegate_endChanges, delegate_renderAfter */
/* global setIsLoaderActive, SetBlockTexturePath, beforeFilterAction, afterFilterAction */
/* global THREE, jQuery, scene, camera, renderer, canvas, theModel, floor, controls, dirLight, cameraSize, UpdateSceneEnvironmentMapURL, pointLight, pointLight2 */
/* global pdfMake */

//#region Hello

//Script version v1.1.1 [beta]
//Created by Marevo (Pavlo Voronin, based on Oleksandr's Trofymchuk script)
//Welcome to our custom script!
//REMEMBER:
//Theft is wrong not because some ancient text says, 'Thou shalt not steal.' It's always bad, robber :)
/*                                                                                                

          _____                    _____                    _____                    _____                    _____                   _______         
         /\    \                  /\    \                  /\    \                  /\    \                  /\    \                 /::\    \        
        /::\____\                /::\    \                /::\    \                /::\    \                /::\____\               /::::\    \       
       /::::|   |               /::::\    \              /::::\    \              /::::\    \              /:::/    /              /::::::\    \      
      /:::::|   |              /::::::\    \            /::::::\    \            /::::::\    \            /:::/    /              /::::::::\    \     
     /::::::|   |             /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \          /:::/    /              /:::/~~\:::\    \    
    /:::/|::|   |            /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \        /:::/____/              /:::/    \:::\    \   
   /:::/ |::|   |           /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \       |::|    |              /:::/    / \:::\    \  
  /:::/  |::|___|______    /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \      |::|    |     _____   /:::/____/   \:::\____\ 
 /:::/   |::::::::\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \     |::|    |    /\    \ |:::|    |     |:::|    |
/:::/    |:::::::::\____\/:::/  \:::\   \:::\____\/:::/  \:::\   \:::|    |/:::/__\:::\   \:::\____\    |::|    |   /::\____\|:::|____|     |:::|    |
\::/    / ~~~~~/:::/    /\::/    \:::\  /:::/    /\::/   |::::\  /:::|____|\:::\   \:::\   \::/    /    |::|    |  /:::/    / \:::\    \   /:::/    / 
 \/____/      /:::/    /  \/____/ \:::\/:::/    /  \/____|:::::\/:::/    /  \:::\   \:::\   \/____/     |::|    | /:::/    /   \:::\    \ /:::/    /  
             /:::/    /            \::::::/    /         |:::::::::/    /    \:::\   \:::\    \         |::|____|/:::/    /     \:::\    /:::/    /   
            /:::/    /              \::::/    /          |::|\::::/    /      \:::\   \:::\____\        |:::::::::::/    /       \:::\__/:::/    /    
           /:::/    /               /:::/    /           |::| \::/____/        \:::\   \::/    /        \::::::::::/____/         \::::::::/    /     
          /:::/    /               /:::/    /            |::|  ~|               \:::\   \/____/          ~~~~~~~~~~                \::::::/    /      
         /:::/    /               /:::/    /             |::|   |                \:::\    \                                         \::::/    /       
        /:::/    /               /:::/    /              \::|   |                 \:::\____\                                         \::/____/        
        \::/    /                \::/    /                \:|   |                  \::/    /                                          ~~              
         \/____/                  \/____/                  \|___|                   \/____/                                                           
                                                                                                                                                      
*/
//- Calling the "viewerReady" event (all elements are prepared for interaction with the custom script)
//- Entry point in the viewerReadyDelegate();
//------------------------------------------------------

// FAST FUNCTIONS (HELP FOR DEVELOPERS)

// jQuery(document).ready(function ($) { });
// document.addEventListener('click', function(){ });
// theModel.traverse((o) => { });

//------------------------------------------------------

//#endregion

//#region PUBLIC VALUES

// import $ from 'jquery';

var rgbColors = {};
var sky;
var typePergolaText = {
  0: "Louvera",
  1: "Louvera Skye",
  2: "Louvera Glass",
  3: "Pergoflat",
  4: "Glassroom",
};

let testVar = null;
let testVarX = 0;
let testVarY = 0;
let testVarZ = 0;
let testVarW = 0;
let testVarD = 0;
let testCubes = [];
let TEST_MODE = false;
let TEST_3D_MODE = false;

let offsetYforAR = 0;

// PDF
let threejs_font_helvetiker_regular = null;

const pdf_logo_url =
  "https://pergomatic.com/wp-content/uploads/2025/02/pdf_logo.png";
const pdf_icon_web_url =
  "https://pergomatic.com/wp-content/uploads/2025/02/www.png";
const pdf_icon_phone_url =
  "https://pergomatic.com/wp-content/uploads/2025/02/call.png";
const pdf_icon_email_url =
  "https://pergomatic.com/wp-content/uploads/2025/02/mail.png";

const pdfmake_customfont =
  "https://pipergola.com/wp-content/uploads/2024/12/vfs_fonts.js";

let productTitle = "";

let modelViewer;
let qrcode;
let loaded = false;
let paramsLoaded = false;
const parametersKey = "config";
let subsystemsStringFromURL = "";
let qrScaned = 0;
let pdfImg = "";
let pdfImgTop = "";

let blockURLWriter = true;
let delayForWriteURL = false;
let isArActive = false;

// SHADER & MORPHS
let isWorldposVertexShaderEnabled = true;
let morphs = [];
let globalMorphs = [];
let blockTexture = [];

let pergola;
let sceneTime = "Day";

// var formElement;

//! SOURCES URLs
const hotspots = [];
const labelObjects = {
  addObject: {
    url: "https://pergomatic.com/wp-content/uploads/2025/02/hotspot.svg",
    obj: null,
  },
  addObjectHover: {
    url: "https://pergomatic.com/wp-content/uploads/2025/02/hotspot-hover.svg",
    obj: null,
  },
  plusSideBack: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideBack.svg",
    obj: null,
  },
  plusSideBackHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideBackHover.svg",
    obj: null,
  },
  plusSideLeft: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideLeft.svg",
    obj: null,
  },
  plusSideLeftHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideLeftHover.svg",
    obj: null,
  },
  plusSideRight: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideRight.svg",
    obj: null,
  },
  plusSideRightHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideRightHover.svg",
    obj: null,
  },
  subsysSettings: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/SubsysSettings.svg",
    obj: null,
  },
  subsysSettingsHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/SubsysSettingsHover.svg",
    obj: null,
  },
};

//! UI CONSTANTS
//* CORRECT THE VALUES FOR YOUR CURRENT PROJECT
const footerMenu_group = "group-10";
const rangeWidth_group = "group-3";
const rangeDepth_group = "group-4";
const rangeHeight_group = "group-5";
const wall_group = "group-1";
const type_group = "group-0";
const color_group = "group-6";
const framColor_group = "group-7";
const roofColor_group = "group-8";
const options_group = "group-9";
const systems_shade = "group-11";
const bladePop = "bladeR";
const rgbGroup = "group-12";
const shadeGroup = "group-13";
const slideGroup = "group-14";
const gulGroup = "group-15";
const glassRoomColorsGroup = "group-16";

function getGroupedElements() {
  const groups = {
    footerMenu: jQuery("#" + footerMenu_group),
    frameColor: jQuery("#" + framColor_group),
    roofColor: jQuery("#" + roofColor_group),
    wall: jQuery("#" + wall_group),
    rangeWidth: jQuery("#" + rangeWidth_group),
    rangeDepth: jQuery("#" + rangeDepth_group),
    rangeHeight: jQuery("#" + rangeHeight_group),
    type: jQuery("#" + type_group),
    color: jQuery("#" + color_group),
    options: jQuery("#" + options_group),
    subSystems: jQuery("#" + systems_shade),
    popUpBlade: jQuery("#" + bladePop),
    rgbPop: jQuery("#" + rgbGroup),
    shadePop: jQuery("#" + shadeGroup),
    slidePop: jQuery("#" + slideGroup),
    gulPop: jQuery("#" + gulGroup),
    glassRoomColors: jQuery("#" + glassRoomColorsGroup),
  };

  return {
    elements: groups,
    hideAll: function () {
      jQuery.each(groups, function (_, el) {
        el.hide();
      });
    },
    showAll: function () {
      jQuery.each(groups, function (_, el) {
        el.show();
      });
    },
    hide: function (name) {
      if (groups[name]) groups[name].hide();
    },
    show: function (name) {
      if (groups[name]) groups[name].show();
    },
    get: function (name) {
      return groups[name] || null;
    },
  };
}

const iconManager = {
  icons: {
    rgb: jQuery("#rgbIcon"),
  },

  enableAll() {
    Object.values(this.icons).forEach((icon) => icon.show());
  },

  disableAll() {
    Object.values(this.icons).forEach((icon) => icon.hide());
  },

  enableOne(target) {
    if (target && this.icons[target]) {
      this.icons[target].show();
    }
  },

  disableOne(target) {
    if (target && this.icons[target]) {
      this.icons[target].hide();
    }
  },

  getIcon(target) {
    if (target && this.icons[target]) {
      return this.icons[target];
    }
    return null;
  },
};

const uiGroups = getGroupedElements();
uiGroups.hideAll();

const subSystems_options = {
  // BifoldDoor: {
  //   option: "option_4-0",
  //   group: "group-8",
  //   limitHeightInch: 110,
  //   limitWidthInch: null,
  //   elementMaxWidthMM: 900,
  //   overlapMM: null, // mm
  //   shapekeys_straight: {
  //     frame: {
  //       height: {
  //         key: "height_bifold_doors",
  //         min: 1520,
  //         max: 2790,
  //       },
  //       width: {
  //         key: "length_bifold_doors",
  //         min: 1880,
  //         max: 4270,
  //       },
  //     },
  //     element: {
  //       height: {
  //         key: "height_bifold_doors_door",
  //         min: 1420,
  //         max: 2690,
  //       },
  //       width: {
  //         key: "length_bifold_doors_door",
  //         min: 593,
  //         max: 1060,
  //       },
  //       thickness: 0.0241,
  //     },
  //   },
  //   shapekeys_perpendicular: {
  //     frame: {
  //       height: {
  //         key: "height_bifold_doors_side",
  //         min: 1520,
  //         max: 2790,
  //       },
  //       depth: {
  //         key: "length_bifold_doors_side",
  //         min: 2290,
  //         max: 9090,
  //       },
  //     },
  //     element: {
  //       height: {
  //         key: "height_bifold_doors_door_side",
  //         min: 1420,
  //         max: 2690,
  //       },
  //       width: {
  //         key: "length_bifold_doors_door_side",
  //         min: 593,
  //         max: 1060,
  //       },
  //       thickness: 0.0241,
  //     },
  //   },
  // },
  GuilotineGlass: {
    option: "option_11-2",
    group: "group-11",
    limitHeightInch: null,
    limitWidthInch: 168,
    elementMaxWidthMM: null,
    overlapMM: 50, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_Guillotine",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "length_Guillotine",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win",
          min: 1780,
          max: 4170,
        },
        thickness: 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_Guillotine_side",
          min: 1520,
          max: 3480,
        },
        depth: {
          key: "length_Guillotine_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win_side",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win_side",
          min: 2190,
          max: 8990,
        },
        thickness: 0.0241,
      },
    },
  },
  GuilotineGlassSmall: {
    option: "option_11-2",
    group: "group-11",
    limitHeightInch: null,
    limitWidthInch: 168,
    elementMaxWidthMM: null,
    overlapMM: 50, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_Guillotine",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "length_Guillotine",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win",
          min: 1780,
          max: 4170,
        },
        thickness: 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_Guillotine_side",
          min: 1520,
          max: 3480,
        },
        depth: {
          key: "length_Guillotine_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win_side",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win_side",
          min: 2190,
          max: 8990,
        },
        thickness: 0.0241,
      },
    },
  },
  SlidingGlassDoor: {
    option: "option_11-1",
    group: "group-11",
    limitHeightInch: 120,
    limitWidthInch: null,
    elementMaxWidthMM: 900,
    overlapMM: 16, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_sliding_glass",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "length_sliding_glass",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        height: {
          key: "height_sliding_glass_win",
          min: 1420,
          max: 3560,
        },
        width: {
          key: "length_sliding_glass_win",
          min: 593,
          max: 1060,
        },
        thickness: 0.02, // 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_sliding_glass_side",
          min: 1520,
          max: 3480,
        },
        depth: {
          key: "length_sliding_glass_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        height: {
          key: "height_sliding_glass_win_side",
          min: 1420,
          max: 3380,
        },
        width: {
          key: "length_sliding_glass_win_side",
          min: 593,
          max: 1060,
        },
        thickness: 0.02, // 0.0241,
      },
    },
  },
  // LiftSlideDoor: {
  //   option: "option_4-3",
  //   group: "group-11",
  //   limitHeightInch: 120,
  //   limitWidthInch: null,
  //   elementMaxWidthMM: 950,
  //   overlapMM: 70, // mm
  //   shapekeys_straight: {
  //     frame: {
  //       height: {
  //         key: "height_sliding_doors",
  //         min: 1520,
  //         max: 2790,
  //       },
  //       width: {
  //         key: "length_sliding_doors",
  //         min: 1880,
  //         max: 4270,
  //       },
  //     },
  //     element: {
  //       height: {
  //         key: "height_sliding_doors_door",
  //         min: 1420,
  //         max: 2690,
  //       },
  //       width: {
  //         key: "length_sliding_doors_door",
  //         min: 593,
  //         max: 1060,
  //       },
  //       thickness: 0.02, // 0.0241,
  //     },
  //   },
  //   shapekeys_perpendicular: {
  //     frame: {
  //       height: {
  //         key: "height_sliding_doors_side",
  //         min: 1520,
  //         max: 2790,
  //       },
  //       depth: {
  //         key: "length_sliding_doors_side",
  //         min: 2290,
  //         max: 9090,
  //       },
  //     },
  //     element: {
  //       height: {
  //         key: "height_sliding_doors_door_side",
  //         min: 1420,
  //         max: 2690,
  //       },
  //       width: {
  //         key: "length_sliding_doors_door_side",
  //         min: 593,
  //         max: 1060,
  //       },
  //       thickness: 0.02, // 0.0241,
  //     },
  //   },
  // },
  BlindShade: {
    option: "option_11-0",
    group: "group-13",
    limitHeightInch: null,
    limitWidthInch: null,
    elementMaxWidthMM: null,
    overlapMM: null, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_shades",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "length_shades",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        closing: {
          key: "close_shades_pi-pergola",
          min: 1868,
          max: 3394,
        },
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_shades_side",
          min: 1520,
          max: 3660,
        },
        depth: {
          key: "length_shades_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        closing: {
          key: "close_shades_side-pi-pergola",
          min: 1750,
          max: 3394,
        },
      },
    },
  },
  // Window: {
  //   front: {
  //     height: {
  //       key: "height_win_up",
  //       min: 203,
  //       max: 914,
  //     },
  //     width: {
  //       key: "length_win_up",
  //       min: 1880,
  //       max: 4270,
  //     },
  //   },
  //   back: {
  //     height: {
  //       key: "height_win_up_back",
  //       min: 203,
  //       max: 2030,
  //     },
  //     width: {
  //       key: "length_win_up",
  //       min: 1880,
  //       max: 4270,
  //     },
  //   },
  //   leftRight: {
  //     heightDelta: {
  //       key: "height_win_up_side",
  //       min: 0,
  //       max: 910,
  //     },
  //     heightPos: {
  //       //! it used in pergola.changeDimensions();
  //       key: "height_win_up_side.001",
  //       minInch: 60, // Ãƒâ€˜Ã¢â‚¬ ÃƒÂÃ‚Âµ ÃƒÂÃ‚Â²ÃƒÂÃ‚Â¸Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â° ÃƒÂÃ‚Â¿ÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â³ÃƒÂÃ‚Â¾ÃƒÂÃ‚Â»ÃƒÂÃ‚Â¸ Ãƒâ€˜Ã†â€™ Ãƒâ€˜Ã¢â‚¬Å¾Ãƒâ€˜Ã†â€™Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â°Ãƒâ€˜Ã¢â‚¬Â¦
  //       maxInch: 144, // Ãƒâ€˜Ã¢â‚¬ ÃƒÂÃ‚Âµ ÃƒÂÃ‚Â²ÃƒÂÃ‚Â¸Ãƒâ€˜Ã‚ÂÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â° ÃƒÂÃ‚Â¿ÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â³ÃƒÂÃ‚Â¾ÃƒÂÃ‚Â»ÃƒÂÃ‚Â¸ Ãƒâ€˜Ã†â€™ Ãƒâ€˜Ã¢â‚¬Å¾Ãƒâ€˜Ã†â€™Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚Â°Ãƒâ€˜Ã¢â‚¬Â¦
  //     },
  //     width: {
  //       //! it used in pergola.changeDimensions();
  //       key: "length_win_up_side",
  //       min: 2290,
  //       max: 9090,
  //       minInch: 96,
  //       maxInch: 360,
  //     },
  //   },
  // },
  // Led: {
  //   option: "option_4-5",
  //   group: "group-13",
  // },
};

const subSystemMenuGroups = {
  // "group-8": {},
  // "group-19": {},
  "group-15": {},
  "group-14": {},
  "group-12": {},
  "group-13": {},
};

const structureColorTypeStandard_option = "option_6-0";
const structureColorTypeWood_option = "option_6-1";

const colorOptionPrefixes = {
  // structureColorStandard: "option_7-",
  // structureColorWood: "option_14-",
  // canopyColor: "option_15-",
  // subBifoldDoorColor: "option_8-",
  // subGuilotineGlassColor: "option_9-",
  // subSlidingGlassDoorColor: "option_10-",
  // // subLiftSlideDoorColor: "option_11-",
  // // subBlindShadeColor: "option_12-",
  // subLedColor: "option_13-",
};

const sideOptionHeater_option = "option_9-3";
const sideOptionFan_option = "option_9-4";

const dataGroupTypes = {
  Dimensions: 0,
  "Texture & Color": 1,
  "Sub Systems": 2,
  "Side options": 3,
};

const glassColor = "#e3e3e3";
const spanColor = "#95A096";
const spanOpacity = 0.15;
const spanAvatarThickness = 0.1;
//#endregion

//#region ENCODE/DECODE
const NEED_TO_ENCODE = true; //!TODO - set to true before release

String.prototype.SEncode = function () {
  if (this == undefined) {
    return "";
  }
  return NEED_TO_ENCODE ? btoa(unescape(encodeURIComponent(this))) : this;
};

String.prototype.SDecode = function () {
  if (this == undefined) {
    return "";
  }
  return NEED_TO_ENCODE ? decodeURIComponent(escape(atob(this))) : this;
};

//#endregion

//#region DELEGATES

delegate_viewerReady = viewerReadyDelegate();
delegate_textureChanged = textureChangedDelegate();
delegate_beforeChange = beforeChangeDelegate;
delegate_afterChange = afterChangeDelegate;
delegate_optionsAllowed = optionsAllowedDelegate();
delegate_endChanges = endChangesDelegate();

// delegate_renderAfter = delegate_renderAfter();

function viewerReadyDelegate() {
  TEST_MODE && console.log("delegate");
  blockTexture = [];
  SetBlockTexturePath(blockTexture);
  scene.visible = false;
  // if (camera != null) {
  //   camera.position.set(-1.2, 0.551, 0.71); //! START CAMERA POSITION
  // }

  promiseDelayTheModel(750, () => start());
}

function textureChangedDelegate() {
  TEST_MODE && console.log("textureChangedDelegate");
  //You can do something here...
}

function beforeChangeDelegate() {
  TEST_MODE && console.log("beforeChangeDelegate");
  //You can do something here...
}

function afterChangeDelegate() {
  TEST_MODE && console.log("afterChangeDelegate");
  if (paramsLoaded) {
    writeUrlParams();
  }
}

function optionsAllowedDelegate() {
  TEST_MODE && console.log("optionsAllowedDelegate");
  //You can do something here...
}

function endChangesDelegate() {
  TEST_MODE && console.log("endChangesDelegate");
  //You can do something here...
}

// eslint-disable-next-line no-unused-vars
function delegate_renderBefore() {
  TEST_MODE && console.log("delegate_renderBefore");

  camera.updateMatrixWorld();
  hotspots.forEach(({ targetObject }) => {
    if (targetObject) {
      targetObject.updateMatrixWorld();
    }
  });
  updateHotspots(hotspots);
}

// eslint-disable-next-line no-unused-vars
function delegate_renderAfter() {
  //You can do something here..
}

//#endregion

//#region ADDITIONAL FUNCTIONS
function promiseDelayTheModel(time = 2000, callback = () => {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      if (theModel == null) {
        promiseDelayTheModel(time, callback);
      } else {
        callback();
      }
    }, time);
  });
}

function promiseDelay(time = 2000, callback = () => {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      callback();
    }, time);
  });
}

function waitFor(conditionFunction) {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    // eslint-disable-next-line no-unused-vars
    else setTimeout((_) => poll(resolve), 400);
  };

  return new Promise(poll);
}

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/Macintosh/i.test(userAgent)) {
    if (/VisionOS|VisionPro/i.test(userAgent)) {
      return "VisionPro";
    }

    if (navigator.maxTouchPoints === 5) {
      return "VisionPro";
    }

    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
        if (supported) {
          return "VisionPro";
        }
      });
    }

    return "Macintosh";
  }

  if (/Windows/i.test(userAgent) || /Win/i.test(userAgent)) {
    return "Windows";
  }

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  if (/VisionOS|VisionPro/i.test(userAgent)) {
    return "VisionPro";
  }

  return "unknown";
}

//! Interpolation of values
function interpolateValue(inputval, rangeMin, rangeMax, kMin = 0, kMax = 1) {
  return kMin + ((inputval - rangeMin) * (kMax - kMin)) / (rangeMax - rangeMin);
}

function interpolateValueInverse(
  outputVal,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  return (
    srcStart +
    ((outputVal - destStart) * (srcEnd - srcStart)) / (destEnd - destStart)
  );
}

//#endregion

function updateEnvMap(
  path,
  intensity,
  onlyMap = false,
  updateSceneBackground = false
) {
  if (path == null) {
    return;
  }

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const rgbeLoader = new THREE.RGBELoader();

  rgbeLoader.load(path, function (texture) {
    envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    // if (updateSceneBackground) {
    //   scene.background = envMap;
    // }

    /*
    if(IMPORTED_MODELS != null || IMPORTED_MODELS.length > 0){
      for (let index = 0; index < IMPORTED_MODELS.length; index++) {
        const model = IMPORTED_MODELS[index];
        
        model.traverse((o) => {
          if (o.isMesh) {
            if (o.material.envMap) {
              o.material.envMap = onlyMap == true ? null : scene.environment;
              o.material.envMapIntensity = onlyMap == true ? 1 : intensity;
            }
          }
        });
      }
    }
    */
    texture.dispose();
    pmremGenerator.dispose();
  });
}

function setVisibilityBox(status) {
  let element = null;

  theModel.traverse((o) => {
    if (
      o.name === "boxL" ||
      o.name === "boxfront" ||
      o.name === "boxR" ||
      o.name === "boxback"
    ) {
      o.visible = status;
      o.position.y = -0.03;
      o.material.opacity = 0.35;
    } else if (o.name === "boxfloor") {
      o.visible = status;
      o.position.y = -0.03;
    }
  });

  return element;
}

function toggleMeshVisibilityBasedOnCameraPosition(mesh) {
  if (!mesh.geometry.boundingBox) {
    mesh.geometry.computeBoundingBox();
  }

  const boundingBox = mesh.geometry.boundingBox.clone();
  mesh.localToWorld(boundingBox.min);
  mesh.localToWorld(boundingBox.max);

  const cameraPosition = camera.position;

  const isCameraInside =
    cameraPosition.x >= boundingBox.min.x &&
    cameraPosition.x <= boundingBox.max.x &&
    cameraPosition.z >= boundingBox.min.z &&
    cameraPosition.z <= boundingBox.max.z;

  if (isCameraInside) {
    showMesh(mesh);
  } else {
    hideMesh(mesh);
  }
}

function hideMesh(mesh) {
  mesh.material.transparent = true;
  mesh.material.opacity = 0.0;
  mesh.material.visible = false;
}

function showMesh(mesh) {
  mesh.material.visible = true;
  mesh.material.transparent = false;
  mesh.material.opacity = 1.0;
}

//#region 3D FUNCTIONS
function settings3d() {
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 2;
  controls.maxDistance = 20;
  controls.enablePan = true;

  setVisibilityBox(true);

  // controls.addEventListener("change", function () {
  //   toggleMeshVisibilityBasedOnCameraPosition(box);
  // });

  camera.position.set(-4, 0.5, 6); //! START CAMERA POSITION
  theModel.position.y = -1.0;
  // theModel.position.z = 1.5;
  floor.position.y = -1.0;
  // RemoveAllDefaultTextures(theModel);
  // const urlMap =
  //   "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/autumn_field_puresky_4k.exr";
  // const urlMap =
  //   "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/neutral_2.hdr";

  // const urlMap =
  //   "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/neutral_2.hdr";
  // const urlMap =
  //   "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/qwantani_moonrise_4k+(1).exr";

  const urlMap =
    "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/WP+AR+WooCommerce+plugin/src/environment/dry_orchard_meadow_1k.hdr";

  // const urlMap =
  //   "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/autumn_field_puresky_4k.exr"; // top 1

  // const urlMap =
  //   "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/pretoria_gardens_4k.exr"; // top ?

  function tryUpdateSceneEnvironmentMapURL(urlMap, attempts = 0) {
    const maxAttempts = 3;

    try {
      UpdateSceneEnvironmentMapURL(urlMap);
    } catch (error) {
      console.error("Error updating map:", error);

      if (attempts < maxAttempts) {
        tryUpdateSceneEnvironmentMapURL(urlMap, attempts + 1);
      } else {
        console.log("Max attempts reached. Could not update map.");
      }
    }
  }

  // scene.add(pointLight);
  // pointLight.position.x = 8;
  // pointLight.position.z = 10;
  // pointLight.intensity = 0.3;

  tryUpdateSceneEnvironmentMapURL(urlMap);

  // updateEnvMap(urlMap, 1);
  // pointLight.intensity = 0.15;
  // pointLight2.intensity = 0.15;
  // scene.add(pointLight, pointLight2);

  const shadowCameraSize = 8;
  dirLight.shadow.camera.left = -shadowCameraSize;
  dirLight.shadow.camera.right = shadowCameraSize;
  dirLight.shadow.camera.top = shadowCameraSize;
  dirLight.shadow.camera.bottom = -shadowCameraSize;
  dirLight.shadow.bias = -0.00075;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 120;
  dirLight.shadow.radius = 10;
  dirLight.shadow.blurSamples = 20;
  dirLight.intensity = 1;
  dirLight.shadow.camera.updateProjectionMatrix();

  theModel.traverse((o) => {
    if (o.isMesh) {
      o.material.envMapIntensity = 0.5;
    }
  });

  scene.children[0].intensity = 0.1;

  function setMaterialTransparency(materialName) {
    theModel.traverse((o) => {
      if (o.material && o.material.name === materialName) {
        o.material.side = THREE.FrontSide;
        o.material.needsUpdate = true;
      }
    });
  }

  setMaterialTransparency("box");

  const glassMat = getMaterialFromScene("Glass");

  if (glassMat) {
    glassMat.color.set(glassColor);
    glassMat.opacity = 0.1;
    glassMat.needsUpdate = true;

    const loader = new THREE.RGBELoader();

    const urlMapForGlass =
      "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/WP+AR+WooCommerce+plugin/src/environment/dry_orchard_meadow_1k.hdr";

    loader.load(urlMapForGlass, function (hdrEquirect) {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

      glassMat.envMap = hdrEquirect;

      glassMat.needsUpdate = true;

      glassMat.reflectivity = 0.9; // Adjust reflection strength
      // glassMat.roughness = 0.1; // Adjust roughness for more clarity
    });
  }

  // const SKY_COLOR = "#4a5d75";
  // const GROUND_COLOR = "#8394A6";
  const SKY_COLOR = "#6B83A1";
  const GROUND_COLOR = "#A5B0B3";
  const SKY_SIZE = 20;

  function addSkyGradient(scene) {
    const vertexShader = `
        varying vec3 vWorldPosition;
              void main() {
                  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
                  vWorldPosition = worldPosition.xyz;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
              }`;
    const fragmentShader = `
        uniform vec3 topColor;
              uniform vec3 bottomColor;
              varying vec3 vWorldPosition;
              void main() {
                  float h = normalize( vWorldPosition).y;
                  gl_FragColor = vec4(mix(bottomColor, topColor, h), 1);
              }`;
    const uniforms = {
      topColor: { value: new THREE.Color(SKY_COLOR) },
      bottomColor: { value: new THREE.Color(GROUND_COLOR) },
    };
    const skyGeo = new THREE.SphereGeometry(SKY_SIZE, 6, 3);
    const skyMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
    });
    sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
  }

  addSkyGradient(scene);
  sky.opacity = 0.5;

  if (TEST_3D_MODE) {
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    const cubeGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.05);
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.5,
      }),
    ];

    for (let i = 0; i < 9; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterials[i % 3]);
      cube.position.set(0, 0, 0);
      cube.visible = false;
      theModel.add(cube);
      testCubes.push(cube);
    }
  }
}

function setAllModelObjectsVisibility(visible, model = theModel) {
  model.traverse((o) => {
    o.visible = visible;
  });
}

function getMeshDimensions(mesh) {
  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject(mesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  const width = size.x;
  const height = size.y;
  const depth = size.z;
  return { width: width, height: height, depth: depth };
}

function getMaterialFromScene(name) {
  var material = null;
  scene.traverse((o) => {
    if (o.material) {
      if (name == o.material.name) {
        material = o.material;
      }
    }
  });

  return material;
}

function setMaterialColor(materialName, color) {
  const materialObject = getMaterialFromScene(materialName);
  if (materialObject == null) {
    return;
  }
  materialObject.color.set(color);
  materialObject.needsUpdate = true;
}

function ChangeMaterialTilling(materialName, x, y) {
  let materialObject = getMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  if (materialObject.map != null) {
    materialObject.map.repeat.set(x, y);
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.repeat.set(x, y);
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.repeat.set(x, y);
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.repeat.set(x, y);
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.repeat.set(x, y);
  }
}

function ChangeMaterialOffset(materialName, x, y) {
  let materialObject = getMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  if (materialObject.map != null) {
    materialObject.map.offset.set(x, y);
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.offset.set(x, y);
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.offset.set(x, y);
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.offset.set(x, y);
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.offset.set(x, y);
  }
}

function RotateMaterialTexture(materialName, angle = Math.PI / 2) {
  let materialObject = getMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  let rotationAngle = angle;

  if (materialObject.map != null) {
    materialObject.map.rotation = rotationAngle;
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.rotation = rotationAngle;
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.rotation = rotationAngle;
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.rotation = rotationAngle;
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.rotation = rotationAngle;
  }
}

function mirrorObject(object, value = true) {
  if (object) object.scale.x = value ? -1 : 1;
}

function removeAllDefaultTextures(targetObject) {
  if (targetObject == null) {
    return;
  }

  targetObject.traverse((o) => {
    if (o.isMesh) {
      if (o.material.normalMap) {
        o.material.normalMap = null;
      }
      if (o.material.roughnessMap) {
        o.material.roughnessMap = null;
        o.material.roughness = 0.3;
      }
      if (o.material.metalnessMap) {
        o.material.metalnessMap = null;
        o.material.metalness = 0.05;
      }
      if (o.material.aoMap) {
        o.material.aoMap = null;
      }
      o.material.needsUpdate = true;
    }
  });
}

function getObjectByNameInParent(object, name) {
  let foundObject = null;
  object.traverse((o) => {
    if (o.name == name) {
      foundObject = o;
    }
  });
  return foundObject;
}

//#endregion

//#region SHADER and MORPHS
function shader_ChangeVertexToWorldpos_bak(object) {
  // old version
  promiseDelayShaderSettings(500, object, () => {
    if (object.isMesh) {
      if (isWorldposVertexShaderEnabled) {
        if (object.material) {
          if (object.material.name.includes("_Z")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  "vec4 worldPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nworldPosition = instanceMatrix * worldPosition;\n#endif\nworldPosition = modelMatrix * worldPosition;\nvUv = (uvTransform * vec3(worldPosition.xz, 1)).xy;"
                );
            };
          } else if (object.material.name.includes("_Y")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  "vec4 worldPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nworldPosition = instanceMatrix * worldPosition;\n#endif\nworldPosition = modelMatrix * worldPosition;\nvUv = (uvTransform * vec3(worldPosition.xy, 1)).xy;"
                );
            };
          } else if (object.material.name.includes("_X")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  "vec4 worldPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nworldPosition = instanceMatrix * worldPosition;\n#endif\nworldPosition = modelMatrix * worldPosition;\nvUv = (uvTransform * vec3(worldPosition.yz, 1)).xy;"
                );
            };
          }
          object.material.needsUpdate = true;
        }
      }
    }
  });
}

function Shader_ChangeVertexToWorldpos(object) {
  var vUvSymbol = "vUv";
  var vUvSymbolNormal = "vUv";
  var uvTransformSymbol = "uvTransform";

  if (THREE.REVISION >= 150) {
    vUvSymbol = "vMapUv";
    vUvSymbolNormal = "vNormalMapUv";
    uvTransformSymbol = "mapTransform";
  }

  promiseDelayShaderSettings(500, object, () => {
    if (object.isMesh) {
      if (isWorldposVertexShaderEnabled) {
        if (object.material) {
          if (object.material.name.includes("_Z")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;
                  `
                );
            };
          } else if (object.material.name.includes("_Y")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;
                  `
                );
            };
          } else if (object.material.name.includes("_X")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;

                    // ÃƒÂÃ…Â¸ÃƒÂÃ‚Â¾ÃƒÂÃ‚Â²ÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â‚¬Å¡ Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â¸ ÃƒÂÃ‚Â½ÃƒÂÃ‚Â° 90 ÃƒÂÃ‚Â³Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â°ÃƒÂÃ‚Â´Ãƒâ€˜Ã†â€™Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚Â²
                    mat2 rotation = mat2(0.0, 1.0, -1.0, 0.0);
                    vec2 rotatedUV = rotation * vec2(worldPosition.y, worldPosition.z);
    
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(rotatedUV, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(rotatedUV, 1)).xy;
                  `
                );
            };
          }
          object.material.needsUpdate = true;
        }
      }
    }
  });
}

function promiseDelayShaderSettings(time, object, callback) {
  if (time == null) {
    time = 2000;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      if (object.material.map == null) {
        promiseDelayShaderSettings(time, object, callback);
      } else {
        if (callback != null) {
          callback();
        }
      }
    }, time);
  });
}

async function initMorphModel(model) {
  var BufferGeometryUtils_script = document.createElement("script");
  var FontLoader_script = document.createElement("script");
  var TextGeometry_script = document.createElement("script");

  FontLoader_script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/three@0.146.0/examples/js/loaders/FontLoader.js"
  );

  TextGeometry_script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/three@0.146.0/examples/js/geometries/TextGeometry.js"
  );

  BufferGeometryUtils_script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/three@0.147/examples/js/utils/BufferGeometryUtils.js"
  );

  document.body.appendChild(BufferGeometryUtils_script);
  document.body.appendChild(FontLoader_script);
  document.body.appendChild(TextGeometry_script);

  parseMorphByModel(model);
}

function parseMorphByModel(model, callback = null) {
  morphs = [];
  model.traverse((object) => {
    if (object.isMesh) {
      Shader_ChangeVertexToWorldpos(object);

      if (object.morphTargetDictionary != null) {
        for (const [key, value] of Object.entries(
          object.morphTargetDictionary
        )) {
          var morph = {
            name: key,
            object: object,
            key: value,
            value: value,
          };

          if (!morphs.includes(morph)) {
            morphs.push(morph);
          }
        }
      }
    }
  });

  PrepareGlobalMorphs(callback);
}

function PrepareGlobalMorphs(callback = null) {
  globalMorphs = [];

  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];

    var hasMorph = false;

    for (let m = 0; m < globalMorphs.length; m++) {
      const globalMorph = globalMorphs[m];
      if (globalMorph.name != morph.name) {
        continue;
      }
      hasMorph = true;
      break;
    }

    if (!hasMorph) {
      globalMorphs.push(morph);
    }
  }

  if (callback != null) {
    callback();
  }
}

function ComputeMorphedAttributes() {
  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];
    var computeMorphedAttributes =
      THREE.BufferGeometryUtils.computeMorphedAttributes(morph.object);
    morph.object.geometry.computeMorphedAttributes = computeMorphedAttributes;
  }
}

function ChangeObjectWithMorph(object, key, inputvalue) {
  if (object == null) {
    return;
  }

  if (object.morphTargetInfluences != null) {
    object.morphTargetInfluences[key] = inputvalue;
  }
}

function changeObjectMorph(object, key, inputValue) {
  if (!object) return;

  function processObject(obj) {
    if (obj.isMesh && obj.morphTargetDictionary) {
      const morphIndex = obj.morphTargetDictionary[key];
      if (morphIndex !== undefined && obj.morphTargetInfluences) {
        obj.morphTargetInfluences[morphIndex] = inputValue;
      }
    }

    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((child) => processObject(child));
    }
  }

  processObject(object);
}

function changeGlobalMorph(
  morphName,
  inputvalue,
  objectUuid = null,
  objectName = null
) {
  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];

    if (morph.name != morphName) {
      continue;
    }
    if (morph.object == null) {
      continue;
    }
    if (!morph.object.isMesh) {
      continue;
    }
    if (morph.object.morphTargetInfluences == null) {
      continue;
    }

    if (objectName != null) {
      if (morph.object.name != objectName) {
        continue;
      }
    }
    if (objectUuid != null) {
      if (morph.object.uuid !== objectUuid) {
        continue;
      }
    }

    morph.object.morphTargetInfluences[morph.key] = inputvalue;
  }
}

function convertMorphValue(
  inputval,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  const result =
    destStart +
    ((inputval - srcStart) * (destEnd - destStart)) / (srcEnd - srcStart);
  return result;
}

function convertMorphValueReverse(
  outputVal,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  const result =
    srcStart +
    ((outputVal - destStart) * (srcEnd - srcStart)) / (destEnd - destStart);
  return result;
}

function animateMorph(
  morphName,
  valueStart,
  valueEnd,
  callback = () => {},
  timeInterval = 200,
  steps = 5
) {
  const stepDuration = timeInterval / steps;
  const stepValue = (valueEnd - valueStart) / steps;
  let currentValue = valueStart;
  let completedSteps = 0;

  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      changeGlobalMorph(morphName, currentValue);
      currentValue += stepValue;
      completedSteps++;
      if (completedSteps === steps) {
        changeGlobalMorph(morphName, valueEnd);
        callback();
      }
    }, i * stepDuration);
  }
}

//#endregion

//#region ANIMATION
// ANIMATION OF MODEL - "SCALING"

// ANIMATION OF MODEL - "SCALE" - appearing or disappearing
function animateScale(
  model,
  duration = 500,
  startScale = 0,
  endScale = 1,
  timingKeyword = "ease-in",
  callback = () => springScale(model)
) {
  function timingFunction(progress) {
    switch (timingKeyword) {
      case "ease-in":
        return progress * progress;
      case "ease-out":
        return 1 - Math.pow(1 - progress, 2);
      case "ease-in-out":
        return progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      default:
        return progress;
    }
  }

  let startTime = null;

  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = timingFunction(progress);
    const interpolatedScale =
      startScale + (endScale - startScale) * easedProgress;
    model.scale.set(interpolatedScale, interpolatedScale, interpolatedScale);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      model.scale.set(endScale, endScale, endScale);
      callback();
    }
  }

  requestAnimationFrame(animate);
}

// ANIMATION OF MODEL - "SPRING-SCALE"
function springScale(
  model,
  duration = 500,
  oscillations = 1,
  callback = () => {}
) {
  const startTime = performance.now();
  const startScale = model.scale.x;
  const dampingFactor = 0.1; // attenuation coefficient
  const maxAmplitude = 0.2 * startScale; // maximum oscillation amplitude (20%)

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const angularFrequency = (oscillations * Math.PI * 2) / duration;
    const amplitude =
      maxAmplitude * Math.pow(dampingFactor, elapsed / duration);
    const phase = angularFrequency * elapsed;
    const currentScale = startScale + amplitude * Math.sin(phase);

    model.scale.set(currentScale, currentScale, currentScale);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      model.scale.set(startScale, startScale, startScale);
      callback();
    }
  }

  requestAnimationFrame(animate);
}

// ANIMATION OF PROPERTY
function animateProperty(object, property, targetValue, duration, onUpdate) {
  const startValue = object[property];
  const startTime = performance.now();

  function animate(time) {
    const elapsedTime = time - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    object[property] = startValue + (targetValue - startValue) * progress;

    if (onUpdate) onUpdate();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
//#endregion

//#region AR and QR
const copyToClipboard = function () {
  var aux = document.createElement("input");
  aux.setAttribute("value", jQuery("#info-sharing-input").val());
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};

function prepareAR() {
  jQuery(document).ready(function () {
    const body = jQuery("body");

    modelViewer = jQuery(
      '<model-viewer id="marevo_model" ar ar-modes="webxr scene-viewer quick-look" src="https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/model-viewer-important/scenes/empty_scene.glb" poster="" ar-scale="fixed" loading="eager" alt="Marevo" shadow-intensity="1" shadow-softness="1" environment-image="neutral" stage-light-intensity="1" camera-orbit="-30deg auto auto" max-camera-orbit="auto 100deg auto" camera-controls exposure="0.9" auto-rotate>'
    );
    const arPromt = jQuery('<div id="ar-prompt">');
    const icoImage = jQuery(
      '<img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="ar-prompt">'
    );

    arPromt.append(icoImage);
    modelViewer.append(arPromt);

    body.append(modelViewer);

    modelViewer[0].addEventListener("ar-status", (event) => {
      if (event.detail.status == "session-started") {
        arPromt[0].style.display = "block";

        // if (getMobileOperatingSystem() == 'Android') {
        //   setTimeout(() => {
        //     fixModelPosition();
        //   }, 500);
        // }
      } else if (event.detail.status == "object-placed") {
        arPromt[0].style.display = "none";
        if (getMobileOperatingSystem() == "Android") {
          setTimeout(() => {
            fixScenePosition();
          }, 300);
        }
      } else if (event.detail.status == "not-presenting") {
        arPromt[0].style.display = "none";
        modelViewer[0].resetScene();

        if (getMobileOperatingSystem() == "Android") {
          if (pergola != null) {
            scene.position.y = 0;

            if (pergolaSettings.mountingWall_Back) {
              // pergola.changeMountingWallVisibility(
              //   pergolaSettings.mountingWall_Back,
              //   pergolaConst.side.Back
              // );
            }

            if (pergolaSettings.mountingWall_Left) {
              // pergola.changeMountingWallVisibility(
              //   pergolaSettings.mountingWall_Left,
              //   pergolaConst.side.Left
              // );
            }

            if (pergolaSettings.mountingWall_Right) {
              // pergola.changeMountingWallVisibility(
              //   pergolaSettings.mountingWall_Right,
              //   pergolaConst.side.Right
              // );
            }

            // floor visibility
            scene.children[2].visible = true;
          }
        }
      } else {
        arPromt[0].style.display = "none";
        if (getMobileOperatingSystem() == "Android") {
          setTimeout(() => {
            fixScenePosition();
          }, 300);
        }
      }
    });
  });
}

function fixScenePosition() {
  const bbox = new THREE.Box3().setFromObject(scene);
  const center = bbox.getCenter(new THREE.Vector3());
  console.log("bbox center:", center.y);
  scene.position.y = -center.y;
}

function fixModelPosition() {
  let attempts = 0;
  let lastCenterY = null;
  let changeDetected = false;

  function adjustPosition() {
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = bbox.getCenter(new THREE.Vector3());
    console.log(`Attempt ${attempts}: bbox center.y =`, center.y);

    if (lastCenterY !== null && Math.abs(center.y - lastCenterY) > 0.001) {
      console.log("bbox was changed!");
      changeDetected = true;
    }

    lastCenterY = center.y;
    attempts++;

    if (changeDetected) {
      setTimeout(() => {
        fixScenePosition();
      }, 1500);
      return;
    }

    if (attempts < 20) {
      setTimeout(adjustPosition, 500);
    } else {
      console.warn("limit attempts");
      fixScenePosition();
    }
  }

  adjustPosition();
}

function createQR() {
  const qr = qrcode[0];
  if (qr == null) {
    return;
  }

  while (qr.hasChildNodes()) {
    qr.removeChild(qr.lastChild);
  }

  qrScaned = 1;

  const uri = getURLWithParameters();
  const encoded = encodeURIComponent(uri);
  const qrImg = new Image();
  qrImg.src = "https://quickchart.io/qr?text=" + encoded + "&size=200";
  qrImg.addEventListener("load", () => {
    qr.appendChild(qrImg);
  });
}

async function checkQRMobile() {
  // eslint-disable-next-line no-unused-vars
  await waitFor((_) => loaded === true);
  // eslint-disable-next-line no-unused-vars
  await waitFor((_) => modelViewer != undefined);
  await new Promise((r) => setTimeout(r, 2000));

  if (qrScaned == 1) {
    if (
      getMobileOperatingSystem() == "Android" ||
      getMobileOperatingSystem() == "iOS" ||
      getMobileOperatingSystem() == "VisionPro"
    ) {
      openAR();
    }

    qrScaned = 0;
    writeUrlParams();
  }
}

async function openAR() {
  unFixScroll();
  ComputeMorphedAttributes();

  // Remove wall
  // if (pergola != null) {
  //   if (pergolaSettings.mountingWall_Back) {
  //     pergola.changeMountingWallVisibility(false, pergolaConst.side.Back);
  //   }

  //   if (pergolaSettings.mountingWall_Left) {
  //     pergola.changeMountingWallVisibility(false, pergolaConst.side.Left);
  //   }

  //   if (pergolaSettings.mountingWall_Right) {
  //     pergola.changeMountingWallVisibility(false, pergolaConst.side.Right);
  //   }
  // }

  if (getMobileOperatingSystem() == "Android") {
    // const bbox = new THREE.Box3().setFromObject(scene);
    // const center = bbox.getCenter(new THREE.Vector3());
    // console.log("bbox center:", center.y);
    // offsetYforAR = center.y;
    // // pergola.model.position.y = -3;
    // scene.position.y = -offsetYforAR;
  }

  await importScene(scene);

  if (
    getMobileOperatingSystem() == "iOS" ||
    getMobileOperatingSystem() == "VisionPro"
  ) {
    if (pergola != null) {
      if (pergolaSettings.mountingWall_Back) {
        // pergola.changeMountingWallVisibility(
        //   pergolaSettings.mountingWall_Back,
        //   pergolaConst.side.Back
        // );
      }

      if (pergolaSettings.mountingWall_Left) {
        // pergola.changeMountingWallVisibility(
        //   pergolaSettings.mountingWall_Left,
        //   pergolaConst.side.Left
        // );
      }

      if (pergolaSettings.mountingWall_Right) {
        // pergola.changeMountingWallVisibility(
        //   pergolaSettings.mountingWall_Right,
        //   pergolaConst.side.Right
        // );
      }
    }
  }
}

async function pergolaOpenARorQR() {
  if (
    getMobileOperatingSystem() == "Android" ||
    getMobileOperatingSystem() == "iOS" ||
    getMobileOperatingSystem() == "VisionPro"
  ) {
    const initialSettings = {
      backWall: pergola.settings.backWall,
      rightWall: pergola.settings.rightWall,
      leftWall: pergola.settings.leftWall,
    };

    //DISABLE WALLS
    setVisibilityBox(false);
    pergola.settings.backWall ? jQuery(".option_1-0").trigger("click") : null;
    pergola.settings.rightWall ? jQuery(".option_1-2").trigger("click") : null;
    pergola.settings.leftWall ? jQuery(".option_1-1").trigger("click") : null;
    pergola.update();

    await openAR();

    setTimeout(() => {
      // RETURN WALL
      setVisibilityBox(true);
      if (initialSettings.backWall) {
        jQuery(".option_1-0").trigger("click");
      }
      if (initialSettings.rightWall) {
        jQuery(".option_1-2").trigger("click");
      }
      if (initialSettings.leftWall) {
        jQuery(".option_1-1").trigger("click");
      }
    }, 2000);

    return;
  }

  createQR();

  jQuery(".popup").addClass("arqr active");
  jQuery(".popup-item-qr").addClass("active");
  fixScroll();
}

async function importScene(newScene) {
  await modelViewer[0].importScene(newScene);
  modelViewer[0].activateAR();
}

//#endregion

//#region UI FUNCTIONS
//! ******** UI FUNCTIONS ********
async function prepareUI() {
  var GLTFExporter_script = document.createElement("script");
  GLTFExporter_script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/three@0.146/examples/js/exporters/GLTFExporter.js"
  );
  document.body.appendChild(GLTFExporter_script);

  var meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content =
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

  document.head.appendChild(meta);

  async function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Script load error for ${url}`));
      document.head.appendChild(script);
    });
  }

  async function loadPDFmake() {
    try {
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"
      );
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js');
      await loadScript(pdfmake_customfont);
    } catch (error) {
      console.error(error);
    }
  }

  loadPDFmake();

  // formElement = document.querySelector('.ar_result_container .cart');

  jQuery(document).ready(function () {
    // ****  Main-Menu  *****
    jQuery("#ar_model_viewer").after(`
      <div class="main_menu"></div>
    `);

    const mainMenu = jQuery(".main_menu");
    const iconsContainer = jQuery(`
         <div class="icons-container">
           
         </div>
      `);

    //#region ****  RGB-ICON  *****
    const rgbIcon = jQuery(`
       <div id="rgbIcon" class='rgb_icon'>
         <div class="rgb_icon_img"></div>
       </div>
      `);

    const bladeIcon = jQuery(`
       <div id="btnWall" class='rgb_icon'>
         <div class="rgb_icon_img blade--icon"></div>
       </div>
      `);

    const shadeIcon = jQuery(`
       <div id="shade-sys" class='rgb_icon'>
         <div class="rgb_icon_img shade--icon"></div>
       </div>
      `);

    const slideIcon = jQuery(`
       <div id="slide-sys" class='rgb_icon'>
         <div class="rgb_icon_img slide--icon"></div>
       </div>
      `);

    const gulIcon = jQuery(`
       <div id="gul-sys" class='rgb_icon'>
         <div class="rgb_icon_img gul--icon"></div>
       </div>
      `);

    shadeIcon.hide();
    slideIcon.hide();
    gulIcon.hide();

    rgbIcon.hide();

    function hiddAllPop() {
      uiGroups.hide("rgbPop");
      uiGroups.hide("shadePop");
      uiGroups.hide("slidePop");
      uiGroups.hide("gulPop");
      uiGroups.hide("popUpBlade");
      jQuery("#bladeR").hide();

      rgbIcon.removeClass("active");
      shadeIcon.removeClass("active");
      slideIcon.removeClass("active");
      gulIcon.removeClass("active");
      bladeIcon.removeClass("active");
    }

    rgbIcon.on("click", function () {
      hiddAllPop();
      rgbIcon.show();
      rgbIcon.addClass("active");
      uiGroups.show("rgbPop");
    });

    shadeIcon.on("click", function () {
      pergola.settings.currentSubsystemType =
        pergolaConst.systemType.BlindShade;
      hiddAllPop();

      shadeIcon.show();
      shadeIcon.addClass("active");
      uiGroups.show("shadePop");

      uiGroups.get("shadePop").find(".canvas_menu__item_tumbler").hide();
      uiGroups.get("shadePop").find(".canvas_menu__item_radio").hide();
      uiGroups.get("shadePop").find(".range-container").eq(0).show();

      pergola.showAvailableSpans();
    });

    slideIcon.on("click", function () {
      pergola.settings.currentSubsystemType =
        pergolaConst.systemType.SlidingGlassDoor;
      hiddAllPop();

      slideIcon.show();
      slideIcon.addClass("active");
      uiGroups.show("slidePop");

      jQuery(".canvas_menu__item_tumbler").hide();
      jQuery(".canvas_menu__item_radio").hide();
      jQuery(".canvas_menu__item_radio").hide();
      jQuery(".range-container").eq(0).show();

      pergola.showAvailableSpans();
    });

    gulIcon.on("click", function () {
      pergola.settings.currentSubsystemType =
        pergolaConst.systemType.GuilotineGlass;
      hiddAllPop();

      gulIcon.show();
      gulIcon.addClass("active");
      uiGroups.show("gulPop");

      jQuery(".canvas_menu__item_tumbler").hide();
      jQuery(".canvas_menu__item_radio").hide();
      jQuery(".canvas_menu__item_radio").hide();
      jQuery(".range-container").eq(0).show();

      pergola.showAvailableSpans();
    });

    bladeIcon.on("click", function () {
      hiddAllPop();

      jQuery("#bladeR").show();
      bladeIcon.addClass("active");
    });

    //#endregion

    // ****  Header-Menu  *****
    mainMenu.append(`
      <div class="header_menu">
        <div class="header_menu__group_title"></div>
        <div id="menuReset" data-group_type="" class="header_menu__group_reset" >
          <div class="header_menu__group_reset_icon"></div>
          <div class="header_menu__group_reset_caption">Reset</div>
        </div>
      </div>
    `);

    mainMenu.append(jQuery("#ar_filter"));

    // ****  Product-Title  *****
    productTitle = jQuery(
      ".container.main-content .heading-title .entry-title"
    ).text();
    if (!productTitle) {
      productTitle = "Pi Pergola";
    }

    // ****  Footer-Menu  *****
    mainMenu.after(`
      <div class="footer_menu">
      </div>
    `);

    // ****  RGB-Icon  *****
    jQuery(iconsContainer).append(rgbIcon);
    jQuery(iconsContainer).append(bladeIcon);
    jQuery(iconsContainer).append(shadeIcon);
    jQuery(iconsContainer).append(slideIcon);
    jQuery(iconsContainer).append(gulIcon);

    jQuery(".footer_menu").append(iconsContainer);

    let i = 0;

    // ****  Handle color button in footer-menu *****
    const frameButton = jQuery(".custom_id-frame-color-button");
    const roofButton = jQuery(".custom_id-roof-color-button");

    frameButton.on("click", () => {
      // uiGroups.hide("roofColor");
      // // if (uiGroups.get("type").is(":hidden")) {
      // // }
      // uiGroups.show("frameColor");
      // roofButton.trigger("click");

      uiGroups.hide("roofColor");
      uiGroups.show("frameColor");
    });

    roofButton.on("click", () => {
      uiGroups.hide("frameColor");
      uiGroups.show("roofColor");
      // roofButton.trigger("click");
    });

    jQuery(`#${footerMenu_group} .option`).each(function () {
      const groupId = jQuery(this).data("group_id");
      const componentId = jQuery(this).data("component_id");
      const title = jQuery(this).data("value");

      jQuery(".ar_conf_container .footer_menu").append(`
        <div id="footerMenu_${i}" class="footer_menu__item" data-group_id="${groupId}" data-component_id="${componentId}">
          <div class="footer_menu__item_image"></div>
          <div class="footer_menu__item_caption">${title}</div>
        </div>
      `);

      i++;
    });

    jQuery(".ar_conf_container .footer_menu").append(`
      <div id="footerMenu_${i}" class="footer_menu__item" data-group_id="overview"">
        <div class="footer_menu__item_image"></div>
        <div class="footer_menu__item_caption">Overview</div>
      </div>
    `);

    // ****  Side-Menu-Buttons *****
    mainMenu.append(`
      <div class="side_menu__buttons">
        <div class="button side_menu__button button--black disabled">
          <span class="icon icon__arrow_left"></span>
          <span class="button__caption">PREVIOUS</span>
        </div>

        <div class="button side_menu__button button--orange">
          <span class="button__caption">NEXT</span>
          <span class="icon icon__arrow_right"></span>
        </div>

        <div class="button side_menu__button button--menu">
          <span class="icon icon__arrow_left"></span>
          <span class="button__caption">Menu</span>
        </div>
      </div>
    `);

    function updateButtonStates() {
      const firstMenuItem = jQuery(".footer_menu__item").first();
      const lastMenuItem = jQuery(".footer_menu__item").last();
      const activeMenuItem = jQuery(".footer_menu__item.active");

      if (activeMenuItem.is(firstMenuItem)) {
        jQuery(".side_menu__button.button--black").addClass("disabled");
      } else {
        jQuery(".side_menu__button.button--black").removeClass("disabled");
      }

      if (activeMenuItem.is(lastMenuItem)) {
        jQuery(".side_menu__button.button--orange").addClass("disabled");
      } else {
        jQuery(".side_menu__button.button--orange").removeClass("disabled");
      }
    }

    const handleButtonClick = function () {
      showRequestPdf();
      validateForm("#popup-item-requestpdf-pergomatic", "#js-downloadPdf");
    };

    const handleButtonRequestClick = function () {
      showRequest();
      validateForm("#popup-item-requestpdf", "#js-requestQ");
    };

    //* Footer-menu buttons handler
    jQuery(document).on(
      "click",
      ".ar_conf_container .footer_menu__item",
      function () {
        const groupIdItem = jQuery(this).data("group_id");
        const componentId = jQuery(this).data("component_id");

        jQuery(".overview").remove();

        jQuery(".footer_menu__item").removeClass("active");

        jQuery(this).addClass("active");

        jQuery(
          `#${footerMenu_group} .option_${groupIdItem}-${componentId}`
        ).click();

        const menuHeaderTitle = jQuery(this)
          .find(".footer_menu__item_caption")
          .text();

        updateButtonStates();

        updateUI(menuHeaderTitle);
        pergola.updatePopUpAndOverview();

        let buttonNext = jQuery(".button--orange");
        let buttonBack = jQuery(".button--black");

        buttonNext.removeClass("hide");

        //galssromm SIZE CHANGE
        const glassroom = pergola.settings.typePergola === 4;

        if (!glassroom) {
          jQuery("#group-3 .range-caption").eq(0).text("Width");
          jQuery("#group-4 .range-caption").eq(0).text("Projection");
        } else {
          jQuery("#group-3 .range-caption").eq(0).text("Projection");
          jQuery("#group-4 .range-caption").eq(0).text("Width");
        }

        if (groupIdItem == "overview") {
          // Summary Modal
          // PI PERGOLA
          // prepareSummary();

          //#region MOBILE TURN ON
          toggleMobile(true);
          //#endregion
          jQuery(".header_menu").addClass("overview-center");
          buttonNext.addClass("hide");

          // PERGOMATIC
          prepareOverview();

          buttonNext.find(".button__caption").text("download pdf");
          buttonBack.find(".button__caption").text("quotation");

          buttonNext.find(".icon").hide();
          buttonBack.find(".icon").hide();

          buttonNext.on("click", handleButtonClick);
          buttonBack.on("click", handleButtonRequestClick);

          setTimeout(() => {
            const iframe = jQuery("#inline-9CAMS0Dv7CozHFhkP8R4");
            const iframeContents = iframe.contents();
            const formInput = iframeContents.find(
              "#el_9CAMS0Dv7CozHFhkP8R4_nFD7APw1jitGwOsuASt4_7"
            );
            console.log("iframeContents :", iframeContents);
            console.log("formInput :", formInput);
          }, 5000);
        } else {
          jQuery(".header_menu").removeClass("overview-center");

          buttonNext.find(".button__caption").text("Next");

          window.innerWidth < mobileBorder
            ? buttonBack.find(".button__caption").text("Menu")
            : buttonBack.find(".button__caption").text("Previous");

          buttonNext.find(".icon").show();
          buttonBack.find(".icon").show();

          buttonNext.off("click", handleButtonClick);
          buttonBack.off("click", handleButtonRequestClick);

          //#region MOBILE TURN OFF
          toggleMobile(false);
          //#endregion
        }

        jQuery(".ar_conf_container .header_menu__group_title").text(
          menuHeaderTitle
        );

        jQuery("#menuReset").data("group_type", menuHeaderTitle);
      }
    );

    //* Side menu button PREV handler
    jQuery(document).on(
      "click",
      ".side_menu__button.button--black",
      function () {
        if (jQuery(this).hasClass("back-menu")) {
          jQuery(".footer_menu").show();
          pergola.updatePopUpAndOverview();
        } else if (!jQuery(this).hasClass("disabled")) {
          jQuery(".overview").remove();

          const activeMenuItem = jQuery(".footer_menu__item.active");
          let prevMenuItem = activeMenuItem.prev(".footer_menu__item");

          // Check if the previous menu item is visible, if not, move to the previous visible one
          while (
            prevMenuItem.length &&
            prevMenuItem.hasClass("delete-option")
          ) {
            prevMenuItem = prevMenuItem.prev(".footer_menu__item");
          }

          if (prevMenuItem.length) {
            prevMenuItem.click();
          }

          pergola.updatePopUpAndOverview();
        }
      }
    );

    //* Side menu button NEXT handler
    jQuery(document).on(
      "click",
      ".side_menu__button.button--orange",
      function () {
        if (!jQuery(this).hasClass("disabled")) {
          jQuery(".overview").remove();

          const activeMenuItem = jQuery(".footer_menu__item.active");
          let nextMenuItem = activeMenuItem.next(".footer_menu__item");

          // Check if the next menu item is visible, if not, move to the next visible one
          while (
            nextMenuItem.length &&
            nextMenuItem.hasClass("delete-option")
          ) {
            nextMenuItem = nextMenuItem.next(".footer_menu__item");
          }

          if (nextMenuItem.length) {
            nextMenuItem.click();
          }

          pergola.updatePopUpAndOverview();
        }
      }
    );

    //* Side menu button RESET handler
    jQuery(document).on("click", "#menuReset", () => {
      // resetGroupValues(jQuery("#menuReset").data("group_type"));

      const type = jQuery("#menuReset")
        .data("group_type")
        .toString()
        .toUpperCase();

      resetSetting(type);
    });

    jQuery(`#footerMenu_0`).click();
  });

  function resetSetting(type) {
    switch (type) {
      case "TYPE":
        //#region RESET TYPES
        pergolaSettings.typePergola = pergolaSettingsDefault.typePergola;

        const optionsType = uiGroups.get("type").find(".option");

        optionsType.each(function () {
          const el = jQuery(this);
          const dataAttr = el.data("component_id");

          if (dataAttr === pergolaSettingsDefault.typePergola) {
            el.trigger("click");
          }
        });
        //#endregion

        break;

      case "WALL":
        //#region REST WALL
        const optionsWall = uiGroups.get("wall").find(".option");

        optionsWall.each(function () {
          const el = jQuery(this);

          if (el.hasClass("active")) el.trigger("click");
        });
        //#endregion

        break;

      case "SIZES":
        pergolaSettings.width = pergolaSettingsDefault.width;
        pergolaSettings.depth = pergolaSettingsDefault.depth;
        pergolaSettings.height = pergolaSettingsDefault.height;
        pergolaSettings.steel = pergolaSettingsDefault.steel;

        const inputWidth = jQuery(`#${rangeWidth_group} input[type='range']`);
        const inputDepth = jQuery(`#${rangeDepth_group} input[type='range']`);
        const inputHeight = jQuery(`#${rangeHeight_group} input[type='range']`);

        inputWidth.val(pergolaSettings.width).trigger("change");
        inputDepth.val(pergolaSettings.depth).trigger("change");
        inputHeight.val(pergolaSettings.height).trigger("change");
        updateRangeBackgroundAndLabel(inputWidth);
        updateRangeBackgroundAndLabel(inputDepth);
        updateRangeBackgroundAndLabel(inputHeight);
        break;

      case "COLORS":
        //#region RESE COLOR
        const optionsColorFrame = uiGroups.get("frameColor").find(".option");
        optionsColorFrame.eq(7).trigger("click");
        const optionsColorRoof = uiGroups.get("roofColor").find(".option");
        optionsColorRoof.eq(7).trigger("click");

        const optionsColorHeader = uiGroups.get("color").find(".option");
        optionsColorHeader.eq(0).trigger("click");
        optionsColorHeader.eq(1).trigger("click");

        //#endregion

        break;

      case "OPTIONS":
        //#region RESET OPTIONS
        const optionsOptions = uiGroups.get("options").find(".option");

        optionsOptions.each(function () {
          const el = jQuery(this);

          if (el.hasClass("active")) el.trigger("click");
        });
        //#endregion
        break;

      case "SYSTEMS":
        //#region RESET SUB-SYSTEMS
        const optionsSub = uiGroups.get("subSystems").find(".option");

        optionsSub.each(function () {
          const el = jQuery(this);

          if (el.hasClass("active")) el.trigger("click");
        });
        //#endregion
        break;
    }

    pergola.update();
    // applyUiFromSettings();
  }

  function resetGroupValues(groupType) {
    switch (dataGroupTypes[groupType]) {
      case 0: // Dimensions
        pergolaSettings.width = pergolaSettingsDefault.width;
        pergolaSettings.depth = pergolaSettingsDefault.depth;
        pergolaSettings.height = pergolaSettingsDefault.height;
        break;
      case 1: // Texture & Color
        pergolaSettings.frameColorType = pergolaSettingsDefault.frameColorType;
        pergolaSettings.roofColorType = pergolaSettingsDefault.roofColorType;
        pergolaSettings.structureColorWood =
          pergolaSettingsDefault.structureColorWood;
        pergolaSettings.canopyColor = pergolaSettingsDefault.canopyColor;
        break;
      case 2: // Sub Systems
        pergolaSettings.currentSubsystem =
          pergolaSettingsDefault.currentSubsystem;
        pergolaSettings.currentSubsystemKey =
          pergolaSettingsDefault.currentSubsystemKey;
        pergolaSettings.currentOpeningSide =
          pergolaSettingsDefault.currentOpeningSide;
        pergolaSettings.currentOpenValue =
          pergolaSettingsDefault.currentOpenValue;
        pergolaSettings.currentSpan = pergolaSettingsDefault.currentSpan;
        pergolaSettings.spanSet = pergolaSettingsDefault.spanSet;
        pergolaSettings.subBifoldDoorColor =
          pergolaSettingsDefault.subBifoldDoorColor;
        pergolaSettings.subGuilotineGlassColor =
          pergolaSettingsDefault.subGuilotineGlassColor;
        pergolaSettings.subSlidingGlassDoorColor =
          pergolaSettingsDefault.subSlidingGlassDoorColor;
        pergolaSettings.subLiftSlideDoorColor =
          pergolaSettingsDefault.subLiftSlideDoorColor;
        pergolaSettings.subBlindShadeColor =
          pergolaSettingsDefault.subBlindShadeColor;
        pergolaSettings.subLeds = pergolaSettingsDefault.subLeds;
        pergolaSettings.subLedColor = pergolaSettingsDefault.subLedColor;
        pergolaSettings.allSlide = pergolaSettingsDefault.allSlide;
        clearOptionsState(subSystems_group);
        resetSubSystemPopups();

        pergola.span.objects.forEach((span) => {
          if (span.isSystemSet) {
            pergola.removeSystemFromSpan(span);
          }
        });

        break;
      case 3: // Side options
        pergolaSettings.sideOptionHeater =
          pergolaSettingsDefault.sideOptionHeater;
        pergolaSettings.sideOptionFan = pergolaSettingsDefault.sideOptionFan;
        break;

      default:
        break;
    }

    pergola.update();
    applyUiFromSettings();
  }

  //! ******************* Range Slider ***********************

  jQuery(document).ready(function () {
    jQuery('.ar_filter_inputs.type_range input[type="range"]').each(
      function () {
        const captionText = jQuery(this)
          .closest(".ar_filter_group")
          .find(".ar_filter_caption")
          .text();

        const groupHeader = jQuery(this)
          .closest(".ar_filter_group")
          .find(".ar_filter_header");
        groupHeader.hide();

        const minValue = jQuery(this).attr("min");
        const maxValue = jQuery(this).attr("max");

        jQuery(this).before(`
        <div class="range-header">
          <div class="range-caption_container">
            <span class="range-caption">${captionText}</span>
            <span class="range-caption_add">(inch)</span>
          </div>
          <div class="range-buttons_container">
            <div class="range-button range-button_minus"></div>
            <div class="range-label"></div>
            <div class="range-button range-button_plus"></div>
          </div>
        </div>
      `);

        jQuery(this).after(`
        <div class="range-values"></div>
        <div class="range-scale">
          <span class="range-tick" style="left: 0%;">${minValue}</span>
          <span class="range-tick" style="right: -6%;">${maxValue}</span>
        </div>
      `);

        jQuery(this)
          .closest(".ar_filter_inputs.type_range")
          .addClass("range-container");
      }
    );

    jQuery('input[type="range"]').each(function () {
      const input = jQuery(this);
      updateRangeBackgroundAndLabel(input);
    });

    jQuery('input[type="range"]').on("input", function () {
      updateRangeBackgroundAndLabel(jQuery(this));
    });

    jQuery(".range-button_minus").on("click", function () {
      const rangeContainer = jQuery(this).closest(".range-container");
      const input = rangeContainer.find('input[type="range"]');
      const step = parseFloat(input.attr("step")) || 1;
      const min = parseFloat(input.attr("min")) || 0;
      let currentValue = parseFloat(input.val()) || 0;

      currentValue = Math.max(currentValue - step, min);
      input.val(currentValue);
      updateRangeBackgroundAndLabel(input);
      // const event = new Event('change');
      // input[0].dispatchEvent(event);
      input.trigger("change");
    });

    jQuery(".range-button_plus").on("click", function () {
      const rangeContainer = jQuery(this).closest(".range-container");
      const input = rangeContainer.find('input[type="range"]');
      const step = parseFloat(input.attr("step")) || 1;
      const max = parseFloat(input.attr("max")) || 100;
      let currentValue = parseFloat(input.val()) || 0;

      currentValue = Math.min(currentValue + step, max);
      input.val(currentValue);
      updateRangeBackgroundAndLabel(input);
      // const event = new Event('change');
      // input[0].dispatchEvent(event);
      input.trigger("change");
    });
  });

  //! *****  Buttons on the AR-canvas: Hide, AR and SHARE  *****
  jQuery(document).ready(function () {
    jQuery(".ar_model_viewer").append(`
      <div class="canvas_element_container canvas_element__fullscreen">
        <div id="btnFullscreen" class="button__fullscreen "></div>
      </div>

      <div class="canvas_element_container canvas_element__sharearhide">
       <div class="canvas_element_container_left">
        <div id="btnShare" class="canvas_btn canvas_btn__share">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">Share</div>
        </div>

        <div id="btnAR" class="canvas_btn canvas_btn__ar">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">AR</div>
        </div>  
       </div>

       <div class="canvas_element_container_right">
         <p id="mobile-icon-roof" class="canvas_element_container_right_title">Blade Rotation</p>
       </div>
      
        <!-- <div id="btnHide" class="canvas_btn canvas_btn__hide">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">Hide</div>
        </div> -->
      </div>

      <div class="canvas_element_container canvas_element__wallblide">   
        <div id="btnBlade" class="canvas_btn canvas_btn__blade">
          <div class="canvas_btn__icon canvas_btn__icon_blade full-screen-icon"></div>
        </div>
      </div>

      <div id="icon_RGB"></div>

      <div id="icon_ZIP"></div>

    
      <div class="canvas_menu_container canvas_menu__wall">
        <div class="canvas_menu__header">
          <div class="canvas_menu__title">Mounting Wall</div>
          <div class="canvas_menu__icon canvas_menu__icon_delete"></div>
          <div class="canvas_menu__icon canvas_menu__icon_close"></div>
        </div>

        <div class="canvas_menu__content">
          <div class="canvas_menu__item canvas_menu__item_checkbox">
            <input type="checkbox" id="wall_checkbox" name="wall_checkbox" checked >
            <label for="wall_checkbox">Keep posts</label>
          </div>
        </div>
      </div>

      <div id="bladeR" class="canvas_menu_container canvas_menu__blade">
        <div class="canvas_menu__header">
          <div class="canvas_menu__title">${
            !pergolaSettings.typePergola ? "Blade Rotation" : "Roof Retraction"
          }</div>
          <div class="canvas_menu__icon canvas_menu__icon_close"></div>
        </div>

        <div class="canvas_menu__content">
          <div class="canvas_menu__item">
            <div class="range-container">
              <input id="rotateL" type="range" min="1" max="${
                !pergolaSettings.typePergola ? 135 : 90
              } " value="${pergolaSettings.rotateLouver}" step="0.01">
              <div class="range-values"></div>
              <div class="range-scale">
                <span class="range-tick range-tick__left">${
                  !pergolaSettings.typePergola ? "0" : "Close"
                }</span>

                <span id="max-rot" class="range-tick range-tick__right">${
                  !pergolaSettings.typePergola ? "135" : "Open"
                }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    //#region ROTATE BLADE
    jQuery("#rotateL").on("input", (event) => {
      pergolaSettings.rotateLouver = -event.target.value;
      const value = interpolateValue(
        event.target.value,
        1,
        !pergolaSettings.typePergola ? 135 : 90
      );

      pergolaSettings.roofOpen = value;

      const maxValue = !pergola.settings.typePergola ? 135 : 90;
      jQuery("#rotateL").attr("max", maxValue);

      updateRangeBackgroundAndLabel(jQuery("#rotateL"));
    });

    //#endregion

    jQuery('.canvas_menu_container input[type="range"]').each(function () {
      const input = jQuery(this);
      updateRangeBackgroundAndLabel(input);
    });

    jQuery('.canvas_menu_container input[type="range"]').on(
      "input",
      function () {
        updateRangeBackgroundAndLabel(jQuery(this));
      }
    );

    // jQuery("#rotateL").on("input", function () {
    //   updateRangeBackgroundAndLabel(jQuery(this));
    // });

    // jQuery(document).on('click', '#btnHide', () => hideModelUi()); //? removed by design

    jQuery(document).on("click", "#btnBlade", () => toggleFullscreenMode());

    // jQuery(document).on('click', '#btnShare', () => showSharePopup());
    // jQuery(document).on('click', '#btnAR', () => pergolaOpenARorQR());
    // jQuery(document).on('click', '#btnWall', () => toggleCanvasMenuMountingWall());
    // jQuery(document).on('click', '#btnBlade', () => toggleCanvasMenuBladeRotation());

    jQuery(document).on("pointerup, click", "#btnShare", () =>
      showSharePopup()
    );
    jQuery(document).on("pointerup, click", "#btnAR", () =>
      pergolaOpenARorQR()
    );

    // jQuery(document).on("pointerup, click", "#btnBlade", () =>
    //   toggleCanvasMenuBladeRotation()
    // );

    jQuery(".canvas_menu_container").on(
      "click",
      ".canvas_menu__icon_close",
      function () {
        jQuery(this).closest(".canvas_menu_container").removeClass("active");
        jQuery("#btnWall").removeClass("active");
        jQuery("#bladeR").hide();

        // jQuery("#btnBlade").removeClass("active");
        // unFixScroll();
      }
    );
  });

  function toggleFullscreenMode() {
    toggleMenuRight();
    toggleMenuDown();

    function toggleMenuRight() {
      jQuery(".main_menu").animate(
        {
          width: "toggle",
          opacity: "toggle",
        },
        300
      );

      jQuery(".ar_conf_container").toggleClass("fullscreen");
    }

    function toggleMenuDown() {
      jQuery(".footer_menu").animate(
        {
          height: "toggle",
          opacity: "toggle",
        },
        300
      );
    }
  }

  function toggleCanvasMenuMountingWall() {
    jQuery("#btnWall").toggleClass("active");
    jQuery(".canvas_menu__blade").toggleClass("active");

    jQuery("#btnBlade").removeClass("active");
    jQuery(".canvas_menu__blade").removeClass("active");

    if (jQuery(".canvas_menu__wall").hasClass("active")) {
      fixScroll();
    } else {
      unFixScroll();
    }
  }

  function toggleCanvasMenuBladeRotation() {
    // jQuery("#btnBlade").toggleClass("active");
    jQuery(".canvas_menu__blade").toggleClass("active");
    jQuery("#btnWall").removeClass("active");
    jQuery(".canvas_menu__wall").removeClass("active");

    if (jQuery(".canvas_menu__blade").hasClass("active")) {
      fixScroll();
    } else {
      unFixScroll();
    }
  }

  //! *****   SUB SYSTEMS   *****

  jQuery(document).ready(function () {
    // jQuery(`.${subSystems_options.Led.option}`).addClass("subsystem__led");

    // jQuery(`#${subSystems_group} .component_title`).each(function () {
    //   jQuery(
    //     '<div class="component__buttons">' +
    //       '<div class="component__button component__button_add"></div>' +
    //       '<div class="component__button component__button_all"></div>' +
    //       "</div>"
    //   ).insertBefore(jQuery(this));
    // });

    // canvas subsystem menu
    Object.keys(subSystemMenuGroups).forEach((key) => {
      jQuery(`#${key}`).addClass("canvas_subsystem_menu");

      const title = jQuery(
        `#${key} .ar_filter_header .ar_filter_caption`
      ).text();

      const canvasMenu = `
        <div class="canvas_menu__header">
          <div class="canvas_menu__title">${title}</div>
          <div id="btnDeleteSubSystem_${key}" data-group_id="${key}" class="canvas_menu__icon canvas_menu__icon_delete canvas_subsystem_menu__icon_delete"></div>
          <div id="menuCanvasClose" class="canvas_menu__icon canvas_menu__icon_close canvas_subsystem_menu__icon_close"></div>
        </div>

        <div class="canvas_menu__content subsystem__menu">
          <div class="canvas_menu__item canvas_menu__item_radio">
            <div class="item_radio__wrapper">
              <input type="radio" id="radio_left_${key}" data-group_id="${key}" name="radio_${key}" value="Left" checked />
              <label class="radio-button-image-inner" for="radio_left_${key}">Left</label>
            </div>

            <div class="item_radio__wrapper">
              <input type="radio" id="radio_right_${key}" data-group_id="${key}" name="radio_${key}" value="Right" />
              <label class="radio-button-image-inner" for="radio_right_${key}">Right</label>
            </div>
          </div>

          <div id="add-section-pop" class="canvas_menu__item canvas_menu__item_tumbler">
            <div class="tumbler__container">
              <div class="tumbler__label">All Slide</div>
              <div class="tumbler-wrapper ">
                <input type="checkbox" class="allSlide_input" id="tumbler_${key}" data-group_id="${key}" name="tumbler_${key}" hidden />
                <div class="tumbler"></div>
              </div>
            </div>
          </div>

          <div id="add-section-pop-input" class="canvas_menu__item canvas_menu__item_range">
            <div class="range-container">
              <input id="range_opening_${key}" data-group_id="${key}" type="range" min="0" max="1" value="0" step="0.01">
              <div class="range-values"></div>
              <div class="range-scale">
                <span class="range-tick range-tick__left">${
                  title === "Zip Screen" ? "Open" : "Close"
                }</span>
                <span class="range-tick range-tick__right">${
                  title === "Zip Screen" ? "Close" : "Open"
                }</span>
              </div>
            </div>
          </div>

          <div class="canvas_menu__item canvas_menu__item_colors"></div>
        </div>
      `;

      jQuery(`#${key} .ar_filter_header`).after(canvasMenu);

      // jQuery(".canvas_subsystem_menu").each(function () {
      //   jQuery(".ar_model_viewer").append(this);
      // });
    });

    //#region POP CLOSE
    uiGroups
      .get("rgbPop")
      .find("#menuCanvasClose")
      .on("click", () => {
        const rgbIcon = jQuery("#rgbIcon");
        rgbIcon.removeClass("active");
        uiGroups.hide("rgbPop");

        pergola.settings.currentSubsystemType = null;

        pergola.update();
      });

    //#region SHADE POP
    uiGroups
      .get("shadePop")
      .find("#menuCanvasClose")
      .on("click", () => {
        const shadeIcon = jQuery("#shade-sys");

        shadeIcon.removeClass("active");
        const shadePop = uiGroups.get("shadePop");
        shadePop.hide();

        pergola.settings.currentSubsystemType = null;

        pergola.update();
      });

    //#region SLIDE POP
    uiGroups
      .get("slidePop")
      .find("#menuCanvasClose")
      .on("click", () => {
        const slideIcon = jQuery("#slide-sys");

        slideIcon.removeClass("active");
        uiGroups.hide("slidePop");

        pergola.settings.currentSubsystemType = null;

        pergola.update();
      });

    //#region GUL POP
    uiGroups
      .get("gulPop")
      .find("#menuCanvasClose")
      .on("click", () => {
        const gulIcon = jQuery("#gul-sys");

        gulIcon.removeClass("active");
        uiGroups.hide("gulPop");

        pergola.settings.currentSubsystemType = null;

        pergola.update();
      });
    //#endregion

    // jQuery(`#range_opening_${subSystems_options.BifoldDoor.group}`).attr(
    //   "max",
    //   "0.98"
    // );

    jQuery('.canvas_subsystem_menu input[type="range"]').each(function () {
      updateRangeBackgroundAndLabel(jQuery(this));
    });

    jQuery('.canvas_subsystem_menu input[type="range"]').on(
      "input",
      function () {
        updateRangeBackgroundAndLabel(jQuery(this));
      }
    );

    // Close popup btn
    jQuery("#bladeR")
      .find(".canvas_menu__icon_close")
      .on("click", function () {
        pergola.settings.currentSubsystemType = null;

        pergola.update();
      });

    // Cancel btn //! TODO for LEDs
    jQuery(".option").on("click", ".component__button_add", function (event) {
      const thisOption = jQuery(this).closest(".option");

      if (thisOption.hasClass(`${subSystems_options.Led.option}`)) {
        if (thisOption.hasClass("checked")) {
          thisOption.removeClass("checked");
          event.stopPropagation();
          pergola.settings.subLeds = false;
          pergola.update();
          return;
        }
      }

      if (thisOption.hasClass("active")) {
        resetSubSystemPopups();
        setHotspotsByGroupVisibility("subsystems", false);

        setTimeout(() => {
          clearOptionsState(subSystems_group, [subSystems_options.Led.option]);
          setHotspotsByGroupVisibility("subsystems", false);
        }, 100);
      }
    });

    // Delete system btn
    jQuery(".canvas_subsystem_menu").on(
      "click",
      ".canvas_subsystem_menu__icon_delete",
      function () {
        jQuery(this).closest(".canvas_subsystem_menu").removeClass("active");

        unFixScroll();
        // clearOptionsState(subSystems_group, [subSystems_options.Led.option]);
        // setHotspotsByGroupVisibility("subsystems", false);

        pergola && pergola.removeSystemFromSpan(pergola.settings.currentSpan);

        jQuery(this).closest(".ar_filter_group").hide();

        jQuery(".rgb_icon").each(function () {
          jQuery(this).removeClass("active");
        });

        // const shadeIcon = jQuery("#shade-sys");
        // const slideIcon = jQuery("#slide-sys");
        // const gulIcon = jQuery("#gul-sys");

        if (
          !pergola.checkSystemInScene(pergola.settings.currentSubsystemType)
        ) {
          const optionsSub = uiGroups.get("subSystems").find(".option");

          switch (true) {
            case pergola.settings.currentSubsystemType ===
              pergolaConst.systemType.BlindShade:
              optionsSub.eq(0).trigger("click");

              // setAllHotspotsVisibility(false);
              break;
            case pergola.settings.currentSubsystemType ===
              pergolaConst.systemType.SlidingGlassDoor:
              optionsSub.eq(1).trigger("click");

              // setAllHotspotsVisibility(false);
              break;
            case pergola.settings.currentSubsystemType ===
              pergolaConst.systemType.GuilotineGlass:
              optionsSub.eq(2).trigger("click");

              // setAllHotspotsVisibility(false);
              break;
          }
        }

        pergola.settings.currentSubsystemType = null;

        pergola.update();
        updateHotspots(hotspots);

        // jQuery(this)
        //   .closest(".canvas_subsystem_menu__icon_delete")
        //   .trigger("click");
      }
    );
  });

  function updateSubsystemCanvasMenuPosition() {
    const subSystemMenuBlock = jQuery(".canvas_subsystem_menu");
    const anchorOffset = jQuery(".canvas_subsystem_menu_anchor").offset();
    const scrollTop = jQuery(window).scrollTop();
    const scrollLeft = jQuery(window).scrollLeft();

    if (anchorOffset) {
      subSystemMenuBlock.css({
        top: anchorOffset.top - scrollTop - 10 + "px",
        left: anchorOffset.left - scrollLeft - 500 + "px",
      });
    }
  }

  // jQuery(window).on("resize scroll", updateSubsystemCanvasMenuPosition);
  // jQuery(document).ready(updateSubsystemCanvasMenuPosition);

  //! *****   POP-UPs   *****

  // ************** HTML *****************
  jQuery(document).ready(function () {
    const popupsAndModals = jQuery(`
      <!-- popups -->
      <!-- add class 'active' to show it -->
      <div class="popup">
        <div class="popup-box">

          <!-- add class 'active' to show it -->
          <div id="popup-item-share" class="popup-item popup-item-share">
            <div class="popup-sharing-title">Share Configurator</div>

            <div class="popup-sharing-window">
              <input id="info-sharing-input" type="text" value="" />
              <button id="share_copyToClipboard" class="btn btn_copy">
                <span class="icon icon-copy"></span>
              </button>
            </div>
          </div>

          <!-- add class 'active' to show it -->
          <div id="popup-item-qr" class="popup-item popup-item-qr">
            <div class="popup-qr-title">Scan the QR code with your phone. Within 1-3 seconds the AR function opens on your phone.</div>
            <div class="popup-qr-img">
              <div id="qrcode" class="qrcode" >
                <img src="" alt="" />
              </div>
            </div>
          </div>

          <!-- add class 'active' to show it -->
          <div id="popup-item-requestpdf" class="popup-item popup-item-requestpdf">
             <iframe
              src="https://api.leadconnectorhq.com/widget/form/9CAMS0Dv7CozHFhkP8R4"
              style="width:100%;height:100%;border:none;border-radius:15px"
              id="inline-9CAMS0Dv7CozHFhkP8R4" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Pergomatic | Download PDF"
              data-height="2921"
              data-layout-iframe-id="inline-9CAMS0Dv7CozHFhkP8R4"
              data-form-id="9CAMS0Dv7CozHFhkP8R4"
               title="Pergomatic | Download PDF"
                   >
            </iframe>
            <script src="https://api.leadconnectorhq.com/js/form_embed.js"></script>            
          </div>

          <!-- add class 'active' to show it -->
          <div id="popup-item-requestpdf-pergomatic" class="popup-item popup-item-requestpdf-pergomatic">
            <div class="popup-requestpdf-title">Fill in details below to Download PDF:</div>

            <form class="request-form">
              <div class="form-wrap">
                <div class="form-inputs">
                  <input id="form_name" type="text" name="name" placeholder="First & Last name*" />
                  <input id="form_phone" type="tel" name="phone" placeholder="Telephone*" />
                  <input id="form_email" type="email" placeholder="Email*" class="full_size" />
                </div>
                
                <div class="option_wrapper--column">
                  <input type="checkbox" id="agreePdf" value="agreePdf" checked />
                  <div class="checkbox__wrapper">
                    <div class="checkbox__header">
                      <label class="checkbox-item__label" for="agreePdf">
                        <span class="checkbox-item__icon"></span>
                        <span class="checkbox-item__label-text ">I agree to the collection, storage, and processing of my
                          personal data by this website</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            
              <div class="form-buttons">
                <button type="button" id="js-closeRequestPdf" class="btn btn_pdf btn_orange">Cancel</button>
                <button type="submit" id="js-downloadPdf" class="btn btn_pdf">Download PDF</button>
              </div>
            </form>

          </div>

          <div class="popup-close"></div>
        </div>

        <div class="popup-overlay"></div>
      </div>

      <!-- modals -->

      <!-- add class 'active' to show it -->
      <div class="modal">
        <div id="modalSummary" class="modal__content summary">
          <table class="summary__table">
            <thead>
              <tr>
                <th>PRODUCT NAME</th>
                <th>DIMENSIONS (INCH)</th>
                <th>DESCRIPTION</th>
                <th>QUANTITY</th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td id="summary_productTitle"></td>
                <td id="summary_dimensions"></td>
                <td id="summary_mainColors"></td>
                <td>1</td>
              </tr>

              <!-- - All selected Subsystems here - -->
              <tr id="summary_subsystemList"></tr>
              <!-- -------------------------------- -->

              <tr class="summary__table_subtitle">
                <td colspan="4">SIDE OPTIONS</td>
              </tr>
              
              <tr>
                <td colspan="3" class="summary__table_item_name">Fan</td>
                <td id="summary_fanPicked"></td>
              </tr>
              
              <tr>
                <td colspan="3">Heater</td>
                <td id="summary_heaterPicked"></td>
              </tr>

            </tbody>
          </table>

          <button id="js-showRequestPdf" class="btn btn_pdf">
            Download PDF
            <span class="icon icon__arrow_right"></span>
          </button>

        </div>
      </div>

      <!-- modals End -->
    `);

    jQuery(".configurator3d_post").append(popupsAndModals);

    window.addEventListener("message", async function (event) {
      console.log("MESSAGE");

      if (event.data && event.data.event === "formSubmitted") {
        console.log(popupsAndModals.find("#inline-9CAMS0Dv7CozHFhkP8R4"));

        // onMessage(event);

        // popupsAndModals
        //   .find("#inline-9CAMS0Dv7CozHFhkP8R4")
        //   .contentWindow.postMessage({ requestPergomaticData: true }, "*");

        // scrapInfoAnPutInCustomIframe(
        //   popupsAndModals.find("#inline-9CAMS0Dv7CozHFhkP8R4")
        // );
      }
    });

    qrcode = jQuery("#qrcode");

    validateForm("#popup-item-requestpdf", "#js-requestQ");
    validateForm("#popup-item-requestpdf-pergomatic", "#js-downloadPdf"); //! TEMP - uncomment it before release
  });
  // *************************************
  function scrapInfoAnPutInCustomIframe(container) {
    const idOfInputs = {
      typePergola: "#el_9CAMS0Dv7CozHFhkP8R4_nFD7APw1jitGwOsuASt4_7",
      walls: "#el_9CAMS0Dv7CozHFhkP8R4_IaWATwlkAB6UwCFNJiHJ_8",
      demension: "#el_9CAMS0Dv7CozHFhkP8R4_0hJcGTCVinZ2nWnGH05G_9",
      frameColor: "#el_9CAMS0Dv7CozHFhkP8R4_erqnrXhtIWvCE68Y3Jql_10",
      roofColor: "#el_9CAMS0Dv7CozHFhkP8R4_LNq2ukycvpS8uHcJ5a6A_11",
      subSystems: "#el_9CAMS0Dv7CozHFhkP8R4_N2z3xKqO1C2KQIozf5pM_12",
      options: "#el_9CAMS0Dv7CozHFhkP8R4_iQF8dFeCiRanRdNk9VkH_13",
      pdfFile: "#el_9CAMS0Dv7CozHFhkP8R4_SjbFkmqqUjhVCisHtvsR_14",
    };

    // TYPE PERGOLA
    const typeInput = document.querySelector(`${idOfInputs.typePergola} input`);
    if (typeInput) typeInput.value = pergola.settings.typePergola;

    // WALLS
    const wallInputs = document.querySelectorAll(`${idOfInputs.walls} input`);
    if (wallInputs.length >= 3) {
      if (pergola.settings.backWall) wallInputs[0].checked = true;
      if (pergola.settings.leftWall) wallInputs[1].checked = true;
      if (pergola.settings.rightWall) wallInputs[2].checked = true;
    }

    // DIMENSION
    const dimInputs = document.querySelectorAll(
      `${idOfInputs.demension} input`
    );
    if (dimInputs.length >= 3) {
      dimInputs[0].value = pergola.settings.width;
      dimInputs[1].value = pergola.settings.depth;
      dimInputs[2].value = pergola.settings.height;
    }

    // FRAME COLOR
    document
      .querySelectorAll(`${idOfInputs.frameColor} label`)
      .forEach((label) => {
        const text = label.textContent.trim().toLowerCase();
        if (text === pergola.settings.frameColor.toLowerCase()) {
          const inputId = label.getAttribute("for");
          if (inputId) {
            const input = document.getElementById(inputId);
            if (input) input.checked = true;
          }
        }
      });

    // ROOF COLOR
    document
      .querySelectorAll(`${idOfInputs.roofColor} label`)
      .forEach((label) => {
        const text = label.textContent.trim().toLowerCase();
        if (text === pergola.settings.roofColor.toLowerCase()) {
          const inputId = label.getAttribute("for");
          if (inputId) {
            const input = document.getElementById(inputId);
            if (input) input.checked = true;
          }
        }
      });

    // SUB SYSTEMS
    const subInputs = document.querySelectorAll(
      `${idOfInputs.subSystems} input`
    );
    if (subInputs.length >= 3) {
      if (pergola.checkSystemInScene(pergolaConst.systemType.BlindShade)) {
        subInputs[0].checked = true;
      }
      if (
        pergola.checkSystemInScene(pergolaConst.systemType.SlidingGlassDoor)
      ) {
        subInputs[1].checked = true;
      }
      if (pergola.checkSystemInScene(pergolaConst.systemType.GuilotineGlass)) {
        subInputs[2].checked = true;
      }
    }

    // OPTIONS
    const optionInputs = document.querySelectorAll(
      `${idOfInputs.options} input`
    );
    if (optionInputs.length >= 5) {
      if (pergola.settings.perRGB) optionInputs[0].checked = true;
      if (pergola.settings.perLED) optionInputs[1].checked = true;
      if (pergola.settings.spotLED) optionInputs[2].checked = true;
      if (pergola.settings.heaters) optionInputs[3].checked = true;
      if (pergola.settings.fans) optionInputs[4].checked = true;
    }

    // PDF LINK (закоментовано, як у тебе)
    // const pdfInput = document.querySelector(`${idOfInputs.pdfFile} input`);
    // if (pdfInput) pdfInput.value = pdfBase;

    console.log(
      // container.find(`#el_9CAMS0Dv7CozHFhkP8R4_IaWATwlkAB6UwCFNJiHJ_8`),
      pergola.settings.width
    );
  }

  function closePopup() {
    jQuery(".product-type-3dmodel .popup").removeClass("active");

    jQuery(".product-type-3dmodel .popup").removeClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-close").removeClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-item-requestpdf").removeClass(
      "active"
    );
    jQuery(
      ".product-type-3dmodel .popup-item-requestpdf-pergomatic"
    ).removeClass("active");

    jQuery(".product-type-3dmodel .popup").removeClass("arqr");
    jQuery(".product-type-3dmodel .popup-item-qr").removeClass("active");

    jQuery(".product-type-3dmodel .popup").removeClass("share");
    jQuery(".product-type-3dmodel .popup-item-share").removeClass("active");

    // jQuery('.product-type-3dmodel .popup').removeClass('inviting');
    // jQuery('.product-type-3dmodel .popup-item-inviting').removeClass('active');

    unFixScroll();
  }

  function closeModal() {
    jQuery(".product-type-3dmodel .modal").removeClass("active");
    jQuery(".product-type-3dmodel .popup-item-qr").removeClass("active");
    jQuery(".product-type-3dmodel .modal_overlay").removeClass("active");
  }

  function showSharePopup() {
    jQuery("#info-sharing-input")[0].value = getURLWithParameters();
    jQuery(".product-type-3dmodel .popup").addClass("share active");
    jQuery(".product-type-3dmodel .popup-item-share").addClass("active");
    fixScroll();
  }

  function showRequest() {
    jQuery(".product-type-3dmodel .popup").addClass("requestpdf active");
    jQuery(".product-type-3dmodel .popup-close").addClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-item-requestpdf").addClass("active");
    fixScroll();
  }

  function showRequestPdf() {
    jQuery(".product-type-3dmodel .popup").addClass("requestpdf active");
    jQuery(".product-type-3dmodel .popup-close").addClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-item-requestpdf-pergomatic").addClass(
      "active"
    );
    fixScroll();
  }

  jQuery(document).on("click", "#share_copyToClipboard", function () {
    const input = document.getElementById("info-sharing-input");
    navigator.clipboard.writeText(input.value);
    return;
  });

  jQuery(document).on("click", "#js-showRequestPdf", function () {
    showRequest();
  });

  jQuery(document).on("click", "#js-closeRequestPdf", function () {
    closePopup();
  });

  jQuery(document).on("click", ".popup-close", function () {
    closePopup();
  });

  jQuery(document).on("click", ".popup-overlay", function () {
    closePopup();
  });

  jQuery(document).on(
    "click",
    "#footerMenu_0, #footerMenu_1, #footerMenu_2, #footerMenu_3",
    function () {
      closeModal();
    }
  );

  jQuery(document).on(
    "input",
    "#form_name, #form_phone, #form_email, #form_address, #form_zipcode, #form_city",
    function () {
      validateForm("#popup-item-requestpdf", "#js-requestQ");
      validateForm("#popup-item-requestpdf-pergomatic", "#js-downloadPdf");
    }
  );

  jQuery(document).on("change", "#agree", function () {
    validateForm("#popup-item-requestpdf", "#js-requestQ");
    validateForm("#popup-item-requestpdf-pergomatic", "#js-downloadPdf");
  });

  jQuery(document).on("change", "#agreePdf", function () {
    validateForm("#popup-item-requestpdf", "#js-requestQ");
    validateForm("#popup-item-requestpdf-pergomatic", "#js-downloadPdf");
  });

  window.addEventListener("message", async function (event) {
    if (event.data && event.data.event === "formSubmitted") {
      closePopup();
      closeModal();

      setVisibilityBox(false);
      const oldBg = scene.background;
      scene.background = new THREE.Color("#ffffff");

      sky.visible = false;

      jQuery("body").removeClass("body-no-loader");
      jQuery("html").removeClass("body-no-loader");

      await createPDF("download");

      sky.visible = true;
      scene.background = oldBg;

      jQuery("body").addClass("body-no-loader");
      jQuery("html").addClass("body-no-loader");
    }

    // event.preventDefault();

    // sendFormDataToGoogleSheets();
    // sendFormDataToMake(); //! NEW FEATURE (nned to be tested)
  });
}

function fixScroll() {
  jQuery("#header-outer").addClass("popup-open");
  jQuery("#wpadminbar").addClass("popup-open");
  document.body.classList.add("popup-open");
  const adminPanelHeight = jQuery("#wpadminbar").outerHeight() || 0;
  const siteHeaderHeight = jQuery("#header-outer").outerHeight() || 0;
  document.body.style.top = `${adminPanelHeight + siteHeaderHeight}px`;
}

function unFixScroll() {
  jQuery("#header-outer").removeClass("popup-open");
  jQuery("#wpadminbar").removeClass("popup-open");
  document.body.classList.remove("popup-open");
  document.body.classList.remove("popup-open");
  document.body.style.top = "0";
}

function updateRangeBackgroundAndLabel(input) {
  const min = parseFloat(input.attr("min")) || 0;
  const max = parseFloat(input.attr("max")) || 100;
  let val = parseFloat(input.val()) || 0;

  if (val > max) {
    val = max;
    input.val(val); // ÃÅ¾ÃÂ½ÃÂ¾ÃÂ²ÃÂ»Ã‘Å½Ã‘â€ÃÂ¼ÃÂ¾ ÃÂ·ÃÂ½ÃÂ°Ã‘â€¡ÃÂµÃÂ½ÃÂ½Ã‘Â Ã‘â€“ÃÂ½ÃÂ¿Ã‘Æ’Ã‘â€šÃ‘Æ’
  }

  const percentage = max === min ? 0 : ((val - min) / (max - min)) * 100;

  input.css(
    "background",
    `linear-gradient(to right, var(--color-gray-main) ${percentage}%, var(--color-gray, gray) ${percentage}%)`
  );

  const label = input.closest(".range-container").find(".range-label");
  label.text(`${val}`);
}

// jQuery(window).resize(function () {
//   jQuery('.configurator3d_post input[type="range"]').each(function() {
//     updateRangeBackgroundAndLabel(jQuery(this));
//   });
// });

function updateUI(title) {
  uiGroups.hideAll();
  const glassroom = pergolaSettings.typePergola === 4;

  switch (title) {
    case "type":
      uiGroups.show("type");
      uiGroups.hide("roofColor");
      uiGroups.hide("frameColor");

      break;

    case "wall":
      uiGroups.show("wall");
      break;

    case "sizes":
      uiGroups.show("rangeWidth");
      uiGroups.show("rangeDepth");
      uiGroups.show("rangeHeight");
      break;

    case "colors":
      uiGroups.show("color");
      uiGroups.show("frameColor");
      // uiGroups.hide("roofColor");

      break;

    case "options":
      const optionsOptions = uiGroups.get("options").find(".option");

      optionsOptions.eq(0).show();
      optionsOptions.eq(1).show();
      optionsOptions.eq(4).show();

      if (glassroom) {
        //REMOVE REST OPTION FOR THIS TYPE
        optionsOptions.eq(0).hide();
        optionsOptions.eq(1).hide();
        optionsOptions.eq(4).hide();
      }

      uiGroups.show("options");
      break;

    case "systems":
      uiGroups.show("subSystems");
      break;
  }
}

function UIgroupVisibility(groupId, value) {
  const element = document.getElementById(groupId);

  if (element) {
    element.style.display = value ? "block" : "none";
  } else {
    console.error("Element not found with id:", groupId);
  }
}

function clearOptionsState(groupId, exceptions = []) {
  const group = jQuery(`#${groupId}`);

  // group.find('.option.active').removeClass('active');

  group.find(".option.active").each(function () {
    const element = jQuery(this);
    const hasExceptionClass = exceptions.some((exceptionClass) =>
      element.hasClass(exceptionClass)
    );
    if (!hasExceptionClass) {
      element.removeClass("active");
    }
  });

  // group.find('.option.inactive').removeClass('inactive');

  Object.keys(subSystems_options).forEach((key) => {
    const grId = subSystems_options[key].group;
    const rangeInput = jQuery(`#${grId} .range-container input[type="range"]`);
    // rangeInput.val(0);
    // updateRangeBackgroundAndLabel(rangeInput);
  });

  if (pergola && pergola.settings) {
    pergola.settings.currentSubsystem = null;
    pergola.settings.currentSubsystemKey = null;
  }
}

function makeRestOptionsInactive(groupId) {
  const group = jQuery(`#${groupId}`);
  group.find(".option.inactive").removeClass("inactive");

  const activeOptions = group.find(".option.active");

  if (activeOptions.length > 0) {
    group.find(".option:not(.active)").addClass("inactive");
  } else {
    group.find(".option").removeClass("inactive");
  }
}

function resetSubSystemPopups() {
  Object.keys(subSystemMenuGroups).forEach((gr) => {
    jQuery(`#${gr}`).removeClass("active");
  });
}
//#endregion

//#region INITIALIZATION //! ******** START HERE ********
async function start() {
  if (loaded) {
    return;
  }
  loaded = true;

  if (theModel) {
    // theModel.visible = true;
    await initMorphModel(theModel);

    setTimeout(() => {
      loadThreeJSFonts();
    }, 3000);
  }

  startSettings();
}

async function afterModelLogic() {
  //#region ! *****   TYPE INPUT   *****
  const optionsType = uiGroups.get("type").find(".option");

  optionsType.each(function () {
    const el = jQuery(this);
    const dataAttr = el.data("component_id");

    jQuery("#group-3 .range-caption").eq(0).text("Width");
    jQuery("#group-4 .range-caption").eq(0).text("Projection");

    if (pergola.settings.typePergola === 4) {
      jQuery("#btnWall").hide();
      jQuery("#mobile-icon-roof").hide();
      jQuery("#group-3 .range-caption").eq(0).text("Projection");
      jQuery("#group-4 .range-caption").eq(0).text("Width");
    }

    if (dataAttr === pergola.settings.typePergola) {
      el.trigger("click");

      pergola.update();
    }

    el.on("click", function () {
      const newDataAttr = el.data("component_id");

      pergola.settings.typePergola = newDataAttr;

      changeDemisionParams(
        pergola.settings.typePergola,
        pergola.settings.steel,
        pergola.settings
      );

      const maxValue = !pergola.settings.typePergola ? 135 : 90;

      jQuery("#mobile-icon-roof").show();
      jQuery("#footerMenu_4").show();
      jQuery(".option_6-1").show();
      jQuery("#btnWall").show();
      jQuery("#btnWall").removeClass("active");
      jQuery("#footerMenu_4").removeClass("delete-option");

      optionsOptions.eq(0).show();
      optionsOptions.eq(1).show();
      optionsOptions.eq(4).show();

      switch (true) {
        case newDataAttr === 3:
          jQuery(".option_6-1").hide();
          break;

        case newDataAttr === 4:
          const optionsOptions = uiGroups.get("options").find(".option");

          //REMOVE REST OPTION FOR THIS TYPE
          optionsOptions.eq(0).hide();
          optionsOptions.eq(1).hide();
          optionsOptions.eq(4).hide();
          jQuery("#mobile-icon-roof").hide();

          // jQuery("#footerMenu_4").hide();
          // jQuery("#footerMenu_4").addClass("delete-option");

          jQuery(".option_6-1").hide();

          jQuery("#btnWall").hide();
          jQuery("#btnWall").removeClass("active");
          jQuery("#bladeR").hide();

          jQuery("#group-3 .range-caption").eq(0).text("Projection");
          jQuery("#group-4 .range-caption").eq(0).text("Width");

          // jQuery(".option_9-0").hasClass("active")
          //   ? jQuery(".option_9-0").trigger("click")
          //   : "";

          break;

        default:
          break;
      }

      jQuery("#bladeR .canvas_menu__title").text(
        !pergolaSettings.typePergola ? "Blade Rotation" : "Roof Retraction"
      );
      jQuery("#mobile-icon-roof").text(
        !pergolaSettings.typePergola ? "Blade Rotation" : "Roof Retraction"
      );

      jQuery("#bladeR .range-tick__right").text(
        !pergolaSettings.typePergola ? "135" : "Open"
      );
      jQuery("#bladeR .range-tick__left").text(
        !pergolaSettings.typePergola ? "0" : "Close"
      );

      // Reset the range input value to 1
      jQuery("#rotateL").val(0);

      jQuery("#rotateL").attr("max", maxValue);
      pergola.settings.rotateLouver = 1;
      pergola.settings.roofOpen = 1;

      pergola.update();
      updateRangeBackgroundAndLabel(jQuery("#rotateL"));
    });
  });
  //#endregion

  //#region STEEL CHECKBOX
  const checkBoxHtml = jQuery(`
                <div class="option_wrapper--column">
                  <input type="checkbox" id="myCheckbox" value="agree" checked />
                  <div class="checkbox__wrapper">
                    <div class="checkbox__header">
                      <label class="checkbox-item__label" for="myCheckbox">
                        <span class="checkbox-item__icon"></span>
                        <span class="checkbox-item__label-text ">Steel Reinforcment</span>
                      </label>
                    </div>
                  </div>
                </div>
    `);

  //INIT
  if (pergola.settings.steel) {
    checkBoxHtml.find("#myCheckbox").prop("checked", true);
  } else {
    checkBoxHtml.find("#myCheckbox").prop("checked", false);
  }

  changeDemisionParams(
    pergola.settings.typePergola,
    pergola.settings.steel,
    pergola.settings
  );

  checkBoxHtml.find("#myCheckbox").on("click", () => {
    (pergola.settings.steel = !pergola.settings.steel),
      changeDemisionParams(
        pergola.settings.typePergola,
        pergola.settings.steel,
        pergola.settings
      );

    pergola.update();
  });

  uiGroups.get("rangeHeight").append(checkBoxHtml);

  //#endregion

  //#region WALL
  const optionsWall = uiGroups.get("wall").find(".option");

  optionsWall.each(function () {
    const el = jQuery(this);
    const dataAttr = el.data("component_id");

    //#region INIT WALL
    switch (true) {
      case pergola.settings.backWall && dataAttr === 0:
        el.addClass("active");

        break;

      case pergola.settings.leftWall && dataAttr === 1:
        el.addClass("active");

        break;

      case pergola.settings.rightWall && dataAttr === 2:
        el.addClass("active");

        break;
    }
    //#endregion

    el.on("click", function () {
      const newDataAttr = el.data("component_id");

      switch (true) {
        case newDataAttr === 0:
          pergola.settings.backWall = !pergola.settings.backWall;
          break;

        case newDataAttr === 1:
          pergola.settings.leftWall = !pergola.settings.leftWall;

          break;

        case newDataAttr === 2:
          pergola.settings.rightWall = !pergola.settings.rightWall;

          break;

        default:
          console.log("INCORECT TYPE WALL");

          break;
      }

      pergola.update();
    });
  });
  //#endregion

  //#region COLOR
  //ROOF COLOR
  const optionsColorRoof = uiGroups.get("roofColor").find(".option");

  optionsColorRoof.each(function () {
    const el = jQuery(this);
    const dataAttrID = el.data("component_id");
    const currentColorOption = el.find(".component_title").text();

    if (pergola.settings.roofColorID === dataAttrID) {
      el.trigger("click");

      pergola.settings.roofColor = currentColorOption; //need for pdf
    }

    el.on("click", function () {
      const currentDataAttrID = el.data("component_id");
      const currentColorOption = el.find(".component_title").text();

      pergola.settings.roofColor = currentColorOption; //need for pdf
      pergola.settings.roofColorID = currentDataAttrID;
    });
  });

  //FRAME COLOR
  const optionsColorFrame = uiGroups.get("frameColor").find(".option");

  optionsColorFrame.each(function () {
    const el = jQuery(this);
    const dataAttrID = el.data("component_id");
    const currentColorOption = el.find(".component_title").text();

    if (pergola.settings.frameColorID === dataAttrID) {
      el.trigger("click");

      pergola.settings.frameColor = currentColorOption; //need for pdf
    }

    el.on("click", function () {
      const currentColorOption = el.find(".component_title").text();
      const currentDataAttrID = el.data("component_id");

      pergola.settings.frameColorID = currentDataAttrID;
      pergola.settings.frameColor = currentColorOption; //need for pdf
    });
  });

  // const optionsColorHeader = uiGroups.get("color").find(".option");

  // optionsColorHeader.eq(0).trigger("click");
  //#endregion

  //#region RGB POP
  const optionsColor = uiGroups.get("rgbPop").find(".option");

  optionsColor.each(function () {
    const el = jQuery(this);
    const dataAttrID = el.data("component_id");

    let color = null;
    const classes = this.classList;

    classes.forEach((cls) => {
      if (cls.includes("custom_id")) {
        color = cls.split("-")[1];
      }
    });

    rgbColors[dataAttrID] = color;

    //#region INIT COLOR
    if (pergola.settings.rgbColor === dataAttrID) {
      jQuery(this).trigger("click");
    }

    if (color) {
      jQuery(this).find(".image").css("background-color", color);
    }
    //#endregion

    jQuery(this).on("click", function () {
      const el = jQuery(this);
      const dataAttrID = el.data("component_id");

      pergola.settings.rgbColor = dataAttrID;
      pergola.update();
    });
  });

  //#endregion

  //#region OPTIONS
  const optionsOptions = uiGroups.get("options").find(".option");

  optionsOptions.each(function () {
    const el = jQuery(this);
    const dataAttr = el.data("component_id");

    // el.removeClass("active");

    switch (true) {
      case pergola.settings.perRGB && dataAttr === 0:
        el.addClass("active");

        const rgbIcon = jQuery("#rgbIcon");

        //SET POSTION FOR POP-UP
        jQuery(
          ".rgb_icon_img, #shade-sys, #slide-sys, #gul-sys, #rgbIcon"
        ).each(function () {
          moveCanvasMenu({ target: this });
        });

        rgbIcon.show();

        jQuery("#add-section-pop").hide();
        jQuery("#add-section-pop-input").hide();

        break;

      case pergola.settings.perLED && dataAttr === 1:
        el.addClass("active");

        break;

      case pergola.settings.spotLED && dataAttr === 2:
        el.addClass("active");

        break;

      case pergola.settings.heaters && dataAttr === 3:
        el.addClass("active");

        break;

      case pergola.settings.fans && dataAttr === 4:
        el.addClass("active");

        break;
    }

    el.on("click", function () {
      const newDataAttr = el.data("component_id");

      switch (true) {
        case newDataAttr === 0:
          pergola.settings.perRGB = !pergola.settings.perRGB;
          const rgbIcon = jQuery("#rgbIcon");
          pergola.settings.currentSpan = null;

          console.log(pergola.settings.currentSpan);
          if (jQuery("#rgbIcon").is(":visible")) {
            rgbIcon.hide();
            uiGroups.hide("rgbPop");
            rgbIcon.removeClass("active");
            jQuery("#add-section-pop").show();
          } else {
            rgbIcon.show();
            rgbIcon.addClass("active");
            uiGroups.show("rgbPop");
            jQuery("#add-section-pop").hide();
            jQuery("#add-section-pop-input").hide();

            uiGroups.get("rgbPop").find(".option").eq(0).trigger("click");
          }

          break;

        case newDataAttr === 1:
          pergola.settings.perLED = !pergola.settings.perLED;

          break;

        case newDataAttr === 2:
          pergola.settings.spotLED = !pergola.settings.spotLED;

          break;

        case newDataAttr === 3:
          pergola.settings.heaters = !pergola.settings.heaters;

          break;

        case newDataAttr === 4:
          pergola.settings.fans = !pergola.settings.fans;

          break;
      }

      pergola.update();
    });
  });

  //DELETE BUTTON
  jQuery("#group-12 .canvas_subsystem_menu__icon_delete").off("click");

  jQuery("#btnDeleteSubSystem_group-12").on("click", () => {
    optionsOptions.eq(0).trigger("click");
    console.log("CLICK DELETE 12");
  });

  //#endregion

  //#region SUB-SYSTEMS
  const optionsSub = uiGroups.get("subSystems").find(".option");

  optionsSub.each(function () {
    const el = jQuery(this);
    const dataAttr = el.data("component_id");

    const shadeIcon = jQuery("#shade-sys");
    const slideIcon = jQuery("#slide-sys");
    const gulIcon = jQuery("#gul-sys");

    switch (true) {
      case pergola.checkSystemInScene(pergolaConst.systemType.BlindShade) &&
        dataAttr === 0:
        shadeIcon.show();

        el.addClass("active");

        break;

      case pergola.checkSystemInScene(
        pergolaConst.systemType.SlidingGlassDoor
      ) && dataAttr === 1:
        slideIcon.show();

        el.addClass("active");

        break;

      case pergola.checkSystemInScene(pergolaConst.systemType.GuilotineGlass) &&
        dataAttr === 2:
        gulIcon.show();

        el.addClass("active");

        break;
    }

    el.on("click", function () {
      const newDataAttr = el.data("component_id");
      const shadePop = uiGroups.get("shadePop");
      const slidePop = uiGroups.get("slidePop");
      const gulPop = uiGroups.get("gulPop");
      const bladePop = uiGroups.get("popUpBlade");

      const shadeIcon = jQuery("#shade-sys");
      const slideIcon = jQuery("#slide-sys");
      const gulIcon = jQuery("#gul-sys");

      shadeIcon.removeClass("active");
      slideIcon.removeClass("active");
      gulIcon.removeClass("active");

      shadePop.hide();
      slidePop.hide();
      gulPop.hide();
      bladePop.hide();

      function removeSystemFromSpanType(type) {
        const spans = pergola.span.objects;

        const spansWithActiveSystem = spans.filter((span) => {
          return span.systems.some(
            (system) => system.active && system.type === type
          );
        });

        spansWithActiveSystem.forEach((span) =>
          pergola.removeSystemFromSpan(span)
        );
      }

      setAllHotspotsVisibility(true);
      // pergola.settings.optionShade = null;
      // pergola.settings.optionSlide = null;
      // pergola.settings.optionGul = null;

      switch (true) {
        case newDataAttr === 0:
          pergola.settings.currentSubsystemType =
            pergolaConst.systemType.BlindShade;

          pergola.settings.optionShade = true;

          //TURN ON OPTION
          if (!el.hasClass("active")) {
            shadeIcon.show();

            uiGroups.get("shadePop").addClass("active");

            // console.log(
            //   "CLICK ON ELEMENY SUB ON",
            //   uiGroups.get("shadePop"),
            //   shadeIcon
            // );
          } else {
            //OFF OPTION

            // console.log("CLICK ON ELEMENY SUB OFF");

            shadeIcon.hide();
            shadePop.hide();

            removeSystemFromSpanType(pergolaConst.systemType.BlindShade);
            setAllHotspotsVisibility(false);

            pergola.settings.currentSubsystemType = null;
            pergola.settings.optionShade = null;
          }

          break;

        case newDataAttr === 1:
          pergola.settings.currentSubsystemType =
            pergolaConst.systemType.SlidingGlassDoor;
          pergola.settings.optionSlide = true;

          if (!el.hasClass("active")) {
            slideIcon.show();

            uiGroups.get("slidePop").addClass("active");
          } else {
            slideIcon.hide();
            slidePop.hide();

            removeSystemFromSpanType(pergolaConst.systemType.SlidingGlassDoor);
            setAllHotspotsVisibility(false);

            pergola.settings.currentSubsystemType = null;
            pergola.settings.optionSlide = null;
          }

          break;

        case newDataAttr === 2:
          pergola.settings.currentSubsystemType =
            pergolaConst.systemType.GuilotineGlass;
          pergola.settings.optionGul = true;

          if (!el.hasClass("active")) {
            gulIcon.show();

            uiGroups.get("gulPop").addClass("active");
          } else {
            gulIcon.hide();
            gulPop.hide();

            removeSystemFromSpanType(pergolaConst.systemType.GuilotineGlass);
            removeSystemFromSpanType(
              pergolaConst.systemType.GuilotineGlassSmall
            );
            setAllHotspotsVisibility(false);

            pergola.settings.currentSubsystemType = null;
            pergola.settings.optionGul = null;
          }

          break;
      }

      //#region POP INPUT SLIDE DOOR
      slidePop.find("#range_opening_group-14").on("input", (event) => {
        const { span_width, span_depth } = pergola.getSpanPoints();

        const shapekeyValueMax = 3.65; // hardcoded
        const louveraSky = pergola.settings.typePergola === 2;

        const shapekeyValueMaxSide = louveraSky ? 0.6 : 2.5; // hardcoded

        const valMax = interpolateValue(
          span_depth,
          1.6288000000000002,
          5.996,
          1,
          shapekeyValueMax
        );

        const shapekeyValue = interpolateValue(
          event.target.value, // INPUT VALUE,
          0,
          1,
          0,
          valMax
        );
        const shapekeyValueBigDoor = interpolateValue(
          event.target.value, // INPUT VALUE,
          0,
          1,
          0,
          valMax / 2.2
        );

        const valMaxSide = interpolateValue(
          span_width,
          1.2192,
          3.9624,
          1,
          shapekeyValueMaxSide
        );

        const shapekeyValueSide = interpolateValue(
          event.target.value, // INPUT VALUE,
          0,
          1,
          0,
          valMaxSide
        );

        const shapekeyValueSideBigDoor = interpolateValue(
          event.target.value, // INPUT VALUE,
          0,
          1,
          0,
          valMaxSide / 2.2
        );

        changeGlobalMorph("doors_open_L", shapekeyValue);
        changeGlobalMorph("doors_open_R_side", shapekeyValueSide);

        changeGlobalMorph("open_L", shapekeyValueBigDoor);
        changeGlobalMorph("open_R_side", shapekeyValueSideBigDoor);
      });

      //#endregion

      //#region POP INPUT GULLIATINE
      gulPop.find("#range_opening_group-15").on("input", (event) => {
        let correctMorphForShadeHightBottom = 0;
        let correctOffsetForShadeHightBottom = 0;

        const morphOffsetsBottom = {
          7: { morph: 0, offset: 0 },
          8: { morph: 0.2, offset: 0.2 },
          9: { morph: 0.3, offset: 0.22 },
          10: { morph: 0.5, offset: 0.33 },
          11: { morph: 0.7, offset: 0.43 },
          12: { morph: 0.9, offset: 0.47 },
        };

        if (morphOffsetsBottom[pergola.settings.height]) {
          correctMorphForShadeHightBottom =
            morphOffsetsBottom[pergola.settings.height].morph;

          correctOffsetForShadeHightBottom =
            morphOffsetsBottom[pergola.settings.height].offset;
        }

        const morphOpenShade = interpolateValue(
          event.target.value,
          0 + correctOffsetForShadeHightBottom,
          1
        );

        changeGlobalMorph(
          "open_guilotine",
          morphOpenShade + correctMorphForShadeHightBottom
        );
      });

      //#endregion
    });
  });

  //#region POP INPUT SHADE
  uiGroups
    .get("shadePop")
    .find("#range_opening_group-13")
    .val(pergola.settings.openShade);

  uiGroups
    .get("shadePop")
    .find("#range_opening_group-13")
    .on("input", function (event) {
      pergola.settings.openShade = event.target.value;

      pergola.updateSubsystems();
    });
  //#endregion

  //#region REMOVE POP UP
  // jQuery(".canvas_subsystem_menu").each(function () {
  //   jQuery(".ar_model_viewer").append(this);
  // });

  //#endregion

  // const originalFetch = window.fetch;
  // window.fetch = async (...args) => {
  //   const [resource, config] = args;

  //   if (
  //     typeof resource === "string" &&
  //     resource.includes("https://backend.leadconnectorhq.com/forms/submit")
  //   ) {
  //     console.log("🎯 Перехоплено fetch на submit форму!");

  //     // Твоя логіка тут
  //     alert("Форма на LeadConnector була відправлена!");
  //   }

  //   return originalFetch(...args);
  // };
}

async function startSettings() {
  prepareUI();
  updateUI();
  setTimeout(() => {
    settings3d();
  }, 500);
  prepareAR();
  assignUI();
  readUrlParams();

  createPergola(theModel);

  setTimeout(async () => {
    await afterModelLogic();
    adaptiveMobile();
  }, 1000);

  if (
    getMobileOperatingSystem() == "Android" ||
    getMobileOperatingSystem() == "iOS" ||
    getMobileOperatingSystem() == "VisionPro"
  ) {
    checkQRMobile();
  }

  promiseDelay(1000, () => {
    applyUiFromSettings();

    // scene.background = new THREE.Color("#ccdbcd");
    // scene.background = new THREE.Color("#d2d6d2");
    // scene.background = new THREE.Color("#bdc4be");
    scene.background = new THREE.Color("#6B83A1");

    setIsLoaderActive(false);
    jQuery(".configurator3d_post_cover").css("display", "none");
    jQuery("body").addClass("body-no-loader");
    jQuery("html").addClass("body-no-loader");

    scene.visible = true;
    animateScale(theModel);

    blockURLWriter = false;
    writeUrlParams(200, applyUiFromSettings);

    initRaycast();
  });
}

function createPergola(model) {
  pergola = new PergolaObject(pergolaSettings);
  pergola.createFrom3DModel(model);

  setTimeout(() => {
    applyUiFromSettings();
    deserializeSystems(subsystemsStringFromURL);
    // console.log("ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ ~ createPergola ~ pergola:", pergola);
  }, 750);
}
//#endregion

//#region CONSTANTS
const pergolaConst = {
  structureColorType: {
    // Standard: +structureColorTypeStandard_option.split("-")[1],
    // Wood: +structureColorTypeWood_option.split("-")[1],
  },
  side: {
    Left: 0,
    Right: 1,
    Front: 2,
    Back: 3,
    Center: 4,
  },
  sideString: {
    0: "Left",
    1: "Right",
    2: "Front",
    3: "Back",
    4: "Center",
  },
  corner: {
    RL: 0,
    RR: 1,
    FL: 2,
    FR: 3,
  },
  direction: {
    Straight: 0,
    Perpendicular: 1,
  },
  postPlace: {
    CornerFront: 0,
    CornerBack: 1,
    MiddleFront: 2,
    MiddleBack: 3,
    CornerBackLeft: 4,
    CornerBackRight: 5,
  },
  canopyType: {
    Fixed: 0,
    Moving: 1,
    Handle: 2,
    Led: 3,
  },
  systemType: {
    // BifoldDoor: 0,
    GuilotineGlass: 0,
    SlidingGlassDoor: 1,
    // LiftSlideDoor: 3,
    BlindShade: 3,
    GuilotineGlassSmall: 4,
    // Led: 5,
  },
  systemNameString: {
    GuilotineGlass: "Guilotine Glass",
    GuilotineGlassSmall: "Guilotine Glass",
    SlidingGlassDoor: "Sliding Glass",
    BlindShade: "Blinds & Shades",
  },
};

//#endregion

//#region SETTINGS
//! DEFAULT START SETTINGS
class PergolaSettings {
  constructor() {
    this.postWidthInterval = null;
    this.postDepthInterval = null;
    this.minWidth = null;
    this.minDepth = null;
    this.minHeight = null;
    this.maxWidth = null;
    this.maxDepth = null;
    this.maxHeight = null;
    this.canopyFixedDepthMin_m = null;
    this.canopyFixedDepthMax_m = null;
    this.canopyFixedDepthFolded_m = null;
    this.canopyMovingDepthMin_m = null;
    this.canopyMovingDepthMax_m = null;
    this.canopyMovingDepthFolded_m = null;
    this.roofBaseDepthMin_m = null;
    this.roofBaseDepthMax_m = null;
    this.width = null;
    this.depth = null;
    this.height = null;
    this.roofOpen = null;
    this.frameColorType = null;
    this.roofColorType = null;
    this.structureColorType = null;
    this.canopyColor = null;
    this.currentSubsystem = null;
    this.currentSubsystemKey = null;
    this.currentSpan = null;
    this.spanSet = null;
    this.subBifoldDoorColor = null;
    this.subGuilotineGlassColor = null;
    this.subSlidingGlassDoorColor = null;
    this.subLiftSlideDoorColor = null;
    this.subBlindShadeColor = null;
    this.subLeds = null;
    this.subLedColor = null;
    this.allSlide = null;
    this.currentOpeningSide = null;
    this.sideOptionHeater = null;
    this.sideOptionFan = null;
    this.mountingWall_Back = null;
    this.mountingWall_Left = null;
    this.mountingWall_Right = null;
    this.wallPosts = true;
    this.rotateLouver = null;
    this.typePergola = null;
    this.steel = false;
    this.louverInterval = null;
    this.widthLouver = null;
    this.backWall = null;
    this.leftWall = null;
    this.rightWall = null;
    this.perRGB = false;
    this.perLED = false;
    this.spotLED = false;
    this.heaters = false;
    this.fans = false;
    this.rgbColor = 8;
    this.currentSubsystemType = null;
    this.roofColor = null;
    this.frameColor = null;
    this.textColor = null;

    this.optionShade = null;
    this.optionSlide = null;
    this.optionGul = null;

    this.roofColorID = 0;
    this.frameColorID = 0;
    this.openShade = 0;
  }
}

function selectInterval(type, steel = false) {
  let intervalWidth = 0;
  let intervalLength = 0;
  let maxLouver = 0;
  let widthLouver = 0;

  switch (type) {
    case 0:
      intervalLength = 22;
      intervalWidth = steel ? 19.8 : 15;
      maxLouver = 15;
      widthLouver = 0.266425 / 1.2;

      break;

    case 1:
      intervalLength = 22;
      intervalWidth = steel ? 19.8 : 15;
      maxLouver = 15;
      widthLouver = 0.266425 / 1.2;

      break;

    case 2:
      intervalLength = 21;
      intervalWidth = steel ? 21 : 9;
      maxLouver = 9;
      widthLouver = 0.287285;

      break;

    case 3:
      intervalLength = 21;
      intervalWidth = steel ? 19.8 : 17;
      maxLouver = 17;
      widthLouver = 0.379976;

      break;

    case 4:
      intervalLength = steel ? 21 : 14;
      intervalWidth = steel ? 14 : 14;
      maxLouver = 14;
      widthLouver = 0.266425;

      break;

    default:
      console.log(`not have type`);

      break;
  }

  return {
    intervalWidth,
    intervalLength,
    maxLouver,
    widthLouver,
  };
}

//! Default Settings
const pergolaSettingsDefault = new PergolaSettings();

// const { intervalLength, intervalWidth, maxLouver } = selectInterval(
//   pergolaSettings.typePergola,
//   pergolaSettings.steel
// );

function changeDemisionParams(type, steel, settings) {
  const { intervalLength, intervalWidth, maxLouver, widthLouver } =
    selectInterval(type, steel);

  settings.postWidthInterval = intervalWidth;
  settings.postDepthInterval = intervalLength;
  settings.louverInterval = maxLouver;
  settings.widthLouver = widthLouver;
}

pergolaSettingsDefault.optionShade = null;
pergolaSettingsDefault.optionGul = null;
pergolaSettingsDefault.optionSlide = null;
pergolaSettingsDefault.openShade = 0;

pergolaSettingsDefault.roofColorID = null;
pergolaSettingsDefault.frameColorID = null;

pergolaSettingsDefault.textColor = false;
pergolaSettingsDefault.perRGB = false;
pergolaSettingsDefault.perLED = false;
pergolaSettingsDefault.spotLED = false;
pergolaSettingsDefault.heaters = false;
pergolaSettingsDefault.fans = false;
pergolaSettingsDefault.rgbColor = 8;
pergolaSettingsDefault.currentSubsystemType = false;

pergolaSettingsDefault.roofColor = false;
pergolaSettingsDefault.frameColor = false;

pergolaSettingsDefault.backWall = false;
pergolaSettingsDefault.leftWall = false;
pergolaSettingsDefault.rightWall = false;
pergolaSettingsDefault.louverInterval = 12;
pergolaSettingsDefault.widthLouver = 0.266425 / 1.2;
pergolaSettingsDefault.typePergola = 0;
pergolaSettingsDefault.steel = false;
pergolaSettingsDefault.rotateLouver = 1;
pergolaSettingsDefault.postWidthInterval = 19.8; //foot
pergolaSettingsDefault.postDepthInterval = 20.11; //foot
pergolaSettingsDefault.minWidth = 6; // foot
pergolaSettingsDefault.minDepth = 6; // foot
pergolaSettingsDefault.minHeight = 7; // foot
pergolaSettingsDefault.maxWidth = 40; // foot
pergolaSettingsDefault.maxDepth = 40; // foot
pergolaSettingsDefault.maxHeight = 12; // foot
pergolaSettingsDefault.canopyFixedDepthMin_m = 0.071669; // m
pergolaSettingsDefault.canopyFixedDepthMax_m = 0.071669; // m
pergolaSettingsDefault.canopyFixedDepthFolded_m = 0.071669; // m

pergolaSettingsDefault.canopyMovingDepthMin_m = 0.355; // m open
pergolaSettingsDefault.canopyMovingDepthMax_m = 0.355; // m open
pergolaSettingsDefault.canopyMovingDepthFolded_m = 0.074; // m close

pergolaSettingsDefault.roofBaseDepthMin_m = 1.74906; // m
pergolaSettingsDefault.roofBaseDepthMax_m = 4.33986; // m

pergolaSettingsDefault.width = 10; // foot
pergolaSettingsDefault.depth = 10; // foot
pergolaSettingsDefault.height = 8; // foot
pergolaSettingsDefault.roofOpen = 1; // 0 - closed, 1 - open
pergolaSettingsDefault.frameColorType =
  pergolaConst.structureColorType.Standard;
pergolaSettingsDefault.roofColorType = 0;
pergolaSettingsDefault.structureColorWood = 0;
pergolaSettingsDefault.canopyColor = 0;
pergolaSettingsDefault.currentSubsystem = null;
pergolaSettingsDefault.currentSubsystemKey = null;
pergolaSettingsDefault.currentSpan = null;

pergolaSettingsDefault.spanSet = new Set();

pergolaSettingsDefault.subBifoldDoorColor = 0;
pergolaSettingsDefault.subGuilotineGlassColor = 0;
pergolaSettingsDefault.subSlidingGlassDoorColor = 0;
pergolaSettingsDefault.subLiftSlideDoorColor = 0;
pergolaSettingsDefault.subBlindShadeColor = 32;
pergolaSettingsDefault.subLeds = false;
pergolaSettingsDefault.subLedColor = 0;

pergolaSettingsDefault.allSlide = false;
pergolaSettingsDefault.currentOpeningSide = false;
pergolaSettingsDefault.currentOpenValue = 0;

pergolaSettingsDefault.sideOptionHeater = 0;
pergolaSettingsDefault.sideOptionFan = 0;
pergolaSettingsDefault.mountingWall_Back = false;
pergolaSettingsDefault.mountingWall_Left = false;
pergolaSettingsDefault.mountingWall_Right = false;
pergolaSettingsDefault.wallPosts = false;

// Current Settings
const pergolaSettings = new PergolaSettings();

pergolaSettings.roofColorID = pergolaSettingsDefault.roofColorID;
pergolaSettings.frameColorID = pergolaSettingsDefault.frameColorID;
pergolaSettings.openShade = pergolaSettingsDefault.openShade;

pergolaSettings.optionShade = pergolaSettingsDefault.optionShade;
pergolaSettings.optionGul = pergolaSettingsDefault.optionGul;
pergolaSettings.optionSlide = pergolaSettingsDefault.optionSlide;

pergolaSettings.textColor = pergolaSettingsDefault.textColor;

pergolaSettings.rgbColor = pergolaSettingsDefault.rgbColor;

pergolaSettings.currentSubsystemType =
  pergolaSettingsDefault.currentSubsystemType;

pergolaSettings.roofColor = pergolaSettingsDefault.roofColor;
pergolaSettings.frameColor = pergolaSettingsDefault.frameColor;

pergolaSettings.perRGB = pergolaSettingsDefault.perRGB;
pergolaSettings.perLED = pergolaSettingsDefault.perLED;
pergolaSettings.spotLED = pergolaSettingsDefault.spotLED;
pergolaSettings.heaters = pergolaSettingsDefault.heaters;
pergolaSettings.fans = pergolaSettingsDefault.fans;

pergolaSettings.backWall = pergolaSettingsDefault.backWall;
pergolaSettings.leftWall = pergolaSettingsDefault.leftWall;
pergolaSettings.rightWall = pergolaSettingsDefault.rightWall;

pergolaSettings.widthLouver = pergolaSettingsDefault.widthLouver;
pergolaSettings.louverInterval = pergolaSettingsDefault.louverInterval;
pergolaSettings.typePergola = pergolaSettingsDefault.typePergola;
pergolaSettings.steel = pergolaSettingsDefault.steel;
pergolaSettings.rotateLouver = pergolaSettingsDefault.rotateLouver;

pergolaSettings.postWidthInterval = pergolaSettingsDefault.postWidthInterval;
pergolaSettings.postDepthInterval = pergolaSettingsDefault.postDepthInterval;

pergolaSettings.minWidth = pergolaSettingsDefault.minWidth;
pergolaSettings.minDepth = pergolaSettingsDefault.minDepth;
pergolaSettings.minHeight = pergolaSettingsDefault.minHeight;
pergolaSettings.maxWidth = pergolaSettingsDefault.maxWidth;
pergolaSettings.maxDepth = pergolaSettingsDefault.maxDepth;
pergolaSettings.maxHeight = pergolaSettingsDefault.maxHeight;
pergolaSettings.canopyFixedDepthMin_m =
  pergolaSettingsDefault.canopyFixedDepthMin_m;
pergolaSettings.canopyFixedDepthMax_m =
  pergolaSettingsDefault.canopyFixedDepthMax_m;
pergolaSettings.canopyFixedDepthFolded_m =
  pergolaSettingsDefault.canopyFixedDepthFolded_m;
pergolaSettings.canopyMovingDepthMin_m =
  pergolaSettingsDefault.canopyMovingDepthMin_m;
pergolaSettings.canopyMovingDepthMax_m =
  pergolaSettingsDefault.canopyMovingDepthMax_m;
pergolaSettings.canopyMovingDepthFolded_m =
  pergolaSettingsDefault.canopyMovingDepthFolded_m;
pergolaSettings.roofBaseDepthMin_m = pergolaSettingsDefault.roofBaseDepthMin_m;
pergolaSettings.roofBaseDepthMax_m = pergolaSettingsDefault.roofBaseDepthMax_m;

pergolaSettings.width = pergolaSettingsDefault.width;
pergolaSettings.depth = pergolaSettingsDefault.depth;
pergolaSettings.height = pergolaSettingsDefault.height;
pergolaSettings.roofOpen = pergolaSettingsDefault.roofOpen;
pergolaSettings.frameColorType = pergolaSettingsDefault.frameColorType;
pergolaSettings.roofColorType = pergolaSettingsDefault.roofColorType;
pergolaSettings.structureColorWood = pergolaSettingsDefault.structureColorWood;
pergolaSettings.canopyColor = pergolaSettingsDefault.canopyColor;
pergolaSettings.currentSubsystem = pergolaSettingsDefault.currentSubsystem;
pergolaSettings.currentSubsystemKey =
  pergolaSettingsDefault.currentSubsystemKey;
pergolaSettings.currentSpan = pergolaSettingsDefault.currentSpan;

pergolaSettings.spanSet = pergolaSettingsDefault.spanSet;

pergolaSettings.subBifoldDoorColor = pergolaSettingsDefault.subBifoldDoorColor;
pergolaSettings.subGuilotineGlassColor =
  pergolaSettingsDefault.subGuilotineGlassColor;
pergolaSettings.subSlidingGlassDoorColor =
  pergolaSettingsDefault.subSlidingGlassDoorColor;
pergolaSettings.subLiftSlideDoorColor =
  pergolaSettingsDefault.subLiftSlideDoorColor;
pergolaSettings.subBlindShadeColor = pergolaSettingsDefault.subBlindShadeColor;
pergolaSettings.subLeds = pergolaSettingsDefault.subLeds;
pergolaSettings.subLedColor = pergolaSettingsDefault.subLedColor;

pergolaSettings.allSlide = pergolaSettingsDefault.allSlide;
pergolaSettings.currentOpeningSide = pergolaSettingsDefault.currentOpeningSide;
pergolaSettings.currentOpenValue = pergolaSettingsDefault.currentOpenValue;

pergolaSettings.sideOptionHeater = pergolaSettingsDefault.sideOptionHeater;
pergolaSettings.sideOptionFan = pergolaSettingsDefault.sideOptionFan;
pergolaSettings.mountingWall_Back = pergolaSettingsDefault.mountingWall_Back;
pergolaSettings.mountingWall_Left = pergolaSettingsDefault.mountingWall_Left;
pergolaSettings.mountingWall_Right = pergolaSettingsDefault.mountingWall_Right;
pergolaSettings.wallPosts = pergolaSettingsDefault.wallPosts;

//#endregion

//#region READ/WRITE URL PARAMS
const settingsFieldsMapping = [
  "rgbColor",
  "roofColorID",
  "openShade",
  "steel",
  "frameColorID",
  "optionShade",
  "optionGul",
  "optionSlide",
  "textColor",
  "frameColor",
  "roofColor",
  "perRGB",
  "currentSubsystemType",
  "perLED",
  "spotLED",
  "heaters",
  "fans",
  "backWall",
  "leftWall",
  "rightWall",
  "typePergola",
  "rotateLouver",
  "width",
  "depth",
  "height",
  "frameColorType",
  "structureColorStandard",
  "roofColorType",
  "canopyColor",
  // 'subBifoldDoorColor',
  // 'subGuilotineGlassColor',
  // 'subSlidingGlassDoorColor',
  // 'subLiftSlideDoorColor',
  "subBlindShadeColor",
  "subLeds",
  // 'subLedColor',
  "sideOptionHeater",
  "sideOptionFan",
  "mountingWall_Back",
  "mountingWall_Left",
  "mountingWall_Right",
  "wallPosts",
];

function setPergolaSettingsFromURL(paramArray, callback = null) {
  qrScaned = parseInt(paramArray.pop());
  // sceneTime = (parseInt(paramArray.pop()) === 1) ? 'Night' : 'Day';
  subsystemsStringFromURL = paramArray.pop();

  settingsFieldsMapping.forEach((key, index) => {
    let value = paramArray[index];
    if (typeof pergolaSettings[key] === "boolean") {
      pergolaSettings[key] = parseInt(value) === 1;
    }
    // else if (key.includes('sub') && key.includes('Span')) {
    //   pergolaSettings[key] = new Set(value ? value.split('*') : []);
    // }
    else {
      pergolaSettings[key] = parseInt(value);
    }
  });

  paramsLoaded = true;
  if (callback) callback();
}

function getParametersString() {
  const splitValue = "-";
  const paramArray = settingsFieldsMapping.map((key) => {
    const value = pergolaSettings[key];

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    // else if (key.includes('sub') && key.includes('Span')) {
    //   return Array.from(value).join('*');
    // }
    else {
      return value;
    }
  });

  const systemsString = serializeSystems();
  paramArray.push(systemsString);
  paramArray.push(qrScaned);

  const parametersValue = paramArray.join(splitValue);
  return parametersValue.SEncode();
}

function readUrlParams(callback = null, url = null) {
  const queryString = url || window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const encodedParams = urlParams.get(parametersKey);

  if (!encodedParams) {
    paramsLoaded = true;
    if (callback) callback();
    return;
  }

  const decodedParams = encodedParams.SDecode();
  const paramArray = decodedParams.split("-");

  if (paramArray.length === 0) {
    paramsLoaded = true;
    if (callback) callback();
    return;
  }

  setPergolaSettingsFromURL(paramArray, callback);
}

function writeUrlParams(delay = 0, callback = () => {}) {
  let parametersString = getParametersString();
  if (!parametersString) {
    return;
  }

  const updateURLWithParameters = (params) => {
    const url = new URL(window.location.href);
    url.searchParams.set(parametersKey, params);
    history.pushState(null, "", url.toString());
  };

  if (delay === 0) {
    updateURLWithParameters(parametersString);
    callback();
  } else {
    setTimeout(() => {
      parametersString = getParametersString();
      updateURLWithParameters(parametersString);
      callback();
    }, delay);
  }
}

function serializeSystems() {
  if (!pergola) return;
  const systems = [];

  pergola.span.objects.forEach((span) => {
    if (span.isSystemSet) {
      const system = span.getCurrentSystem();
      if (system) {
        let openingside = "n";
        if (system.openingside !== null) {
          openingside = system.openingside ? "1" : "0";
        }

        const serialized = [
          span.side,
          span.number,
          system.type,
          openingside,
        ].join("*");
        systems.push(serialized);
      }
    }
  });

  return systems.join("_");
}

//! this function should be called after pergola is created
function deserializeSystems(stringFromURL) {
  if (!pergola) return;

  const systemsArray = stringFromURL.split("_");

  systemsArray.forEach((systemData) => {
    const [side, number, type, openingSide] = systemData.split("*");

    const span = pergola.getSpanBySideAndNumber(+side, +number);

    if (span) {
      const system = span.systems.find((sys) => sys.type === parseInt(+type));

      if (system) {
        let openingside = null;
        if (openingSide !== "n") {
          openingside = parseInt(openingSide) == 1 ? true : false;
        }

        system.active = true;
        system.openingside = openingside;
        system.openValue = 0;
        span.active = false;
        span.isLocked = true;
        span.isSystemSet = true;

        pergola.changeObjectVisibility(true, system.object);
      }
    }
  });

  pergola.update();
}

function getURLWithParameters() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // eslint-disable-next-line no-unused-vars
  const keys = urlParams.keys(),
    values = urlParams.values();
  const entries = urlParams.entries();

  var url = location.protocol + "//" + location.host + location.pathname + "?";

  var configEmpty = true;

  for (const entry of entries) {
    if (entry[0] == parametersKey) {
      url += parametersKey + "=" + getParametersString() + "&";
      configEmpty = false;
    } else {
      url += entry[0] + "=" + entry[1] + "&";
    }
  }

  if (configEmpty) {
    url += parametersKey + "=" + getParametersString();
  }

  if (url.endsWith("&")) {
    url = url.substring(0, url.length - 1);
  }

  return url;
}

//#endregion

//#region ASSIGN UI
function assignUI() {
  jQuery(document).ready(function () {
    //* Dimensions
    const onChangeDimensions = (dimensionName, value) => {
      pergolaSettings[dimensionName] = value;
      pergola.update();

      //CHECK POP UP RELATIVE BY MODEL
      const optionsSub = uiGroups.get("subSystems").find(".option");

      if (
        !pergola.checkSystemInScene(pergolaConst.systemType.BlindShade) &&
        optionsSub.eq(0).hasClass("active")
      ) {
        optionsSub.eq(0).trigger("click");
        pergolaSettings.currentSubsystemType = null;
      }

      if (
        !pergola.checkSystemInScene(pergolaConst.systemType.SlidingGlassDoor) &&
        optionsSub.eq(1).hasClass("active")
      ) {
        optionsSub.eq(1).trigger("click");
        pergolaSettings.currentSubsystemType = null;
      }

      if (
        !pergola.checkSystemInScene(pergolaConst.systemType.GuilotineGlass) &&
        optionsSub.eq(2).hasClass("active")
      ) {
        optionsSub.eq(2).trigger("click");
        pergolaSettings.currentSubsystemType = null;
      }
    };

    // Width
    jQuery(document).on(
      "input change",
      `#${rangeWidth_group} input[type='range']`,
      function () {
        onChangeDimensions("width", +this.value);
      }
    );

    // Depth
    jQuery(document).on(
      "input change",
      `#${rangeDepth_group} input[type='range']`,
      function () {
        onChangeDimensions("depth", +this.value);
      }
    );

    // Height
    jQuery(document).on(
      "input change",
      `#${rangeHeight_group} input[type='range']`,
      function () {
        onChangeDimensions("height", +this.value);
      }
    );

    //* Structure color Type
    jQuery(document).on(
      "click",
      `.${structureColorTypeStandard_option}`,
      () => {
        // Standard Colors
        // pergolaSettings.frameColorType =
        //   pergolaConst.structureColorType.Standard;
        // pergola.update();
      }
    );

    jQuery(document).on("click", `.${structureColorTypeWood_option}`, () => {
      // Wood Effect Finish
      // pergolaSettings.structureColorType  = pergolaConst.structureColorType.Wood;
      // pergola.update();
    });

    //* All Color options
    // Object.keys(colorOptionPrefixes).forEach((key) => {
    //   const optPrefix = colorOptionPrefixes[key];

    //   jQuery(document).on("click", `[class*="${optPrefix}"]`, function () {
    //     const className = jQuery(this).attr("class");
    //     const parts = className.split(" ");

    //     for (let i = 0; i < parts.length; i++) {
    //       if (parts[i].startsWith(optPrefix)) {
    //         const colorIndex = parseInt(parts[i].split(optPrefix)[1], 10);
    //         pergolaSettings[key] = colorIndex;
    //         pergola.update();
    //         break;
    //       }
    //     }
    //   });
    // });

    //* Sub Systems group

    Object.keys(subSystems_options).forEach((key) => {
      const option = subSystems_options[key].option;

      jQuery(document).on("click", `.${option}`, function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (option) {
          pergolaSettings.currentSubsystem = pergolaConst.systemType[key];
          pergolaSettings.currentSubsystemKey = key;

          if (pergolaSettings.subLeds) {
            jQuery(`.${option}`).addClass("checked");
          }
        } else {
          //! Led
          pergolaSettings.currentSubsystem = null;
          pergolaSettings.currentSubsystemKey = null;
          // pergolaSettings.subLeds = true;
          jQuery(`.${option}`).addClass("checked");
        }

        // resetSubSystemPopups();
        // makeRestOptionsInactive(subSystems_group); //? removed by design
        pergola && pergola.update();
      });

      // Add to all free span btn
      jQuery(document).on(
        "click",
        `.${option} .component__button_all`,
        function () {
          if (jQuery(this).closest(".option").hasClass("active")) {
            setHotspotsByGroupVisibility("subsystems", false);
            pergolaSettings.currentSubsystem = pergolaConst.systemType[key];
            pergolaSettings.currentSubsystemKey = key;
            pergola && pergola.putCurrentMenuSystemToAllFreeSpans();
          }
        }
      );
    });

    jQuery(document).on(
      "change",
      ".subsystem__menu input[type='radio']",
      function () {
        if (pergola) {
          const span = pergola.settings.currentSpan;
          if (!span) {
            return;
          }
          const system = span.getCurrentSystem();
          system.openingside = this.value === "Left" ? true : false;
          pergolaSettingsDefault.currentOpenValue = system.openValue;
          pergolaSettings.currentOpeningSide = system.openingside;
          pergola.update();
        }
      }
    );

    //* All Slide together
    jQuery(document).on(
      "click",
      ".subsystem__menu .tumbler-wrapper",
      function () {
        jQuery(this).toggleClass("active");
        const checkbox = jQuery(this).find(".allSlide_input");
        const isChecked = jQuery(this).hasClass("active") ? true : false;
        checkbox.prop("checked", isChecked);

        if (isChecked) {
          jQuery(".subsystem__menu .tumbler-wrapper").addClass("active");
        } else {
          jQuery(".subsystem__menu .tumbler-wrapper").removeClass("active");
        }

        pergolaSettings.allSlide = isChecked;
        pergola.update();
      }
    );

    //* Opening percentage
    jQuery(document).on(
      "input change",
      ".subsystem__menu input[type='range']",
      function () {
        pergolaSettings.currentOpenValue = +this.value;
        pergola && pergola.openingSubsystems(+this.value);
      }
    );

    //* Side Options
    jQuery(document).on("click", `.${sideOptionHeater_option}`, () => {
      // Heater
      if (jQuery(`.${sideOptionHeater_option}`).hasClass("active")) {
        pergolaSettings.sideOptionHeater = 1;
      } else {
        pergolaSettings.sideOptionHeater = 0;
      }
      pergola.update();
    });

    jQuery(document).on("click", `.${sideOptionFan_option}`, () => {
      // Fan
      if (jQuery(`.${sideOptionFan_option}`).hasClass("active")) {
        pergolaSettings.sideOptionFan = 1;
      } else {
        pergolaSettings.sideOptionFan = 0;
      }
      pergola.update();
    });

    //* Delete mounting wall
    jQuery(document).on(
      "click",
      ".canvas_menu__wall .canvas_menu__icon_delete",
      () => {
        pergolaSettings.mountingWall_Back = false;
        pergolaSettings.mountingWall_Left = false;
        pergolaSettings.mountingWall_Right = false;
        pergola.update();
      }
    );

    jQuery(document).on("click", "#btnWall", () => {
      // pergola.changeMountingWall();
    });

    jQuery(document).on(
      "click",
      ".canvas_menu__wall .canvas_menu__icon_close",
      () => {
        // pergola.changeMountingWall();
      }
    );

    //* Keep posts (for wall posts)
    jQuery(document).on("change", "#wall_checkbox", function () {
      pergolaSettings.wallPosts = this.checked;
      pergola.update();
    });

    //* Close Open Roof
    const onRoofOpening = (value) => {
      // 0 - 1
      pergolaSettings.roofOpen = value;
      pergola.update();
    };

    jQuery(document).on(
      "input change",
      ".canvas_menu__blade input[type='range']",
      function () {
        onRoofOpening(this.value);
      }
    );
  });
}

function applyUiFromSettings() {
  //* Dimensions
  const inputWidth = jQuery(`#${rangeWidth_group} input[type='range']`);
  const inputDepth = jQuery(`#${rangeDepth_group} input[type='range']`);
  const inputHeight = jQuery(`#${rangeHeight_group} input[type='range']`);

  inputWidth.val(pergolaSettings.width).trigger("change");
  inputDepth.val(pergolaSettings.depth).trigger("change");
  inputHeight.val(pergolaSettings.height).trigger("change");
  updateRangeBackgroundAndLabel(inputWidth);
  updateRangeBackgroundAndLabel(inputDepth);
  updateRangeBackgroundAndLabel(inputHeight);

  //* Structure color Type
  jQuery(
    `.${structureColorTypeStandard_option.split("-")[0]}-` +
      pergolaSettings.frameColorType
  ).trigger("click");

  //* All Color options
  Object.keys(colorOptionPrefixes).forEach((key) => {
    jQuery(`.${colorOptionPrefixes[key]}${pergolaSettings[key]}`).trigger(
      "click"
    );
  });

  //* Side Options
  if (
    pergolaSettings.heaters == 1 &&
    !jQuery(`.${sideOptionHeater_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionHeater_option}`).trigger("click");
  } else if (
    pergolaSettings.heaters == 0 &&
    jQuery(`.${sideOptionHeater_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionHeater_option}`).trigger("click");
  }

  if (
    pergolaSettings.fans == 1 &&
    !jQuery(`.${sideOptionFan_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionFan_option}`).trigger("click");
  } else if (
    pergolaSettings.fans == 0 &&
    jQuery(`.${sideOptionFan_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionFan_option}`).trigger("click");
  }

  //* Keep posts (for wall posts)
  jQuery(document).on("change", "#wall_checkbox", function () {
    pergolaSettings.wallPosts = this.checked;
    pergola.update();
  });

  if (pergolaSettings.wallPosts && !jQuery(`#wall_checkbox`).prop("checked")) {
    jQuery(`#wall_checkbox`).attr("checked", true);
  } else if (
    !pergolaSettings.wallPosts &&
    jQuery(`#wall_checkbox`).prop("checked")
  ) {
    jQuery(`#wall_checkbox`).attr("checked", false);
  }

  if (pergolaSettings.subLeds) {
    jQuery(`.${subSystems_options.Led.option}`).addClass("checked");
  }
}

//#endregion

//#region PERGOLA CLASSES
//* ROOF
class PergolaRoof {
  constructor() {
    this.open = 0;
    this.glassroomBeamsX = [];
    this.baseBeams = [];
    this.baseBeamsX = [];

    this.fanBeams = [];
    this.leds = [];

    this.louvers = [];
    this.louversCLones = [];
    this.louversCLonesLight = [];

    this.louversSky = [];
    this.louversSkyClones = [];

    this.louversGlass = [];
    this.louversGlassClones = [];

    this.pergolaFlats = [];
    this.pergolaFlatsClones = [];
    this.trailsFlats = [];

    this.glassroom = [];
  }
}

class PergolaRoofObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.object = null;
    this.direction = null;
    this.active = false;
  }
}

//* POSTS
class PergolaPost {
  constructor() {
    this.leftPosts = [];
    this.rightPosts = [];
    this.frontPosts = [];
    this.backPosts = [];
    this.glassroomPosts = [];
    this.glassroomMidlePostsBig = [];
    this.glassroomMidlePostsSmall = [];
    this.midlePosts = [];
  }
}

class PergolaPostObject {
  constructor() {
    this.name = "";
    this.object = null;
    this.place = null;
    this.active = false;
  }
}

//* WALL MOUNTING
class PergolaMountingWall {
  constructor() {
    this.elements = [];
  }
}

class PergolaMountingWallElement {
  constructor() {
    this.name = "";
    this.labelObject = null;
    this.side = null;
    this.object = null;
    this.active = false;
  }
}

//* SYSTEMS
class PergolaSystem {
  constructor() {
    this.objects = [];
  }
}

class PergolaSystemObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.spanWidth = null;
    this.spanHeight = null;
    this.direction = null;
    this.side = null;
    this.posX = 0;
    this.posZ = 0;
    this.openingside = null;
    this.openValue = 0;
    this.color = null;
    this.object = null;
    this.active = false;
    this.isLocked = false;
    this.windowObject = null;
    this.windowPosX = 0;
    this.windowPosZ = 0;
    this.doorQty = 0;
  }
}

//* SPANS
class PergolaSpan {
  constructor() {
    this.objects = [];
  }
}

class Glassroom {
  constructor() {
    this.objects = [];
  }
}

class PergolaSpanObject {
  constructor() {
    this.side = null;
    this.number = 0;
    this.width = null;
    this.height = null;
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.offsetY = 0.2;
    this.avatar = null;
    this.hotspot = null;
    this.active = false;
    this.isSystemSet = false;
    this.systems = [];
    this.isLocked = false;

    this.getCurrentSystem = () => {
      return this.systems.find((system) => {
        return system.active;
      });
    };
  }
}
//#endregion

//#region PERGOLA OBJECT
class PergolaObject {
  constructor(settings) {
    this.type = null;
    this.width = settings.width || 0;
    this.depth = settings.depth || 0;
    this.height = settings.height || 0;
    this.originZ = 0;
    this.roof = new PergolaRoof();
    this.post = new PergolaPost();
    this.span = new PergolaSpan();
    this.system = new PergolaSystem();
    this.mountingWall = new PergolaMountingWall();
    this.currentWall = [];
    this.settings = settings;
    this.lastSettings = new PergolaSettings();
    this.model = null;
    this.basePegola = null;
    this.glassroomFront = null;
    this.glassroomBack = null;
    this.glassroomRoof = null;
    this.baseMidleFirst = null;
    this.baseMidleSecond = null;
    this.pointLights = [];
    this.pointLightsGlassroom = [];
    this.heaters = [];
    this.heatersGlassroomBack = [];
    this.heatersGlassroomFront = [];
    this.fansBeams = [];
    this.fans = [];
    this.windForGlassroom = [];
    this.windForGlassroomSide = [];
    this.smallGlassroomPointLight = [];
    this.mediumGlassroomPointLight = [];
    this.largeGlassroomPointLight = [];
  }

  createFrom3DModel(model) {
    if (!model) {
      return;
    }

    this.model = model;
    this.originZ = 0;

    this.model.traverse((o) => {
      if (!o) {
        // console.warn("Undefined node in traverse!");
        return;
      }
      // //* WALLS (using hotspots)
      // if (
      //   o.name === "wall_R" ||
      //   o.name === "wall_L" ||
      //   o.name === "wall_back"
      // ) {
      //   const mountingWall = new PergolaMountingWallElement();

      //   mountingWall.name = o.name;
      //   // console.log(o);
      //   mountingWall.object = o;

      //   this.mountingWall.elements.push(mountingWall);
      // }

      //* SYSTEM
      const systemElements = {
        guilotine: {
          type: pergolaConst.systemType.GuilotineGlass,
          name: "GuilotineGlass",
        },
        guilotine002: {
          type: pergolaConst.systemType.GuilotineGlassSmall,
          name: "GuilotineGlassSmall",
        },
        sliding_doors: {
          type: pergolaConst.systemType.SlidingGlassDoor,
          name: "SlidingGlassDoor",
        },
        zip_shade: {
          type: pergolaConst.systemType.BlindShade,
          name: "BlindShade",
        },
      };

      Object.keys(systemElements).forEach((key) => {
        if (o.name.includes(key)) {
          const systemObject = new PergolaSystemObject();
          systemObject.name = systemElements[key].name;
          systemObject.object = o;
          systemObject.type = systemElements[key].type;
          systemObject.direction = pergolaConst.direction.Perpendicular;
          systemObject.openingside = true;
          systemObject.side = pergolaConst.side.Left;

          if (o.name.includes("_side")) {
            systemObject.direction = pergolaConst.direction.Straight;
            systemObject.side = pergolaConst.side.Front;
          }

          this.system.objects.push(systemObject);
        }
      });
    });

    // ---------------------------------
    this.prepareBase();
    this.preparePosts();
    this.prepareModel();
    this.animateFans();
    this.prepareSystems();
    this.prepareSpans();

    parseMorphByModel(this.model);

    this.update();
  }

  // ---------------------------------
  preparePosts() {
    const minInterval = 7.5;

    const qtyMiddlePostsWidth = Math.floor(
      this.settings.maxWidth / minInterval
    );

    this.clonePostObject(qtyMiddlePostsWidth + 1, "leftPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "rightPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "frontPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "backPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "glassroomPosts");

    this.clonePostObject(2, "glassroomMidlePostsBig");

    this.clonePostObject(2, "glassroomMidlePostsSmall");

    this.clonePostObject(12, "midlePosts");
  }

  toggleParamLed(status, color = "#FFFFFF") {
    const setEmissiveColor = (material, color) => {
      if (typeof color === "string" && color.startsWith("#")) {
        material.emissive.set(color);
      } else {
        const prepareColor = new THREE.Color(color.r, color.g, color.b);
        material.emissive.set(prepareColor);
      }
    };

    this.model.traverse((o) => {
      if (o.name === "base" || o.name === "base_beam" || o.name === "Y_beam") {
        const emissiveMaterial = o.children[1].material;

        emissiveMaterial.emissiveIntensity = status ? 1 : 0;
        emissiveMaterial.visible = status;

        if (status) {
          setEmissiveColor(emissiveMaterial, color);
        }
      }
    });
  }

  prepareOptions() {
    //#region TURN OFF PERIMETR LED
    this.toggleParamLed(false);
    //#endregion
  }

  clonePostObject(count, side) {
    const element = this.getPost(side);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName("Scene");

      if (parent) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      const postObject = new PergolaPostObject();
      postObject.name = element.name;
      postObject.object = clonedMesh;
      postObject.place = side;
      this.post[side].push(postObject);
    }
  }

  getPost(side) {
    let element;

    if (this.post == null) {
      return;
    }

    if (side === "leftPosts") {
      this.model.traverse((o) => {
        if (o.name === "post_L") {
          element = o;
        }
      });
    }

    if (side === "rightPosts") {
      this.model.traverse((o) => {
        if (o.name === "post_R") {
          element = o;
        }
      });
    }

    if (side === "frontPosts") {
      this.model.traverse((o) => {
        if (o.name === "post_F") {
          element = o;
        }
      });
    }

    if (side === "backPosts") {
      this.model.traverse((o) => {
        if (o.name === "post_B") {
          element = o;
        }
      });
    }

    if (side === "glassroomPosts") {
      this.model.traverse((o) => {
        if (o.name === "base_back_post") {
          element = o;
        }
      });
    }

    if (side === "glassroomMidlePostsBig") {
      this.model.traverse((o) => {
        if (o.name === "base_midle_2002") {
          element = o;
        }
      });
    }

    if (side === "glassroomMidlePostsSmall") {
      this.model.traverse((o) => {
        if (o.name === "base_midle_1002") {
          element = o;
        }
      });
    }

    if (side === "midlePosts") {
      this.model.traverse((o) => {
        if (o.name === "post_Ð¡") {
          element = o;
          // console.log(o, "Post");
        }
      });
    }

    return element;
  }
  // ---------------------------------
  prepareModel() {
    const offset = this.settings.widthLouver;
    const maxBeam = 6;
    const qtyBeams = maxBeam;
    const qtyLouver = qtyBeams + 1;

    const qtyLouversClones = Math.floor(
      this.getMeters(this.settings.maxDepth) / offset
    );

    this.cloneRoofObject("baseBeams", qtyBeams);
    this.cloneRoofObject("glassroomBeamsX", qtyBeams + 10);
    this.cloneRoofObject("baseBeamsX", qtyBeams);

    this.cloneRoofObject("louvers", qtyLouver);
    this.cloneForLouver(
      "louvers",
      qtyLouver,
      qtyLouversClones,
      this.roof.louversCLones
    );

    this.cloneRoofObject("louversSky", qtyLouver);
    this.cloneForLouver(
      "louversSky",
      qtyLouver,
      qtyLouversClones,
      this.roof.louversSkyClones
    );

    this.cloneForLouver(
      "louversCLonesLight",
      qtyLouver,
      qtyLouversClones,
      this.roof.louversCLonesLight
    );

    this.cloneRoofObject("louversGlass", qtyLouver);
    this.cloneForLouver(
      "louversGlass",
      qtyLouver,
      qtyLouversClones,
      this.roof.louversGlassClones
    );

    this.cloneRoofObject("pergolaFlats", qtyLouver);
    this.cloneForLouver(
      "pergolaFlats",
      qtyLouver,
      qtyLouversClones,
      this.roof.pergolaFlatsClones
    );

    this.cloneRoofObject("trailsFlats", qtyLouver);
    this.cloneInObject("pointLights", 100);
    this.cloneInObject("pointLightsGlassroom", 39);
    this.cloneInObject("heaters", 16);
    this.cloneInObject("heatersGlassroomBack", 16);
    this.cloneInObject("heatersGlassroomFront", 16);
    this.cloneInObject("fansBeams", qtyBeams + 1);
    this.cloneInObject("fans", (qtyBeams + 1) * 3);
    this.cloneInObject("windForGlassroom", 2);
    this.cloneInObject("windForGlassroomSide", 1);

    this.cloneInObject("smallGlassroomPointLight", 18);
    this.cloneInObject("mediumGlassroomPointLight", 18);
    this.cloneInObject("largeGlassroomPointLight", 18);
  }

  animateFans() {
    const animationStates = new WeakMap();

    for (let i = 0; i < this.fans.length; i++) {
      const elementFan = this.fans[i];

      this.animateGroup(elementFan.object, true, animationStates);
    }
  }

  cloneForLouver(type, qtyOriginalZ, qtyClonesX, container) {
    for (let i = 0; i < qtyOriginalZ; i++) {
      const arrayClones = [];

      for (let a = 0; a < qtyClonesX; a++) {
        const element = this.getRoofElement(type);
        let clone = element.clone();

        const roofObject = new PergolaRoofObject();
        roofObject.name = element.name;
        roofObject.type = element.type;
        roofObject.object = clone;

        this.model.add(clone);

        arrayClones.push(roofObject);
      }

      container.push(arrayClones);
    }
  }

  cloneRoofObject(
    type = "baseBeams",
    count,
    needToAdd = true,
    parentName = "Scene"
  ) {
    const element = this.getRoofElement(type);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName(parentName);
      if (needToAdd && parent) {
        parent.add(clonedMesh);
      }
      if (needToAdd && !parent) {
        scene.add(clonedMesh);
      }

      const roofObject = new PergolaRoofObject();
      roofObject.name = element.name;
      roofObject.type = element.type;
      roofObject.object = clonedMesh;
      this.roof[type].push(roofObject);
    }
  }

  cloneInObject(
    type = "baseBeams",
    count,
    needToAdd = true,
    parentName = "Scene"
  ) {
    const element = this.getRoofElement(type);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName(parentName);
      if (needToAdd && parent) {
        parent.add(clonedMesh);
      }
      if (needToAdd && !parent) {
        scene.add(clonedMesh);
      }

      const roofObject = new PergolaRoofObject();
      roofObject.name = element.name;
      roofObject.type = element.type;
      roofObject.object = clonedMesh;
      this[type].push(roofObject);
    }
  }

  getRoofElement(type = "beams", name = null) {
    let element;

    if (type === "baseBeams") {
      this.model.traverse((o) => {
        if (o.name === "base_beam") {
          element = o;
        }
      });
    }

    if (type === "louvers") {
      this.model.traverse((o) => {
        if (o.name === "louver") {
          element = o;
        }
      });
    }

    if (type === "louversSky") {
      this.model.traverse((o) => {
        if (o.name === "louver") {
          element = o;
        }
      });
    }

    if (type === "louversGlass") {
      this.model.traverse((o) => {
        if (o.name === "Louvera_skye") {
          element = o;
        }
      });
    }

    if (type === "pergolaFlats") {
      this.model.traverse((o) => {
        if (o.name === "pergoflat") {
          element = o;
        }
      });
    }

    if (type === "baseBeamsX") {
      this.model.traverse((o) => {
        if (o.name === "Y_beam") {
          element = o;
        }
      });
    }

    if (type === "glassroomBeamsX") {
      this.model.traverse((o) => {
        if (o.name === "glassroom_beam_Y") {
          element = o;
        }
      });
    }

    if (type === "trailsFlats") {
      this.model.traverse((o) => {
        if (o.name === "pergoflatrail") {
          element = o;
        }
      });
    }

    if (type === "pointLights") {
      this.model.traverse((o) => {
        if (o.name === "point_light") {
          element = o;
        }
      });
    }

    if (type === "pointLightsGlassroom") {
      this.model.traverse((o) => {
        if (o.name === "point_light_1-3") {
          element = o;
        }
      });
    }

    if (type === "heaters") {
      this.model.traverse((o) => {
        if (o.name === "heater") {
          element = o;
        }
      });
    }

    if (type === "heatersGlassroomBack") {
      this.model.traverse((o) => {
        if (o.name === "heater_glass_back") {
          element = o;
        }
      });
    }

    if (type === "heatersGlassroomFront") {
      this.model.traverse((o) => {
        if (o.name === "heater_glass_front") {
          element = o;
        }
      });
    }

    if (type === "fansBeams") {
      this.model.traverse((o) => {
        if (o.name === "fan_beam") {
          element = o;
        }
      });
    }

    if (type === "fans") {
      this.model.traverse((o) => {
        if (o.name === "fan") {
          element = o;
        }
      });
    }

    if (type === "louversCLonesLight") {
      this.model.traverse((o) => {
        if (o.name === "louver-light") {
          element = o;
        }
      });
    }

    if (type === "windForGlassroom") {
      this.model.traverse((o) => {
        if (o.name === "side_win") {
          element = o;
        }
      });
    }

    if (type === "windForGlassroomSide") {
      this.model.traverse((o) => {
        if (o.name === "back_win") {
          element = o;
        }
      });
    }

    if (type === "smallGlassroomPointLight") {
      this.model.traverse((o) => {
        if (o.name === "point_light_1-3") {
          element = o;
        }
      });
    }

    if (type === "mediumGlassroomPointLight") {
      this.model.traverse((o) => {
        if (o.name === "point_light_2-3") {
          element = o;
        }
      });
    }

    if (type === "largeGlassroomPointLight") {
      this.model.traverse((o) => {
        if (o.name === "point_light_3-3") {
          element = o;
        }
      });
    }

    return element;
  }

  // ---------------------------------
  prepareSystems() {
    const qtySpansWidth = 6;
    const qtySpansDepth = 3;

    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlass,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlassSmall,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );

    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlass,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlassSmall,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );

    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlass,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlassSmall,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );

    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlass,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuilotineGlassSmall,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );

    // this.assignWindowsToSystems();
  }

  assignWindowsToSystems() {
    const win_up_side_L = scene.getObjectByName("win_up_side_L");
    const win_up_side_R = scene.getObjectByName("win_up_side_R");
    const win_up_back = scene.getObjectByName("win_up_back");
    const win_up = scene.getObjectByName("win_up");

    win_up_side_L.visible = false;
    win_up_side_R.visible = false;
    win_up_back.visible = false;
    win_up.visible = false;

    const baseObjects = {
      [pergolaConst.side.Left]: win_up_side_L,
      [pergolaConst.side.Right]: win_up_side_R,
      [pergolaConst.side.Back]: win_up_back,
      [pergolaConst.side.Front]: win_up,
    };

    for (const side in baseObjects) {
      if (!baseObjects[side]) {
        console.warn(`Object for side ${side} not found on the scene.`);
        return;
      }
    }

    this.system.objects.forEach((obj) => {
      const side = obj.side;

      if (baseObjects[side]) {
        const clonedObject = baseObjects[side].clone();
        this.model.add(clonedObject);
        clonedObject.visible = false;
        obj.windowObject = clonedObject;
      } else {
        console.warn(`Side ${side} does not match any known objects.`);
      }
    });

    scene.remove(win_up_side_L, win_up_side_R, win_up_back, win_up);
  }

  cloneSystemObject(type, direction, side, count) {
    const element = this.getSystem(null, type, direction);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.object.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName("Scene");

      if (parent) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      if (side === pergolaConst.side.Right || side === pergolaConst.side.Back) {
        clonedMesh.scale.z = -1;
      }

      const systemObject = new PergolaSystemObject();
      systemObject.name = element.name;
      systemObject.object = clonedMesh;
      systemObject.type = type;
      systemObject.direction = direction;
      systemObject.side = side;

      this.system.objects.push(systemObject);
    }
  }

  getSystem(name = null, type = null, direction = null, side = null) {
    if (this.system == null) {
      return;
    }
    if (this.system.objects == null) {
      return;
    }
    if (!this.system.objects) {
      return;
    }

    for (let i = 0; i < this.system.objects.length; i++) {
      const element = this.system.objects[i];

      if (name != null) {
        if (element.name != name) {
          continue;
        }
      }
      if (type != null) {
        if (element.type != type) {
          continue;
        }
      }
      if (direction != null) {
        if (element.direction != direction) {
          continue;
        }
      }
      if (side != null) {
        if (element.side != side) {
          continue;
        }
      }

      return element;
    }
  }

  prepareBase() {
    this.model.traverse((o) => {
      if (o.name === "base") {
        this.basePegola = o;
        this.basePegola.visible = true;
        this.basePegola.children.forEach((child) => (child.visible = true));
      }

      if (o.name === "base_front") {
        this.glassroomFront = o;
      }

      if (o.name === "base_back") {
        this.glassroomBack = o;
      }

      if (o.name === "glassroom_roof") {
        this.glassroomRoof = o;
      }

      if (o.name === "base_midle_1") {
        this.baseMidleFirst = o;
      }

      if (o.name === "base_midle_2") {
        this.baseMidleSecond = o;
      }
    });
  }

  // =============================================================
  update() {
    this.changeDimensions();
    this.setRoof();
    this.setPosts();
    this.setWall();
    this.setOptions();

    this.setSpans();
    this.checkCorrectGulCurrent();
    this.updateSubsystems();
    this.syncInputWithSettings();

    this.showAvailableSpans();

    this.setGlassroomCenterPosts();
    // this.changeMountingWall();

    this.updatePopUpAndOverview();

    writeUrlParams(200);
    //? the writeUrlParams in the afterChangeDelegate();
  }

  getQtySystems(type) {
    let count = 0;

    // Helper function to check if the system matches the provided type
    const isGulSystem = (system) => {
      return (
        system.type === pergolaConst.systemType.GuilotineGlass ||
        system.type === pergolaConst.systemType.GuilotineGlassSmall
      );
    };

    // Iterate over all spans and their systems
    this.span.objects.forEach((span) => {
      span.systems.forEach((system) => {
        let compareGul = false;

        // Check if the system type matches the provided type
        if (
          type === pergolaConst.systemType.GuilotineGlass ||
          type === pergolaConst.systemType.GuilotineGlassSmall
        ) {
          compareGul = isGulSystem(system);
        } else {
          compareGul = system.type === type;
        }

        if (system.active && compareGul) {
          // Special check for BlindShade, GuilotineGlass, and GuilotineGlassSmall systems
          if (
            (type === pergolaConst.systemType.BlindShade ||
              isGulSystem(system)) &&
            system.object.children.some(
              (child) => child.name.includes("post") && child.visible
            )
          ) {
            count++;
          }
          count++; // Increment count for matching system
        }
      });
    });

    return count;
  }

  checkCorrectGulCurrent() {
    const spanWithSystem = this.span.objects.filter((span) => span.isSystemSet);

    spanWithSystem.forEach((span) => {
      const activeSystem = span.systems.find((system) => system.active);

      if (
        activeSystem.type === pergolaConst.systemType.GuilotineGlass &&
        pergolaSettings.height <= 8
      ) {
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);

          if (system.type === pergolaConst.systemType.GuilotineGlassSmall) {
            system.active = true;
          }
        });
      } else if (
        activeSystem.type === pergolaConst.systemType.GuilotineGlassSmall &&
        pergolaSettings.height > 8
      ) {
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);

          if (system.type === pergolaConst.systemType.GuilotineGlass) {
            system.active = true;
          }
        });
      }
    });
  }

  updatePopUpAndOverview() {
    //#region UPDATE RGB POP
    const rgbIcon = jQuery("#rgbIcon");

    if (rgbIcon.hasClass("active")) {
      rgbIcon.trigger("click");
    }
    //#endregion

    if (
      jQuery(`#${subSystems_options.SlidingGlassDoor.group}`).hasClass(
        "active"
      ) ||
      jQuery(`#${subSystems_options.BlindShade.group}`).hasClass("active")
    ) {
      // const sys = this.settings.currentSpan.getCurrentSystem();
      const bladeIcon = jQuery("#btnWall");

      if (
        // sys &&
        !bladeIcon.hasClass("active") &&
        pergola.settings.currentSubsystemType !== null
      ) {
        const radioGroup_SlidingGlassDoor = jQuery(
          `#${subSystems_options.SlidingGlassDoor.group} .canvas_menu__item_radio`
        );
        const radioGroup_BlindShade = jQuery(
          `#${subSystems_options.BlindShade.group} .canvas_menu__item_radio`
        );

        // radioGroup_SlidingGlassDoor.css("display", "flex");
        // radioGroup_BlindShade.css("display", "flex");

        const shadeIcon = jQuery("#shade-sys");
        const slideIcon = jQuery("#slide-sys");
        const gulIcon = jQuery("#gul-sys");
        const bladeIcon = jQuery("#btnWall");

        uiGroups.get("shadePop").hide();
        uiGroups.get("slidePop").hide();
        uiGroups.get("gulPop").hide();

        // console.log("TYPE HERE");

        const optionsSub = uiGroups.get("subSystems").find(".option");

        switch (true) {
          case pergolaConst.systemType.BlindShade ===
            pergola.settings.currentSubsystemType &&
            this.checkSystemInScene(pergolaConst.systemType.BlindShade):
            if (shadeIcon.is(":visible")) {
              shadeIcon.trigger("click");
              // console.log("click shade");
            } else {
              uiGroups.get("shadePop").hide();
            }

            break;

          case pergolaConst.systemType.SlidingGlassDoor ===
            pergola.settings.currentSubsystemType &&
            this.checkSystemInScene(pergolaConst.systemType.SlidingGlassDoor):
            if (slideIcon.is(":visible")) {
              slideIcon.trigger("click");
              // console.log("click slide");
            } else {
              uiGroups.get("slidePop").hide();
            }

            break;

          case pergolaConst.systemType.GuilotineGlass ===
            pergola.settings.currentSubsystemType &&
            this.checkSystemInScene(pergolaConst.systemType.GuilotineGlass):
            if (gulIcon.is(":visible")) {
              gulIcon.trigger("click");
              // console.log("click gulIcon");
            } else {
              uiGroups.get("gulPop").hide();
            }

            break;

          default:
            break;
        }
      }
    }
  }

  checkSystemInScene(typeSys, side = false) {
    return this.span.objects.some((span) =>
      span.systems.some((system) => {
        const isCorrectSide = this.checkSide(side, system.side);

        const compareGul = this.checkSystemType(typeSys, system.type);

        return system.active && compareGul && isCorrectSide;
      })
    );
  }

  checkSide(side, systemSide) {
    if (side === pergolaConst.side.Back) {
      return (
        systemSide === pergolaConst.side.Back ||
        systemSide === pergolaConst.side.Front
      );
    } else if (side === pergolaConst.side.Left) {
      return (
        systemSide === pergolaConst.side.Left ||
        systemSide === pergolaConst.side.Right
      );
    } else {
      return true;
    }
  }

  checkSystemType(typeSys, systemType) {
    if (typeSys === pergolaConst.systemType.GuilotineGlass) {
      return (
        systemType === pergolaConst.systemType.GuilotineGlass ||
        systemType === pergolaConst.systemType.GuilotineGlassSmall
      );
    } else {
      return systemType === typeSys;
    }
  }

  // =============================================================
  changeDimensions() {
    const lengthMorph = interpolateValue(
      this.settings.depth,
      this.settings.minDepth,
      this.settings.maxDepth
    );

    const widthMorph = interpolateValue(
      this.settings.width,
      this.settings.minWidth,
      this.settings.maxWidth
    );

    const heightMorph = interpolateValue(
      this.settings.height,
      this.settings.minHeight,
      this.settings.maxHeight
    );

    const heightMorphGulSmall = interpolateValue(this.settings.height, 7, 8);

    //LENGHT
    changeGlobalMorph("length", lengthMorph);
    changeGlobalMorph("length_back_win", lengthMorph);

    //WIDTH

    let correctMorph = 0;

    if (this.settings.width >= 30 && this.settings.width <= 34) {
      correctMorph = this.settings.width * 0.01;
    }

    const clampedWidth = Math.min(Math.max(this.settings.width, 30), 40);

    const clampedWidthSmallLight = Math.min(
      Math.max(this.settings.width, 6),
      14
    );
    const clampedWidthMediumLight = Math.min(
      Math.max(this.settings.width, 14),
      28
    );
    const clampedWidthLargeLight = Math.min(
      Math.max(this.settings.width, 28),
      40
    );

    const morphSmall = interpolateValue(clampedWidthSmallLight, 6, 14, 0, 1);
    const morphMedium = interpolateValue(clampedWidthMediumLight, 14, 28, 0, 1);
    const morphLarge = interpolateValue(clampedWidthLargeLight, 28, 40, 0, 1);

    const widthMorphForPosts = interpolateValue(clampedWidth, 30, 40, 0, 1);

    changeGlobalMorph("width_1-3", morphSmall);
    changeGlobalMorph("width_2-3", morphMedium);
    changeGlobalMorph("width_3-3", morphLarge);

    changeGlobalMorph("width", widthMorph);
    changeGlobalMorph("width_2_midle_posts", widthMorphForPosts + correctMorph);
    changeGlobalMorph("width_back_win", widthMorph);

    //HEIGHT
    changeGlobalMorph("height", heightMorph);
    changeGlobalMorph("height_shades", heightMorph);
    changeGlobalMorph("height_guilotine", heightMorph);
    changeGlobalMorph("height_guilotine2", heightMorphGulSmall);
    changeGlobalMorph("height_back_win", heightMorph);

    const shadePop = uiGroups.get("shadePop");
    const slidePop = uiGroups.get("slidePop");
    const gulPop = uiGroups.get("gulPop");

    shadePop.find("#range_opening_group-13").trigger("input");
    slidePop.find("#range_opening_group-14").trigger("input");
    gulPop.find("#range_opening_group-15").trigger("input");
  }

  setWall() {
    let rightWall = null;
    let leftWall = null;
    let backWall = null;

    this.model.traverse((o) => {
      if (o.name.includes("wall_")) {
        o.visible = false;
        o.children.forEach((child) => (child.visible = false));
      }
    });

    this.model.traverse((o) => {
      if (pergolaSettings.typePergola !== 4) {
        if (o.name === "wall_R") {
          rightWall = o;
        }
        if (o.name === "wall_L") {
          leftWall = o;
        }
        if (o.name === "wall_back") {
          backWall = o;
        }
      } else {
        if (o.name === "wall_R002") {
          rightWall = o;
        }
        if (o.name === "wall_L002") {
          leftWall = o;
        }
        if (o.name === "wall_back002") {
          backWall = o;
        }
      }
    });

    if (pergola.settings.rightWall) {
      // console.log(rightWall);

      rightWall.visible = true;

      rightWall.children.forEach((child) => {
        child.visible = true;

        // if (child.material) {
        //   child.material = material;

        //   child.material.needsUpdate = true;
        // }
      });
    }

    if (pergola.settings.leftWall) {
      // console.log(leftWall);

      leftWall.visible = true;
      leftWall.children.forEach((child) => {
        child.visible = true;

        // if (child.material) {
        //   child.material = material;

        //   child.material.needsUpdate = true;
        // }
      });
    }

    if (pergola.settings.backWall) {
      // console.log(backWall);

      backWall.visible = true;
      backWall.children.forEach((child) => {
        child.visible = true;

        // if (child.material) {
        //   child.material = material;

        //   child.material.needsUpdate = true;
        // }
      });
    }
  }

  setOptions() {
    this.changeRoofVisibilityRest(false, "pointLights", null, true);
    this.changeRoofVisibilityRest(false, "pointLightsGlassroom", null, true);

    this.changeRoofVisibilityRest(
      false,
      "smallGlassroomPointLight",
      null,
      true
    );
    this.changeRoofVisibilityRest(
      false,
      "mediumGlassroomPointLight",
      null,
      true
    );
    this.changeRoofVisibilityRest(
      false,
      "largeGlassroomPointLight",
      null,
      true
    );

    this.changeRoofVisibilityRest(false, "heaters", null, true);
    this.changeRoofVisibilityRest(false, "heatersGlassroomBack", null, true);
    this.changeRoofVisibilityRest(false, "heatersGlassroomFront", null, true);
    this.changeRoofVisibilityRest(false, "fansBeams", null, true);
    this.changeRoofVisibilityRest(false, "fans", null, true);

    this.toggleParamLed(false);

    const glassroom = this.settings.typePergola === 4;
    const louvera = this.settings.typePergola === 0;

    if (pergola.settings.perRGB) {
      this.toggleParamLed(
        true,
        rgbColors[pergola.settings.rgbColor] || "#FFFFFF"
      );
    }

    if (pergola.settings.perLED) {
      this.toggleParamLed(true);
    }

    if (pergola.settings.spotLED && !glassroom && !louvera) {
      this.setPointLight();
    }

    if (pergola.settings.spotLED && glassroom) {
      this.setPointLightGlassroom();
    }

    if (pergola.settings.heaters && !glassroom) {
      this.setHeaters();
    }

    if (pergola.settings.heaters && glassroom) {
      this.setHeatersGlassroom();
    }

    if (pergola.settings.fans && !glassroom) {
      this.setFans();
    }
  }

  setGlassroomCenterPosts() {
    const { point_post_width, point_post_length } = this.getPostPoints();

    this.changePostVisibility(false, "glassroomMidlePostsBig", null, true);
    this.changePostVisibility(false, "glassroomMidlePostsSmall", null, true);

    this.model.traverse((o) => {
      if (o.name === "base_midle_1" && o.visible) {
        for (let i = 0; i < point_post_length.length; i++) {
          const point = point_post_length[i];
          const element = this.getAvaliableObjectFromOneArray(
            this.post.glassroomMidlePostsSmall
          );
          // console.log("ELEMENT", element);

          element.object.visible = pergolaSettings.steel ? false : true;
          element.object.position.z = o.position.z;
          element.object.position.x = point.z;

          element.active = true;
        }
      }

      if (o.name === "base_midle_2" && o.visible) {
        for (let i = 0; i < point_post_length.length; i++) {
          const point = point_post_length[i];
          const element = this.getAvaliableObjectFromOneArray(
            this.post.glassroomMidlePostsBig
          );

          element.object.visible = pergolaSettings.steel ? false : true;
          element.object.position.z = o.position.z;
          element.object.position.x = point.z;

          element.active = true;
        }
      }
    });
  }

  // =============================================================
  setPosts() {
    this.changePostVisibility(false, "leftPosts", true);
    this.changePostVisibility(false, "rightPosts", true);
    this.changePostVisibility(false, "frontPosts", true);
    this.changePostVisibility(false, "backPosts", true);
    this.changePostVisibility(false, "glassroomPosts", true);

    const { point_post_width, point_post_length } = this.getPostPoints();
    const glassroom = this.settings.typePergola === 4;

    if (point_post_width.length > 0 && !glassroom) {
      this.setPostsPosition("leftPosts", point_post_width);
      this.setPostsPosition("rightPosts", point_post_width);
    }

    if (point_post_width.length > 0 && glassroom) {
      this.baseMidleFirst.visible = false;
      this.baseMidleSecond.visible = false;

      if (point_post_width.length > 1) {
        this.baseMidleSecond.visible = true;
      } else {
        this.baseMidleFirst.visible = true;
      }
    }

    if (point_post_length.length > 0) {
      this.setPostsPosition("frontPosts", point_post_length);
      glassroom
        ? this.setPostsPosition("glassroomPosts", point_post_length)
        : this.setPostsPosition("backPosts", point_post_length);
    }

    //SET CENTER POSTS
    if (point_post_width.length && point_post_length.length) {
      const posts = this.post.midlePosts;

      for (let i = 0; i < point_post_width.length; i++) {
        const point = point_post_width[i];

        for (let j = 0; j < point_post_length.length; j++) {
          const pointZ = point_post_length[j].x;

          const element = this.getAvaliableObjectFromOneArray(posts);
          console.log(point, element);

          element.object.position.x = point.z;
          element.object.position.z = pointZ;

          this.changeObjectVisibility(true, element.object);
          element.active = true;
        }
      }
    }
  }

  setPostsPosition(nameArray, points) {
    const posts = this.post[nameArray];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const element = posts[i];

      if (element == null) {
        return;
      }

      switch (nameArray) {
        case "leftPosts":
          element.object.position.z = point.x;

          break;

        case "rightPosts":
          element.object.position.z = point.x;

          break;

        case "frontPosts":
          element.object.position.x = point.z;

          break;

        case "backPosts":
        case "glassroomPosts":
          element.object.position.x = point.z;

          break;
      }

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  changePostVisibility(status, nameArray, reset = false) {
    if (this.post == null) {
      return;
    }

    for (let index = 0; index < this.post[nameArray].length; index++) {
      const element = this.post[nameArray][index];

      element.active = false;

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;

          if (status === false && reset === true) {
            ge.active = false;
          }
        }
      } else {
        element.object.visible = status;
        if (status === false && reset === true) {
          element.object.active = false;
        }
      }
    }
  }

  getCornerPairs(offset = -0.1, oneSide = false) {
    const borderBeamOffset = offset;
    const end = oneSide ? 0 : borderBeamOffset;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    const newFR = new THREE.Vector3(FR_point.x, FR_point.y, FR_point.z + end);
    const newRR = new THREE.Vector3(
      RR_point.x,
      RR_point.y,
      RR_point.z - borderBeamOffset
    );

    return {
      xAligned: [
        new THREE.Vector3(FL_point.x, FL_point.y, FL_point.z),
        new THREE.Vector3(FR_point.x, FR_point.y, FR_point.z),
      ],
      zAligned: [newFR, newRR],
    };
  }
  generateCenterPoints(points) {
    const centerPoints = [];

    for (let i = 0; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      const midZ = (points[i].z + points[i + 1].z) / 2;

      centerPoints.push(new THREE.Vector3(midX, midY, midZ));
    }

    return centerPoints;
  }

  getBeamPoints() {
    const qtyBeamsWidth = Math.floor(
      this.settings.width / this.settings.louverInterval
    );

    const qtyPostWidth = Math.floor(
      this.settings.width / this.settings.postWidthInterval
    );

    const qtyPostLength = Math.floor(
      this.settings.depth / this.settings.postDepthInterval
    );

    const qtyBeamsLength = Math.floor(
      this.settings.depth /
        (pergola.settings.typePergola === 4
          ? 3
          : this.settings.postDepthInterval)
    );

    const { xAligned, zAligned } = this.getCornerPairs();

    const point_width_beam = generateMidpoints(
      xAligned[0],
      xAligned[1],
      qtyBeamsWidth
    );

    const point_width_posts = generateMidpoints(
      xAligned[0],
      xAligned[1],
      qtyPostWidth
    );

    const point_length_posts = generateMidpoints(
      zAligned[0],
      zAligned[1],
      qtyPostLength
    );

    const center_forlouver = this.generateCenterPoints([
      xAligned[0],
      ...point_width_beam,
      xAligned[1],
    ]);

    const point_length = generateMidpoints(
      zAligned[0],
      zAligned[1],
      qtyBeamsLength
    );

    return {
      point_width: point_width_beam,
      point_length,
      center_forlouver,
      point_width_posts,
      point_length_posts,
    };
  }

  getPostPoints() {
    const offsetX = 0.075;
    const offsetZ = 0;

    const qtyWidth = Math.floor(
      this.settings.width / this.settings.postWidthInterval
    );
    const qtyLength = Math.floor(
      this.settings.depth / this.settings.postDepthInterval
    );

    const { zAligned, xAligned } = this.getCornerPairs();

    const point_post_width = generateMidpoints(
      xAligned[0],
      xAligned[1],
      qtyWidth
    );

    const point_post_length = generateMidpoints(
      zAligned[0],
      zAligned[1],
      qtyLength
    );

    return {
      point_post_width,
      point_post_length,
    };
  }

  changeObjectVisibility(status, object) {
    if (!object) return;
    object.traverse((child) => {
      child.visible = status;
      child.children.forEach((child) => (child.visible = status));
    });
  }

  getAvaliableObjectFromArray(
    objects,
    propertyName = null,
    propertyValue = null
  ) {
    for (let index = 0; index < objects.length; index++) {
      const coverArray = objects[index];

      for (let i = 0; i < coverArray.length; i++) {
        const element = coverArray[i];

        if (!element.active) {
          return element;
        }
      }
    }
  }

  getAvaliableObjectFromOneArray(
    objects,
    propertyName = null,
    propertyValue = null
  ) {
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];

      if (!element.active) {
        element.active = true;

        return element;
      }
    }
  }

  // =============================================================
  setRoof() {
    // scene.getObjectByName('back_1_base').visible = true; // wall mounts
    this.changeRoofVisibility(false, "baseBeams", null, true);
    this.changeRoofVisibility(false, "baseBeamsX", null, true);
    this.changeRoofVisibility(false, "glassroomBeamsX", null, true);

    this.changeRoofVisibility(false, "louvers", null, true);
    this.changeRoofVisibility(false, "louversCLones", null, true);
    this.changeRoofVisibility(false, "louversCLonesLight", null, true);

    this.changeRoofVisibility(false, "louversSky", null, true);
    this.changeRoofVisibility(false, "louversSkyClones", null, true);

    this.changeRoofVisibility(false, "louversGlass", null, true);
    this.changeRoofVisibility(false, "louversGlassClones", null, true);

    this.changeRoofVisibility(false, "pergolaFlats", null, true);
    this.changeRoofVisibility(false, "pergolaFlatsClones", null, true);

    this.changeRoofVisibility(false, "trailsFlats", null, true);

    //CENTER POST LOGIC
    this.changePostVisibility(false, "midlePosts", null, true);

    this.basePegola.visible = true;

    this.glassroomFront.visible = false;
    this.glassroomBack.visible = false;
    this.glassroomRoof.visible = false;

    this.glassroomRoof.children.forEach((child) => (child.visible = false));

    this.baseMidleFirst.visible = false;
    this.baseMidleSecond.visible = false;

    const { point_width, point_length, center_forlouver } =
      this.getBeamPoints();
    const glassroom = this.settings.typePergola === 4;

    const beams = glassroom ? this.roof.glassroomBeamsX : this.roof.baseBeamsX;

    //BEAM
    switch (true) {
      case point_width.length > 0 && !glassroom:
        this.setBeamsPositionWidth(point_width, this.roof.baseBeams);

      case point_length.length > 0:
        this.setBeamsPositionLength(point_length, beams);
    }

    // console.log(center_forlouver, this.settings.typePergola);
    //ROOF TYPE
    switch (true) {
      case center_forlouver.length > 0 && this.settings.typePergola === 0:
        this.setLouvera(
          center_forlouver,
          this.roof.louvers,
          this.roof.louversCLones
        );
        break;

      case center_forlouver.length > 0 && this.settings.typePergola === 1:
        this.setLouveraSky(
          center_forlouver,
          this.roof.trailsFlats,
          this.roof.louversSkyClones
        );
        break;

      case center_forlouver.length > 0 && this.settings.typePergola === 2:
        //JUS DIFFERENT MODEL SAME LOGIC
        this.setLouveraSky(
          center_forlouver,
          this.roof.trailsFlats,
          this.roof.pergolaFlatsClones
        );

        break;

      case center_forlouver.length > 0 && this.settings.typePergola === 3:
        this.setLouveraPergolaFlat(
          center_forlouver,
          this.roof.trailsFlats,
          this.roof.pergolaFlatsClones
        );

        break;

      case center_forlouver.length > 0 && this.settings.typePergola === 4:
        this.setGlassroom();

        break;

      default:
        break;
    }
  }

  setBeamsPositionLength(points, array) {
    const beams = array;

    for (let i = 0; i < points.length; i++) {
      const beamPoint = points[i];
      const element = beams[i];

      if (element == null) {
        return;
      }

      element.object.position.x = beamPoint.z;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  setPointLight() {
    const { point_length, point_width_posts } = this.getBeamPoints();
    const { zAligned, xAligned } = this.getCornerPairs();
    const countPointLight = 5;

    const cornerAndBeamPointZ = [
      zAligned[0],
      ...this.addOffset(point_length, "z", -0.01),
      zAligned[1],
    ];

    const cornerAndBeamPointX = [
      xAligned[0],
      ...this.addOffset(point_width_posts, "z", -0.01),
      xAligned[1],
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForLouversX.push(...spanPoints);
    }

    //#region FRONT
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const point = allPointsForLouversZ[i];
      // console.log(this.pointLights);
      const element = this.getAvaliableObjectFromOneArray(this.pointLights);

      // console.log(element);

      element.object.position.z = point.x - 0.07;
      element.object.position.x = point.z;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }
    //#endregion

    //#region BOTTOM
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const point = allPointsForLouversZ[i];
      // console.log(this.pointLights);
      const element = this.getAvaliableObjectFromOneArray(this.pointLights);

      // console.log(element);

      element.object.position.z = -point.x;
      element.object.position.x = point.z + 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }

    //#endregion

    //#region RIGHT
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];
      const element = this.getAvaliableObjectFromOneArray(this.pointLights);

      element.object.position.z = point.x;
      element.object.position.x = point.z - 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }

    //#endregion

    //#region LEFT
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];
      const element = this.getAvaliableObjectFromOneArray(this.pointLights);

      element.object.position.z = point.x;
      element.object.position.x = -point.z + 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }

    //#endregion
  }

  setPointLightGlassroom() {
    const { point_length, point_width_posts } = this.getBeamPoints();
    const { zAligned, xAligned } = this.getCornerPairs();
    const countPointLight = 1;
    const cornerAndBeamPointZ = [
      zAligned[0],
      ...this.addOffset(point_length, "z", -0.01),
      zAligned[1],
    ];
    const cornerAndBeamPointX = [
      xAligned[0],
      ...this.addOffset(point_width_posts, "z", -0.01),
      xAligned[1],
    ];
    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];
    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );
      allPointsForLouversZ.push(...spanPoints);
    }
    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );
      allPointsForLouversX.push(...spanPoints);
    }

    //#region SET

    for (let a = 0; a < point_length.length; a++) {
      const pointBeam = point_length[a];
      let element;
      let offsetH = 0;

      if (pergolaSettings.width >= 28) {
        element = this.getAvaliableObjectFromOneArray(
          this.largeGlassroomPointLight
        );
      } else if (pergolaSettings.width >= 14) {
        element = this.getAvaliableObjectFromOneArray(
          this.mediumGlassroomPointLight
        );
        offsetH = 0.02;
      } else {
        element = this.getAvaliableObjectFromOneArray(
          this.smallGlassroomPointLight
        );
        offsetH = 0.02;
      }

      element.object.position.x = pointBeam.z;
      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }
  }

  setPointLightLouver() {
    const { point_length, point_width_posts } = this.getBeamPoints();
    const { zAligned, xAligned } = this.getCornerPairs();
    const countPointLight = 5;

    const cornerAndBeamPointZ = [
      zAligned[0],
      ...this.addOffset(point_length, "z", -0.01),
      zAligned[1],
    ];

    const cornerAndBeamPointX = [
      xAligned[0],
      ...this.addOffset(point_width_posts, "z", -0.01),
      xAligned[1],
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForLouversX.push(...spanPoints);
    }

    // //#region FRONT
    // for (let i = 0; i < allPointsForLouversZ.length; i++) {
    //   const point = allPointsForLouversZ[i];
    //   console.log(this.pointLights);
    //   const element = this.getAvaliableObjectFromOneArray(this.pointLights);

    //   console.log(element);

    //   element.object.position.z = point.x - 0.07;
    //   element.object.position.x = point.z;

    //   element.object.visible = true;
    //   element.object.children.forEach((child) => (child.visible = true));
    //   element.active = true;
    // }
    // //#endregion
  }

  setHeaters() {
    const { point_length, point_width_posts } = this.getBeamPoints();
    const { zAligned, xAligned } = this.getCornerPairs();
    const countPointLight = 1;

    const cornerAndBeamPointZ = [
      zAligned[0],
      ...this.addOffset(point_length, "z", -0.01),
      zAligned[1],
    ];

    const cornerAndBeamPointX = [
      xAligned[0],
      ...this.addOffset(point_width_posts, "z", -0.01),
      xAligned[1],
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForLouversX.push(...spanPoints);
    }

    const offsetHeight = 0.168477;

    //#region RIGHT
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];
      const element = this.getAvaliableObjectFromOneArray(this.heaters);

      element.object.position.z = point.x;
      element.object.position.x = point.z - 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;

      element.object.rotation.y = Math.PI / 2;
      element.object.children.forEach((mesh) => {
        mesh.rotation.y = Math.PI / 2;
      });
    }

    //#endregion

    //#region LEFT
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];
      const element = this.getAvaliableObjectFromOneArray(this.heaters);

      element.object.position.z = point.x;
      element.object.position.x = -point.z + 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;

      element.object.rotation.y = Math.PI;
      element.object.children.forEach((mesh) => {
        mesh.rotation.y = Math.PI;
      });
    }
    //#endregion
  }

  setHeatersGlassroom() {
    const { point_length, point_width_posts, point_length_posts } =
      this.getBeamPoints();
    const { zAligned, xAligned } = this.getCornerPairs();
    const countPointLight = 1;

    const cornerAndBeamPointZ = [
      zAligned[0],
      ...this.addOffset(point_length_posts, "z", -0.01),
      zAligned[1],
    ];

    const cornerAndBeamPointX = [
      xAligned[0],
      ...this.addOffset(point_width_posts, "z", -0.01),
      xAligned[1],
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForLouversX.push(...spanPoints);
    }

    //#region FRONT
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const point = allPointsForLouversZ[i];
      const element = this.getAvaliableObjectFromOneArray(
        this.heatersGlassroomFront
      );

      // element.object.position.z = point.x;
      element.object.position.x = point.z - 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }
    //#endregion

    //#region BACK
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const point = allPointsForLouversZ[i];
      const element = this.getAvaliableObjectFromOneArray(
        this.heatersGlassroomBack
      );

      // element.object.position.z = point.x;
      element.object.position.x = -point.z + 0.07;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }
    //#endregion
  }

  setFans() {
    const { point_length, point_width } = this.getBeamPoints();
    const { zAligned, xAligned } = this.getCornerPairs();
    const countPointLight = 1;

    const cornerAndBeamPointZ = [
      zAligned[0],
      ...this.addOffset(point_length, "z", -0.01),
      zAligned[1],
    ];

    const cornerAndBeamPointX = [
      xAligned[0],
      ...this.addOffset(point_width, "z", -0.01),
      xAligned[1],
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForLouversX.push(...spanPoints);
    }

    const offsetHeight = 0.168477;

    //#region BEAM X
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];

      for (let a = 0; a < allPointsForLouversZ.length; a++) {
        const pointZ = allPointsForLouversZ[a];
        const elementFan = this.getAvaliableObjectFromOneArray(this.fans);
        const elementBeam = this.getAvaliableObjectFromOneArray(this.fansBeams);

        elementFan.object.position.x = pointZ.z;
        elementFan.object.position.z = point.x;

        elementBeam.object.position.x = pointZ.z;

        elementBeam.object.visible = true;
        elementBeam.active = true;

        elementFan.object.visible = true;
        elementFan.object.children.forEach((child) => (child.visible = true));
        elementFan.active = true;
      }
    }
    //#endregion
  }

  animateGroup(group, startAnimation, animationStates) {
    const child = group.children[1] || group;
    if (!child) return;

    const isAnimating = animationStates.get(group);

    if (startAnimation) {
      if (isAnimating) return;
      animationStates.set(group, true);

      const rotateChild = () => {
        if (!animationStates.get(group)) return;
        child.rotation.y += 0.05;
        child.rotation.y %= Math.PI * 2;
        requestAnimationFrame(rotateChild);
      };

      rotateChild();
    } else {
      animationStates.set(group, false);
    }
  }

  setBeamsPositionWidth(points, array) {
    const beams = array;

    const { point_length } = this.getBeamPoints();

    for (let i = 0; i < points.length; i++) {
      const beamPoint = points[i];
      const element = beams[i];

      if (element == null) {
        return;
      }

      element.object.position.z = beamPoint.x;

      this.changeObjectVisibility(true, element.object);
      element.active = true;

      //SET CENTER POST
      // for (let j = 0; j < point_length.length; j++) {
      //   const point = point_length[j];
      //   const centerPost = this.getAvaliableObjectFromOneArray(
      //     this.post.midlePosts
      //   );

      //   // console.log(centerPost);

      //   centerPost.object.position.z = beamPoint.x;
      //   centerPost.object.visible = pergolaSettings.steel ? false : true;
      //   centerPost.object.position.x = point.z;
      //   centerPost.active = true;
      // }
    }
  }

  clearClones(modelForExport, array) {
    array.forEach((element) => {
      modelForExport.remove(element);
    });

    array.length = 0;
  }

  addOffset(array, direction, offset) {
    return array.map((el) => {
      // console.log(el, el[direction]);

      return {
        ...el,
        [direction]: el[direction] + offset,
      };
    });
  }

  setLouvera(points, original, clones) {
    const offsetY = 0.112;
    const offset = this.settings.widthLouver;

    const qtyLouvers = Math.floor(this.getMeters(this.settings.depth) / offset);

    const { zAligned } = this.getCornerPairs();

    const { point_length } = this.getBeamPoints();

    const cornerAndBeamPoint = [
      zAligned[0],
      ...this.addOffset(point_length, "z", -0.01),
      zAligned[1],
    ];
    const spanCount = point_length.length + 1;
    const louverForOneSpan = Math.floor(qtyLouvers / spanCount);

    let allPointsForLouvers = [];

    for (let i = 0; i < cornerAndBeamPoint.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPoint[i],
        cornerAndBeamPoint[i + 1],
        louverForOneSpan
      );
      allPointsForLouvers.push(...spanPoints);
    }

    const pointsForClones = allPointsForLouvers;

    for (let i = 0; i < points.length; i++) {
      const louverPoint = points[i];

      const borderBeamOffset = 0.2;

      const morphForLouver = convertMorphValue(
        this.getMeters(this.settings.width / points.length - borderBeamOffset),
        this.settings.roofBaseDepthMin_m,
        this.settings.roofBaseDepthMax_m
      );

      changeGlobalMorph("width_louver", morphForLouver);

      for (let a = 0; a < pointsForClones.length; a++) {
        const point = pointsForClones[a];
        let clone = this.getAvaliableObjectFromArray(clones);

        if ((a + 1) % 3 === 0 && this.settings.spotLED) {
          clone = this.getAvaliableObjectFromArray(
            this.roof.louversCLonesLight
          );
        }

        clone.object.rotation.z = -this.settings.rotateLouver * (Math.PI / 180);
        clone.object.position.set(
          point.z,
          this.getMeters(this.settings.height) - offsetY,
          louverPoint.x
        );

        clone.object.visible = true;
        clone.object.children.forEach((child) => (child.visible = true));
        clone.active = true;
      }
    }
  }

  setLouveraPergolaFlat(points, original, clones) {
    const offsetY = 0.112;
    const offset = this.settings.widthLouver;
    const roofPart = original;

    const qtyLouvers = Math.floor(this.getMeters(this.settings.depth) / offset);
    // -0.13
    const { zAligned } = this.getCornerPairs(-0.18);

    const { point_length } = this.getBeamPoints();

    // 0.063
    const cornerAndBeamPoint = [
      zAligned[0],
      ...this.addOffset(point_length, "z", 0),
      zAligned[1],
    ];

    for (let i = 0; i < points.length; i++) {
      const louverPoint = points[i];

      for (let a = cornerAndBeamPoint.length - 1; a > 0; a--) {
        // const element = roofPart[a];
        // const point = cornerAndBeamPoint[a];
        // const isFirstSpan = a === cornerAndBeamPoint.length - 1;
        const lastTurn = a === 1;

        // element.object.position.x = isFirstSpan
        //   ? point.z + offsetY * 2
        //   : point.z + offsetY;
        // element.object.position.z = louverPoint.x;
        // element.object.position.y =
        //   this.getMeters(this.settings.height) - offsetY;

        const borderBeamOffset = 0.2;

        const morphForLouver = convertMorphValue(
          this.getMeters(
            this.settings.width / points.length - borderBeamOffset
          ),
          this.settings.roofBaseDepthMin_m,
          this.settings.roofBaseDepthMax_m
        );

        changeGlobalMorph("width_pergoflat", morphForLouver);

        // this.changeObjectVisibility(true, element.object);
        // element.active = true;

        if (lastTurn) {
          this.setPegolaFlat(
            cornerAndBeamPoint[a].z,
            cornerAndBeamPoint[a - 1].z,
            a,
            louverPoint.x,
            true
          );
        } else {
          this.setPegolaFlat(
            cornerAndBeamPoint[a].z,
            cornerAndBeamPoint[a - 1].z,
            a,
            louverPoint.x
          );
        }
      }
    }
  }

  setLouveraSky(points, original, clones) {
    const offsetY = 0.112;
    const offset = this.settings.widthLouver;
    const roofPart = original;
    const borderBeamOffset = 0.2;

    const qtyLouvers = Math.floor(this.getMeters(this.settings.depth) / offset);

    const { zAligned } = this.getCornerPairs(-0.08);

    const glassPergola = this.settings.typePergola === 2;
    const offsetBeam = glassPergola ? -0.06 : 0;

    const { point_length } = this.getBeamPoints();

    const cornerAndBeamPoint = [
      zAligned[0],
      ...this.addOffset(point_length, "z", offsetBeam),
      zAligned[1],
    ];

    for (let i = 0; i < points.length; i++) {
      const louverPoint = points[i];

      const borderBeamOffset = 0.2;

      const morphForLouver = convertMorphValue(
        this.getMeters(this.settings.width / points.length - borderBeamOffset),
        this.settings.roofBaseDepthMin_m,
        this.settings.roofBaseDepthMax_m
      );

      changeGlobalMorph("width_louver", morphForLouver);

      for (let a = cornerAndBeamPoint.length - 1; a > 0; a--) {
        const lastTurn = a === 1;

        if (lastTurn) {
          this.setLouverSky(
            cornerAndBeamPoint[a].z,
            cornerAndBeamPoint[a - 1].z,
            a,
            louverPoint.x,
            true
          );
        } else {
          this.setLouverSky(
            cornerAndBeamPoint[a].z,
            cornerAndBeamPoint[a - 1].z,
            a,
            louverPoint.x
          );
        }
      }
    }
  }

  changeRoofVisibility(status, arrayName = null, type = null, reset = false) {
    if (this.roof == null || !arrayName) {
      return;
    }
    if (!this.roof[arrayName]) {
      return;
    }

    for (let i = 0; i < this.roof[arrayName].length; i++) {
      let element = this.roof[arrayName][i];

      if (type != null && element.type !== type) {
        continue;
      }

      if (Array.isArray(element)) {
        element.forEach((item) => {
          if (item.object) {
            item.object.visible = status;

            if (item.object.isGroup) {
              item.object.children.forEach((child) => (child.visible = status));
            }

            if (status === false && reset === true) {
              item.active = false;
            }
          }
        });
      } else if (element.object) {
        element.object.visible = status;

        if (element.object.isGroup) {
          element.object.children.forEach((child) => (child.visible = status));
        }

        if (status === false && reset === true) {
          element.active = false;
        }
      }
    }
  }

  changeRoofVisibilityRest(
    status,
    arrayName = null,
    type = null,
    reset = false
  ) {
    if (this == null || !arrayName) {
      return;
    }
    if (!this[arrayName]) {
      return;
    }

    for (let i = 0; i < this[arrayName].length; i++) {
      let element = this[arrayName][i];

      if (type != null && element.type !== type) {
        continue;
      }

      if (Array.isArray(element)) {
        element.forEach((item) => {
          if (item.object) {
            item.object.visible = status;

            if (item.object.isGroup) {
              item.object.children.forEach((child) => (child.visible = status));
            }

            if (status === false && reset === true) {
              item.active = false;
            }
          }
        });
      } else if (element.object) {
        element.object.visible = status;

        if (element.object.isGroup) {
          element.object.children.forEach((child) => (child.visible = status));
        }

        if (status === false && reset === true) {
          element.active = false;
        }
      }
    }
  }

  setGlassroom() {
    this.basePegola.visible = false;

    this.glassroomFront.visible = true;
    this.glassroomBack.visible = true;
    this.glassroomRoof.visible = true;

    this.glassroomRoof.children.forEach((child) => (child.visible = true));

    // this.baseMidleFirst.visible = true;
    // this.baseMidleSecond.visible = true;
  }

  // =============================================================
  setPegolaFlat(startX, endX, index, zPoint, last) {
    const valueRoofOpen = interpolateValue(this.settings.roofOpen, 1, 90);

    const roofWidth = endX - startX;

    const canFixDfolded = this.settings.canopyFixedDepthFolded_m;
    const canMovDfolded = this.settings.canopyMovingDepthFolded_m;

    const canFixDmin = this.settings.canopyFixedDepthMin_m;
    const canMovDmin = this.settings.canopyMovingDepthMin_m;

    const addQty = 0;
    let canQty = Math.ceil((roofWidth - canFixDmin) / canMovDmin) + addQty;
    const canopyOpenWidth = canMovDmin * canQty + canFixDfolded;
    const canopyOffset = roofWidth - canopyOpenWidth;

    // console.log(canopyOffset);

    const offsetThreshold = canMovDmin * 0.7;

    if (Math.abs(canopyOffset) < offsetThreshold) {
      canQty++;
    }

    let currentXpoints = [];

    for (let i = 0; i <= canQty; i++) {
      const posStart = startX + i * canMovDfolded;
      const posEnd = startX + i * canMovDmin;
      const curPoint = interpolateValue(
        1 - valueRoofOpen,
        0,
        1,
        posStart,
        posEnd
      );
      currentXpoints.push(curPoint);
    }

    const morpValue = interpolateValue(this.settings.roofOpen, 90, 1);

    if (currentXpoints.length > 0) {
      this.setPegolaFlatPosition(
        currentXpoints,
        morpValue,
        canopyOffset,
        zPoint,
        index,
        roofWidth
      );
    }
  }

  setLouverSky(startX, endX, index, zPoint, last = false) {
    const valueRoofOpen = interpolateValue(this.settings.roofOpen, 1, 90);

    const roofWidth = endX - startX;

    const canFixDfolded = this.settings.canopyFixedDepthFolded_m / 2;
    const canMovDfolded = this.settings.canopyMovingDepthFolded_m;

    const canFixDmin = this.settings.canopyFixedDepthMin_m / 2;
    const size =
      this.settings.typePergola === 2 ? 0.27 : this.settings.widthLouver;
    const canMovDmin = size;

    const addQty = 1;
    let canQty = Math.ceil((roofWidth - canFixDmin) / canMovDmin) + addQty;
    const canopyOpenWidth = canMovDmin * canQty + canFixDfolded;
    const canopyOffset = roofWidth - canopyOpenWidth;

    let currentXpoints = [];

    const offsetThreshold = canMovDmin * 0.7;

    // if (Math.abs(canopyOffset) < offsetThreshold) {
    //   if (!last) {
    //     canQty++;
    //   }
    // }

    // canQty++;

    for (let i = 0; i <= canQty; i++) {
      const posStart = startX + i * canMovDfolded;
      const posEnd = startX + i * canMovDmin;
      const curPoint = interpolateValue(
        1 - valueRoofOpen,
        0,
        1,
        posStart,
        posEnd
      );
      currentXpoints.push(curPoint);
    }

    const morpValue = interpolateValue(this.settings.roofOpen, 1, 90);

    if (currentXpoints.length > 0) {
      this.setLouveraSkyPosition(
        currentXpoints,
        morpValue,
        canopyOffset,
        zPoint,
        index,
        roofWidth
      );
    }
  }

  setPegolaFlatPosition(points, morphValue, canopyOffset, zPos, index, width) {
    for (let i = 0; i < points.length - 2; i++) {
      const offsetY = 0.112;
      const point = points[i + 1];

      const element = this.getAvaliableObjectFromArray(
        this.roof.pergolaFlatsClones
      );

      // if (element == null) {
      //   return;
      // }

      element.object.position.x = point;
      element.object.position.z = zPos;
      element.object.position.y =
        this.getMeters(this.settings.height) - offsetY;

      this.changeObjectVisibility(true, element.object);
      element.active = true;

      changeGlobalMorph("unfold", morphValue);
    }
  }

  setLouveraSkyPosition(points, morphValue, canopyOffset, zPos, index, width) {
    for (let i = 0; i < points.length - 2; i++) {
      const glassPergola = this.settings.typePergola === 2;
      const offsetY = 0.112 / 2.2;
      const point = points[i + 1];

      let element = null;

      switch (this.settings.typePergola) {
        case 1:
          element = this.getAvaliableObjectFromArray(
            this.roof.louversSkyClones
          );

          break;

        case 2:
          element = this.getAvaliableObjectFromArray(
            this.roof.louversGlassClones
          );

          break;

        default:
          // console.log("WRONG TYPE PERGOLA");
          break;
      }

      // console.log(this);

      if (element == null) {
        return;
      }

      element.object.position.x = point;
      element.object.position.z = zPos;
      element.object.position.y =
        this.getMeters(this.settings.height) - offsetY;

      this.changeObjectVisibility(true, element.object);
      element.active = true;

      const angle = 1 + morphValue * (90 - 1);
      const anglePre = glassPergola ? -angle : angle;
      element.object.rotation.z = anglePre * (Math.PI / 180);
    }
  }

  // =============================================================
  prepareSpans() {
    const qtyLeft = 3;
    const qtyRight = qtyLeft;
    const qtyFront = 6;
    const qtyBack = qtyFront;

    const spanGeometry = new THREE.BoxGeometry(1, 1, 1);
    const spanMaterial = new THREE.MeshBasicMaterial({
      color: spanColor,
      transparent: true,
      opacity: 0,
    });

    const makeSpanBySide = (side, qty) => {
      for (let i = 0; i < qty; i++) {
        const span = new PergolaSpanObject();
        span.side = side;
        span.number = i;
        const spanAvatar = new THREE.Mesh(spanGeometry, spanMaterial);
        spanAvatar.position.set(span.posX, span.posY, span.posZ);
        spanAvatar.visible = false;

        spanAvatar.name = `avatar_${side}_${i}`;
        spanAvatar.parentSpan = span;
        clickableObjects.push(spanAvatar);

        theModel.add(spanAvatar);
        span.avatar = spanAvatar;

        span.hotspot = createHotspot(
          `span_hotspot_${side}_${i}`,
          labelObjects.addObject.url,
          labelObjects.addObjectHover.url,
          new THREE.Vector3(0, 0, 0),
          "subsystems"
        );

        setHotspotVisibility(span.hotspot, false);
        hotspots.push(span.hotspot);

        const subsystems = [];

        Object.keys(pergolaConst.systemType).forEach((key) => {
          const sys = this.getSubsystemByTypeAndSide(
            pergolaConst.systemType[key],
            side
          );
          subsystems.push(sys);
        });

        if (subsystems.length > 0) {
          span.systems.push(...subsystems);
        }

        this.span.objects.push(span);
      }
    };

    makeSpanBySide(pergolaConst.side.Left, qtyLeft);
    makeSpanBySide(pergolaConst.side.Right, qtyRight);
    makeSpanBySide(pergolaConst.side.Front, qtyFront);
    makeSpanBySide(pergolaConst.side.Back, qtyBack);
  }

  setSpans() {
    const {
      front_span_points,
      back_span_points,
      left_span_points,
      right_span_points,
      span_width,
      span_depth,
    } = this.getSpanPoints();

    this.resetSpans();

    const height = this.getMeters(this.settings.height) - 0.1;
    const offsetZ =
      this.originZ == pergolaConst.side.Front
        ? (this.settings.depth * 0.0254) / 2
        : 0;

    const configureSpan = (points, side, width, thickness) => {
      points.forEach((point) => {
        const span = this.getSpan(side);

        if (!span) {
          return;
        }

        span.active = span.isSystemSet ? false : true;

        // console.log(
        //   this.settings.mountingWall_Back,
        //   this.settings.mountingWall_Left,
        //   this.settings.mountingWall_Right,
        //   "WALLLS "
        // );

        //#region WALL lOGIC
        const glassroom = pergola.settings.typePergola === 4;

        const compareWall = !glassroom
          ? (this.settings.backWall && side === pergolaConst.side.Back) ||
            (this.settings.leftWall && side === pergolaConst.side.Right) ||
            (this.settings.rightWall && side === pergolaConst.side.Left)
          : (this.settings.backWall && side === pergolaConst.side.Left) ||
            (this.settings.leftWall && side === pergolaConst.side.Back) ||
            (this.settings.rightWall && side === pergolaConst.side.Front);

        if (compareWall) {
          span.active = false;
          span.isSystemSet = false;

          span.systems.forEach((system) => {
            system.active = false;
            this.changeObjectVisibility(false, system.object);
            this.changeObjectVisibility(false, system.windowObject);
          });
        }
        //#endregion

        if (!span.isLocked) {
          span.isSystemSet = false;
          span.systems.forEach((system) => {
            system.active = false;
            this.changeObjectVisibility(false, system.object);
            this.changeObjectVisibility(false, system.windowObject);
          });
        }

        span.posX = point.z;
        span.posZ = point.x;
        span.width = width;
        span.height = height;

        if (span.systems.length > 0) {
          span.systems.forEach((system) => {
            if (system) {
              system.object.position.set(span.posX, span.posY, span.posZ);
              system.spanWidth = width;
              system.spanHeight = height;
            }
          });
        }

        let offsetLeftRightAvatarZ = 0;
        let offsetLeftRightAvatarX = 0;

        switch (true) {
          //back
          case side === pergolaConst.side.Left:
            offsetLeftRightAvatarZ = 0;
            offsetLeftRightAvatarX = -0.1;

            break;

          //front
          case side === pergolaConst.side.Right:
            offsetLeftRightAvatarZ = 0;
            offsetLeftRightAvatarX = -0.1;

            break;

          case side === pergolaConst.side.Back:
            offsetLeftRightAvatarX = -0.1;

            break;

          case side === pergolaConst.side.Front:
            offsetLeftRightAvatarX = -0.05;

            break;

          default:
            break;
        }

        span.avatar.position.set(
          span.posX + offsetLeftRightAvatarX,
          span.height / 2,
          span.posZ + offsetLeftRightAvatarZ
        );

        span.avatar.scale.set(
          side === pergolaConst.side.Left || side === pergolaConst.side.Right
            ? width
            : thickness,
          span.height,
          side === pergolaConst.side.Left || side === pergolaConst.side.Right
            ? thickness
            : width
        );
        span.avatar.visible = false;

        span.hotspot.position.set(span.posX, this.model.position.y, span.posZ);
        setHotspotVisibility(span.hotspot, false);

        span.hotspot.setHoverFunction(() => {
          this.outlineAvatar(span.avatar, true);
        });

        span.hotspot.setNormalFunction(() => {
          this.outlineAvatar(span.avatar, false);
        });

        span.hotspot.setClickFunction(() => {
          this.settings.currentSpan = span;
          this.putCurrentMenuSystemToCurrentSpan(span);
        });
      });
    };

    configureSpan(
      front_span_points,
      pergolaConst.side.Front,
      span_width,
      spanAvatarThickness
    );
    configureSpan(
      back_span_points,
      pergolaConst.side.Back,
      span_width,
      spanAvatarThickness
    );
    configureSpan(
      left_span_points,
      pergolaConst.side.Left,
      span_depth,
      spanAvatarThickness
    );
    configureSpan(
      right_span_points,
      pergolaConst.side.Right,
      span_depth,
      spanAvatarThickness
    );

    this.checkAllSpans();
  }

  getSpan(side) {
    const spans = this.span.objects;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];

      if (span.side === side && !span.isLocked) {
        span.isLocked = true;
        return span;
      }
    }

    return null;
  }

  getSpanPoints() {
    const offsetX = 0.075;
    const offsetZ = 0.207;
    const offsetWidth = 0.159;
    const offsetDepth = 0.315;
    const offsetBackZ = -0.05;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    const FL_post_point = FL_point.clone().add(
      new THREE.Vector3(offsetX, 0, 0)
    );
    const FR_post_point = FR_point.clone().add(
      new THREE.Vector3(-offsetX, 0, 0)
    );
    const RL_post_point = RL_point.clone().add(
      new THREE.Vector3(offsetX, 0, offsetZ)
    );
    const RR_post_point = RR_point.clone().add(
      new THREE.Vector3(-offsetX, 0, offsetZ)
    );

    const widthInterval = this.settings.postWidthInterval;
    const depthInterval = this.settings.postDepthInterval;
    const currentWidth = this.settings.width;
    const currentDepth = this.settings.depth;

    const front_span_points = generateCenterMidpoints(
      FL_post_point,
      FR_post_point,
      Math.floor(currentWidth / widthInterval),
      true
    );
    const back_span_points = generateCenterMidpoints(
      RL_post_point.clone().add(new THREE.Vector3(0, 0, offsetBackZ)),
      RR_post_point.clone().add(new THREE.Vector3(0, 0, offsetBackZ)),
      Math.floor(currentWidth / widthInterval),
      true
    );
    const left_span_points = generateCenterMidpoints(
      FL_post_point,
      RL_post_point,
      Math.floor(currentDepth / depthInterval),
      true
    );
    const right_span_points = generateCenterMidpoints(
      FR_post_point,
      RR_post_point,
      Math.floor(currentDepth / depthInterval),
      true
    );

    const { point_post_length, point_post_width } = this.getPostPoints();
    const { zAligned, xAligned } = this.getCornerPairs();

    function calculateDistance(point1, point2, correct) {
      const adjustedPoint1 = point1;
      const adjustedPoint2 = point2;

      let distance = Math.sqrt(Math.pow(adjustedPoint2 - adjustedPoint1, 2));

      if (correct) {
        const additionalOffset = 0.2;
        distance -= additionalOffset;
      }

      return distance;
    }

    const lenghtPoints = [zAligned[0], ...point_post_length, zAligned[1]];
    const widthPoints = [xAligned[0], ...point_post_width, xAligned[1]];

    const span_width = calculateDistance(widthPoints[0].x, widthPoints[1].x);
    const span_depth = calculateDistance(lenghtPoints[0].z, lenghtPoints[1].z);

    // console.log(span_width, span_depth, "CONSOLE LOG SPAN SIZE");

    return {
      front_span_points,
      back_span_points,
      left_span_points,
      right_span_points,
      span_width,
      span_depth,
    };
  }

  resetSpans() {
    const spans = this.span.objects;
    for (let i = 0; i < spans.length; i++) {
      spans[i].avatar.visible = false;
      spans[i].active = false;
      spans[i].isLocked = false;
    }
  }

  checkAllSpans() {
    const spans = this.span.objects;

    spans.forEach((span) => {
      if (!span.isLocked) {
        span.isSystemSet = false;

        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });
      }
    });
  }

  outlineAvatar(object, active, animate = true) {
    if (!object) {
      return;
    }
    if (active && object.visible) {
      return;
    }
    if (!active && !object.visible) {
      return;
    }

    if (!active) {
      object.material.opacity = 0;
      object.material.needsUpdate = true;
      object.visible = false;
    } else {
      object.visible = true;

      if (animate) {
        object.material.opacity = 0;
        object.material.needsUpdate = true;
        animateProperty(
          object.material,
          "opacity",
          spanOpacity + 0.2,
          250,
          () => {
            object.material.needsUpdate = true;
          }
        );
      } else {
        object.material.opacity = spanOpacity + 0.2;
        object.material.needsUpdate = true;
      }
    }
  }

  // =============================================================

  showAvailableSpans() {
    if (pergola.settings.currentSubsystemType !== null) {
      if (this.settings.currentSubsystem !== null) {
        // console.log("ENTER");

        const spans = this.span.objects;

        for (let i = 0; i < spans.length; i++) {
          setHotspotVisibility(spans[i].hotspot, spans[i].active);
        }
      }
    } else {
      setAllHotspotsVisibility(false);
    }
  }

  putCurrentMenuSystemToCurrentSpan(span) {
    const currentSubsystem = this.settings.currentSubsystemType;
    const group = subSystems_options[this.settings.currentSubsystemKey].group;

    span.systems.forEach((system) => {
      system.active = false;
      this.changeObjectVisibility(false, system.object);
      this.changeObjectVisibility(false, system.windowObject);
    });

    span.active = true;
    span.isSystemSet = false;

    const activeSystem = span.systems.find((system) => {
      return system.type === currentSubsystem;
    });

    // console.log(activeSystem, "ACTIVE SYSTEM");

    if (activeSystem) {
      activeSystem.active = true;
      pergola.settings.currentSubsystemType = activeSystem.type;

      span.active = false;
      span.isSystemSet = true;
      // this.changeObjectVisibility(true, activeSystem.object);

      updateInputs(group, activeSystem);
    }

    function updateInputs(groupId, system) {
      const radioGroup = jQuery(`#${groupId} .canvas_menu__item_radio`);
      if (system.openingside) {
        radioGroup.find('input[value="Left"]').prop("checked", true);
      } else {
        radioGroup.find('input[value="Right"]').prop("checked", true);
      }

      const rangeInput = jQuery(
        `#${groupId} .range-container input[type="range"]`
      );
      // const newValue = system.openValue !== null ? system.openValue : "0";
      rangeInput.val(pergolaSettings.openShade);

      updateRangeBackgroundAndLabel(rangeInput);

      jQuery(`#${groupId}`).addClass("active");

      pergola && pergola.updatePopUpAndOverview();
    }

    this.update();
  }

  putCurrentMenuSystemToAllFreeSpans() {
    const currentSubsystem = this.settings.currentSubsystem;
    const spans = this.span.objects;

    spans.forEach((span) => {
      if (span.active && !span.isSystemSet) {
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });

        const activeSystem = span.systems.find((system) => {
          return system.type === currentSubsystem;
        });

        if (activeSystem) {
          activeSystem.active = true;
          span.active = false;
          span.isSystemSet = true;
          this.changeObjectVisibility(true, activeSystem.object);
        }
      }
    });

    this.update();
  }

  getSubsystemByTypeAndSide(type, side) {
    const systems = this.system.objects;

    for (let i = 0; i < systems.length; i++) {
      const system = systems[i];

      if (system.type === type && system.side === side && !system.isLocked) {
        system.isLocked = true;
        return system;
      }
    }
  }

  getSpanBySideAndNumber(side, number) {
    return this.span.objects.find(
      (span) => span.side === side && span.number === number
    );
  }

  removeSystemFromSpan(span) {
    const system = span.getCurrentSystem();
    if (system) {
      system.active = false;
      system.openingside = true;
      system.openValue = 0;
      span.active = true;
      span.isLocked = true;
      span.isSystemSet = false;

      this.changeObjectVisibility(false, system.object);
      this.changeObjectVisibility(false, system.windowObject);

      this.update();
    }
  }

  // =============================================================
  changeMountingWall() {
    const hotspotOffsetY = (this.settings.height * 0.0254) / 2;
    const { back_point, left_point, right_point } =
      this.getWallPoints(hotspotOffsetY);
    const modelOffsetZ = this.model.position.z;
    const modelOffsetY = this.model.position.y;

    const backWall = this.getMountingWall(pergolaConst.side.Back);
    const leftWall = this.getMountingWall(pergolaConst.side.Left);
    const rightWall = this.getMountingWall(pergolaConst.side.Right);

    if (backWall) {
      backWall.labelObject.position.set(
        back_point.x,
        back_point.y + modelOffsetY,
        back_point.z + modelOffsetZ
      );
      updateHotspots(hotspots);
    }

    if (leftWall) {
      leftWall.labelObject.position.set(
        left_point.x,
        left_point.y + modelOffsetY,
        left_point.z + modelOffsetZ
      );
      updateHotspots(hotspots);
    }

    if (rightWall) {
      rightWall.labelObject.position.set(
        right_point.x,
        right_point.y + modelOffsetY,
        right_point.z + modelOffsetZ
      );
      updateHotspots(hotspots);
    }

    const back = this.settings.mountingWall_Back;
    const left = this.settings.mountingWall_Left;
    const right = this.settings.mountingWall_Right;

    if (jQuery(".canvas_menu__wall").hasClass("active")) {
      // backWall && setHotspotVisibility(backWall.labelObject, !back);
      // leftWall && setHotspotVisibility(leftWall.labelObject, !left);
      // rightWall && setHotspotVisibility(rightWall.labelObject, !right);
    } else {
      // backWall && setHotspotVisibility(backWall.labelObject, false);
      // leftWall && setHotspotVisibility(leftWall.labelObject, false);
      // rightWall && setHotspotVisibility(rightWall.labelObject, false);
    }

    // this.changeMountingWallVisibility(back, pergolaConst.side.Back);
    // this.changeMountingWallVisibility(left, pergolaConst.side.Left);
    // this.changeMountingWallVisibility(right, pergolaConst.side.Right);

    if (back) {
      this.lastSettings.mountingWall_Back = this.settings.mountingWall_Back;

      if (!this.settings.wallPosts) {
        // this.changePostVisibility(false, pergolaConst.postPlace.CornerBack);
        // this.changePostVisibility(false, pergolaConst.postPlace.MiddleBack);
      }
    }

    const wallMountsCorner = scene.getObjectByName("back_1_base");
    wallMountsCorner.position.y =
      this.settings.height * 0.0254 - this.model.position.y - 0.56;
    wallMountsCorner.visible = back; // wall mounts

    if (left) {
      this.lastSettings.mountingWall_Left = this.settings.mountingWall_Left;

      if (!this.settings.wallPosts) {
        // this.changePostVisibility(false, PergolaPostPlace.RL);
        // this.changePostVisibility(false, PergolaPostPlace.FL);
        // this.changePostVisibility(false, PergolaPostPlace.Left);
      }
    }

    if (right) {
      this.lastSettings.mountingWall_Right = this.settings.mountingWall_Right;
      if (!this.settings.wallPosts) {
        // this.changePostVisibility(false, PergolaPostPlace.RR);
        // this.changePostVisibility(false, PergolaPostPlace.FR);
        // this.changePostVisibility(false, PergolaPostPlace.Right);
      }
    }
  }

  getMountingWall(side) {
    if (this.mountingWall == null) {
      return;
    }
    if (this.mountingWall.elements == null) {
      return;
    }

    for (let index = 0; index < this.mountingWall.elements.length; index++) {
      const element = this.mountingWall.elements[index];
      if (element.side == side) {
        return element;
      }
    }

    return null;
  }

  changeMountingWallVisibility(status, side = null) {
    if (this.mountingWall == null) {
      return;
    }
    if (this.mountingWall.elements == null) {
      return;
    }

    for (let index = 0; index < this.mountingWall.elements.length; index++) {
      const element = this.mountingWall.elements[index];

      if (side != null) {
        if (element.side != side) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;

        // const matName = element.object.material.name;
        // element.object.visible = true;
        // if (status) {
        //   this.setMaterialProperty(matName, false, 'transparent');
        //   this.setMaterialProperty(matName, 0.86, 'opacity');
        //   this.setMaterialProperty(matName, wallColor, 'color');
        // }else {
        //   this.setMaterialProperty(matName, true, 'transparent');
        //   this.setMaterialProperty(matName, 0.14, 'opacity');
        //   this.setMaterialProperty(matName, spanColor, 'color');
        // }
      }
    }
  }

  correctTilling() {
    //! TODO
    // const targetTillingValueRoofLeftRight = interpolateValue(this.settings.depth, this.settings.minDepth, this.settings.maxDepth, 1, 3);
    // this.changeMaterialTilling("roof_house_R", targetTillingValueRoofLeftRight, 1);
  }

  //* =====================================================

  getMeters(foot) {
    return foot * 0.3048;
  }

  getCornerPoints() {
    const offsetX = 0;
    const offsetZ = 0;
    const totalWidth = this.settings.width * 0.3048;
    const totalDepth = this.settings.depth * 0.3048;

    const lineZback = -totalDepth / 2;
    const lineZfront = totalDepth / 2;

    const FL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      lineZfront + offsetZ / 2
    );
    const FR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      lineZfront + offsetZ / 2
    );
    const RL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      lineZback - offsetZ / 2
    );
    const RR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      lineZback - offsetZ / 2
    );

    return { FL_point, FR_point, RL_point, RR_point };
  }

  getReversedCornerPoints() {
    const offsetX = 0;
    const offsetZ = 0;
    const totalWidth = this.settings.width * 0.3048;
    const totalDepth = this.settings.depth * 0.3048;

    const lineXback = -totalDepth / 2; // Ãâ€”ÃÂ°ÃÂ¼Ã‘â€“ÃÂ½ÃÂ¸ÃÂ»ÃÂ¸ ÃÂ¾Ã‘ÂÃ‘Å’ Z ÃÂ½ÃÂ° ÃÂ¾Ã‘ÂÃ‘Å’ X
    const lineXfront = totalDepth / 2; // Ãâ€”ÃÂ°ÃÂ¼Ã‘â€“ÃÂ½ÃÂ¸ÃÂ»ÃÂ¸ ÃÂ¾Ã‘ÂÃ‘Å’ Z ÃÂ½ÃÂ° ÃÂ¾Ã‘ÂÃ‘Å’ X

    const FL_point = new THREE.Vector3(
      lineXfront + offsetX / 2, // ÃÂ¨ÃÂ¸Ã‘â‚¬ÃÂ¸ÃÂ½ÃÂ° Ã‘â€šÃÂµÃÂ¿ÃÂµÃ‘â‚¬ ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ Z, Ã‘â€šÃÂ¾ÃÂ¼Ã‘Æ’ Z ÃÂºÃÂ¾ÃÂ¾Ã‘â‚¬ÃÂ´ÃÂ¸ÃÂ½ÃÂ°Ã‘â€šÃÂ° ÃÂ·ÃÂ±ÃÂµÃ‘â‚¬ÃÂµÃÂ¶ÃÂµÃÂ½ÃÂ°
      0,
      -totalWidth / 2 - offsetZ / 2 // Ãâ€œÃÂ»ÃÂ¸ÃÂ±ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ X Ã‘â€šÃÂµÃÂ¿ÃÂµÃ‘â‚¬
    );
    const FR_point = new THREE.Vector3(
      lineXfront + offsetX / 2, // ÃÂ¨ÃÂ¸Ã‘â‚¬ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ Z
      0,
      totalWidth / 2 + offsetZ / 2 // Ãâ€œÃÂ»ÃÂ¸ÃÂ±ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ X
    );
    const RL_point = new THREE.Vector3(
      lineXback - offsetX / 2, // ÃÂ¨ÃÂ¸Ã‘â‚¬ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ Z
      0,
      -totalWidth / 2 - offsetZ / 2 // Ãâ€œÃÂ»ÃÂ¸ÃÂ±ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ X
    );
    const RR_point = new THREE.Vector3(
      lineXback - offsetX / 2, // ÃÂ¨ÃÂ¸Ã‘â‚¬ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ Z
      0,
      totalWidth / 2 + offsetZ / 2 // Ãâ€œÃÂ»ÃÂ¸ÃÂ±ÃÂ¸ÃÂ½ÃÂ° ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ X
    );

    return { FL_point, FR_point, RL_point, RR_point };
  }

  getWallPoints(offsetY = 0) {
    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    const back_point = new THREE.Vector3(
      (RL_point.x + RR_point.x) / 2,
      offsetY,
      (RL_point.z + RR_point.z) / 2
    );
    const left_point = new THREE.Vector3(
      (FL_point.x + RL_point.x) / 2,
      offsetY,
      (FL_point.z + RL_point.z) / 2
    );
    const right_point = new THREE.Vector3(
      (FR_point.x + RR_point.x) / 2,
      offsetY,
      (FR_point.z + RR_point.z) / 2
    );

    return { back_point, left_point, right_point };
  }

  setMaterialProperty(name, value, property) {
    if (this.model == null) {
      return;
    }
    let mat = null;

    this.model.traverse((o) => {
      if (o.isMesh) {
        if (o.material.name == name) {
          mat = o.material;
          if (property === "color" && typeof value === "string") {
            mat[property] = new THREE.Color(value);
          } else if (Object.prototype.hasOwnProperty.call(mat, property)) {
            mat[property] = value;
          }
        }
      }
    });
  }

  //* =====================================================
  //* SUBSYSTEMS OPENING

  syncInputWithSettings() {
    uiGroups
      .get("shadePop")
      .find("#range_opening_group-13")
      .val(pergola.settings.openShade);
  }

  updateSubsystems() {
    const { span_width, span_depth } = this.getSpanPoints();

    // console.log(span_width, "WIDTH SPAN");

    this.changeRoofVisibilityRest(false, "windForGlassroom", null, true);
    this.changeRoofVisibilityRest(false, "windForGlassroomSide", null, true);

    const isGlassrom = pergola.settings.typePergola === 4;

    const spans = this.span.objects;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const smallGlass = span.systems.find(
        (system) => system.type === pergolaConst.systemType.GuilotineGlassSmall
      ).object;

      const bigGlass = span.systems.find(
        (system) => system.type === pergolaConst.systemType.GuilotineGlass
      ).object;
      const shadePop = uiGroups.get("shadePop");

      if (span.isSystemSet) {
        span.systems.forEach((system) => {
          if (system.active) {
            switch (system.type) {
              case pergolaConst.systemType.GuilotineGlassSmall:
              case pergolaConst.systemType.GuilotineGlass: //* GuilotineGlass
                const maxLGuilotine = 3.96218;
                const minLGuilotine = 1.57459;
                const maxSize = 8;

                const morphValueGuilotine = interpolateValue(
                  span_width,
                  minLGuilotine,
                  maxLGuilotine
                );
                const morphValueDepthGuilotine = interpolateValue(
                  span_depth,
                  minLGuilotine,
                  maxLGuilotine
                );

                changeGlobalMorph("length_guilotine", morphValueDepthGuilotine);
                changeGlobalMorph("width_guilotine", morphValueGuilotine);

                system.object.position.set(
                  span.avatar.position.x,
                  0,
                  span.avatar.position.z
                );

                // this.openingBlindShade(span);

                const zipPostGlass = system.object.children.find((child) =>
                  child.name.includes("post_zip")
                );

                this.changeObjectVisibility(true, system.object);
                this.changeObjectVisibility(false, zipPostGlass);

                let offset = 0;

                if (system.direction === pergolaConst.direction.Perpendicular) {
                  system.object.rotation.y = Math.PI;

                  if (span_depth >= 4.8) {
                    this.changeObjectVisibility(true, zipPostGlass);
                  } else {
                    this.changeObjectVisibility(false, zipPostGlass);
                  }

                  if (isGlassrom && span.side === pergolaConst.side.Left) {
                    const window = pergola.windForGlassroomSide[0];
                    window.object.visible = true;
                    window.object.children.forEach(
                      (child) => (child.visible = true)
                    );
                  }

                  offset =
                    span.side === pergolaConst.side.Left ? 0.004 : -0.004;

                  system.object.position.z = span.avatar.position.z - offset;
                } else {
                  if (span_width >= 4.8) {
                    this.changeObjectVisibility(true, zipPostGlass);
                  } else {
                    this.changeObjectVisibility(false, zipPostGlass);
                  }

                  if (span.side === pergolaConst.side.Front) {
                    offset = 0.017;
                  } else {
                    offset = -0.013;
                  }

                  system.object.position.x = span.avatar.position.x - offset;

                  const sideIndex =
                    span.side === pergolaConst.side.Front
                      ? 0
                      : span.side === pergolaConst.side.Back
                      ? 1
                      : -1;

                  if (isGlassrom && sideIndex !== -1) {
                    const window = pergola.windForGlassroom[sideIndex];
                    window.object.visible = true;
                    window.object.children.forEach(
                      (child) => (child.visible = true)
                    );
                    window.object.position.x = span.avatar.position.x;
                    window.object.rotation.y = 0;
                  }

                  system.object.rotation.y = Math.PI / 2;
                }

                break;

              case pergolaConst.systemType.SlidingGlassDoor: //* SlidingGlassDoor
                const maxSizeSmallDoor = 3; //m

                const maxFrame = 5.82798;
                const minFrame = 1.56078;

                const maxDoor3 = 3.38958;
                const minDoor3 = 1.56078;

                const maxDoor4 = 5.82798;
                const minDoor4 = 3.38958;

                const morphValueLengthFrame = interpolateValue(
                  span_width,
                  minFrame,
                  maxFrame
                );
                const morphValueDepthFrame = interpolateValue(
                  span_depth,
                  minFrame,
                  maxFrame
                );

                const morphValueWidthDoor3 = interpolateValue(
                  span_width,
                  minDoor3,
                  maxDoor3
                );
                const morphValueDepthDoor3 = interpolateValue(
                  span_depth,
                  minDoor3,
                  maxDoor3
                );

                const morphValueWidthDoor4 = interpolateValue(
                  span_width,
                  minDoor4,
                  maxDoor4
                );
                const morphValueDepthDoor4 = interpolateValue(
                  span_depth,
                  minDoor4,
                  maxDoor4
                );

                changeGlobalMorph(
                  "length_sl-doors_frame",
                  morphValueDepthFrame
                );
                changeGlobalMorph(
                  "width_sl-doors_frame",
                  morphValueLengthFrame
                );

                changeGlobalMorph("length_sl-doors_3", morphValueDepthDoor3);
                changeGlobalMorph("width_sl-doors_3", morphValueWidthDoor3);

                changeGlobalMorph("length_sl-doors_4", morphValueDepthDoor4);
                changeGlobalMorph("width_sl-doors_4", morphValueWidthDoor4);

                const smallDoor = system.object.children.find((child) =>
                  child.name.includes("doors3")
                );
                const bigDoor = system.object.children.find((child) =>
                  child.name.includes("doors4")
                );

                this.changeObjectVisibility(true, system.object);
                this.changeObjectVisibility(false, bigDoor);
                this.changeObjectVisibility(false, smallDoor);

                system.object.position.set(
                  span.avatar.position.x,
                  0,
                  span.avatar.position.z
                );

                //ROTATION AND WINDOW DEPENCE BY DIRECTION
                if (system.direction === pergolaConst.direction.Perpendicular) {
                  if (span.side === pergolaConst.side.Right) {
                    system.object.rotation.y = Math.PI;
                  } else {
                    system.object.rotation.y = 0;
                  }

                  if (isGlassrom && span.side === pergolaConst.side.Left) {
                    const window = pergola.windForGlassroomSide[0];
                    window.object.visible = true;
                    window.object.children.forEach(
                      (child) => (child.visible = true)
                    );
                  }

                  if (Math.floor(span_depth) > maxSizeSmallDoor) {
                    this.changeObjectVisibility(true, bigDoor);
                  } else {
                    this.changeObjectVisibility(true, smallDoor);
                  }

                  //BACK
                } else {
                  //RIGHT //LEFT
                  if (Math.floor(span_width) > maxSizeSmallDoor) {
                    this.changeObjectVisibility(true, bigDoor);
                  } else {
                    this.changeObjectVisibility(true, smallDoor);
                  }

                  let offset = null;

                  if (span.side === pergolaConst.side.Front) {
                    offset = 0.03;
                  } else {
                    offset = -0.02;
                  }

                  system.object.position.x = span.avatar.position.x - offset;

                  const sideIndex =
                    span.side === pergolaConst.side.Front
                      ? 0
                      : span.side === pergolaConst.side.Back
                      ? 1
                      : -1;

                  if (isGlassrom && sideIndex !== -1) {
                    const window = pergola.windForGlassroom[sideIndex];
                    window.object.visible = true;
                    window.object.children.forEach(
                      (child) => (child.visible = true)
                    );
                    window.object.position.x = span.avatar.position.x;
                    window.object.rotation.y = 0;
                  }

                  if (span.side === pergolaConst.side.Back) {
                    system.object.rotation.y = -Math.PI / 2;
                  } else {
                    system.object.rotation.y = Math.PI / 2;
                  }
                }

                // this.setupSlidingGlassDoors(span);
                break;

              case pergolaConst.systemType.BlindShade: //* BlindShade
                const maxL = 5.05175;
                const minL = 1.59714;
                const morphValue = interpolateValue(span_width, minL, maxL);
                const morphValueDepth = interpolateValue(
                  span_depth,
                  minL,
                  maxL
                );
                const postInterval = 4.8; //m

                //#region CHANGE ZIP OPEN
                let correctMorphForShadeHightBottom = 0;
                let correctOffsetForShadeHightBottom = 0;

                const morphOffsetsBottom = {
                  7: { morph: 0, offset: 0 },
                  8: { morph: 0.2, offset: 0.18 },
                  9: { morph: 0.3, offset: 0.2 },
                  10: { morph: 0.5, offset: 0.31 },
                  11: { morph: 0.7, offset: 0.41 },
                  12: { morph: 0.9, offset: 0.45 },
                };

                if (morphOffsetsBottom[pergola.settings.height]) {
                  correctMorphForShadeHightBottom =
                    morphOffsetsBottom[pergola.settings.height].morph;

                  correctOffsetForShadeHightBottom =
                    morphOffsetsBottom[pergola.settings.height].offset;
                }

                const morphOpenShade = interpolateValue(
                  pergola.settings.openShade,
                  0 + correctOffsetForShadeHightBottom,
                  1
                );

                changeGlobalMorph(
                  "close_shades",
                  morphOpenShade + correctMorphForShadeHightBottom
                );
                //#endregion

                changeGlobalMorph("length_shades", morphValueDepth);
                changeGlobalMorph("width_shades", morphValue);

                system.object.position.set(
                  span.avatar.position.x,
                  0,
                  span.avatar.position.z
                );

                this.openingBlindShade(span);

                const zipPost = system.object.children.find((child) =>
                  child.name.includes("post_zip")
                );

                this.changeObjectVisibility(true, system.object);
                this.changeObjectVisibility(false, zipPost);

                //ROTATION AND WINDOW DEPENCE BY DIRECTION
                if (system.direction === pergolaConst.direction.Perpendicular) {
                  system.object.rotation.y = Math.PI;

                  if (span_depth >= postInterval) {
                    this.changeObjectVisibility(true, zipPost);
                  } else {
                    this.changeObjectVisibility(false, zipPost);
                  }

                  let offset = null;

                  if (isGlassrom && span.side === pergolaConst.side.Left) {
                    const window = pergola.windForGlassroomSide[0];
                    window.object.visible = true;
                    window.object.children.forEach(
                      (child) => (child.visible = true)
                    );
                  }

                  if (span.side === pergolaConst.side.Left) {
                    offset = -0.011;
                  } else {
                    offset = 0.011;
                  }

                  // console.log(offset, "OFFSET PERPENDIC");

                  system.object.position.z = span.avatar.position.z - offset;

                  //BACK
                } else {
                  //RIGHT //LEFT

                  if (span_width >= postInterval) {
                    this.changeObjectVisibility(true, zipPost);
                  } else {
                    this.changeObjectVisibility(false, zipPost);
                  }

                  let offset = null;

                  if (span.side === pergolaConst.side.Front) {
                    offset = 0.036;
                  } else {
                    offset = -0.03;
                  }

                  // console.log(offset, "OFFSET");

                  system.object.position.x = span.avatar.position.x - offset;

                  const sideIndex =
                    span.side === pergolaConst.side.Front
                      ? 0
                      : span.side === pergolaConst.side.Back
                      ? 1
                      : -1;

                  if (isGlassrom && sideIndex !== -1) {
                    const window = pergola.windForGlassroom[sideIndex];
                    window.object.visible = true;
                    window.object.children.forEach(
                      (child) => (child.visible = true)
                    );
                    window.object.position.x = span.avatar.position.x;
                    window.object.rotation.y = 0;
                  }

                  system.object.rotation.y = Math.PI / 2;
                }

                break;

              default:
                break;
            }
          }
        });
      } else {
        // span.systems.forEach((system) => {
        //   system.active = false;
        //   this.changeObjectVisibility(false, system.object);
        //   this.changeObjectVisibility(false, system.windowObject);
        // });
      }
    }
  }

  // =============================================================

  //! SYSTEM EQUIPMENT
  //* BifoldDoor
  setupBifoldDoors(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("bifold_doors_frame_side");
      door = system.object.getObjectByName("bifold_doors_door_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("bifold_doors_frame");
      door = system.object.getObjectByName("bifold_doors_door");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      system.object.position.x = span.posX - 0.0236;

      if (!system.openingside) {
        system.object.position.z = -span.width + 0.834;
      }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      system.object.position.x = span.posX + 0.0249;

      if (system.openingside) {
        system.object.position.z = -span.width + 0.834;
      }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    door.rotation.y = 0;
    this.changeObjectVisibility(true, door);
    const limitHeightMeters =
      subSystems_options.BifoldDoor.limitHeightInch * 0.0254;
    const adjustedHeight = Math.min(system.spanHeight, limitHeightMeters);
    const doorHeightValue = interpolateValue(
      adjustedHeight * 1000 - 100,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .min,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .max
    );
    const doorHeightKeyName =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorMaxWidth = subSystems_options.BifoldDoor.elementMaxWidthMM;
    const doorCount = Math.ceil(frameWidth / (doorMaxWidth / 1000));
    const doorWidth = frameWidth / doorCount;
    const doorThickness =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element
        .thickness;
    const doorWidthMorph = interpolateValue(
      doorWidth * 1000,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width.max
    );
    const doorWidthKeyName =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width
        .key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthMorph);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      const pivot = new THREE.Group();

      if (i % 2 === 0) {
        newDoor.rotation.y = Math.PI;
        newDoor.position.set(0, 0, -doorThickness / 2);
      } else {
        newDoor.rotation.y = 0;
        newDoor.position.set(0, 0, -doorThickness / 2);
      }

      pivot.add(newDoor);
      frame.add(pivot);
    }

    system.doorQty = doorCount;

    this.openingBifoldDoor(span);
  }

  //* SlidingGlassDoor
  setupSlidingGlassDoors(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("sliding_glass_frame_side");
      door = system.object.getObjectByName("sliding_glass_win_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("sliding_glass_frame");
      door = system.object.getObjectByName("sliding_glass_win");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      if (!system.openingside) {
        system.object.position.z = -span.width + 0.834;
      }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      if (system.openingside) {
        system.object.position.z = -span.width + 0.834;
      }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);
    const limitHeightMeters =
      subSystems_options.SlidingGlassDoor.limitHeightInch * 0.0254;
    const adjustedHeight = Math.min(system.spanHeight, limitHeightMeters);
    const doorHeightValue = interpolateValue(
      adjustedHeight * 1000 - 100,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .height.min,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .height.max
    );
    const doorHeightKeyName =
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .height.key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorThicknessM =
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.SlidingGlassDoor.overlapMM;
    const doorMaxWidthMM =
      subSystems_options.SlidingGlassDoor.elementMaxWidthMM;

    let doorCount = Math.ceil(
      (frameWidth * 1000 - overlapMM) / (doorMaxWidthMM - overlapMM)
    );

    system.doorQty = doorCount;

    if (doorCount > 5) {
      if (doorCount % 2 !== 0) {
        doorCount += 1;
      }
    }

    const doorWidthMM = (frameWidth * 1000 - overlapMM) / doorCount + overlapMM;

    const doorWidthMorph = interpolateValue(
      doorWidthMM,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .width.min,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .width.max
    );
    const doorWidthKeyName =
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .width.key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthMorph);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = -0.001;

    if (doorCount <= 5) {
      for (let i = 0; i < doorCount; i++) {
        const newDoor = door.clone();
        newDoor.scale.z = 0.78;
        newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
        frame.add(newDoor);
      }
    } else if (doorCount > 5) {
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < doorCount / 2; i++) {
          const newDoor = door.clone();
          newDoor.scale.z = 0.78;
          newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
          frame.add(newDoor);
        }
      }
    }

    this.openingSlidingGlassDoor(span);
  }

  //* LiftSlideDoor
  setupLiftSlideDoor(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("sliding_doors_frame_side");
      door = system.object.getObjectByName("sliding_doors_door_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("sliding_doors_frame");
      door = system.object.getObjectByName("sliding_doors_door");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      if (!system.openingside) {
        system.object.position.z = -span.width + 0.834;
      }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      if (system.openingside) {
        system.object.position.z = -span.width + 0.834;
      }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);
    const limitHeightMeters =
      subSystems_options.LiftSlideDoor.limitHeightInch * 0.0254;
    const adjustedHeight = Math.min(system.spanHeight, limitHeightMeters);
    const doorHeightValue = interpolateValue(
      adjustedHeight * 1000 - 100,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.height
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.height
        .max
    );
    const doorHeightKeyName =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.height
        .key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorThicknessM =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.LiftSlideDoor.overlapMM;
    const doorMaxWidthMM = subSystems_options.LiftSlideDoor.elementMaxWidthMM;

    let doorCount = Math.ceil(
      (frameWidth * 1000 - overlapMM) / (doorMaxWidthMM - overlapMM)
    );

    system.doorQty = doorCount;

    if (doorCount > 5) {
      if (doorCount % 2 !== 0) {
        doorCount += 1;
      }
    }

    const doorWidthMM = (frameWidth * 1000 - overlapMM) / doorCount + overlapMM;

    const doorWidthMorph = interpolateValue(
      doorWidthMM,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .max
    );
    const doorWidthKeyName =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthMorph);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = -0.001;

    if (doorCount <= 5) {
      for (let i = 0; i < doorCount; i++) {
        const newDoor = door.clone();
        newDoor.scale.z = 0.78;
        newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
        frame.add(newDoor);
      }
    } else if (doorCount > 5) {
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < doorCount / 2; i++) {
          const newDoor = door.clone();
          newDoor.scale.z = 0.78;
          newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
          frame.add(newDoor);
        }
      }
    }

    this.openingLiftSlideDoor(span);
  }

  //* GuilotineGlass
  setupGuilotineGlass(span) {
    const system = span.getCurrentSystem();
    if (!system) return;
    let frame, door, shapekeys_orientation_key;
    let framePost = null;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("Guillotine_frame_side");
      door = system.object.getObjectByName("Guillotine_win_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
      framePost = system.object.getObjectByName("Guillotine_frame_side001");
    } else {
      frame = system.object.getObjectByName("Guillotine_frame");
      door = system.object.getObjectByName("Guillotine_win");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    framePost && this.changeObjectVisibility(false, framePost);

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);
    const frameHeight = system.spanHeight - 0.1;
    const frameWidth = system.spanWidth - 0.05;

    const doorWidthValue = interpolateValue(
      frameWidth * 1000,
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element.width
        .max
    );

    const doorWidthKeyName =
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element.width
        .key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthValue);

    const doorThicknessM =
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.GuilotineGlass.overlapMM;

    const doorCount = 3;

    system.doorQty = doorCount;

    const doorHeightMM =
      (frameHeight * 1000 - overlapMM) / doorCount + overlapMM;

    const doorHeightValue = interpolateValue(
      doorHeightMM,
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element
        .height.min,
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element
        .height.max
    );
    const doorHeightKeyName =
      subSystems_options.GuilotineGlass[shapekeys_orientation_key].element
        .height.key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = 0.002;

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.02);
      frame.add(newDoor);
    }

    framePost && frame.add(framePost);

    if (
      this.settings.depth > subSystems_options.GuilotineGlass.limitWidthInch
    ) {
      framePost && this.changeObjectVisibility(true, framePost);
    }

    testVar = frame;

    // this.openingGuilotineGlass(span);
  }

  //! OPENING SYSTEMS
  openingSubsystems(value) {
    // const openSystem = (span, value) => {
    //   if (!span) {
    //     return;
    //   }
    //   const system = span.getCurrentSystem();
    //   system.openValue = value;
    //   switch (system.name) {
    //     case "BifoldDoor":
    //       this.openingBifoldDoor(span);
    //       break;
    //     case "GuilotineGlass":
    //       this.openingGuilotineGlass(span);
    //       break;
    //     case "SlidingGlassDoor":
    //       this.openingSlidingGlassDoor(span);
    //       break;
    //     case "LiftSlideDoor":
    //       this.openingLiftSlideDoor(span);
    //       break;
    //     case "BlindShade":
    //       this.openingBlindShade(span);
    //       break;
    //     default:
    //       break;
    //   }
    // };
    // if (!pergolaSettings.allSlide) {
    //   const span = this.settings.currentSpan;
    //   openSystem(span, value);
    // } else {
    //   const spansWithSystem = this.span.objects.filter(
    //     (span) => span.isSystemSet
    //   );
    //   spansWithSystem.forEach((span) => {
    //     openSystem(span, value);
    //   });
    // }
  }

  //* BifoldDoors
  openingBifoldDoor(span = null) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    let shapekeys_orientation_key = "";
    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    const frame = system.object;
    const totalDoors = frame.children.length;

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorWidth = frameWidth / totalDoors;
    const doorThickness =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element
        .thickness;
    const maxAngle = Math.PI / 2;

    let doorStartPosX = frameWidth / 2;
    if (this.originZ === pergolaConst.side.Front) {
      doorStartPosX =
        span.side === pergolaConst.side.Left ||
        span.side === pergolaConst.side.Right
          ? frameWidth - 0.892
          : frameWidth / 2;
    }

    for (let i = 0; i < totalDoors; i++) {
      const door = frame.children[i];
      const currentAngle = inputValue * maxAngle;
      const offset =
        (doorWidth -
          doorThickness * Math.sin(currentAngle) -
          doorWidth * Math.cos(currentAngle)) *
        2;

      door.rotation.y = i % 2 === 0 ? -currentAngle : currentAngle;
      if (i === 0) {
        door.position.x = -doorStartPosX;
      }
      if (i > 0) {
        const doorOffset = i % 2 === 0 ? 0 : doorWidth * 2;
        const pairIndex = Math.floor((i - 1) / 2);
        door.position.x =
          -doorStartPosX +
          Math.floor(i / 2) * 2 * doorWidth +
          doorOffset -
          offset * (pairIndex + 1);
      }

      door.position.y = 0.05;
    }
  }

  //* SlidingGlassDoor
  openingSlidingGlassDoor(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    const frame = system.object;
    const totalDoorsQty = frame.children.length;
    if (!frame || totalDoorsQty < 2) return;

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const overlap = subSystems_options.SlidingGlassDoor.overlapMM / 1000;
    const k = totalDoorsQty > 5 ? 2 : 1;
    const step = (frameWidth - overlap * k) / totalDoorsQty;

    // start position (closed)
    let doorStartPosX = 0;

    if (totalDoorsQty <= 5) {
      doorStartPosX = frameWidth / 2;
      if (this.originZ === pergolaConst.side.Front) {
        doorStartPosX =
          span.side === pergolaConst.side.Left ||
          span.side === pergolaConst.side.Right
            ? 0.892
            : frameWidth / 2;
      }

      for (let i = 0; i < totalDoorsQty; i++) {
        const door = frame.children[totalDoorsQty - 1 - i];
        door.position.x = doorStartPosX - step * i;
      }

      // opening
      const maxOpening = step * (totalDoorsQty - 1) - 0.0001;
      const currentOpenValue = interpolateValue(
        inputValue,
        0,
        1,
        0,
        maxOpening
      );
      const stepQty = Math.floor(currentOpenValue / step);
      const diffValue = currentOpenValue % step;

      for (let i = 0; i < totalDoorsQty - 1; i++) {
        const door = frame.children[totalDoorsQty - 1 - i];

        if (i === stepQty) {
          door.position.x -= diffValue;
        }
        if (i < stepQty) {
          door.position.x -= (stepQty - i) * step + diffValue;
        }
      }
    } else if (totalDoorsQty > 5) {
      doorStartPosX = 0;
      if (this.originZ === pergolaConst.side.Front) {
        doorStartPosX =
          span.side === pergolaConst.side.Left ||
          span.side === pergolaConst.side.Right
            ? 0.892 - frameWidth / 2
            : 0;
      }

      for (let i = 0; i < totalDoorsQty / 2; i++) {
        const door = frame.children[totalDoorsQty / 2 - 1 - i];
        door.position.x = doorStartPosX - step * i;
      }
      for (let i = totalDoorsQty / 2; i < totalDoorsQty; i++) {
        const door = frame.children[i];
        door.position.x = doorStartPosX - 0.012 + frameWidth - step * i;
      }

      // opening
      const maxOpening = step * (totalDoorsQty / 2 - 1) - 0.0001;
      const currentOpenValue = interpolateValue(
        inputValue,
        0,
        1,
        0,
        maxOpening
      );
      const stepQty = Math.floor(currentOpenValue / step);
      const diffValue = currentOpenValue % step;

      for (let i = 0; i < totalDoorsQty - 1; i++) {
        const doorLeft = frame.children[totalDoorsQty / 2 - 1 - i];
        const doorRight = frame.children[totalDoorsQty - 1 - i];

        if (i === stepQty) {
          doorLeft.position.x -= diffValue;
          doorRight.position.x += diffValue;
        }
        if (i < stepQty) {
          doorLeft.position.x -= (stepQty - i) * step + diffValue;
          doorRight.position.x += (stepQty - i) * step + diffValue;
        }
      }
    }
  }

  //* LiftSlideDoor
  openingLiftSlideDoor(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    const frame = system.object;
    const totalDoorsQty = frame.children.length;
    if (!frame || totalDoorsQty < 2) return;

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const overlap = subSystems_options.LiftSlideDoor.overlapMM / 1000;
    const k = totalDoorsQty > 5 ? 2 : 1;
    const step = (frameWidth - overlap * k) / totalDoorsQty;

    // start position (closed)
  }

  //! GuilotineGlass
  // openingGuilotineGlass(span) {
  //   console.log("GUll");
  // }

  //* BlindShade
  openingBlindShade(span = null) {
    const operateOpening = (span) => {
      const system = span.getCurrentSystem();

      const inputValue = pergolaSettings.allSlide
        ? pergolaSettings.currentOpenValue
        : system.openValue || 0;

      const key = true
        ? subSystems_options.BlindShade.shapekeys_perpendicular.element.closing
            .key
        : subSystems_options.BlindShade.shapekeys_straight.element.closing.key;

      const shapekeyValueMax = 2.6; // hardcoded
      const valMax = interpolateValue(
        this.settings.height,
        this.settings.minHeight,
        this.settings.maxHeight,
        1,
        shapekeyValueMax
      );
      const shapekeyValue = interpolateValue(1 - inputValue, 0, 1, 0, valMax);
      system &&
        system.object &&
        changeObjectMorph(system.object, key, shapekeyValue);
    };

    if (span === null) {
      this.span.objects.forEach((span) => {
        if (span.isSystemSet) {
          const activeSystem = span.systems.find((system) => {
            return (
              system.active &&
              system.type === pergolaConst.systemType.BlindShade
            );
          });

          if (activeSystem) {
            operateOpening(span);
          }
        }
      });
    } else {
      operateOpening(span);
    }
  }

  //* *************************************************************

  getActiveSystemBySpanAndType(span, type = null) {
    if (!span) {
      return;
    }

    if (span.isSystemSet) {
      if (type !== null) {
        return span.systems.find((system) => {
          return system.active && system.type === type;
        });
      } else {
        return span.systems.find((system) => {
          return system.active;
        });
      }
    } else {
      return null;
    }
  }

  editSystem(span) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) {
      return;
    }

    this.settings.currentSpan = span;
    this.settings.currentSubsystem = system;
    this.settings.currentSubsystemKey = system.name;

    this.showSystemPopup(system);
  }

  showSystemPopup(system) {
    // clearOptionsState(subSystems_group, [subSystems_options.Led.option]);

    resetSubSystemPopups();
    setHotspotsByGroupVisibility("subsystems", false);
    const name =
      system.name === "GuilotineGlassSmall" ? "GuilotineGlass" : system.name;

    // console.log(name);

    const groupId = subSystems_options[name].group;
    const popup = jQuery(`#${groupId}`);

    updateInputs(groupId, system);

    function updateInputs(groupId, system) {
      const radioGroup = jQuery(`#${groupId} .canvas_menu__item_radio`);
      if (system.openingside) {
        radioGroup.find('input[value="Left"]').prop("checked", true);
      } else {
        radioGroup.find('input[value="Right"]').prop("checked", true);
      }

      const rangeInput = jQuery(
        `#${groupId} .range-container input[type="range"]`
      );
      // const newValue = system.openValue !== null ? system.openValue : "0";
      rangeInput.val(pergola.settings.openShade);

      updateRangeBackgroundAndLabel(rangeInput);

      popup.addClass("active");
      fixScroll();
      pergola && pergola.updatePopUpAndOverview();
    }
  }
}
//#endregion

//#region PERGOLA FUNCTIONS
function generateMidpoints(
  vectorA,
  vectorB,
  numPoints,
  isFirstLastPointAdded = false
) {
  const points = [];

  if (isFirstLastPointAdded) {
    points.push(vectorA);
  }

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    const point = new THREE.Vector3().lerpVectors(vectorA, vectorB, t);
    points.push(point);
  }

  if (isFirstLastPointAdded) {
    points.push(vectorB);
  }

  return points;
}

function generateCenterMidpoints(
  vectorA,
  vectorB,
  numPoints,
  isFirstLastPointAdded = false,
  divide = 1
) {
  const points = [];

  if (isFirstLastPointAdded) {
    points.push(vectorA);
  }

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    const point = new THREE.Vector3().lerpVectors(vectorA, vectorB, t);
    points.push(point);
  }

  if (isFirstLastPointAdded) {
    points.push(vectorB);
  }

  if (points.length == 1) {
    return points;
  }

  let dividePoints = points;
  for (let index = 0; index < divide; index++) {
    dividePoints = pointDivideProcess(dividePoints);
  }

  return dividePoints;
}

function pointDivideProcess(points) {
  const dividePoints = [];

  for (let i = 0; i < points.length; i++) {
    if (i + 1 >= points.length) {
      continue;
    }

    const point1 = points[i];
    const point2 = points[i + 1];
    const centerPoint = new THREE.Vector3().lerpVectors(point1, point2, 0.5);
    dividePoints.push(centerPoint);
  }

  return dividePoints;
}

//#endregion

//#region HOTSPOTS
function createHotspot(id, normalUrl, hoverUrl, position, groupName = "") {
  const hotspotContainer = document.getElementById("ar_model_viewer");
  if (!hotspotContainer) {
    return;
  }

  const hotspot = document.createElement("div");
  hotspot.classList.add("hotspot");
  hotspot.id = id;
  hotspot.dataset.id = id;
  hotspot.style.backgroundImage = `url(${normalUrl})`;
  hotspot.groupName = groupName;
  hotspot.dataset.group = groupName;

  hotspot.hoverFunction = () => {};
  hotspot.normalFunction = () => {};
  hotspot.clickFunction = () => {};

  hotspot.addEventListener("mouseenter", () => {
    hotspot.style.backgroundImage = `url(${hoverUrl})`;
    hotspot.hoverFunction();
  });

  hotspot.addEventListener("mouseleave", () => {
    hotspot.style.backgroundImage = `url(${normalUrl})`;
    hotspot.normalFunction();
  });

  hotspot.addEventListener("click", () => {
    // console.log(`Hotspot ${id} clicked`);
    hotspot.clickFunction();
  });

  hotspotContainer.appendChild(hotspot);

  return {
    element: hotspot,
    position: position,
    setHoverFunction: (newFunction) => {
      hotspot.hoverFunction = newFunction;
    },
    setNormalFunction: (newFunction) => {
      hotspot.normalFunction = newFunction;
    },
    setClickFunction: (newFunction) => {
      hotspot.clickFunction = newFunction;
    },
  };
}

const $canvasContainer = jQuery("#ar_model_viewer");

function updateHotspots(hotspots) {
  hotspots.forEach(({ element, position }) => {
    if (position) {
      const screenPosition = position.clone();
      screenPosition.project(camera);

      const x = (screenPosition.x * 0.5 + 0.5) * $canvasContainer.width();
      const y = (screenPosition.y * -0.5 + 0.5) * $canvasContainer.height();

      jQuery(element).css({
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        "-webkit-transform": "translate(-50%, -50%)",
      });
    }
  });
}

function setHotspotVisibility(hotspot, visible) {
  if (!hotspot || !hotspot.element) {
    return;
  }

  hotspot.element.style.display = visible ? "block" : "none";
}

function setAllHotspotsVisibility(visible) {
  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach((hotspot) => {
    setHotspotVisibility(hotspot, visible);
  });
}

function setHotspotsByGroupVisibility(groupName, visible) {
  const hotspots = document.querySelectorAll(
    `.hotspot[data-group="${groupName}"]`
  );
  hotspots?.forEach((hotspot) => {
    hotspot.style.display = visible ? "block" : "none";
  });
}

window.addEventListener("resize", () => {
  updateHotspots(hotspots);

  // console.log("RESIZE");
  adaptiveMobile();

  jQuery(".rgb_icon_img, #shade-sys, #slide-sys, #gul-sys, #rgbIcon").each(
    function () {
      moveCanvasMenu({ target: this });
    }
  );
});

window.addEventListener("orientationchange", function (event) {
  window.orientation = 0;
});

//#endregion

//#region RAYCAST

const clickableObjects = [];

function initRaycast() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const canvas = document.getElementById("ar_model_view");

  let isMouseMoved = false;
  let clickThreshold = 5;
  let startX, startY;

  let avatarObject;

  function onMouseDown(event) {
    isMouseMoved = false;
    startX = event.offsetX;
    startY = event.offsetY;
  }

  function onMouseMove(event) {
    mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const visibleClickableObjects =
      getVisibleClickableObjects(clickableObjects);
    const intersects = raycaster.intersectObjects(
      visibleClickableObjects,
      true
    );

    if (intersects.length > 0) {
      canvas.style.cursor = "pointer";
      avatarObject = intersects[0].object;
      // visibleClickableObjects.forEach((object) => {
      //   pergola && pergola.outlineAvatar(object, false);
      // });
      // pergola && pergola.outlineAvatar(avatarObject, true, false);
    } else {
      canvas.style.cursor = "default";
      // visibleClickableObjects.forEach((object) => {
      //   pergola && pergola.outlineAvatar(object, false);
      // });
    }

    if (
      Math.abs(event.offsetX - startX) > clickThreshold ||
      Math.abs(event.offsetY - startY) > clickThreshold
    ) {
      isMouseMoved = true;
    }
  }

  function onMouseUp(event) {
    if (!isMouseMoved) {
      mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const visibleClickableObjects =
        getVisibleClickableObjects(clickableObjects);
      const intersects = raycaster.intersectObjects(
        visibleClickableObjects,
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        // console.log(`CLICKED: ${intersectedObject}`);
        const clickedSpan = intersectedObject.parentSpan;
        const activeSystem = clickedSpan.systems.find(
          (system) => system.active
        );

        const fixType = activeSystem.type === 4 ? 0 : activeSystem.type;

        pergola.settings.currentSubsystemType = fixType;

        // console.log(
        //   clickedSpan,
        //   "CLICEKD SPAN",
        //   pergola.settings.currentSubsystemType
        // );

        pergola && pergola.editSystem(clickedSpan);

        // visibleClickableObjects.forEach((object) => {
        //   pergola && pergola.outlineAvatar(object, false);
        // });
      }
    }
  }

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function getVisibleClickableObjects(objects = []) {
  const visibleObjects = objects.filter(
    (avatar) => avatar.parentSpan.isSystemSet === true
  );

  return visibleObjects;
}

//#endregion

//#region SUMMARY
function showSummaryModal() {
  jQuery(".product-type-3dmodel .modal").addClass("active");
  jQuery(".product-type-3dmodel .modal_overlay").addClass("active");
  fixScroll();
}

function generateOverviewItem(title, items) {
  const overviewItemHTML = jQuery(`
    <div class="overview_item overview_item--type">
      <h2 class="overview_item_title">${title}</h2>
      <ul class="overview_item_list">
        ${items
          .map(
            (item) => `
          <li class="overview_item_list_item">
            <span class="overview_item_list_item_title">${item.title}</span>
            <p class="overview_item_list_item_value">${item.value}</p>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `);

  return overviewItemHTML;
}

function prepareOverview() {
  jQuery(".overview").remove();

  const allItemOverview = [
    {
      title: "Type",
      items: [
        {
          title: "Pergola",
          value: `${typePergolaText[pergola.settings.typePergola]}`,
        },
      ],
    },
    {
      title: "Wall",
      items: [
        {
          title: "Back Wall",
          value: `${pergola.settings.backWall ? "Yes" : "No"}`,
        },
        {
          title: "Left Wall",
          value: `${pergola.settings.leftWall ? "Yes" : "No"}`,
        },
        {
          title: "Right Wall",
          value: `${pergola.settings.rightWall ? "Yes" : "No"}`,
        },
      ],
    },
    {
      title: "Sides",
      items: [
        {
          title: "Width",
          value: `${pergola.settings.width}`,
        },
        {
          title: "Projection",
          value: `${pergola.settings.depth}`,
        },
        {
          title: "Height",
          value: `${pergola.settings.height}`,
        },
      ],
    },
    {
      title: "Colors",
      items: [
        {
          title: "Frame Color",
          value: `${
            pergola.settings.frameColor
              ? pergola.settings.frameColor
              : "Grey Brown Fine Structure Matt"
          }`,
        },
        {
          title: "Roof Color",
          value: `${
            pergola.settings.roofColor
              ? pergola.settings.roofColor
              : "Grey Brown Fine Structure Matt"
          }`,
        },
      ],
    },
    {
      title: "Options",
      items: [
        {
          title: "LED Lights RGB",
          value: `${
            pergola.settings.perRGB ? pergola.settings.textColor : "No"
          }`,
        },
        {
          title: "LED Perimeter",
          value: `${pergola.settings.perLED ? "Yes" : "No"}`,
        },
        {
          title: "LED Spotlight",
          value: `${pergola.settings.spotLED ? "Yes" : "No"}`,
        },
        {
          title: "Heaters",
          value: `${pergola.settings.heaters ? "Yes" : "No"}`,
        },
        {
          title: "Fans",
          value: `${pergola.settings.fans ? "Yes" : "No"}`,
        },
      ],
    },
    {
      title: "Systems",
      items: [
        {
          title: "Zip Screen",
          value: `${
            pergola.checkSystemInScene(pergolaConst.systemType.BlindShade)
              ? "Yes"
              : "No"
          }`,
        },
        {
          title: "Sliding Glass Door",
          value: `${
            pergola.checkSystemInScene(pergolaConst.systemType.SlidingGlassDoor)
              ? "Yes"
              : "No"
          }`,
        },
        {
          title: "Guillotine Window",
          value: `${
            pergola.checkSystemInScene(pergolaConst.systemType.GuilotineGlass)
              ? "Yes"
              : "No"
          }`,
        },
      ],
    },
  ];

  const overviewHTML = jQuery(`
    <div class="overview"> 
    </div>
  `);

  allItemOverview.forEach((section) =>
    overviewHTML.append(generateOverviewItem(section.title, section.items))
  );

  jQuery(".main_menu .header_menu").after(overviewHTML);
}

function prepareSummary() {
  jQuery("#summary_productTitle").text(productTitle);
  jQuery("#summary_dimensions").text(
    `${pergolaSettings.width}(W) X ${pergolaSettings.depth}(D) X ${pergolaSettings.height}(H)`
  );

  const structureColor =
    pergolaSettings.frameColorType === pergolaConst.structureColorType.Standard
      ? jQuery(
          `.${colorOptionPrefixes.structureColorStandard}${pergolaSettings.roofColorType} .component_title`
        ).text()
      : jQuery(
          `.${colorOptionPrefixes.structureColorWood}${pergolaSettings.structureColorWood} .component_title`
        ).text();

  const canopyColor = jQuery(
    `.${colorOptionPrefixes.canopyColor}${pergolaSettings.canopyColor} .component_title`
  ).text();

  jQuery("#summary_mainColors").text(
    `Structure: ${structureColor}, Canopy: ${canopyColor}`
  );

  jQuery("#summary_fanPicked").text(
    `${pergolaSettings.sideOptionFan ? "Yes" : "No"}`
  );

  jQuery("#summary_heaterPicked").text(
    `${pergolaSettings.sideOptionHeater ? "Yes" : "No"}`
  );

  const subsystemList = getSubsystemList(pergola);
  createHtmlSubsystemList(subsystemList);

  showSummaryModal();
}

function getSubsystemList(pergolaObject) {
  const spans = pergolaObject.span.objects;
  const subsystemList = [];
  const subsystems = [];

  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    if (span.isSystemSet) {
      const subsystem = span.systems.find((system) => {
        return system.active === true;
      });

      subsystem && subsystems.push(subsystem);
    }
  }

  subsystems.forEach((subsystem) => {
    let systemName = pergolaConst.systemNameString[subsystem.name];
    let dimensions = "";
    let description = "";
    let quantity = "";
    let pergolaSide = "";

    if (subsystem.name === "BlindShade") {
      const systemColor = jQuery(
        `.${colorOptionPrefixes.subBlindShadeColor}${pergolaSettings.subBlindShadeColor} .component_title`
      ).text();
      dimensions = `${Math.round(
        subsystem.spanWidth / 0.0254
      )}(W) X ${Math.round(subsystem.spanHeight / 0.0254)}(H)`;
      description = `Color: ${systemColor}`;
      pergolaSide = `Pergola side: ${pergolaConst.sideString[subsystem.side]}`;
      quantity = 1;
    } else {
      let slideSide = subsystem.openingside ? "Left" : "Right";

      if (subsystem.doorQty > 5 && subsystem.name !== "BifoldDoor") {
        slideSide = "Both";
      }

      dimensions = `${Math.round(
        subsystem.spanWidth / 0.0254
      )}(W) X ${Math.round(subsystem.spanHeight / 0.0254)}(H)`;
      description = `${subsystem.doorQty} Sliders, Slide ${slideSide}`;
      pergolaSide = `Pergola side: ${pergolaConst.sideString[subsystem.side]}`;
      quantity = 1;
    }

    subsystemList.push({
      systemName: systemName,
      dimensions: dimensions,
      description: description + ", " + pergolaSide,
      quantity: quantity,
    });
  });

  if (pergolaSettings.subLeds) {
    subsystemList.push({
      systemName: "Leds",
      dimensions: "",
      description: "",
      quantity: pergola.roof.leds.filter((led) => led.active === true).length,
    });
  }

  return subsystemList;
}

function createHtmlSubsystemList(subsystemList) {
  let systemHtml = "";

  const mergedSubsystemList = subsystemList.reduce((acc, current) => {
    const existingItem = acc.find(
      (item) =>
        item.systemName === current.systemName &&
        item.description === current.description
    );

    if (existingItem) {
      existingItem.quantity += current.quantity;
    } else {
      acc.push({ ...current });
    }

    return acc;
  }, []);

  mergedSubsystemList.sort((a, b) => a.systemName.localeCompare(b.systemName));

  const wallSides = [
    {
      key: "mountingWall_Back",
      description: "Pergola side: Back",
    },
    {
      key: "mountingWall_Left",
      description: "Pergola side: Left",
    },
    {
      key: "mountingWall_Right",
      description: "Pergola side: Right",
    },
  ];

  wallSides.forEach((wallSide) => {
    if (pergolaSettings[wallSide.key]) {
      mergedSubsystemList.push({
        systemName: "Mounting Wall",
        dimensions: "",
        description: wallSide.description,
        quantity: "Yes",
      });
    }
  });

  mergedSubsystemList.forEach((subsystem) => {
    systemHtml += `
      <tr class="subsystem-row">
        <td>${subsystem.systemName}</td>
        <td>${subsystem.dimensions}</td>
        <td>${subsystem.description}</td>
        <td>${subsystem.quantity}</td>
      </tr>
    `;
  });

  jQuery(".subsystem-row").remove();
  jQuery("#summary_subsystemList").after(systemHtml);
}

//#endregion

//#region FORM VALIDATION
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validatePhone(phone) {
  const phonePattern = /^[0-9+\-\s()]*$/;
  return phonePattern.test(phone);
}

function validateForm(formId, buttonId) {
  const form = jQuery(formId);
  const checkboxID = buttonId === "#js-downloadPdf" ? "#agreePdf" : "#agree";

  jQuery(buttonId).prop("disabled", true);

  const isNameValid = form.find("#form_name").length
    ? form.find("#form_name").val().trim() !== ""
    : true;
  const isPhoneValid = form.find("#form_phone").length
    ? validatePhone(form.find("#form_phone").val().trim())
    : true;
  const isEmailValid = form.find("#form_email").length
    ? validateEmail(form.find("#form_email").val().trim())
    : true;
  const isAddressValid = form.find("#form_address").length
    ? form.find("#form_address").val().trim() !== ""
    : true;
  const isZipcodeValid = form.find("#form_zipcode").length
    ? form.find("#form_zipcode").val().trim() !== ""
    : true;
  const isCityValid = form.find("#form_city").length
    ? form.find("#form_city").val().trim() !== ""
    : true;
  const isCheckboxChecked = form.find(checkboxID).length
    ? form.find(checkboxID).is(":checked")
    : true;

  // Check form validity
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isAddressValid &&
    isZipcodeValid &&
    isCityValid &&
    isCheckboxChecked;

  jQuery(buttonId).prop("disabled", !isFormValid);
  // console.log("DISABLED BUTTON VALID", jQuery(buttonId));
}

//#endregion

//#region PDF (lirary PDFMAKE)

async function createPDF(opt = "open") {
  await createImageList();

  const uiPdfPhone = "206-737-3078 / 866-787-5147";
  const uiPdfEmail = "info@pergomatic.com";
  const uiPdfWeb = "www.pergomatic.com";

  const mainMargins = [30, 130, 30, 60];

  const imageUrls = [
    pdf_logo_url,
    pdf_icon_web_url,
    pdf_icon_phone_url,
    pdf_icon_email_url,
  ];

  pdfMake.fonts = {
    ITCAvantGardePro: {
      normal: "ITCAvantGardePro-Md.ttf",
    },
    Manrope: {
      normal: "Manrope-Regular.ttf",
      bold: "Manrope-Bold.ttf",
    },
  };

  const pergolaDimensions = `${pergolaSettings.width}(W) X ${pergolaSettings.depth}(D) X ${pergolaSettings.height}(H)`;
  const structureColor =
    pergolaSettings.structureColorType ===
    pergolaConst.structureColorType.Standard
      ? jQuery(
          `.${colorOptionPrefixes.structureColorStandard}${pergolaSettings.structureColorStandard} .component_title`
        ).text()
      : jQuery(
          `.${colorOptionPrefixes.structureColorWood}${pergolaSettings.structureColorWood} .component_title`
        ).text();
  const canopyColor = jQuery(
    `.${colorOptionPrefixes.canopyColor}${pergolaSettings.canopyColor} .component_title`
  ).text();
  const pergolaDescription = `Structure: ${structureColor}, Canopy: ${canopyColor}`;

  const subsystemList = getSubsystemList(pergola);

  const subsystemListTableData = subsystemList.map((item) => [
    { text: item.systemName, bold: true },
    item.dimensions,
    item.description,
    item.quantity,
  ]);

  const sideOptionsIndex = subsystemListTableData.length + 2;

  const promises = imageUrls.map(async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  });

  function metersToInches(meters) {
    const inchesPerMeter = 39.3701;
    return Math.round(meters * inchesPerMeter);
  }

  const { span_width, span_depth } = pergola.getSpanPoints();

  Promise.all(promises)
    .then(([logoImage, websiteIconImage, phoneIconImage, emailIconImage]) => {
      const headerContent = {
        stack: [
          {
            image: logoImage,
            width: 130,
            margin: [30, 20, 0, 0],
          },
        ],
        alignment: "left center",
      };

      let textColorForZip = "";

      function generateTextBySystemType(type) {
        const generateDimensionText = (type, side, size) => {
          return pergola.checkSystemInScene(type, side)
            ? ` ${metersToInches(size)} X ${metersToInches(
                pergola.getMeters(pergola.settings.height)
              )}`
            : "";
        };

        const width = `${generateDimensionText(
          type,
          pergolaConst.side.Back,
          span_width
        )}`;
        const depth = `${generateDimensionText(
          type,
          pergolaConst.side.Left,
          span_depth
        )}`;

        return { width, depth };
      }

      jQuery(".ar_filter_group_13")
        .find(".ar_filter_options .option")
        .each(function () {
          const $this = jQuery(this);

          if ($this.hasClass("active")) {
            textColorForZip = $this.find(".component_title").text();
          }
        });

      const footerContent = function () {
        return [
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: [12, "auto", "*", 12, "auto", "*", 12, "auto"],
              body: [
                [
                  {
                    image: phoneIconImage,
                    margin: [0, 25, -30, 30],
                    width: 8,
                    height: 8,
                    alignment: "center",
                    style: "footer",
                  },
                  {
                    text: uiPdfPhone,
                    margin: [30, 25, 0, 30],
                    alignment: "center",
                    style: "footer",
                    color: "#ffffff",
                  },
                  { text: "" },
                  {
                    image: emailIconImage,
                    width: 8,
                    height: 8,
                    alignment: "center",
                    margin: [0, 25, 0, 30],
                  },
                  {
                    text: uiPdfEmail,
                    link: `mailto:${uiPdfEmail}`,
                    margin: [0, 25, 0, 30],
                    alignment: "center",
                    style: "footer",
                    color: "#ffffff",
                  },
                  { text: "" },
                  {
                    image: websiteIconImage,
                    width: 8,
                    height: 8,
                    alignment: "center",
                    margin: [0, 25, 0, 30],
                  },
                  {
                    text: uiPdfWeb,
                    link: uiPdfWeb,
                    margin: [0, 25, 30, 30],
                    alignment: "center",
                    style: "footer",
                    color: "#ffffff",
                  },
                ],
              ],
            },
            fillColor: "black",
            layout: "noBorders",
          },
        ];
      };

      const pdfContent = [
        {
          margin: [40, 0, 0, 0],
          columns: [
            {
              image: pdfImg,
              width: 250,
              height: 120, // Set the height here
              margin: [0, 0, 0, 0],
            },
            {
              image: pdfImgTop,
              width: 250,
              height: 120, // Set the height here
              margin: [0, 0, 0, 0],
            },
          ],
        },
        {
          columns: [
            [
              {
                style: "tableItemLeft",
                table: {
                  widths: [115, 115],
                  body: [
                    [
                      {
                        text: "SIZES",
                        style: "tableHeader",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, true, false, false],
                        style: "lineStyle",
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Width",
                        style: "itemFirst",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.width}`,
                        style: "itemValueFirst",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Height",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.height}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Depth",
                        style: "item",
                        border: [false, false, false, false],
                      }, // Ð’Ð¸Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¾ Ð½Ð° Depth
                      {
                        text: `${pergola.settings.depth}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
              },
              {
                style: "tableItemLeft",
                table: {
                  widths: [115, 115],
                  body: [
                    [
                      {
                        text: "COLORS",
                        style: "tableHeader",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, true, false, false],
                        style: "lineStyle",
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Frame Color",
                        style: "itemFirst",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${
                          pergola.settings.frameColor
                            ? pergola.settings.frameColor
                            : "Grey Brown Fine Structure Matt"
                        }`,
                        style: "itemValueFirst",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Roof Color",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${
                          pergola.settings.roofColor
                            ? pergola.settings.roofColor
                            : "Grey Brown Fine Structure Matt"
                        }`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
              },
              {
                style: "tableItemLeft",
                table: {
                  widths: [115, 115],
                  body: [
                    [
                      {
                        text: "WALL",
                        style: "tableHeader",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, true, false, false],
                        style: "lineStyle",
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Back Wall",
                        style: "itemFirst",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.backWall ? "Yes" : "No"}`,
                        style: "itemValueFirst",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Left Wall",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.leftWall ? "Yes" : "No"}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Right Wall",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.rightWall ? "Yes" : "No"}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
              },
              {
                style: "tableItemLeft",
                table: {
                  widths: [115, 115],
                  body: [
                    [
                      {
                        text: "OPTIONS",
                        style: "tableHeader",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, true, false, false],
                        style: "lineStyle",
                      },
                      {
                        text: "",
                        colSpan: 2,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "LED Lights RGB",
                        style: "itemFirst",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${
                          pergola.settings.textColor
                            ? pergola.settings.textColor
                            : "No"
                        }`,
                        style: "itemValueFirst",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "LED Daylight",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.perLED ? "Yes" : "No"}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Spotlights",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.spotLED ? "Yes" : "No"}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Heaters",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.heaters ? "Yes" : "No"}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: "Fans",
                        style: "item",
                        border: [false, false, false, false],
                      },
                      {
                        text: `${pergola.settings.fans ? "Yes" : "No"}`,
                        style: "itemValue",
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
              },
            ],
            {
              style: "tableItemRight",
              table: {
                widths: [115, 115],
                body: [
                  [
                    {
                      text: "SYSTEMS",
                      style: "tableHeader",
                      colSpan: 2,
                      border: [false, false, false, false],
                    },
                    {
                      text: "",
                      colSpan: 2,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      colSpan: 2,
                      border: [false, true, false, false],
                      style: "lineStyle",
                    },
                    {
                      text: "",
                      colSpan: 2,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Zip Screen",
                      style: "item",
                      border: [false, false, false, false],
                    },
                    {
                      text: pergola.checkSystemInScene(
                        pergolaConst.systemType.BlindShade
                      )
                        ? generateTextBySystemType(
                            pergolaConst.systemType.BlindShade
                          ).width +
                          `
                        , ` +
                          generateTextBySystemType(
                            pergolaConst.systemType.BlindShade
                          ).depth
                        : "No",
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Color",
                      style: "item",
                      color: "#95A096",
                      border: [false, false, false, false],
                    },
                    {
                      text: pergola.checkSystemInScene(
                        pergolaConst.systemType.BlindShade
                      )
                        ? textColorForZip
                        : "No",
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Quantity",
                      style: "item",
                      color: "#95A096",
                      border: [false, false, false, false],
                    },
                    {
                      text: `${pergola.getQtySystems(
                        pergolaConst.systemType.BlindShade
                      )}`,
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Sliding Glass Door",
                      style: "item",
                      border: [false, false, false, false],
                    },
                    {
                      text: pergola.checkSystemInScene(
                        pergolaConst.systemType.SlidingGlassDoor
                      )
                        ? generateTextBySystemType(
                            pergolaConst.systemType.SlidingGlassDoor
                          ).width +
                          `
                        , ` +
                          generateTextBySystemType(
                            pergolaConst.systemType.SlidingGlassDoor
                          ).depth
                        : "No",
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Quantity",
                      style: "item",
                      color: "#95A096",
                      border: [false, false, false, false],
                    },
                    {
                      text: `${pergola.getQtySystems(
                        pergolaConst.systemType.SlidingGlassDoor
                      )}`,
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Guillotine Window",
                      style: "item",
                      border: [false, false, false, false],
                    },
                    {
                      text: pergola.checkSystemInScene(
                        pergolaConst.systemType.GuilotineGlass
                      )
                        ? generateTextBySystemType(
                            pergolaConst.systemType.GuilotineGlass
                          ).width +
                          `
                        , ` +
                          generateTextBySystemType(
                            pergolaConst.systemType.GuilotineGlass
                          ).depth
                        : "No",
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "Quantity",
                      style: "item",
                      color: "#95A096",
                      border: [false, false, false, false],
                    },
                    {
                      text: `${pergola.getQtySystems(
                        pergolaConst.systemType.GuilotineGlass
                      )}`,
                      style: "itemValue",
                      border: [false, false, false, false],
                    },
                  ],
                ],
              },
            },
          ],
        },
      ];

      const fontSize = 10;
      // -------------------------------------------------
      const pdfDefinition = {
        pageMargins: mainMargins,
        header: headerContent,
        content: pdfContent,
        footer: footerContent,

        styles: {
          tableTitle: {
            fontSize: 12,
            bold: false,
            font: "Manrope",
            color: "#FFFFFF",
          },
          tableItemTitle: { fontSize: 12, bold: true, font: "Manrope" },
          tableItemText: { fontSize: 12, bold: false, font: "Manrope" },
          footer: { fontSize: 8, bold: false, font: "ITCAvantGardePro" },
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            borderBottom: "1px solid #808080",
            bold: true,
            fontSize: fontSize,
            color: "black",
            alignment: "center",
            margin: [0, 5, 0, 8],
          },
          item: {
            fontSize: fontSize,
            color: "black",
            alignment: "left",
            margin: [0, 10, 0, 0],
          },
          itemFirst: {
            fontSize: fontSize,
            color: "black",
            alignment: "left",
            margin: [0, 0, 0, 0],
          },
          itemValue: {
            fontSize: fontSize,
            color: "#95A096",
            alignment: "right",
            margin: [0, 10, 0, 0],
          },
          itemValueFirst: {
            fontSize: fontSize,
            color: "#95A096",
            alignment: "right",
            margin: [0, 0, 0, 0],
          },
          tableItem: {
            fontSize: fontSize,
            width: 237,
          },
          tableItemRight: {
            fontSize: 0,
            margin: [0, 0, 0, 0],
          },
          tableItemLeft: {
            fontSize: fontSize,
            width: 237,
            margin: [0, 0, 0, 0],
          },
          lineStyle: {
            borderBottom: "1px solid #95A096",
            borderTop: "1px solid #95A096",
            marginBottom: 5,
          },
        },
        defaultStyle: { font: "Manrope" },
      };
      // -------------------------------------------------
      switch (opt) {
        case "open":
          pdfMake.createPdf(pdfDefinition).open();
          break;

        case "download":
          pdfMake.createPdf(pdfDefinition).download("Pergomatic.pdf");
          break;

        case "all":
          pdfMake.createPdf(pdfDefinition).getBlob((pdfBlob) => {
            const urlForTab = URL.createObjectURL(pdfBlob);
            window.open(urlForTab);

            const link = document.createElement("a");
            link.href = urlForTab;
            link.download = "Pergomatic.pdf";
            link.click();

            URL.revokeObjectURL(urlForTab);
          });
          break;

        case "base64":
          return new Promise((resolve, reject) => {
            try {
              pdfMake.createPdf(pdfDefinition).getBase64((base64Data) => {
                resolve(base64Data);
              });
            } catch (err) {
              reject(err);
            }
          });

        default:
          rej("invalid request");
          break;
      }
    })
    .catch((error) => {
      console.error("Image loading error:", error);
      rej(error);
    });
}

async function convertToBlackAndWhite(base64Image) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = base64Image;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const avg = (r + g + b) / 3;

        data[i] = data[i + 1] = data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);

      // ÃÅ¸ÃÂµÃ‘â‚¬ÃÂµÃ‘â€šÃÂ²ÃÂ¾Ã‘â‚¬ÃÂµÃÂ½ÃÂ½Ã‘Â ÃÂ½ÃÂ° base64
      const bwBase64 = canvas.toDataURL("image/png");
      resolve(bwBase64);
    };

    image.onerror = reject;
  });
}

//#endregion

//#region Dimmensions

function removeObject3D(object3D) {
  if (!(object3D instanceof THREE.Object3D)) return false;

  if (object3D.geometry) object3D.geometry.dispose();

  if (object3D.material) {
    if (object3D.material instanceof Array) {
      object3D.material.forEach((material) => material.dispose());
    } else {
      object3D.material.dispose();
    }
  }
  object3D.removeFromParent();
  return true;
}

var dimmensionObjects = [];

function changeDimmensionRender(status, lookAtCamera = null, stage) {
  if (!status) {
    for (let index = 0; index < dimmensionObjects.length; index++) {
      const element = dimmensionObjects[index];
      removeObject3D(element);
    }

    dimmensionObjects = [];
    return;
  }

  function getMeters(feet) {
    const meters = feet * 0.3048;
    return meters;
  }

  const { FL_point, FR_point, RL_point, RR_point } = pergola.getCornerPoints();

  const modelHeight = getMeters(pergolaSettings.height);
  const deltaHeight = 0.7;

  let textSize = 0.3;

  if (
    getMeters(pergolaSettings.width) > 15 ||
    getMeters(pergolaSettings.depth) > 15
  ) {
    textSize = 0.35;
  }

  if (
    getMeters(pergolaSettings.width) > 25 ||
    getMeters(pergolaSettings.depth) > 25
  ) {
    textSize = 0.4;
  }

  if (
    getMeters(pergolaSettings.width) > 30 ||
    getMeters(pergolaSettings.depth) > 30
  ) {
    textSize = 0.45;
  }

  var pos_width_0 = new THREE.Vector3(
    FL_point.x - 0.1,
    modelHeight - deltaHeight,
    FL_point.z + 0.1
  );
  var pos_width_1 = new THREE.Vector3(
    FR_point.x + 0.08,
    modelHeight - deltaHeight,
    FR_point.z + 0.1
  );

  var pos_length_0 = new THREE.Vector3(
    FR_point.x + 0.1,
    modelHeight - deltaHeight,
    FR_point.z + 0.08
  );
  var pos_length_1 = new THREE.Vector3(
    RR_point.x + 0.1,
    modelHeight - deltaHeight,
    RR_point.z - 0.1
  );

  var pos_width_center = generateMidpoints(pos_width_0, pos_width_1, 1);
  var pos_length_center = generateMidpoints(pos_length_0, pos_length_1, 1);

  var pos_width_textPosition = new THREE.Vector3(
    pos_width_center[0].z,
    pos_width_center[0].y + 0.2,
    pos_width_center[0].x + 0.1
  );
  var pos_length_textPosition = new THREE.Vector3(
    pos_length_center[0].x + 0.1,
    pos_length_center[0].y + 0.1,
    pos_length_center[0].z
  );

  const { zAligned, xAligned } = pergola.getCornerPairs();

  AddDimmension(
    pos_width_center[0],
    pos_length_0,
    pos_length_1,
    pergolaSettings.width.toString() + "'",
    pos_width_textPosition,
    "x",
    0.01,
    0x000000,
    lookAtCamera
  );
  createDimensionBorderLine(pos_width_0, 0.25, 0.01, "x", 0x000000, 1);
  createDimensionBorderLine(pos_width_1, 0.25, 0.01, "x", 0x000000, 2);
  createDimensionText(
    pergolaSettings.depth.toString() + "'",
    generateMidpoints(zAligned[0], zAligned[0], 1)[0],
    0x000000,
    lookAtCamera,
    textSize,
    1
  );

  AddDimmension(
    pos_length_center[0],
    pos_width_0,
    pos_width_1,
    pergolaSettings.depth.toString() + "'",
    pos_length_textPosition,
    "z",
    0.01,
    0x000000,
    lookAtCamera
  );
  createDimensionBorderLine(pos_length_0, 0.25, 0.01, "x", 0x000000, 3);
  createDimensionBorderLine(pos_length_1, 0.25, 0.01, "x", 0x000000, 4);
  createDimensionText(
    pergolaSettings.width.toString() + "'",
    generateMidpoints(xAligned[0], xAligned[1], 1)[0],
    0x000000,
    lookAtCamera,
    textSize,
    2
  );

  var pos_height_0 = new THREE.Vector3(RR_point.x + 0.5, -1, RR_point.z);
  var pos_height_1 = new THREE.Vector3(
    RR_point.x + 0.5,
    modelHeight - 1 + 0.3,
    RR_point.z
  );

  var pos_height_center = generateMidpoints(pos_height_0, pos_height_1, 1);
  var pos_height_textPosition = new THREE.Vector3(
    pos_height_center[0].x + 0.1,
    pos_height_center[0].y,
    pos_height_center[0].z
  );

  AddDimmension(
    pos_height_center[0],
    pos_height_0,
    pos_height_1,
    "8" + "'",
    pos_height_textPosition,
    "y",
    0.01,
    0x000000,
    lookAtCamera
  );

  const heightVec = new THREE.Vector3(
    zAligned[0].z + 0.3,
    pergola.getMeters(pergolaSettings.height) - 1 + 0.3,
    xAligned[0].x - 0.3
  );
  createDimensionBorderLine(pos_height_0, 0.25, 0.01, "y", 0x000000, 5);
  createDimensionBorderLine(pos_height_1, 0.25, 0.01, "y", 0x000000, 6);
  createDimensionText(
    pergolaSettings.height.toString() + "'",
    heightVec,
    0x000000,
    lookAtCamera,
    textSize,
    3
  );
}

function AddDimmension(
  position,
  start,
  end,
  text,
  textPosition = null,
  side = "x",
  thickness = 0.01,
  color = 0x000000,
  lookAtCamera = null
) {
  const line = createDimensionLine(
    position,
    start,
    end,
    thickness,
    side,
    color
  );
  scene.add(line);
  dimmensionObjects.push(line);

  /*
  if(textPosition != null){
    createDimensionText(text, textPosition, 0xF41818, lookAtCamera);
    return;
  }

  var line1_center = generateMidpoints(start, end, 1);
  createDimensionText(text, line1_center[0], 0xF41818, lookAtCamera);
  dimmensionObjects.push(line);
  */
}

function getDistance(point1, point2) {
  return point1.distanceTo(point2);
}

function createDimensionLine(
  position,
  start,
  end,
  thickness = 0.01,
  side = "x",
  color = 0xf41818
) {
  //const material = new THREE.LineBasicMaterial({ color: color });
  var length = getDistance(start, end);

  var x_value = side != "x" ? thickness : length;
  var y_value = side != "y" ? thickness : length;
  var z_value = side != "z" ? thickness : length;

  const { zAligned, xAligned } = pergola.getCornerPairs();

  const material = new THREE.MeshBasicMaterial({ color: color });
  //size
  const geometry = new THREE.BoxGeometry(x_value, y_value, z_value);
  const lineMesh = new THREE.Mesh(geometry, material);

  if (side === "x") {
    lineMesh.position.set(0, position.y, xAligned[1].x + 0.3);
  } else if (side === "z") {
    lineMesh.position.set(zAligned[0].z + 0.3, position.y, 0);
  } else if (side === "y") {
    lineMesh.position.set(zAligned[0].z + 0.3, position.y, xAligned[0].x - 0.3);
  }

  // console.log(zAligned, xAligned);
  // console.log(lineMesh, "line");

  return lineMesh;
}

function createDimensionBorderLine(
  position,
  length,
  thickness = 0.01,
  side = "x",
  color = 0x000000,
  direction = 1
) {
  var x_value = side != "y" ? thickness : length;
  var y_value = side != "x" ? thickness : length;
  var z_value = side != "z" ? thickness : length;

  switch (side) {
    case "x":
      x_value = thickness;
      y_value = length;
      z_value = thickness;
      break;
    case "y":
      x_value = length;
      y_value = thickness;
      z_value = thickness;
      break;
    case "z":
      x_value = thickness;
      y_value = length;
      z_value = thickness;
      break;

    default:
      break;
  }

  const material = new THREE.MeshBasicMaterial({ color: color });
  const geometry = new THREE.BoxGeometry(x_value, y_value, z_value);
  const lineBorderMesh = new THREE.Mesh(geometry, material);

  const { zAligned, xAligned } = pergola.getCornerPairs();

  switch (direction) {
    case 1:
      lineBorderMesh.position.set(
        Math.abs(zAligned[0].z),
        position.y,
        xAligned[1].x + 0.3
      );

      break;

    case 2:
      lineBorderMesh.position.set(
        -Math.abs(zAligned[0].z),
        position.y,
        xAligned[1].x + 0.3
      );
      break;

    case 3:
      lineBorderMesh.position.set(
        zAligned[0].z + 0.3,
        position.y,
        xAligned[0].x
      );

      break;

    case 4:
      lineBorderMesh.position.set(
        zAligned[0].z + 0.3,
        position.y,
        xAligned[1].x
      );
      break;

    case 5:
      lineBorderMesh.position.set(zAligned[0].z + 0.3, -1, xAligned[0].x - 0.3);

      break;

    case 6:
      lineBorderMesh.position.set(
        zAligned[0].z + 0.3,
        pergola.getMeters(pergolaSettings.height) - 1 + 0.3,
        xAligned[0].x - 0.3
      );

      break;
  }

  scene.add(lineBorderMesh);
  dimmensionObjects.push(lineBorderMesh);
  return lineBorderMesh;
}

function loadThreeJSFonts() {
  const loader = new THREE.FontLoader();

  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      threejs_font_helvetiker_regular = font;
    }
  );
}

function createDimensionText(
  text,
  position,
  color = 0x000000,
  lookAtCamera = null,
  textSize = 0.2,
  dir
) {
  if (threejs_font_helvetiker_regular == null) {
    return;
  }

  const textGeometry = new THREE.TextGeometry(text, {
    font: threejs_font_helvetiker_regular,
    size: textSize,
    depth: 0,
    height: 0,
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: color });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  const { zAligned, xAligned } = pergola.getCornerPairs();

  switch (dir) {
    case 1:
      textMesh.position.set(
        0,
        pergola.getMeters(pergolaSettings.height),
        xAligned[1].x + 0.3
      );

      break;

    case 2:
      textMesh.position.set(
        zAligned[0].z + 0.3,
        pergola.getMeters(pergolaSettings.height),
        0
      );

      break;

    case 3:
      textMesh.position.set(
        zAligned[0].z + 0.3,
        pergola.getMeters(pergolaSettings.height) / 2 - 1,
        xAligned[0].x - 0.3
      );

      break;

    default:
      break;
  }

  if (lookAtCamera != null) {
    textMesh.lookAt(lookAtCamera.position);
  }

  textMesh.geometry.parameters.options.depth = 0.01;
  // console.log(textMesh, "text before");

  scene.add(textMesh);

  dimmensionObjects.push(textMesh);

  return textMesh;
}

async function createFlatDimensionText(
  text,
  position,
  color = 0x000000,
  lookAtCamera = null,
  textSize = 0.2,
  side
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const font = `${60}px Arial`;
  ctx.font = font;

  const textWidth = ctx.measureText(text).width;
  const textHeight = textSize * 100;
  canvas.width = textWidth;
  canvas.height = textHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);

  const planeWidth = canvas.width / 100;
  const planeHeight = canvas.height / 100;

  const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

  const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.FrontSide,
    transparent: true,
  });

  const { zAligned, xAligned } = pergola.getCornerPairs();

  const textMesh = new THREE.Mesh(planeGeometry, planeMaterial);

  switch (side) {
    case 1:
      textMesh.position.set(0, position.y, xAligned[1].x + 0.3);
      break;

    case 2:
      textMesh.position.set(zAligned[0].z + 0.3, position.y, 0);
      break;

    case 3:
      textMesh.position.set(zAligned[0].z + 0.5, 0.25, xAligned[0].x - 0.3);
      break;
  }

  const scaleX = planeWidth / (canvas.width / 100);
  const scaleY = planeHeight / (canvas.height / 100);
  textMesh.scale.set(scaleX, scaleY, 1);

  if (lookAtCamera != null) {
    textMesh.lookAt(lookAtCamera.position);
  }

  scene.add(textMesh);
  dimmensionObjects.push(textMesh);

  return textMesh;
}

//#endregion

//#region CAPTURE CAMERA IMAGE

var share_RenderImageSize = {
  x: 650,
  y: 350,
};

var share_RenderImages = [];

async function createImageList() {
  if (canvas == null) {
    return;
  }

  const fov = 50;
  let width = Number(pergola.settings.width);
  let length = Number(pergola.settings.depth);
  const sizeValue = width > length ? width : length;

  const deltaDist = convertMorphValue(pergola.settings.height, 8, 15, 4.5, 8.0);
  const deltaY = convertMorphValue(pergola.settings.height, 8, 15, 0.5, 2.0);

  const dist = (sizeValue / 40) * 10 + deltaDist;

  // console.log(canvas);
  const cameraImageViews_Global = [
    {
      id: "view_1.png",
      alt: "view 1",
      cameraObject: new THREE.PerspectiveCamera(
        fov,
        canvas.width / canvas.height,
        0.01,
        1000
      ),
      position: new THREE.Vector3(dist / 1.7, 0 + deltaY, dist / 1.7),
      rotation: new THREE.Vector3(0, Math.PI / 4.25, 0),
    },
    {
      id: "view_top.png",
      alt: "view from top",
      cameraObject: new THREE.PerspectiveCamera(
        fov,
        canvas.width / canvas.height,
        0.01,
        1000
      ),
      position: new THREE.Vector3(0, dist * 1.1, 0),
      rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
    },
  ];

  share_RenderImages = [];

  // pergola.changeMountingWall(false, false, false, false);

  // //#region HIDE WALL
  // state.backWall = false;
  // state.leftWall = false;
  // state.rightWall = false;

  // const activeWallClass = "type_interface_checkbox-wall_item--active";
  // const backWall = $("#back");
  // const leftWall = $("#left");
  // const rightWall = $("#right");

  // function toggleClass(item, settings) {
  //   if (settings) {
  //     item.addClass(activeWallClass);
  //   } else {
  //     item.removeClass(activeWallClass);
  //   }
  // }

  // // INIT BUTTONS WALL
  // toggleBackWall(state.backWall);
  // toggleLeftWall(state.leftWall);
  // toggleRightWall(state.rightWall);

  // updateTextParam(state, backWall);

  // toggleClass(backWall, state.backWall);
  // toggleClass(leftWall, state.leftWall);
  // toggleClass(rightWall, state.rightWall);
  // //#endregion

  //SAVE WALL SETTINGS
  const initialSettings = {
    backWall: pergola.settings.backWall,
    rightWall: pergola.settings.rightWall,
    leftWall: pergola.settings.leftWall,
  };

  //DISABLE WALLS
  setVisibilityBox(false);
  pergola.settings.backWall ? jQuery(".option_1-0").trigger("click") : null;
  pergola.settings.rightWall ? jQuery(".option_1-2").trigger("click") : null;
  pergola.settings.leftWall ? jQuery(".option_1-1").trigger("click") : null;
  pergola.update();

  for (let index = 0; index < cameraImageViews_Global.length; index++) {
    const element = cameraImageViews_Global[index];

    element.cameraObject.visible = true;
    element.cameraObject.aspect = camera.aspect;
    element.cameraObject.updateProjectionMatrix();
    element.cameraObject.position.set(
      element.position.x,
      element.position.y,
      element.position.z
    );
    element.cameraObject.rotation.set(
      element.rotation.x,
      element.rotation.y,
      element.rotation.z
    );

    changeDimmensionRender(true, element, index);
    TakeImage(element, "ar_pop_share_image");
    await new Promise((resolve) => setTimeout(resolve, 1));
    changeDimmensionRender(false);
  }

  // console.log(share_RenderImages[0].src);

  pdfImg = share_RenderImages[0].src;
  pdfImgTop = share_RenderImages[1].src;

  // RETURN WALL
  setVisibilityBox(true);
  if (initialSettings.backWall) {
    jQuery(".option_1-0").trigger("click");
  }
  if (initialSettings.rightWall) {
    jQuery(".option_1-2").trigger("click");
  }
  if (initialSettings.leftWall) {
    jQuery(".option_1-1").trigger("click");
  }

  // $("#js-summary-image-preview-1").find("img").eq(1).remove();

  // changeSceneTime(old_sceneTime);
}

function TakeImage(view, img_class, top) {
  var img_div = document.createElement("div");
  img_div.classList.add(img_class);
  var img = CreateImage(view);
  img_div.appendChild(img);
  //DownloadRenderImage(img.src, img.alt);
  //ar_pop_share_pics.appendChild(img_div);
}

function CreateImage(view) {
  var img = new Image();

  renderer.setSize(share_RenderImageSize.x, share_RenderImageSize.y, false);
  view.cameraObject.aspect = share_RenderImageSize.x / share_RenderImageSize.y;
  view.cameraObject.updateProjectionMatrix();
  renderer.render(scene, view.cameraObject);

  img.src = renderer.domElement.toDataURL();
  img.alt = view.alt;

  share_RenderImages.push(img);

  view.cameraObject.visible = false;
  updateRenderSize();
  return img;
}

function updateRenderSize() {
  if (renderer == null) {
    return;
  }

  const canvasContainer = document.getElementById("ar_model_viewer");
  const rect = canvasContainer.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.update();

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

function DownloadRenderImage(src, alt) {
  if (src == null) {
    return;
  }
  if (alt == 0) {
    return;
  }

  var a = document.createElement("a");
  a.href = src;
  a.download = alt;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//#endregion

//#region SCRIPT FOR MOBILE
var mobileBorder = 1050;

function toggleMobile(toggle) {
  if (toggle) {
    jQuery(".main_menu").addClass("main_menu-mobile");
    jQuery(".overview").addClass("overview-mobile");
    jQuery(".side_menu__buttons").addClass("overview-button--mobile");
    jQuery(".side_menu__buttons").addClass("side_menu__buttons--overview");
    jQuery(".button--menu").addClass("button--menu--visible");
    jQuery(".ar_model_viewer").show();

    if (window.innerWidth < mobileBorder) {
      jQuery(".ar_model_viewer").hide();
    }
  } else {
    jQuery(".main_menu").removeClass("main_menu-mobile");
    jQuery(".overview").removeClass("overview-mobile");
    jQuery(".side_menu__buttons").removeClass("overview-button--mobile");
    jQuery(".side_menu__buttons").removeClass("side_menu__buttons--overview");
    jQuery(".button--menu").removeClass("button--menu--visible");

    jQuery(".ar_model_viewer").hide();
    jQuery(".ar_model_viewer").show();
  }
}

// getMobileOperatingSystem() === "Windows Phone" ||
// getMobileOperatingSystem() === "Android" ||
// getMobileOperatingSystem() === "iOS";

let beenMobile = false;

function removeActiveClassFromMenu() {
  // jQuery(".footer_menu")
  //   .find(".footer_menu__item")
  //   .each(function (index, el) {
  //     jQuery(el).removeClass("active");
  //   });
}

const handleMenuClick = function () {
  jQuery(".footer_menu").hide();
  jQuery(".button--black").addClass("back-menu");
  jQuery(".side_menu__buttons").css("visibility", "visible");
  jQuery(".side_menu__buttons").css("opacity", "1");

  // console.log("next click on mobile");
};

const handlePrevButton = function () {
  // jQuery(".footer_menu").show();
  // removeActiveClassFromMenu();
  jQuery(".side_menu__buttons").css("visibility", "hidden");
  jQuery(".side_menu__buttons").css("opacity", "0");

  // console.log("prev click on mobile");
};

const handleMenuButton = function () {
  jQuery(".footer_menu").show();
  removeActiveClassFromMenu();
  toggleMobile(false);
  jQuery(".side_menu__buttons").css("visibility", "hidden");
  jQuery(".side_menu__buttons").css("opacity", "0");

  jQuery("html, body").scrollTop(0);
};

const isMobile =
  getMobileOperatingSystem() === "Android" ||
  getMobileOperatingSystem() === "iOS" ||
  getMobileOperatingSystem() === "unknown";
getMobileOperatingSystem() === "Windows Phone";

function moveCanvasMenu(event) {
  const shadeIcon = jQuery("#shade-sys");
  const slideIcon = jQuery("#slide-sys");
  const gulIcon = jQuery("#gul-sys");
  const bladeIcon = jQuery("#btnWall");
  const rgbIcon = jQuery("#rgbIcon");

  if (
    jQuery(event.target).hasClass("rgb_icon_img") ||
    shadeIcon.is(event.target) ||
    slideIcon.is(event.target) ||
    gulIcon.is(event.target) ||
    (bladeIcon.is(event.target) && window.innerWidth > mobileBorder) ||
    rgbIcon.is(event.target)
  ) {
    const topPosition = jQuery(event.target).offset().top;
    const leftPosition = jQuery(event.target).offset().left;

    jQuery(".canvas_subsystem_menu").each(function () {
      jQuery(this).css("top", topPosition);
      jQuery(this).css("left", leftPosition);
    });
  }
}

function adaptiveMobile() {
  globalListener();

  const footerMenu = jQuery(".footer_menu");
  const mainMenu = jQuery(".main_menu");
  const canvas = jQuery("#ar_model_viewer");
  const arContainer = jQuery(".ar_conf_container");
  const iconsContainer = jQuery(".icons-container");
  const prevButton = jQuery(".button--black");
  const menuButtonByOverview = jQuery(".button--menu");
  const cancelButton = jQuery("#js-closeRequestPdf");
  const bladeRotationPop = jQuery("#bladeR");

  function globalListener() {
    jQuery(document).on("click", function (event) {
      let isAnyElementVisible = false;

      moveCanvasMenu(event);

      jQuery(".canvas_subsystem_menu").each(function () {
        if (jQuery(this).is(":visible")) {
          isAnyElementVisible = true;
          return false; // Stop the iteration since we found one visible element
        }
      });

      // If any element is visible, add the .background class to .main_menu
      if (isAnyElementVisible) {
        jQuery(".main_menu").addClass("background");
        jQuery(".main_menu").addClass("background");
        jQuery("html").addClass("no-scroll");
      } else {
        jQuery(".main_menu").removeClass("background");
        jQuery("html").removeClass("no-scroll");
      }
    });
  }

  if (window.innerWidth < mobileBorder && window.innerHeight < 1400) {
    // console.log(mainMenu, "mobile ENTER");
    jQuery(".canvas_element_container_right").append(jQuery("#btnWall"));

    mainMenu.prepend(footerMenu);
    mainMenu.prepend(bladeRotationPop);
    bladeRotationPop.addClass("canvas_subsystem_menu");
    bladeRotationPop.hide();

    removeActiveClassFromMenu();

    footerMenu.each(function () {
      jQuery(this).on("click", handleMenuClick);
    });

    prevButton.on("click", handlePrevButton);
    menuButtonByOverview.on("click", handleMenuButton);
    cancelButton.on("click", handleMenuButton);

    if (
      !jQuery(".side_menu__buttons").hasClass("side_menu__buttons--overview")
    ) {
      prevButton.find(".button__caption").text("Menu");
    }

    mainMenu.addClass("mobile");
    canvas.append(iconsContainer);

    beenMobile = true;
    jQuery("#footerMenu_0").trigger("click");
  } else if (beenMobile) {
    // console.log(mainMenu, "DESKTOP");
    jQuery(".icons-container").prepend(jQuery("#btnWall"));

    mainMenu.after(footerMenu);
    jQuery(".ar_model_viewer").append(bladeRotationPop);
    bladeRotationPop.removeClass("canvas_subsystem_menu");

    footerMenu.each(function () {
      jQuery(this).off("click", handleMenuClick);
    });

    prevButton.off("click", handlePrevButton);
    menuButtonByOverview.off("click", handleMenuButton);
    cancelButton.off("click", handleMenuButton);

    prevButton.find(".button__caption").text("Previous");
    mainMenu.removeClass("mobile");
    footerMenu.prepend(iconsContainer);
    jQuery(".button--black").removeClass("back-menu");

    beenMobile = false;
  }
}

jQuery(window).trigger("resize");

const onMessage = function (e) {
  let data = e.data;

  if (data?.type === "sendLeadInfo" || event.data.event === "formSubmitted") {
    (async () => {
      // ✅ turn on loader
      jQuery("body").addClass("body-no-loeader");
      jQuery("html").addClass("body-no-loeader");

      try {
        const userPergolaData = {
          type: `${typePergolaText[pergola.settings.typePergola]}`,
          walls: {
            backWall: pergola.settings.backWall ? "Yes" : "No",
            leftWall: pergola.settings.leftWall ? "Yes" : "No",
            rightWall: pergola.settings.rightWall ? "Yes" : "No",
          },
          sides: {
            width: `${pergola.settings.width}`,
            projection: `${pergola.settings.depth}`,
            height: `${pergola.settings.height}`,
          },
          colors: {
            frameColor:
              pergola.settings.frameColor || "Grey Brown Fine Structure Matt",
            roofColor:
              pergola.settings.roofColor || "Grey Brown Fine Structure Matt",
          },
          options: {
            ledLightsRGB: pergola.settings.perRGB
              ? pergola.settings.textColor
              : "No",
            ledPerimeter: pergola.settings.perLED ? "Yes" : "No",
            ledSpotlight: pergola.settings.spotLED ? "Yes" : "No",
            heaters: pergola.settings.heaters ? "Yes" : "No",
            fans: pergola.settings.fans ? "Yes" : "No",
          },
          systems: {
            zipScreen: pergola.checkSystemInScene(
              pergolaConst.systemType.SlidingGlassDoor
            )
              ? "Yes"
              : "No",
            slidingGlassDoor: pergola.checkSystemInScene(
              pergolaConst.systemType.SlidingGlassDoor
            )
              ? "Yes"
              : "No",
            guillotineWindow: pergola.checkSystemInScene(
              pergolaConst.systemType.GuilotineGlass
            )
              ? "Yes"
              : "No",
          },
        };

        // ✅ SENT DATA
        e.source.postMessage(userPergolaData, "*");

        await createPDF("download");
      } catch (err) {
        console.error("Error generating PDF or sending data", err);
      } finally {
        // ✅ turn off
        jQuery("body").removeClass("body-no-loeader");
        jQuery("html").removeClass("body-no-loeader");
      }
    })();
  }
};

// window.addEventListener("message", onMessage);

// setTimeout(() => {
//   console.log(document.getElementById("inline-9CAMS0Dv7CozHFhkP8R4"));

// document
//   .getElementById("inline-9CAMS0Dv7CozHFhkP8R4")
//   .contentWindow.postMessage({ requestPergomaticData: true }, "*");
// }, 500);

const reconectDelay = 30000;

if (!isMobile) {
  setTimeout(() => {
    if (!jQuery("body").hasClass("body-no-loader")) {
      location.reload();
    }
  }, reconectDelay);
}

//#endregion
