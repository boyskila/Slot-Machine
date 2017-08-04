import Utils from '../util/Util';

const fadeInAnimation = `
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`
Utils.injectStyle(fadeInAnimation);

export default (delay) => {
	return {
		fadeInRules:  {
			animationName: 'fadeIn',
			animationDuration: '2s',
			animationDelay: ((delay + 1.5) + 's') || '4.5s',
			animationFillMode: 'forwards'
		}
	}
}
