export default {
    getImages : () => {
        var images = [];
        for(let i = 1; i < 9; i++){
            for(let i = 1; i < 11; i++){
                //1 - 11 rand
                var n = Math.floor(Math.random() * 11) + 1;
                images.push('images/symbol' + n + '.png');
            }
        }
        return images;
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