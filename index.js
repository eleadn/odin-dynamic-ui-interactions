exports.createDropdown = function (dropdownMenu) {
	const content = [...dropdownMenu.children];

	const show = function () {
		for (const elem in content) {
			elem.style.visibility = "visible";
		}
	};

	const hide = function () {
		for (const elem in content) {
			elem.style.visibility = "collapse";
		}
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
