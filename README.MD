## React-Native-Next-Input

[![NPM](https://nodei.co/npm/react-native-next-input.png?compact=true)](https://nodei.co/npm/react-native-next-input/)

### Description 

React-native component which will automatically change focus to next input element making it great to use when making OTP screens, pin based login screens or even date of birth component


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
  onChangeValue={this.inputFromChildComponent}
  parentViewStyle={styles.textBoxes}
/>
```
where we are capturing the input from the child component in `inputFromChildComponent` like this 

```
inputFromChildComponent = (combinedValueArray, currentValue, refForTheCurrentValue) => {
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



### Real world example 

### Real World Example Code

<strong> Note: </strong> Here is the [JSX code](https://github.com/irohitb/react-native-next-input/blob/master/example.js) and the [relavent styling](https://github.com/irohitb/react-native-next-input/blob/master/example.stylesheet.js) for the above gif UI. The  code also uses a [react-native-keyboard-view-space](https://www.npmjs.com/package/react-native-keyboard-view-space) to animate opening of keyboard and moving of the component in the screen node module but that it totally optional for you to use it 

