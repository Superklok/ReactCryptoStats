import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {CryptoState} from '../CryptoContext';
import {numberWithCommas} from '../components/Banner/Carousel';
import {Pagination} from '@material-ui/lab';
import {
	Container, 
	createTheme, 
	LinearProgress,
	makeStyles, 
	Table, 
	TableBody, 
	TableCell,  
	TableContainer, 
	TableHead, 
	TableRow, 
	TextField, 
	ThemeProvider, 
	Typography
} from '@material-ui/core';

const CoinTable = () => {
	const [search, setSearch]                            = useState(''),
		  [page, setPage]                                = useState(1),
		  history                                        = useHistory(),
		  {currency, symbol, coins, loading, fetchCoins} = CryptoState();

	useEffect(() => {
		fetchCoins();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency]);

	const purpleTheme  = createTheme({
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
		  handleSearch = () => {
							 return coins.filter((coin) => 
								 coin.name.toLowerCase().includes(search) || 
								 coin.symbol.toLowerCase().includes(search)
							 );
						 },
		  useStyles    = makeStyles(() => ({
							 row: {
								 backgroundColor: '#37002F',
								 cursor: 'pointer',
								 '&:hover': {
									 backgroundColor: '#4A0040',
								 },
							 },
							 pagination: {
								 '& .MuiPaginationItem-root': {
									 color: '#FFBA49',
									 fontFamily: 'Genos',
									 fontSize: 24,
								 },
							 },
						 })),
		  classes      = useStyles();

	return (
		<ThemeProvider theme={purpleTheme}>
			<Container style={{textAlign: 'center'}}>
				<Typography
					variant='h4'
					style={{
						margin: 18, 
						fontFamily: 'Genos', 
						fontSize: 32,
					}}
				>
					Cryptocurrency Prices By Market Cap
				</Typography>
				<TextField 
					label='Look up a cryptocurrency...'
					variant='outlined'
					style={{marginBottom: 20, width: '100%'}}
					InputProps={{style:{fontSize: 24, fontFamily: 'Genos'}}}
					InputLabelProps={{style:{fontSize: 24, fontFamily: 'Genos'}}}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<TableContainer>
					{loading ? (
						<LinearProgress style={{backgroundColor: '#FFBA49'}} />
					) : (
						<Table>
							<TableHead style={{backgroundColor: '#FFBA49'}}>
								<TableRow>
									{['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
										<TableCell
											style={{
												color: '#23001E',
												fontWeight: '800',
												fontFamily: 'Genos',
												fontSize: 19,
											}}
											key={head}
											align={head === 'Coin' ? '' : 'right'}
										>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{handleSearch()
								.slice((page - 1) * 10, (page - 1) * 10 + 10)
								.map(row => {
									const profit = row.price_change_percentage_24h > 0;

									return (
										<TableRow
											onClick={() => history.push(`/coin/${row.id}`)}
											className={classes.row}
											key={row.name}
										>
											<TableCell
												component='th' 
												scope='row'
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: 15,
													fontFamily: 'Genos',
													borderColor: '#23001E',
												}}
											>
												<img 
													src={row?.image}
													alt={row.name}
													height='50'
													style={{marginBottom: 10}}
												/>
												<div 
													style={{
														display: 'flex',
														flexDirection: 'column',
													}}
												>
													<span
														style={{
															textTransform: 'uppercase',
															fontSize: 32,
														}}
													>
														{row.symbol}
													</span>
													<span
														style={{
															color: '#FFD4F9',
															fontSize: 20,
														}}
													>
														{row.name}
													</span>
												</div>
											</TableCell>
											<TableCell 
												align='right'
												style={{
													fontFamily: 'Genos',
													fontSize: 22,
													borderColor: '#23001E',
												}}
											>
												{symbol}
												{numberWithCommas(row.current_price.toFixed(2))}
											</TableCell>
											<TableCell
												align='right'
												style={{
													color: profit > 0 ? '#00FBA2' : '#FB005A',
													fontWeight: 800,
													fontFamily: 'Genos',
													fontSize: 22,
													borderColor: '#23001E',
												}}
											>
												{profit && '+'}
												{row.price_change_percentage_24h.toFixed(2)}%
											</TableCell>
											<TableCell 
												align='right'
												style={{
													fontFamily: 'Genos',
													fontSize: 22,
													borderColor: '#23001E',
												}}
											>
												{symbol}
												{numberWithCommas(
													row.market_cap.toString().slice(0, -6)
												)}
												M
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
			</Container>
			<Pagination 
					style={{
						paddingTop: 20,
						paddingBottom: 20,
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
					classes={{ul: classes.pagination}}
					count={(handleSearch()?.length/10).toFixed(0)}
					onChange={(_, value) => {
						setPage(value);
						window.scroll(0, 450);
					}}
				/>
		</ThemeProvider>
	);
}

export default CoinTable;