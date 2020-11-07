"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleItemSheet = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
var SimpleItemSheet =
/*#__PURE__*/
function (_ItemSheet) {
  _inherits(SimpleItemSheet, _ItemSheet);

  function SimpleItemSheet() {
    _classCallCheck(this, SimpleItemSheet);

    return _possibleConstructorReturn(this, _getPrototypeOf(SimpleItemSheet).apply(this, arguments));
  }

  _createClass(SimpleItemSheet, [{
    key: "getData",

    /* -------------------------------------------- */

    /** @override */
    value: function getData() {
      var data = _get(_getPrototypeOf(SimpleItemSheet.prototype), "getData", this).call(this);

      switch (data.item.type) {
        case "weapon":
          data.hasDamage = true;
          data.hasQuantity = true;
          break;

        case "armor":
          data.hasPhysicalArmor = true;
          data.hasMagicalArmor = true;
          data.hasQuantity = true;
          break;

        case "passif":
          data.hasQuantity = true;
          break;

        case "spell":
          data.hasDamage = true;
          break;

        case "technic":
          break;

        default:
          data.hasQuantity = true;
          break;
      }

      return data;
    }
    /* -------------------------------------------- */

    /** @override */

  }, {
    key: "setPosition",
    value: function setPosition() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var position = _get(_getPrototypeOf(SimpleItemSheet.prototype), "setPosition", this).call(this, options);

      var sheetBody = this.element.find(".sheet-body");
      var bodyHeight = position.height - 192;
      sheetBody.css("height", bodyHeight);
      return position;
    }
    /* -------------------------------------------- */
    // /** @override */
    // activateListeners(html) {
    //   super.activateListeners(html);
    //   // Everything below here is only needed if the sheet is editable
    //   if (!this.options.editable) return;
    //   // Add or Remove Attribute
    //   html.find(".attributes").on("click", ".attribute-control", this._onClickAttributeControl.bind(this));
    // }
    // /* -------------------------------------------- */
    // /**
    //  * Listen for click events on an attribute control to modify the composition of attributes in the sheet
    //  * @param {MouseEvent} event    The originating left click event
    //  * @private
    //  */
    // async _onClickAttributeControl(event) {
    //   event.preventDefault();
    //   const a = event.currentTarget;
    //   const action = a.dataset.action;
    //   const attrs = this.object.data.data.attributes;
    //   const form = this.form;
    //   // Add new attribute
    //   if ( action === "create" ) {
    //     const nk = Object.keys(attrs).length + 1;
    //     let newKey = document.createElement("div");
    //     newKey.innerHTML = `<input type="text" name="data.attributes.attr${nk}.key" value="attr${nk}"/>`;
    //     newKey = newKey.children[0];
    //     form.appendChild(newKey);
    //     await this._onSubmit(event);
    //   }
    //   // Remove existing attribute
    //   else if ( action === "delete" ) {
    //     const li = a.closest(".attribute");
    //     li.parentElement.removeChild(li);
    //     await this._onSubmit(event);
    //   }
    // }
    // /* -------------------------------------------- */
    // /** @override */
    // _updateObject(event, formData) {
    //   // Handle the free-form attributes list
    //   const formAttrs = expandObject(formData).data.attributes || {};
    //   const attributes = Object.values(formAttrs).reduce((obj, v) => {
    //     let k = v["key"].trim();
    //     if ( /[\s\.]/.test(k) )  return ui.notifications.error("Attribute keys may not contain spaces or periods");
    //     delete v["key"];
    //     obj[k] = v;
    //     return obj;
    //   }, {});
    //   // Remove attributes which are no longer used
    //   for ( let k of Object.keys(this.object.data.data.attributes) ) {
    //     if ( !attributes.hasOwnProperty(k) ) attributes[`-=${k}`] = null;
    //   }
    //   // Re-combine formData
    //   formData = Object.entries(formData).filter(e => !e[0].startsWith("data.attributes")).reduce((obj, e) => {
    //     obj[e[0]] = e[1];
    //     return obj;
    //   }, {_id: this.object._id, "data.attributes": attributes});
    //   // Update the Item
    //   return this.object.update(formData);
    // }

  }], [{
    key: "defaultOptions",

    /** @override */
    get: function get() {
      return mergeObject(_get(_getPrototypeOf(SimpleItemSheet), "defaultOptions", this), {
        classes: ["Equilibrium", "sheet", "item"],
        template: "systems/Equilibrium/templates/item-sheet.html",
        width: 520,
        height: 480,
        tabs: [{
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }]
      });
    }
  }]);

  return SimpleItemSheet;
}(ItemSheet);

exports.SimpleItemSheet = SimpleItemSheet;