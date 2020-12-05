/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export default class SimpleActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["Equilibrium", "sheet", "actor"],
      template: "systems/Equilibrium/templates/actor-sheet.html",
      width: 600,
      height: 820,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "skills",
        },
      ],
      dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();

    data.actor.data.skillCategory = {
      war: {},
      magic: {},
      other: {},
    };

    for (let [f, focus] of Object.entries(data.actor.data.focus)) {
      focus.max = 1;
    }

    if (data.actor.data.skills) {
      for (let [s, skl] of Object.entries(data.actor.data.skills)) {
        if (skl.value > 5) skl.value = 5;
        if (skl.value < 0) skl.value = 0;
        skl.label = CONFIG.EQUILIBRIUM.skills[s];
        skl.category = CONFIG.EQUILIBRIUM.skillCategory[s];
        data.actor.data.skillCategory[skl.category][s] = skl;

        data.actor.data.focus[skl.focus].max += skl.value;
      }
    }

    if (data.actor.data.health.per_level) {
      var bodybuilding = data.actor.data.skills.Bodybuilding.value;
      var hp_per_level = data.actor.data.health.per_level;
      var level = data.actor.data.attributes.level;
      var hp = 10 + hp_per_level * level + bodybuilding * 5;
      data.actor.data.health.max = hp;
    }

    this._prepareItems(data);

    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html.find(".focus-plus").click(this._onClickFocusPlus.bind(this));
    html.find(".focus-minus").click(this._onClickFocusMinus.bind(this));

    html.find(".item .item-img").click(event => this._onItemRoll(event));

    // Update Inventory Item
    html.find(".item-edit").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find(".item-delete").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });
    
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Add or Remove Attribute
    html
      .find(".attributes")
      .on(
        "click",
        ".attribute-control",
        this._onClickAttributeControl.bind(this)
      );
  }

  /* -------------------------------------------- */


  /* -------------------------------------------- */

  async _prepareItems(data) {

    const inventory = {
      weapons: { label: "EQUILIBRIUM.Weapons", items: [], dataset: {type: "weapon" }},
      armors: { label: "EQUILIBRIUM.Armors", items: [], dataset: {type: "armor" }},
      items: { label: "EQUILIBRIUM.Items", items: [], dataset: {type: "item" }},
      spells: { label: "EQUILIBRIUM.Spells", items: [], dataset: {type: "spell" }},
      technics: { label: "EQUILIBRIUM.Technics", items: [], dataset: {type: "technic" }},
      passives: { label: "EQUILIBRIUM.Passives", items: [], dataset: {type: "passif" }},
    }

    let [physical, magical] = [0, 0];
    let [items, weapons, armors, passives, spells, technics] = data.items.reduce((arr, item) => {
      item.isStack = Number.isNumeric(item.data.quantity) && (item.data.quantity !== 1);
      switch (item.type) {
        case "weapon":
          arr[1].push(item);
          break;
        case "armor":
          physical += parseInt(item.data.physicalArmor);
          magical += parseInt(item.data.magicalArmor);
          arr[2].push(item);
          break;
        case "passif":
          arr[3].push(item);
          break;
        case "spell":
          arr[4].push(item);
          break;
        case "technic":
          arr[5].push(item);
          break;
        default:
          arr[0].push(item);
          break;
      }
      return arr;
    }, [[], [], [], [], [], []]);

    inventory.weapons.items = weapons;
    inventory.armors.items = armors;
    inventory.items.items = items;
    inventory.spells.items = spells;
    inventory.passives.items = passives;
    inventory.technics.items = technics;

    data.inventory = Object.values(inventory);
    data.physicalArmor = physical;
    data.magicalArmor = magical;
  }

  /**
   * Listen for click events on an attribute control to modify the composition of attributes in the sheet
   * @param {MouseEvent} event    The originating left click event
   * @private
   */
  async _onClickAttributeControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;
    const attrs = this.object.data.data.attributes;
    const form = this.form;

    // Add new attribute
    if (action === "create") {
      const nk = Object.keys(attrs).length + 1;
      let newKey = document.createElement("div");
      newKey.innerHTML = `<input type="text" name="data.attributes.attr${nk}.key" value="attr${nk}"/>`;
      newKey = newKey.children[0];
      form.appendChild(newKey);
      await this._onSubmit(event);
    }

    // Remove existing attribute
    else if (action === "delete") {
      const li = a.closest(".attribute");
      li.parentElement.removeChild(li);
      await this._onSubmit(event);
    }
  }

  _onClickFocusPlus(event) {
    event.preventDefault();
    const target = event.currentTarget;
    let focus = this.actor.data.data.focus[target.name];
    focus.name = target.name;
    this._updateFocusValue(focus, 1)
  }

  _onClickFocusMinus(event) {
    event.preventDefault();
    const target = event.currentTarget;
    let focus = this.actor.data.data.focus[target.name];
    focus.name = target.name;
    this._updateFocusValue(focus, -1)
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const itemData = {
      name: game.i18n.format("EQUILIBRIUM.ItemNew", {type: type.capitalize()}),
      type: type,
      data: duplicate(header.dataset)
    };
    delete itemData.data["type"];
    return this.actor.createOwnedItem(itemData);
  }

  _updateFocusValue(focus, update) {
    let value = focus.value + update;
    if (value >= focus.max) {
      value = focus.max;
    } else if (value < 0) {
      value = 0;
    }
    this.actor.update({
      data: {
        focus: {
          [focus.name]: {
            value: value,
          },
        },
      },
    });
  }

  /**
   * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
   * @private
   */
  _onItemRoll(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    return item.roll();
  }

  /* -------------------------------------------- */

  /** @override */
  _updateObject(event, formData) {
    // Update the Actor
    return this.object.update(formData);
  }
}
