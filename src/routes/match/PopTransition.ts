import { quintIn } from 'svelte/easing';

interface TransitionOptions {
	duration?: number;
	delay?: number;
}

export function popTransition(node: Element, options: TransitionOptions = {}) {
	return {
		easing: quintIn,
		duration: options.duration || 400,
		delay: options.delay || 0,

		css: (t: number, u: number) => `transform: scale3d(${u + 1}, ${u + 1}, ${u + 1}); opacity: ${t}`
	};
}
