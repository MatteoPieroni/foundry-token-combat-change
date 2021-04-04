import { MODULE_NAME, settings } from "./consts.js";
import { imageExists } from "./utils/image-exists.js";

export const changeImage = async (token: Token, isCombat?: boolean) => {
	const toBeReplaced = isCombat ? <string>game.settings.get(
		MODULE_NAME,
		settings.OUT_OF_COMBAT_PATTERN
	) :
		<string>game.settings.get(
			MODULE_NAME,
			settings.IN_COMBAT_PATTERN
		);
	const toReplace = isCombat ? <string>game.settings.get(
		MODULE_NAME,
		settings.IN_COMBAT_PATTERN
	) :
		<string>game.settings.get(
			MODULE_NAME,
			settings.OUT_OF_COMBAT_PATTERN
		);

	const currentImage = token.data.img;
	const newImage = currentImage.replace(toBeReplaced || '', toReplace || '');

	if (!imageExists(newImage)) {
		console.log('Token image does not exist')
		return;
	}

	await token.update({ 'img': newImage });
}