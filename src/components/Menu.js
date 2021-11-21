import "../css/menu.css"

const Menu = (props) => {

    const changeTheme = () => {

        if (props.theme === "light-theme")
         {
            props.changeTheme("dark-theme")
            window.localStorage.setItem("activeTheme", "dark-theme")
         }
            
        else 
            {
                props.changeTheme("light-theme")
                window.localStorage.setItem("activeTheme", "light-theme")
            }
    }
    return (
        <div>
            <section className="menu-container">
                <section className="logo-container">
                    
                    <img className="logo-img" src={process.env.PUBLIC_URL + "/assets/logo.svg"} alt="Logo"/>
                    <section className="logo-container-lighter">
                    </section>
                </section>

                
                <section className="avatar-and-moon">
                    {
                        props.theme === "light-theme" ?
                        <img className="dark-light moon" src={process.env.PUBLIC_URL + "/assets/icon-moon.svg"} alt="Icon moon" onClick={changeTheme}/>
                        : 
                        <img className="dark-light sun" src={process.env.PUBLIC_URL + "/assets/icon-sun.svg"} alt="Icon sun" onClick={changeTheme}/>
                    }
                    
                    <section className="avatar-image-container">
                        <img className="img-avatar" src={process.env.PUBLIC_URL + "/assets/image-avatar.jpg"} alt="Avatar"/>
                    </section>
                </section>
            </section>
            
        </div>
      )
}

export default Menu