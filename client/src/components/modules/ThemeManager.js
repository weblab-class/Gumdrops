import React, { Component} from "react";
import "../../utilities.css";
import { applyThemeFromLocalStorage  } from "../../utilities.js";
import penguins from "../../public/penguin-group.jpg";
import retro from "../../public/retroBackground.png";
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


    pushRetroTheme = () => {
        let retroObj = {
            "--navbar-container": "lightpink",
            "--textcolor":"black",
        }
        localStorage.setItem("currTheme",JSON.stringify(retroObj)); //required to save objects in LocalStorage
        applyThemeFromLocalStorage();
    }
    
    render(){
        this.pushRetroTheme();
        if(localStorage.getItem("loggedin")==="true") {
            applyThemeFromLocalStorage(); //makes sure theme setting is persistant after refresh
        }
        return( <></> );
    }
}
export default ThemeManager;