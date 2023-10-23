// Usage: https://github.com/Grsmto/simplebar
import SimpleBar from 'simplebar';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initialize = () => {
	initializeSimplebar();
	initializeSidebarCollapse();
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initializeSimplebar = () => {
	const simplebarElement = document.getElementsByClassName('js-simplebar')[0];

	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	if (simplebarElement) {
		const simplebarInstance = new SimpleBar(document.getElementsByClassName('js-simplebar')[0]);

		/* Recalculate simplebar on sidebar dropdown toggle */
		const sidebarDropdowns = document.querySelectorAll('.js-sidebar [data-bs-parent]');

		sidebarDropdowns.forEach(link => {
			link.addEventListener('shown.bs.collapse', () => {
				simplebarInstance.recalculate();
			});
			link.addEventListener('hidden.bs.collapse', () => {
				simplebarInstance.recalculate();
			});
		});
	}
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initializeSidebarCollapse = () => {
	const sidebarElement = document.getElementsByClassName('js-sidebar')[0];
	const sidebarToggleElement = document.getElementsByClassName('js-sidebar-toggle')[0];

	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	if (sidebarElement && sidebarToggleElement) {
		sidebarToggleElement.addEventListener('click', () => {
			sidebarElement.classList.toggle('collapsed');

			sidebarElement.addEventListener('transitionend', () => {
				window.dispatchEvent(new Event('resize'));
			});
		});
	}
};

// Wait until page is loaded
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		initialize();
	}, 100);
});
