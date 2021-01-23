import React, { Component} from "react";
import "../../utilities.css";
/**
 * ThemeApplier applies a custom theming to the website. 
 * Only called when user is logged in.
 * 
 * Proptypes 
 * 
 */
class ThemeApplier extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }


    pushGlassTheme = () => {
        let glassObj = {
            "--navbar-container": "linear-gradient(to right top, #65dfc9,#6cdbeb)",
            "--textcolor":"black",
        };
        localStorage.setItem("currTheme",JSON.stringify(glassObj));
    }
    
    applyFromLocalStorage = () => {
        if(localStorage.hasOwnProperty("currTheme")) {
            let themeObj = JSON.parse(localStorage.getItem("currTheme"));
            console.log(themeObj);
            for (const [key, value] of Object.entries(themeObj)) {
                //console.log(`${key}: ${value}`);
                document.documentElement.style.setProperty(key, value);

              }
        }
    }

    render(){
        this.pushGlassTheme();
        this.applyFromLocalStorage();
        localStorage.clear();
        return( <></> );
    }
}
export default ThemeApplier;