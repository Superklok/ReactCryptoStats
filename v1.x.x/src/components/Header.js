import {useHistory} from 'react-router-dom';
import {
	AppBar, 
	Container, 
	createTheme, 
	makeStyles, 
	MenuItem, 
	Select, 
	ThemeProvider,
	Toolbar, 
	Typography
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		fontFamily: 'Zen Tokyo Zoo',
		fontWeight: 400,
		fontSize: '2.6rem',
		color: '#FFBA49',
		wordSpacing: '-8px',
		cursor: 'pointer',
	}
}));

const Header = () => {
	const classes     = useStyles(),
		  history     = useHistory(),
		  purpleTheme = createTheme({
			  palette: {
				  primary: {
					  main: '#FFE7FC',
				  },
				  text: {
					  primary: '#FFE7FC',
					  secondary: 'rgba(255,231,252,0.7)',
					  disabled: 'rgba(255,231,252,0.5)',
				  },
				  action: {
					  active: '#FFE7FC',
					  hover: 'rgba(255,231,252,0.8)',
					  selected: 'rgba(255,231,252,0.16)',
					  disabled: 'rgba(255,231,252,0.3)',
					  disabledBackground: 'rgba(255,231,252,0.12)',
				  },
				  background: {
					  default: '#23001E',
					  paper: '#4A0040',
				  },
				  divider: 'rgba(255,231,252,0.12)',
				  type: 'dark',
			  },
		  });

	return (
		<ThemeProvider theme={purpleTheme}>
			<AppBar color='transparent' position='static'>
				<Container>
					<Toolbar>
						<Typography 
							onClick={() => history.push('/')}
							className={classes.title}
						>
							React Crypto Stats
						</Typography>
						<Select
							variant='outlined' 
							style={{
								width: 100,
								height: 40,
								marginRight: 15,
							}}
						>
							<MenuItem value={'CAD'}>CAD</MenuItem>
							<MenuItem value={'USD'}>USD</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}

export default Header;