import { changeImage } from "./change-image.js";
import { settings } from "./consts.js";

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


Hooks.once('init', async function () {
	// Register module settings
	game.settings.register("foundry-token-combat-change", settings.OUT_OF_COMBAT_PATTERN, {
		name: "Out of combat token image pattern",
		hint: "The pattern to change a token image to the out of combat state",
		scope: "world",
		config: true,
		type: String,
		default: "-resting"
	});

	game.settings.register("foundry-token-combat-change", settings.IN_COMBAT_PATTERN, {
		name: "In combat token image pattern",
		hint: "The pattern to change a token image to the combat state",
		scope: "world",
		config: true,
		type: String,
		default: "-attack"
	});
});

Hooks.on('createCombatant', (_, combatant: Combat.Combatant) => changePic(combatant, true));
Hooks.on('deleteCombatant', (_, combatant: Combat.Combatant) => changePic(combatant, false));
