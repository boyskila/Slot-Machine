import Utils from '../util/Util';

const darkAnimation = `
	@keyframes dark {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.3;
		}
	}
`
const pulseAnimation = `
	@keyframes pulse-animation {
		from { transform: scale(1); }
		30% { transform: scale(1); }
		40% { transform: scale(1.03); }
		50% { transform: scale(1); }
		60% { transform: scale(1); }
		70% { transform: scale(1.02); }
		80% { transform: scale(1); }
		to { transform: scale(1); }
	}
`
//add key frames to the stylesheet
Utils.injectStyle(darkAnimation);
Utils.injectStyle(pulseAnimation);

export default  (duration, delay) => {
	var dur = (duration + 1.5 + 's');
	return {
		pulseAnimationRules: {
			animationName: 'pulse-animation',
			animationDuration: '2s',
			animationTimingFunction: 'linear',
			animationFillMode: 'forwards',
			animationDelay: dur || '4.5s'
		},
		darkAnimationRules: {
			animation: 'dark 1s forwards',
			animationDelay: dur || '4.5s'
		},
		animationDurationStyle: {
			animationDuration: duration + 's' || '3s',
			animationDelay: delay + 's'
		}
	}
}
