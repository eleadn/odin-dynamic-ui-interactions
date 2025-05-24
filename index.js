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
