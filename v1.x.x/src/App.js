import {BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/views/HomePage';
import CoinPage from './components/views/CoinPage';
import Header from './components/Header';

const App = () => {
	return (
		<BrowserRouter>
			<div>
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