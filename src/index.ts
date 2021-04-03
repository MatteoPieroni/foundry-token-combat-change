import { changeImage } from "./change-image";

const changePic = async (e: Combat, isCombat?: boolean) => {
	if (isCombat && (e.current.round !== 1 || e.current.turn !== 0)) {
		return;
	}

	e.data.combatants.forEach(async user => {
		if (!canvas.ready) {
			return;
		}
		const tokens = canvas.tokens.placeables.filter(tok => tok.actor.id === user.actor.id);

		if (tokens.length === 0) {
			console.log('No token was found')
			return;
		}

		tokens.forEach(tok => changeImage(tok, isCombat));
	});
}

Hooks.on('updateCombat', (e: Combat) => changePic(e, true));

Hooks.on('deleteCombat', (e: Combat) => changePic(e, false));