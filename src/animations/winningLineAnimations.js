import Utils from '../util/Util';

const fadeInAnimation = `
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
`
Utils.injectStyle(fadeInAnimation);

export default (delay) => {
    return {
        fadeInRules:  {
            animationName: 'fadeIn',
            animationDuration: '2s',
            animationDelay: (delay + 1.5) || '8.5s',
            animationFillMode: 'forwards'
        }
    }
}