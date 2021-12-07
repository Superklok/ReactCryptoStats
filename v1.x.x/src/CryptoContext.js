import {
	createContext, 
	useContext, 
	useEffect, 
	useState
} from "react";
import axios from 'axios';
import {CoinList} from './config/api';

const Crypto = createContext();

const CryptoContext = ({children}) => {
	const [currency, setCurrency] = useState('CAD'),
		  [symbol, setSymbol]     = useState('$'),
		  [coins, setCoins]       = useState([]),
		  [loading, setLoading]   = useState(false),
		  fetchCoins              = async () => {
										setLoading(true);
										const {data} = await axios.get(CoinList(currency));

										setCoins(data);
										setLoading(false);
									};

	useEffect(() => {
		if (currency === 'CAD') setSymbol('$');
		else if (currency === 'EUR') setSymbol('€');
		else if (currency === 'GBP') setSymbol('£');
		else if (currency === 'USD') setSymbol('$');
	}, [currency]);

	return (
		<Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins}}>
			{children}
		</Crypto.Provider>
	);
}

export const CryptoState = () => {
	return useContext(Crypto);
}

export default CryptoContext;