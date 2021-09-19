import React, {useState, useEffect} from 'react'
import "./Nav.css"

function Nav() {

    const [show, handleshow] = useState(false)
    
    // add event listner scroll. when we scroll more than 20 px down . activate listner else dont
    // remove the existing listner before revoking an a new one
    useEffect(() => {
        window.addEventListener("scroll", () => {

            if ( window.scrollY > 100 ) {
                handleshow(true);
            }
            else handleshow(false);
        }
        );
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);



    return (
        // always have nav property and if show is true then add the have property of nav_black
        <div className ={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
            <img
                className="nav_avatar"
                // src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                src = "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png"
                alt="Netflix avatar"
            />
        </div>
    )
}

export default Nav
