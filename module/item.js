export default class EquilibriumItem extends Item {
    async roll() {
        const token = this.actor.token;

        const chatData = {
            user: game.user._id,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            speaker: {
                actor: this.actor._id,
                token: this.actor.token,
                alias: this.actor.name
            }
        }
        // // Toggle default roll mode
        // let rollMode = game.settings.get("core", "rollMode");
        // if ( ["gmroll", "blindroll"].includes(rollMode) ) chatData["whisper"] = ChatMessage.getWhisperRecipients("GM");
        // if ( rollMode === "blindroll" ) chatData["blind"] = true;
        
        let r = new Roll(this.data.data.damage);
        r.toMessage(chatData)
    }
}