import { Button } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import classes from '../Home/Home.module.scss';
import { useNavigate } from "react-router-dom";

function Home() {
    const { isAuth } = useAuth()
    const navigate = useNavigate()

    return (
        <>
            <div className={classes['homeContainer']}>

                <div className={classes['textContainer']}>
                    {isAuth
                        ? <>
                            <Button className={classes['btn']} onClick={()=>navigate('/harmoniums')}>Databaze harmonií</Button>
                            <Button className={classes['btn']} onClick={()=>navigate('/builders')}>Databaze stavitelů</Button>
                        </>
                        : <>
                            <div className={classes['titleInfo']}>
                                <h1 className={classes['title']}>Harmonium <br />-<br /> historie</h1>
                                <p className={classes['subtitle']}>databáze je přístupna <br />pouze pro přihlášení</p>
                            </div>
                        </>
                    }

                </div>

                {/* <img src="public/harmoniums/harmonium_6.jpg" alt='backgroud image' className={classes.img}></img> */}


            </div>
        </>
    )
}

export default Home