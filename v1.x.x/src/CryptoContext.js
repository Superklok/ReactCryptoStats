import {
	createContext, 
	useContext, 
	useEffect, 
	useState
} from "react";

const Crypto = createContext();

const CryptoContext = ({children}) => {
	const [currency, setCurrency] = useState('CAD'),
		  [symbol, setSymbol]     = useState('CA$');

	useEffect(() => {
		if (currency === 'CAD') setSymbol('CA$');
		else if (currency === 'EUR') setSymbol('€');
		else if (currency === 'GBP') setSymbol('£');
		else if (currency === 'USD') setSymbol('$');
	}, [currency]);

	return (
		<Crypto.Provider value={{currency, symbol, setCurrency}}>
			{children}
		</Crypto.Provider>
	);
}

export const CryptoState = () => {
	return useContext(Crypto);
}

export default CryptoContext;