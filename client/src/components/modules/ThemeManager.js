import React, { Component} from "react";
import "../../utilities.css";
import { applyThemeFromLocalStorage  } from "../../utilities.js";
import penguins from "../../public/penguin-group.jpg";
import brush from "../../public/brush.jpg";
import gift from "../../public/gift.gif";
import penguin from "../../public/penguin-bounce.gif";
/**
 * ThemeApplier applies a custom theming to the website. 
 * Only called when user is logged in.
 * 
 * Proptypes 
 * @param {function} applyTheme used to apply theme settings in LocalStorage
 */
class ThemeManager extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }
    
    render(){
        //this.pushPenguinCursor();
        //this.pushDarkMode();
        //this.pushBrushTheme();
        return( <></> );
    }
}
export default ThemeManager;