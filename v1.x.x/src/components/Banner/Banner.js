import {Container, makeStyles, Typography} from "@material-ui/core";
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
	banner: {
		backgroundImage: 'linear-gradient(rgba(35,0,30,0.68), rgba(35,0,30,0.68)), url(./ReactCryptoStatsBG.jpg)',
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
							fontSize: '3.5rem',
							color: '#FFD4F9',
							wordSpacing: -10,
						}}
					>
						Crypto Stats
					</Typography>
					<Typography
						variant='subtitle2'
						style={{
							fontFamily: 'Genos',
							fontSize: '1.44rem',
						}}
					>
						A cryptocurrency statistical analysis app coded in React.
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
}

export default Banner;