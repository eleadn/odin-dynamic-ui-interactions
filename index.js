exports.createDropdown = function (dropdownMenu, menuContent) {
	const content = [...menuContent.children];

	const show = function () {
		content.forEach((value) => {
			value.style.visibility = "visible";
		});
	};

	const hide = function () {
		content.forEach((value) => {
			value.style.visibility = "collapse";
		});
	};

	const onClickOutside = function (event) {
		if (
			!dropdownMenu.contains(event.target) &&
			!content.some((value) => {
				value.contains(event.target);
			})
		) {
			hide();
			document.removeEventListener("keydown", onClickOutside);
		}
	};

	dropdownMenu.addEventListener("click", () => {
		show();
	});

	document.addEventListener("click", onClickOutside);

	hide();

	return { show, hide };
};

exports.createCarousel = function (
	imageContainer,
	leftButton,
	rightButton,
	dotContainer = []
) {
	const images = [...imageContainer.children];
	let index = 0;

	const computePosition = function () {
		let position = 0;

		for (let i = 0; i < index; ++i) {
			position -= images[i].width;
		}

		imageContainer.style.left = `${position}px`;
	};

	const moveLeft = function () {
		--index;
		if (index < 0) {
			index = images.length - 1;
		}
		computePosition();
	};

	const moveRight = function () {
		++index;
		if (index >= images.length) {
			index = 0;
		}
		computePosition();
	};

	leftButton.addEventListener("click", () => {
		moveLeft();
	});
	rightButton.addEventListener("click", () => {
		moveRight();
	});

	return { moveLeft, moveRight };
};
