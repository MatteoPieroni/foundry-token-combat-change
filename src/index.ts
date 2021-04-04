import { changeImage } from "./change-image.js";

const changePic = async (combatant: Combat.Combatant, isCombat?: boolean) => {
	if (!canvas.ready) {
		return;
	}

	const token = canvas.tokens.get(combatant.tokenId);

	if (!token) {
		console.log('No token was found')
		return;
	}

	await changeImage(token, isCombat);
}

Hooks.on('createCombatant', (_, combatant: Combat.Combatant) => changePic(combatant, true));
Hooks.on('deleteCombatant', (_, combatant: Combat.Combatant) => changePic(combatant, false));
