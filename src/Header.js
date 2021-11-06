import {makeStyles} from '@material-ui/core/styles'
import {CssBaseline, AppBar, Toolbar} from '@material-ui/core'



const useStyles=makeStyles((theme)=>({
    appbar:{
        background: 'none',
        position: 'sticky'

    },
    appTitle:{
        color: 'white'
    },
    barWrapper:{
        width: '80%',
        margin: '0 auto'
    }


}))



const Header = () => {
const classes = useStyles()

return(<AppBar className={classes.appbar} elevation={0}>
    <Toolbar className={classes.barWrapper}>
        <h1 className={classes.appTitle}>StockBuddy</h1>
    </Toolbar>

    
</AppBar>)


}

export default Header