require(['elgg', 'jquery', 'elgg/popup'], function (elgg, $, popup) {

	$(document).off('click', '[rel=popup]');
	popup.bind($('[rel="popup"]'));

	elgg.ui.popupOpen = function (e) {
		e.preventDefault();
		e.stopPropagation();
		popup.open($(this));
	};

	elgg.ui.popupClose = function (e) {
		popup.close();
	};
});