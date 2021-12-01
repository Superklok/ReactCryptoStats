import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	banner: {
		backgroundImage: 'linear-gradient(rgba(35,0,30,0.5), rgba(35,0,30,0.5)), url(./ReactCryptoStatsBG.jpg)',
		backgroundSize: 'cover',
	},
	bannerContent: {
		height: 400,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 25,
		justifyContent: 'space-around',
	},
	tagline: {
		display: 'flex',
		height: '40%',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
}));

const Banner = () => {
	const classes = useStyles();

	return (
		<div className={classes.banner}>
			<Container className={classes.bannerContent}>
				<div className={classes.tagline}>
					<Typography
						variant='h2' 
						style={{
							marginBottom: 0,
							fontFamily: 'Zen Tokyo Zoo',
							fontWeight: 400,
							fontSize: '5rem',
							color: '#FFD4F9',
							wordSpacing: -16,
						}}
					>
						React Crypto Stats
					</Typography>
					<Typography
						variant='subtitle2'
						style={{
							fontFamily: 'Genos',
							fontSize: '1.515rem',
							paddingBottom: 25,
						}}
					>
						A cryptocurrency statistical analysis app coded in React.
					</Typography>
				</div>
			</Container>
		</div>
	);
}

export default Banner;