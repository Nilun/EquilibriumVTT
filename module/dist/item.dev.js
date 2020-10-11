"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EquilibriumItem =
/*#__PURE__*/
function (_Item) {
  _inherits(EquilibriumItem, _Item);

  function EquilibriumItem() {
    _classCallCheck(this, EquilibriumItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(EquilibriumItem).apply(this, arguments));
  }

  _createClass(EquilibriumItem, [{
    key: "roll",
    value: function roll() {
      var token, formula, roll, templateData, template, html, chatData;
      return regeneratorRuntime.async(function roll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = this.actor.token;
              formula = this.data.data.damage;
              roll = null;

              if (formula) {
                roll = new Roll(this.data.data.damage).roll();
              }

              ;
              templateData = {
                actor: this.actor,
                item: this.data,
                data: this.getChatData(),
                roll: roll,
                formula: formula
              };
              template = "systems/Equilibrium/templates/chat/item-card.html";
              _context.next = 9;
              return regeneratorRuntime.awrap(renderTemplate(template, templateData));

            case 9:
              html = _context.sent;
              chatData = {
                user: game.user._id,
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                content: html,
                speaker: {
                  actor: this.actor._id,
                  token: this.actor.token,
                  alias: this.actor.name
                }
              };
              return _context.abrupt("return", ChatMessage.create(chatData));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
       * Prepare an object of chat data used to display a card for the Item in the chat log
       * @param {Object} htmlOptions    Options used by the TextEditor.enrichHTML function
       * @return {Object}               An object of chat data to render
       */

  }, {
    key: "getChatData",
    value: function getChatData() {
      var htmlOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = duplicate(this.data.data); // Rich text description

      data.description = TextEditor.enrichHTML(data.description, htmlOptions);
      return data;
    }
  }]);

  return EquilibriumItem;
}(Item);

exports["default"] = EquilibriumItem;