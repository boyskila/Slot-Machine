import Utils from '../util/Util';

const darkAnimation = `
    @keyframes dark {
        0%   { opacity:1; }
        100% { opacity:0.3; }
    }
`
const pulseAnimation = `
    @keyframes pulse-animation {
        0% { transform: scale(1); }
        30% { transform: scale(1); }
        40% { transform: scale(1.03); }
        50% { transform: scale(1); }
        60% { transform: scale(1); }
        70% { transform: scale(1.02); }
        80% { transform: scale(1); }
        100% { transform: scale(1); }
    }
`
const bounceAnimation = `
    @keyframes bounceInDown {
        0% {
            opacity: 0;
            transform: translateY(-2000px);
        }
        60% {
            opacity: 1;
            transform: translateY(30px);
        }
        80% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }
`
Utils.injectStyle(darkAnimation);
Utils.injectStyle(pulseAnimation);

export default  (duration, delay) => {
    return {
        pulseAnimationRules: {
            animationName: 'pulse-animation',
            animationDuration: '3s',
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationDelay: duration || '8s'
        },
        darkAnimationRules: {
            animation: 'dark 2s forwards',
            animationDelay: duration || '8s'
        },
        animationDurationStyle: {
            animationDuration: duration || '3s',
            animationDelay: delay + 's'
        },
        bounceAnimationRules: {
            animationName: 'bounceInDown',
            animationDuration: '2s',
            animationFillMode: 'both'
        }
    }
}