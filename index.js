// Remove next input since we have created npm module for the same

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, TextInput, StyleSheet} from 'react-native'
class NextTextInput extends PureComponent {
	constructor(props) {
		super(props)
		const noOfRefs = this.props.noOfTextInput
		this.inputRefs = Array(noOfRefs)
			.fill(0)
			.map(_ => React.createRef())
		this.value = this.props.value
		this.state = {
			inputValue: Array(this.props.noOfTextInput).fill(null).map((value, index) => this.value && this.value[index] !== undefined ? '' + this.value[index] : value)
		}
	}



	onChangeHandler = async (value, index) => {
		const {inputValue} = this.state
		inputValue[index] = value
		await this.setState({inputValue: [...inputValue]})
		this.props.onChangeValue(this.state.inputValue, this.state.inputValue[index], this.inputRefs[index])
		const ref = this.inputRefs[index + 1]
		if (value && ref && ref.current) ref.current.focus()
	}

	render() {
		return (
			<View
				style={
					this.props.displayColum
						? [{display: 'flex', flexDirection: 'column'}, this.props.parentViewStyle]
						: [{display: 'flex', flexDirection: 'row'}, this.props.parentViewStyle]
				}
			>
				{this.inputRefs.map((element, index) => (
					<TextInput
						key={index}
						placeholder={this.props.placeholder[index]}
						value={this.state.inputValue[index]}
						maxLength={1}
						keyboardType={this.props.keyboardType}
						style={this.props.textInputStyle}
						ref={this.inputRefs[index]}
						numberOfLines={1}
						onChangeText={text => this.onChangeHandler(text, index)}
					/>
				))}
			</View>
		)
	}
}

NextTextInput.propTypes = {
	noOfTextInput: PropTypes.number.isRequired,
	placeholder: PropTypes.array,
	displayColum: PropTypes.bool,
	keyboardType: PropTypes.string,
	textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	onChangeValue: PropTypes.func.isRequired,
	parentViewStyle: PropTypes.object,
	value: PropTypes.array
}

NextTextInput.defaultProps = {
	displayColum: false,
	keyboardType: 'numeric',
	placeholder: []
}

export default NextTextInput