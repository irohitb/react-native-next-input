import React, {PureComponent} from 'react'
import {
	View,
	Text,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity, 
	Dimensions
} from 'react-native'
import Header from './components/layout/header' // Irrelavent
import styles from './example.stylesheet'
import {Icon} from 'react-native-elements'
import Button from './components/elements/button' // irrelevant 
import NextTextInput from 'react-native-next-input'
import KeyboardViewSpacer from 'react-native-keyboard-view-space'
class OtpVerification extends PureComponent {
	constructor(props) {
		super(props)
		this.phoneInstance = this.props.navigation.state.params.phoneInstance
	}


	verifyOTP = value => {
		
	}

	otpInputHandler = (combinedValueArray, currentValue, refForTheCurrentValue) => {
		console.log(combinedValueArray, currentValue, refForTheCurrentValue)
	}

	render() {
		return (
			<KeyboardViewSpacer>
				<Header
					leftComponent={
						<TouchableOpacity
							style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon size={30} name="chevron-left" />
							<Text>{'back'}</Text>
						</TouchableOpacity>
					}
					centerComponent={<View></View>}
					rightComponent={<View></View>}
					navigation={this.props.navigation}
				/>
				<TouchableWithoutFeedback style={styles.touchableKeyboardCloser} onPress={Keyboard.dismiss}>
					<View style={styles.container}>
						<Text style={[styles.title]}>Enter One Time Password</Text>
						<NextTextInput
							noOfTextInput={4}
							textInputStyle={styles.textBox}
							onChangeValue={this.otpInputHandler}
							parentViewStyle={styles.textBoxes}
						/>
						<View style={styles.centerButton}>
							<Button
								btnType={6}
								colorType={3}
								btnText={'Verify OTP'}
								onPress={() => this.verifyOTP()}
								btnStyle={{
									borderColor: 'white',
									marginTop: (Dimensions.get('window').height * 10) / 100
								}}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardViewSpacer>
		)
	}
}

export default OtpVerification
