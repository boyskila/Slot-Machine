import _ from 'lodash'
export default {
	getImages : () => {
		return  _.times(100, () => {
			var n = _.random(1, 11);
			return `images/symbol${n}.png`;
		})
	},
	setLiOpacity : (parentID, childTagName, position, op) => {
		document.getElementById(parentID)
				.getElementsByTagName(childTagName)[position]
				.style
				.opacity = op;
	},
	injectStyle : (style) => {
		var styleElement = document.createElement('style');
		let styleSheet = null;
		document.head.appendChild(styleElement);
		styleSheet = styleElement.sheet;
		styleSheet.insertRule(style, styleSheet.cssRules.length);
	}
}
