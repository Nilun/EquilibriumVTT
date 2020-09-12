// Import Modules
import { SimpleActor } from "./actor.js";
import { SimpleItemSheet } from "./item-sheet.js";
import { SimpleActorSheet } from "./actor-sheet.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function() {
  console.log(`Initializing Simple Worldbuilding System`);

	/**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
	CONFIG.Combat.initiative = {
	  formula: "1d4",
    decimals: 2
  };

  CONFIG.EQUILIBRIUM = {};

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
    "Animal_Handling": "Animal Handling",
  };

	// Define custom Entity classes
  CONFIG.Actor.entityClass = SimpleActor;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("equilibrium", SimpleActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("equilibrium", SimpleItemSheet, {makeDefault: true});

  // Register system settings
  game.settings.register("worldbuilding", "macroShorthand", {
    name: "Shortened Macro Syntax",
    hint: "Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.",
    scope: "world",
    type: Boolean,
    default: true,
    config: true
  });

  console.log("Initialized equilibrium")
});
