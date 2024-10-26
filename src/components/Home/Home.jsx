import { useAuth } from "../../context/AuthContext";
import classes from '../Home/Home.module.scss';

function Home() {
    const { isAuth } = useAuth()
    
    return (
        <>
            <div className={classes.homeContainer}>
              
            </div>
        </>
    )

}

export default Home