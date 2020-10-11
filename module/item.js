export default class EquilibriumItem extends Item {
    async roll() {
        const token = this.actor.token;

        const formula = this.data.data.damage;
        let roll = null;
        if (formula) {
            roll = new Roll(this.data.data.damage).roll();
        };

        const templateData = {
            actor: this.actor,
            item: this.data,
            data: this.getChatData(),
            roll: roll,
            formula: formula
        }

        const template = `systems/equilibrium/templates/chat/item-card.html`;
        const html = await renderTemplate(template, templateData);
        const chatData = {
            user: game.user._id,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            content: html,
            speaker: {
                actor: this.actor._id,
                token: this.actor.token,
                alias: this.actor.name
            },
        }

        return ChatMessage.create(chatData);
    }

/**
   * Prepare an object of chat data used to display a card for the Item in the chat log
   * @param {Object} htmlOptions    Options used by the TextEditor.enrichHTML function
   * @return {Object}               An object of chat data to render
   */
  getChatData(htmlOptions={}) {
    const data = duplicate(this.data.data);

    // Rich text description
    data.description = TextEditor.enrichHTML(data.description, htmlOptions);
    return data;
  }
}