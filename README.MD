## React-Native-Next-Input
|  | Status |
| - | - |
| Dependencies | [![Dependencies](https://img.shields.io/david/irohitb/react-native-next-input)](https://david-dm.org/irohitb/react-native-next-input) [![Dev dependencies](https://img.shields.io/david/dev/irohitb/react-native-next-input)](https://david-dm.org/irohitb/react-native-next-input) [![Peer dependencies](https://img.shields.io/david/peer/irohitb/react-native-next-input)](https://david-dm.org/irohitb/rn-formly)|
| Package | [![npm package version](https://img.shields.io/npm/v/react-native-next-input)](https://www.npmjs.com/package/react-native-next-input) [![npm downloads](https://img.shields.io/npm/dt/react-native-next-input)](https://www.npmjs.com/package/react-native-next-input)


### Description 

React-native component which will automatically change focus to next input element making it great to use when making OTP screens, pin based login screens or even date of birth component

**Note:** If you like the repo, please give it a star on github

 <img src="https://user-images.githubusercontent.com/32276134/61627498-8acc5280-ac9d-11e9-83a6-ab5df15f554e.gif"  width="250" height="500">



### Installation 

```
npm install react-native-next-input --save
```

### Usage 

Import react-native-next input 

```
import NextTextInput from 'react-native-next-input'
```
and then use it like this

```
<NextTextInput 
  noOfTextInput={4}
  textInputStyle={styles.textBox}
  onChangeValue={inputFromChildComponent}
  parentViewStyle={styles.textBoxes}
/>
```
where we are capturing the input from the child component in `inputFromChildComponent` like this 

```
inputFromChildComponent = (combinedValueArray, currentValue, refForTheCurrentValue) => {
			console.log(combinedValueArray, currentValue,  refForTheCurrentValue)
	}
```

### Clear Input 
1. Pass a boolean state set to `false` initally to NextTextInput 

```
<NextTextInput 
  noOfTextInput={4}
  textInputStyle={styles.textBox}
  onChangeValue={inputFromChildComponent}
  parentViewStyle={styles.textBoxes}
  clear={invalid}
  isInputCleared={isInputCleared}
/>
```
You can change clear the input by changing the state to `true`

```

verifyOTP = () => {
	try {
		if (currentNumbersEntered.length === 4) {
			phoneInstance.verifyOtp(currentNumbersEntered )
		
			props.navigation.navigate('SucessAuth') // Assume this throws error and code goes to catch statement
		} else {
			// To display error
			dropDownAlertRef.alertWithType('error', 'Error', frontendErrors.OTP_LENGTH)
		}
	} catch (err) {
		// Since user entered invalid otp, we decide to clear text in input box
		setInvalid(true) // this will clear input  
	}
}

inputFromChildComponent = (combinedValueArray, currentValue, refForTheCurrentValue) => {
	if (clear) {
		// If you have cleared the state or passed true in clear props, it's recommended that you re-change it to false
		setClear(false)
	}
	console.log(combinedValueArray, currentValue,  refForTheCurrentValue)
}

```



### Props

| **Prop** | **Type** | **Default** | **Required** | **description** |
|----------|----------|-------------|--------------|--------------|
| noOfTextInput | number | null | Yes | No of text input elements you want for example in case of otp screen it could be 4 text-input elements, In case of date of birth it could be 8 (DD-MM-YYYY) |
| onChangeValue | function | null | Yes | the function to capture the input value entered by the user, this function recieves three parameters, the entire updated array holding entered value(s), the current value entered by user, and ref for the current value (see above example)|
| placeholder | array | empty array | No | If in case you want to have a placeholder value for your input elements, for example in case of date of birth you might want TextInput to have dd-mm-yyyy (pass an array for placeholder like this: `['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']`) |
| displayColum | boolean | false | No | By default orientation of text input element is keept to be false, meaning the Text input would have `flexDirection: row`, by setting true, you will change the `flexDirection` to column |
| keyboardType | String | numeric | No | Since, this parameter is being passed to `<TextInput`, it supports all the values as mentioned in react-native documentation for TextInput, by default the value is set to numeric |
| textInputStyle | object | null | No | Styling for your the mapped-input element (the above style of boxes in case of the otp screen) |
| parentViewStyle | object | null | no | the styling for the parent view under which the input elements are mapped |
| value | Array | null | No | Array containing default values/or values user might have previously entered in the forn |
| clear | Boolean | false | No | When `true` it will clear everything in the input boxes and change focus to first box |
| isInputCleared | function | null | no | this function emits value to parent function passed once the state is cleared |

### Examples 
1. [Example of Date Picker Component](https://github.com/blendtale/rn-formly/blob/master/formComponent/date-time.js)
2. [Example of OTP Component](https://github.com/blendtale/rn-formly/blob/master/formComponent/otp.js)