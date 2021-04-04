import { imageExists } from "./utils/image-exists.js";

export const changeImage = async (token: Token, isCombat?: boolean) => {
	const currentImage = token.data.img;
	const newImage = isCombat ? currentImage.replace('-portrait', '-attack') : currentImage.replace('-attack', '-portrait');

	if (!imageExists(newImage)) {
		console.log('Token image does not exist')
		return;
	}

	await token.update({ 'img': newImage });
}