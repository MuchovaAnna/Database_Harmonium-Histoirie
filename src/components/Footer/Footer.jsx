import { IconMail } from "@tabler/icons-react"
import classes from "../Footer/Footer.module.scss"

function Footer() {
    return (
        <div className={classes["footerContainer"]}>
            <h6 className={classes["footerCopy"]}>© 2024 Anna Muchová</h6>
            <div className={classes["contactContainer"]}>
                <h6 className={classes["titleContact"]}>kontakt:</h6>
                <p className={classes["infoText"]}><IconMail className={classes["iconFooter"]} />muchova.anna@post.cz</p>
            </div>
        </div>
    )
}

export default Footer