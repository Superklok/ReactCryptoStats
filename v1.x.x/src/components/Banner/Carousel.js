import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {TrendingCoins} from '../../config/api';
import {CryptoState} from '../../CryptoContext';
import {makeStyles} from "@material-ui/core";
import AliceCarousel from 'react-alice-carousel';

const useStyles = makeStyles((theme) => ({
	carousel: {
		height: '50%',
		display: 'flex',
		alignItems: 'center',
	},
	carouselItem: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		cursor: 'pointer',
		textTransform: 'uppercase',
	},
}));

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
	const [trending, setTrending] = useState([]),
		  classes                 = useStyles(),
		  {currency, symbol}      = CryptoState(),
		  fetchTrendingCoins      = async () => {
										const {data} = await axios.get(TrendingCoins(currency));

										setTrending(data);
									}

									useEffect(() => {
										fetchTrendingCoins();
									}, [currency]);

	const items      = trending.map((coin) => {
						   let profit = coin.price_change_percentage_24h >= 0;
						   return (
							   <Link
								   className={classes.carouselItem}
								   to={`/coin/${coin.id}`}
							   >
								   <img 
									   src={coin?.image}
									   alt={coin.name}
									   height='80'
									   style={{marginBottom: 10}}
								   />
								   <span>{coin?.symbol}
									   &nbsp;
									   <span
										   style={{
											   color: profit > 0 ? '#00FBA2' : '#FB005A',
											   fontWeight: 800,
										   }}
									   >
										   {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
									   </span>
								   </span>
								   <span style={{fontSize: 24, fontWeight: 500}}>
									   {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
								   </span>
							   </Link>
						   );
					   }),						
		  responsive = {
						   0: {
							   items: 2,
						   },
						   512: {
							   items: 4,
						   },
					   };

	return (
		<div className={classes.carousel}>
			<AliceCarousel 
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				disableButtonsControls
				responsive={responsive}
				autoPlay
				items={items}
			/>
		</div>
	);
}

export default Carousel;