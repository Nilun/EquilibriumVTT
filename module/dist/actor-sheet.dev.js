"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleActorSheet = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
var SimpleActorSheet =
/*#__PURE__*/
function (_ActorSheet) {
  _inherits(SimpleActorSheet, _ActorSheet);

  function SimpleActorSheet() {
    _classCallCheck(this, SimpleActorSheet);

    return _possibleConstructorReturn(this, _getPrototypeOf(SimpleActorSheet).apply(this, arguments));
  }

  _createClass(SimpleActorSheet, [{
    key: "getData",

    /* -------------------------------------------- */

    /** @override */
    value: function getData() {
      var data = _get(_getPrototypeOf(SimpleActorSheet.prototype), "getData", this).call(this);

      data.actor.data.skillCategory = {
        war: {},
        magic: {},
        other: {}
      };

      for (var _i = 0, _Object$entries = Object.entries(data.actor.data.focus); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            f = _Object$entries$_i[0],
            focus = _Object$entries$_i[1];

        focus.max = 1;
      }

      if (data.actor.data.skills) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(data.actor.data.skills); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              s = _Object$entries2$_i[0],
              skl = _Object$entries2$_i[1];

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

      return data;
    }
    /* -------------------------------------------- */

    /** @override */

  }, {
    key: "activateListeners",
    value: function activateListeners(html) {
      var _this = this;

      _get(_getPrototypeOf(SimpleActorSheet.prototype), "activateListeners", this).call(this, html); // Everything below here is only needed if the sheet is editable


      if (!this.options.editable) return;
      html.find(".focus-plus").click(this._onClickFocusPlus.bind(this));
      html.find(".focus-minus").click(this._onClickFocusMinus.bind(this));
      html.find(".item .item-img").click(function (event) {
        return _this._onItemRoll(event);
      }); // Update Inventory Item

      html.find(".item-edit").click(function (ev) {
        var li = $(ev.currentTarget).parents(".item");

        var item = _this.actor.getOwnedItem(li.data("itemId"));

        item.sheet.render(true);
      }); // Delete Inventory Item

      html.find(".item-delete").click(function (ev) {
        var li = $(ev.currentTarget).parents(".item");

        _this.actor.deleteOwnedItem(li.data("itemId"));

        li.slideUp(200, function () {
          return _this.render(false);
        });
      }); // Add or Remove Attribute

      html.find(".attributes").on("click", ".attribute-control", this._onClickAttributeControl.bind(this));
    }
    /* -------------------------------------------- */

    /** @override */

  }, {
    key: "setPosition",
    value: function setPosition() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var position = _get(_getPrototypeOf(SimpleActorSheet.prototype), "setPosition", this).call(this, options);

      var sheetBody = this.element.find(".sheet-body");
      var bodyHeight = position.height - 192;
      sheetBody.css("height", bodyHeight);
      return position;
    }
    /* -------------------------------------------- */

    /**
     * Listen for click events on an attribute control to modify the composition of attributes in the sheet
     * @param {MouseEvent} event    The originating left click event
     * @private
     */

  }, {
    key: "_onClickAttributeControl",
    value: function _onClickAttributeControl(event) {
      var a, action, attrs, form, nk, newKey, li;
      return regeneratorRuntime.async(function _onClickAttributeControl$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              a = event.currentTarget;
              action = a.dataset.action;
              attrs = this.object.data.data.attributes;
              form = this.form; // Add new attribute

              if (!(action === "create")) {
                _context.next = 15;
                break;
              }

              nk = Object.keys(attrs).length + 1;
              newKey = document.createElement("div");
              newKey.innerHTML = "<input type=\"text\" name=\"data.attributes.attr".concat(nk, ".key\" value=\"attr").concat(nk, "\"/>");
              newKey = newKey.children[0];
              form.appendChild(newKey);
              _context.next = 13;
              return regeneratorRuntime.awrap(this._onSubmit(event));

            case 13:
              _context.next = 20;
              break;

            case 15:
              if (!(action === "delete")) {
                _context.next = 20;
                break;
              }

              li = a.closest(".attribute");
              li.parentElement.removeChild(li);
              _context.next = 20;
              return regeneratorRuntime.awrap(this._onSubmit(event));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_onClickFocusPlus",
    value: function _onClickFocusPlus(event) {
      event.preventDefault();
      var target = event.currentTarget;
      var focus = this.actor.data.data.focus[target.name];
      focus.name = target.name;

      this._updateFocusValue(focus, 1);
    }
  }, {
    key: "_onClickFocusMinus",
    value: function _onClickFocusMinus(event) {
      event.preventDefault();
      var target = event.currentTarget;
      var focus = this.actor.data.data.focus[target.name];
      focus.name = target.name;

      this._updateFocusValue(focus, -1);
    }
  }, {
    key: "_updateFocusValue",
    value: function _updateFocusValue(focus, update) {
      var value = focus.value + update;

      if (value >= focus.max) {
        value = focus.max;
      } else if (value < 0) {
        value = 0;
      }

      this.actor.update({
        data: {
          focus: _defineProperty({}, focus.name, {
            value: value
          })
        }
      });
    }
    /**
     * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
     * @private
     */

  }, {
    key: "_onItemRoll",
    value: function _onItemRoll(event) {
      event.preventDefault();
      var itemId = event.currentTarget.closest(".item").dataset.itemId;
      var item = this.actor.getOwnedItem(itemId);
      return item.roll();
    }
    /* -------------------------------------------- */

    /** @override */

  }, {
    key: "_updateObject",
    value: function _updateObject(event, formData) {
      // Update the Actor
      return this.object.update(formData);
    }
  }], [{
    key: "defaultOptions",

    /** @override */
    get: function get() {
      return mergeObject(_get(_getPrototypeOf(SimpleActorSheet), "defaultOptions", this), {
        classes: ["Equilibrium", "sheet", "actor"],
        template: "systems/Equilibrium/templates/actor-sheet.html",
        width: 600,
        height: 600,
        tabs: [{
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }],
        dragDrop: [{
          dragSelector: ".item-list .item",
          dropSelector: null
        }]
      });
    }
  }]);

  return SimpleActorSheet;
}(ActorSheet);

exports.SimpleActorSheet = SimpleActorSheet;