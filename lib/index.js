// Remove next input since we have created npm module for the same
import * as React from 'react';
import { View, TextInput } from 'react-native';
const NextTextInput = ({ noOfTextInput, placeholder = [], displayColum = false, keyboardType = 'numeric', textInputStyle, onChangeValue, parentViewStyle, value, clearInput = false, isInputCleared }) => {
    const didMount = React.useRef(false);
    const lastValue = React.useRef(null);
    const lastRef = React.useRef(null);
    const clearBoxesInput = React.useRef(false);
    const inputRefs = Array(noOfTextInput)
        .fill(0)
        .map((_) => React.createRef());
    const [inputValues, setInputValues] = React.useState(Array(noOfTextInput)
        .fill(null)
        .map((val, index) => (value && value[index] !== undefined ? `${value[index]}` : val)));
    React.useEffect(() => {
        if (clearInput) {
            setInputValues(Array(noOfTextInput).fill(null));
            // Focus the first element
            const ref = inputRefs[0].current?.focus();
            if (isInputCleared) {
                isInputCleared(true);
            }
        }
    }, [clearInput]);
    const onChangeHandler = async (value, index) => {
        const currentState = [...inputValues];
        currentState[index] = value;
        setInputValues(currentState);
        lastValue.current = value;
        lastRef.current = index;
    };
    // skip on first render and then emit value updwards
    React.useEffect(() => {
        if (didMount.current &&
            !clearBoxesInput.current &&
            lastRef.current !== null &&
            lastValue.current !== null) {
            onChangeValue(inputValues, lastValue.current, lastRef.current);
            const ref = inputRefs[lastRef.current + 1];
            if (lastValue.current !== '' && ref && ref.current)
                ref.current.focus();
        }
        else if (clearBoxesInput.current) {
            clearBoxesInput.current = false;
        }
        else {
            didMount.current = true;
        }
    }, [inputValues]);
    return (React.createElement(View, { style: displayColum
            ? [{ display: 'flex', flexDirection: 'column' }, parentViewStyle]
            : [{ display: 'flex', flexDirection: 'row' }, parentViewStyle] }, inputRefs.map((element, index) => {
        return (React.createElement(TextInput, { key: index, placeholder: `${placeholder && placeholder[index] ? placeholder[index] : ''}`, value: inputValues[index], maxLength: 1, keyboardType: keyboardType, style: textInputStyle, ref: inputRefs[index], numberOfLines: 1, onChangeText: (text) => onChangeHandler(text, index) }));
    })));
};
export default NextTextInput;
