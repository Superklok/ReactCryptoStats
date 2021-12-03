import {useState, useEffect} from 'react';
import axios from 'axios';
import {CryptoState} from '../CryptoContext';
import {HistoricalChart} from '../config/api';
import {chartDays} from '../config/data';
import {Line} from 'react-chartjs-2';
import ChartButton from './ChartButton';
import {
	CircularProgress,
	createTheme, 
	makeStyles, 
	ThemeProvider
} from '@material-ui/core';

const CoinInfo = ({coin}) => {
	const [historicData, setHistoricData] = useState(),
		  [days, setDays]                 = useState(1),
		  {currency}                      = CryptoState(),
		  fetchHistoricData               = async () => {
			  const {data} = await axios.get(HistoricalChart(coin.id, days, currency));

			  setHistoricData(data.prices);
		  };

	useEffect(() => {
		fetchHistoricData();
	}, [currency, days]);

	const purpleTheme = createTheme({
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
									hover: 'rgba(255,231,252,0.4)',
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
						}),
		  useStyles   = makeStyles((theme) => ({
			  				container: {
								  width: '75%',
								  display: 'flex',
								  flexDirection: 'column',
								  alignItems: 'center',
								  justifyContent: 'center',
								  marginTop: 25,
								  padding: 40,
								  [theme.breakpoints.down('md')]: {
									  width: '100%',
									  marginTop: 0,
									  padding: 20,
									  paddingTop: 0,
								  },
							  },
						})),
		  classes     = useStyles();

	return (
		<ThemeProvider theme={purpleTheme}>
			<div className={classes.container}>
				{
					!historicData ? (
						<CircularProgress 
							style={{color: '#FFBA49'}}
							size={250}
							thickness={1}
						/>
					) : (
						<>
							<Line 
								data={{
									labels: historicData.map((coin) => {
										let date = new Date(coin[0]),
											time = date.getHours() > 12
											? `${date.getHours() - 12}:${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
										
										return days === 1 ? time : date.toLocaleDateString();
									}),
									datasets: [
										{
											data: historicData.map((coin) => coin[1]),
											label: `Price (past ${days} days) in ${currency}`,
											borderColor: '#FFBA49',
										},
									],
								}}
							/>
							<div
								style={{
									display: 'flex',
									marginTop: 20,
									justifyContent: 'space-around',
									width: '100%',
								}}
							>
								{chartDays.map((day) => (
									<ChartButton
										key={day.value}
										onClick={() => setDays(day.value)}
										selected={day.value === days}
									>
										{day.label}
									</ChartButton>
								))}
							</div>
						</>
					)}
			</div>
		</ThemeProvider>
	);
}

export default CoinInfo;