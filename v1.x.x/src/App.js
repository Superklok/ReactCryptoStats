import {BrowserRouter, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import HomePage from './components/views/HomePage';
import CoinPage from './components/views/CoinPage';
import Header from './components/Header';

const App = () => {
	const useStyles = makeStyles(() => ({
						  App: {
							backgroundColor: '#23001E',
							color: '#FFE7FC',
							minHeight: '100vh',
						  }
					  })),
		  classes   = useStyles();

	return (
		<BrowserRouter>
			<div className={classes.App}>
				<Header />
				<Route 
					path='/' 
					exact
					component={HomePage}
				/>
				<Route 
					path='/coin/:id/' 
					component={CoinPage}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;