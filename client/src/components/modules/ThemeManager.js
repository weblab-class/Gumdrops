import React, { Component} from "react";
import "../../utilities.css";
import { applyThemeFromLocalStorage  } from "../../utilities.js";
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

    pushGlassTheme = () => {
        console.log("Glass theme pushed");
        let glassObj = {
            "--navbar-container": "linear-gradient(to right top, #65dfc9,#6cdbeb)",
            "--textcolor":"black",
        };
        localStorage.setItem("currTheme",JSON.stringify(glassObj)); //required to save objects in LocalStorage
        applyThemeFromLocalStorage();
    }
    
    render(){
        if(localStorage.getItem("loggedin")==="true") {
            applyThemeFromLocalStorage(); //makes sure theme setting is persistant after refresh
        }
        return( <></> );
    }
}
export default ThemeManager;