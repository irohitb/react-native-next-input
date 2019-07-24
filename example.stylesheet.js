import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 20,
		paddingLeft: 20
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	textBoxes: {
		width: Dimensions.get('window').width,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textBox: {
		borderWidth: 0.5,
		borderColor: 'black',
		width: 50,
		height: 50,
		fontSize: 30,
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'center'
	},
	centerButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default styles
