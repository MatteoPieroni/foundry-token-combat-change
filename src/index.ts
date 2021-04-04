import { changeImage } from "./change-image.js";

const changePic = async (token: Combat.Combatant, isCombat?: boolean) => {
	if (!canvas.ready) {
		return;
	}

	const tokens = canvas.tokens.placeables.filter(tok => tok.id === token.tokenId);

	if (tokens.length === 0) {
		console.log('No token was found')
		return;
	}

	const allChanges = tokens.map(tok => changeImage(tok, isCombat));

	await Promise.all(allChanges);
}

Hooks.on('createCombatant', (_, token: Combat.Combatant) => changePic(token, true));
Hooks.on('deleteCombatant', (_, token: Combat.Combatant) => changePic(token, false));
