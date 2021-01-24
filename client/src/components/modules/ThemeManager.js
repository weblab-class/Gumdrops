import React, { Component} from "react";
import "../../utilities.css";
import { applyThemeFromLocalStorage  } from "../../utilities.js";
import penguins from "../../public/penguin-group.jpg";
import retro from "../../public/retroBackground.png";
import brush from "../../public/brush.jpg";

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
    //this.pushGlassTheme();
    }

    pushGlassTheme = () => {
        console.log("Glass theme pushed");
        let glassObj = {
            "--navbar-container": "lightblue",
            "--textcolor":"grey",
            "--main-background": "url("+penguins+")",
        };
        localStorage.setItem("currTheme",JSON.stringify(glassObj)); //required to save objects in LocalStorage
        applyThemeFromLocalStorage();
    }


    pushBrushTheme = () => {
        let brushObj = {
            "--projectpage-background": "linear-gradient( rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.55)), url("+brush+")",
        }
        localStorage.setItem("currTheme",JSON.stringify(brushObj)); //required to save objects in LocalStorage
        applyThemeFromLocalStorage();
    }
    
    render(){
        this.pushBrushTheme();
        if(localStorage.getItem("loggedin")==="true") {
            applyThemeFromLocalStorage(); //makes sure theme setting is persistant after refresh
        }
        return( <></> );
    }
}
export default ThemeManager;