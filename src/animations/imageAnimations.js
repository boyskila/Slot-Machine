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
        animationDirationStyle: {
            animationDuration: duration || '7s',
            animationDelay: delay + 's'
        }
    }
}