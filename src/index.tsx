// Remove next input since we have created npm module for the same

import * as React from 'react'
import {View, TextInput, ViewStyle, KeyboardTypeOptions, TextStyle} from 'react-native'


interface Props {
	noOfTextInput: number;
	placeholder: Array<number | string>;
	displayColum: boolean;
	keyboardType: KeyboardTypeOptions;
	textInputStyle: TextStyle,
	onChangeValue: (a:Array<string>, b: string, inputRefs: number) => void;
	parentViewStyle: ViewStyle;
	value: Array<string | number>;
	clearInput?: boolean;
	onInputCleared?: (a: boolean) => void
}

const defaultProps = {
	displayColum: false,
	keyboardType: 'numeric',
	placeholder: [], 
	clearInput: false
}
const NextTextInput = ({noOfTextInput, placeholder, displayColum, keyboardType, textInputStyle, onChangeValue, parentViewStyle, value, clearInput, onInputCleared}: Props) => {
		// this.noOfRefs = this.props.noOfTextInput
	
	const didMount = React.useRef(false);
	const lastValue: React.MutableRefObject<string  | null > = React.useRef(null)
	const lastRef: React.MutableRefObject< number | null> = React.useRef(null)
	const clearBoxesInput = React.useRef(false)
	const inputRefs:Array<React.RefObject<TextInput>>= Array(noOfTextInput).fill(0).map(_ => React.createRef())
	const [inputValues, setInputValues] =  React.useState(Array(noOfTextInput).fill(null).map((val, index) => value && value[index] !== undefined ? '' + value[index] : val))

	React.useEffect(() => {
		if (clearInput) {
			setInputValues(Array(noOfTextInput).fill(null))
			// Focus the first element
			const ref = inputRefs[0].current?.focus()
			if (onInputCleared) {
				onInputCleared(true)
			} 
		}
	}, [clearInput])

	const onChangeHandler = async (value: string, index: number) => {
		const currentState = [...inputValues]
		currentState[index] = value
		setInputValues(currentState)
		lastValue.current = value
		lastRef.current = index
		// await this.setState({inputValue: [...inputValue]})
		// this.props.onChangeValue(this.state.inputValue, this.state.inputValue[index], this.inputRefs[index])
		// const ref = this.inputRefs[index + 1]
		// if (value && ref && ref.current && !clearInput) ref.current.focus()
				
	}

	// skip on first render and then emit value updwards
	React.useEffect(() => {
		if (didMount.current && !clearBoxesInput.current && lastRef.current !== null && lastValue.current !== null){
			onChangeValue(inputValues, lastValue.current, lastRef.current)
			const ref = inputRefs[lastRef.current + 1]
			if (lastValue.current !== '' && ref && ref.current) ref.current.focus() 
		} else if (clearBoxesInput.current) {
			clearBoxesInput.current = false
		} else {
			didMount.current = true
		}
	}, [inputValues])


	React.useLayoutEffect(() => {
			let inputValues = false 
			for (let i = 0; i<inputValues.length; i++) {
				if (i != 0 && inputValues[i])  {
					inputValues = true
				}
			}
			if (clearInput && inputValues) {
				// if clear input is true and there is nothing in the first input 
				setInputValues(Array(noOfTextInput).fill(null))
				const ref = inputRefs[0]
				if (ref && ref.current) {
					ref.current.focus()
				}	
			}
		})


		return (
			<View
				style={
					displayColum
						? [{display: 'flex', flexDirection: 'column'}, parentViewStyle]
						: [{display: 'flex', flexDirection: 'row'}, parentViewStyle]
				}
			>
				{inputRefs.map((element, index) => (
					<TextInput
						key={index}
						placeholder={`${placeholder![index]}`}
						value={inputValues[index]}
						maxLength={1}
						keyboardType={keyboardType}
						style={textInputStyle}
						ref={inputRefs[index]}
						numberOfLines={1}
						onChangeText={text => onChangeHandler(text, index)}
					/>
				))}
			</View>
		)
	
}


NextTextInput.defaultProps = defaultProps

export default NextTextInput