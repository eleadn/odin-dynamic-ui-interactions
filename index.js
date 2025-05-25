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
	const dots = [...dotContainer.children];
	let index = 0;

	const computePosition = function () {
		let position = 0;

		for (let i = 0; i < index; ++i) {
			position -= images[i].width;
		}

		imageContainer.style.left = `${position}px`;
	};

	const removeDotSelection = function () {
		if (dots.length <= index) {
			return;
		}
		dots[index].classList.remove("carousel-dot-selected");
	};

	const addDotSelection = function () {
		if (dots.length <= index) {
			return;
		}
		dots[index].classList.add("carousel-dot-selected");
	};

	const setPosition = function (newIndex) {
		removeDotSelection();
		index = newIndex;
		if (index < 0) {
			index = images.length - 1;
		} else {
			index = 0;
		}
		addDotSelection();
		computePosition();
	};

	const moveLeft = function () {
		removeDotSelection();
		--index;
		if (index < 0) {
			index = images.length - 1;
		}
		addDotSelection();
		computePosition();
	};

	const moveRight = function () {
		removeDotSelection();
		++index;
		if (index >= images.length) {
			index = 0;
		}
		addDotSelection();
		computePosition();
	};

	leftButton.addEventListener("click", () => {
		moveLeft();
	});
	rightButton.addEventListener("click", () => {
		moveRight();
	});

	for (let i = 0; i < dots.length; ++i) {
		const dotIndex = i;
		dots[i].addEventListener("click", () => {
			setPosition(dotIndex);
		});
	}

	addDotSelection();

	return { moveLeft, moveRight, setPosition };
};
