import {makeStyles} from "@material-ui/core";

const ChartButton = ({children, selected, onClick}) => {
	const useStyles = makeStyles({
						  chartButton: {
							  border: '1px solid #FFBA49',
							  borderRadius: 5,
							  padding: 5,
							  display: 'flex',
							  alignItems: 'center',
							  justifyContent: 'center',
							  fontFamily: 'Genos',
							  fontSize: 20,
							  cursor: 'pointer',
							  backgroundColor: selected ? '#FFBA49' : '',
							  color: selected ? '#23001E' : '',
							  fontWeight: selected ? 800 : 500,
							  '&:hover': {
								  backgroundColor: '#FFBA49',
								  color: '#23001E',
								  fontWeight: 500,
							  },
							  width: '22%',
							  marginTop: 20,
						  },
					  }),
		  classes   = useStyles();

	return (
		<span 
			className={classes.chartButton}
			onClick={onClick}		
		>
			{children}
		</span>
	);
}

export default ChartButton;