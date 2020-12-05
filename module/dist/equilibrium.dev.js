"use strict";

var _actor = require("./actor.js");

var _itemSheet = require("./item-sheet.js");

var _actorSheet = _interopRequireDefault(require("./actor-sheet.js"));

var _passifSheet = require("./passif-sheet.js");

var _componentSheet = require("./component-sheet.js");

var _spellSheet = require("./spell-sheet.js");

var _item = _interopRequireDefault(require("./item.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import Modules

/* -------------------------------------------- */

/*  Foundry VTT Initialization                  */

/* -------------------------------------------- */
Hooks.once("init", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Initializing Equilibrium System");
          /**
           * Set an initiative formula for the system
           * @type {String}
           */

          CONFIG.Combat.initiative = {
            formula: "1d4 + @focus.Swiftness.max * 1.1 + @focus.Malice.max * 1.01",
            decimals: 2
          };
          CONFIG.EQUILIBRIUM = {};
          CONFIG.EQUILIBRIUM.focus = {
            "Vitality": "Vitality",
            "Brutality": "Brutality",
            "Swiftness": "Swiftness",
            "Malice": "Malice",
            "Spirit": "Spirit"
          };
          CONFIG.EQUILIBRIUM.skills = {
            "One_Hand": "One Hand",
            "Light_One_Hand": "Light One Hand",
            "Two_Hand": "Two Hand",
            "Throwing": "Throwing",
            "Archery": "Archery",
            "Bodybuilding": "Bodybuilding",
            "Parry": "Parry",
            "Elemental_Magic": "Elemental Magic",
            "Occult_Magic": "Occult Magic",
            "Primordial_Magic": "Primordial Magic",
            "Mage_Weaponery": "Mage Weaponery",
            "Infusion": "Infusion",
            "Resistance": "Resistance",
            "Magic_Identification": "Magic Identification",
            "Stealth": "Stealth",
            "Survival": "Survival",
            "Perception": "Perception",
            "Speechcraft": "Speechcraft",
            "History": "History",
            "Medic": "Medic",
            "Empath": "Empath",
            "Athletism": "Athletism",
            "Dodge": "Dodge",
            "Craft_Forge": "Craft Forge",
            "Craft_Tinker": "Craft Tinker",
            "Craft_Medical": "Craft Medical",
            "Craft_Poison": "Craft Poison",
            "Intimidation": "Intimidation",
            "Art": "Art",
            "Shadowcraft": "Shadowcraft",
            "Disrupt": "Disrupt",
            "Teaching": "Teaching",
            "Animal_Handling": "Animal Handling"
          };
          CONFIG.EQUILIBRIUM.skillCategory = {
            "One_Hand": "war",
            "Light_One_Hand": "war",
            "Two_Hand": "war",
            "Throwing": "war",
            "Archery": "war",
            "Bodybuilding": "war",
            "Parry": "war",
            "Elemental_Magic": "magic",
            "Occult_Magic": "magic",
            "Primordial_Magic": "magic",
            "Mage_Weaponery": "magic",
            "Infusion": "magic",
            "Resistance": "magic",
            "Magic_Identification": "magic",
            "Stealth": "other",
            "Survival": "other",
            "Perception": "other",
            "Speechcraft": "other",
            "History": "other",
            "Medic": "other",
            "Empath": "other",
            "Athletism": "other",
            "Dodge": "other",
            "Craft_Forge": "other",
            "Craft_Tinker": "other",
            "Craft_Medical": "other",
            "Craft_Poison": "other",
            "Intimidation": "other",
            "Art": "other",
            "Shadowcraft": "other",
            "Disrupt": "other",
            "Teaching": "other",
            "Animal_Handling": "other"
          }; // Define custom Entity classes

          CONFIG.Actor.entityClass = _actor.SimpleActor;
          CONFIG.Item.entityClass = _item["default"]; // Register sheet application classes

          Actors.unregisterSheet("core", ActorSheet);
          Actors.registerSheet("equilibrium", _actorSheet["default"], {
            makeDefault: true
          });
          Items.unregisterSheet("core", ItemSheet);
          Items.registerSheet("equilibrium", _itemSheet.SimpleItemSheet, {
            makeDefault: true
          });
          Items.registerSheet("equilibrium", _passifSheet.PassifItemSheet, {
            makeDefault: false
          });
          Items.registerSheet("equilibrium", _componentSheet.ComponentItemSheet, {
            makeDefault: false
          });
          Items.registerSheet("equilibrium", _spellSheet.SpellItemSheet, {
            makeDefault: false
          }); // // Register system settings
          // game.settings.register("worldbuilding", "macroShorthand", {
          //   name: "Shortened Macro Syntax",
          //   hint: "Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.",
          //   scope: "world",
          //   type: Boolean,
          //   default: true,
          //   config: true
          // });

          console.log("Initialized equilibrium");

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});