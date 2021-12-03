import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import {SingleCoin} from '../../config/api';
import {CryptoState} from '../../CryptoContext';
import CoinInfo from '../CoinInfo';
import {numberWithCommas} from '../Banner/Carousel';
import {
	LinearProgress, 
	makeStyles, 
	Typography
} from '@material-ui/core';

const CoinPage = () => {
	const [coin, setCoin]    = useState(),
		  {id}               = useParams(),
		  {currency, symbol} = CryptoState(),
		  fetchCoin          = async () => {
								   const {data} = await axios.get(SingleCoin(id));

								   setCoin(data);
							   };

	useEffect(() => {
		fetchCoin();
	}, []);

	const useStyles = makeStyles((theme) => ({
						  container: {
							  display: 'flex',
							  [theme.breakpoints.down('md')]: {
								  flexDirection: 'column',
								  alignItems: 'center',
							  },
						  },
						  sidebar: {
							  width: '30%',
							  [theme.breakpoints.down('md')]: {
								  width: '100%',
							  },
							  display: 'flex',
							  flexDirection: 'column',
							  alignItems: 'center',
							  marginTop: 25,
							  borderRight: '2px solid #4A0040',
						  },
						  title: {
							  fontWeight: 800,
							  marginBottom: 20,
							  fontFamily: 'Genos',
							  color: '#FFD4F9',
						  },
						  coinDescription: {
							  width: '100%',
							  fontFamily: 'Genos',
							  fontSize: 22,
							  wordSpacing: -1,
							  padding: 25,
							  paddingBottom: 15,
							  paddingTop: 0,
							  textAlign: 'justify',
						  },
						  marketData: {
							  alignSelf: 'start',
							  padding: 25,
							  paddingTop: 10,
							  width: '100%',
							  [theme.breakpoints.down('md')]: {
								  display: 'flex',
								  justifyContent: 'space-around',
							  },
							  [theme.breakpoints.down('sm')]: {
								  flexDirection: 'column',
								  alignItems: 'center',
							  },
							  [theme.breakpoints.down('xs')]: {
								  alignItems: 'start',
							  },
						  },
					  })),
		  classes   = useStyles();

	if (!coin) return (
		<LinearProgress style={{backgroundColor: '#FFBA49'}} />
	);

	return (
		<div className={classes.container}>
			<div className={classes.sidebar}>
				<img 
					src={coin?.image.large}
					alt={coin?.name}
					height='200'
					style={{marginBottom: 20}}
				/>
				<Typography variant='h3' className={classes.title}>
					{coin?.name}
				</Typography>
				<Typography variant='subtitle1' className={classes.coinDescription}>
					{ReactHtmlParser(coin?.description.en.split('. ')[0])}.
				</Typography>
				<div className={classes.marketData}>
					<span style={{display: 'flex'}}>
						<Typography variant='h4' className={classes.title}>
							Rank:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant='h4'
							style={{
								fontFamily: 'Genos',
								fontWeight: 500,
								color: '#FFD4F9',
							}}
						>
							{coin?.market_cap_rank}
						</Typography>
					</span>
					<span style={{display: 'flex'}}>
						<Typography variant='h4' className={classes.title}>
							Current Price:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant='h4'
							style={{
								fontFamily: 'Genos',
								fontWeight: 500,
								color: '#FFD4F9',
							}}
						>
							{symbol}{' '}
							{numberWithCommas(
								coin?.market_data.current_price[currency.toLowerCase()]
							)}
						</Typography>
					</span>
					<span style={{display: 'flex'}}>
						<Typography variant='h4' className={classes.title}>
							Market Cap:{' '}
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant='h4'
							style={{
								fontFamily: 'Genos',
								fontWeight: 500,
								color: '#FFD4F9',
							}}
						>
							{symbol}{' '}
							{numberWithCommas(
								coin?.market_data.market_cap[currency.toLowerCase()]
								.toString()
								.slice(0, -6)
							)}
							M
						</Typography>
					</span>
				</div>
			</div>
			<CoinInfo coin={coin} />
		</div>
	);
}

export default CoinPage;