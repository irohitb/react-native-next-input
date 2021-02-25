/// <reference types="react" />
import { ViewStyle, KeyboardTypeOptions, TextStyle } from 'react-native';
export interface NextInputProps {
    noOfTextInput: number;
    placeholder?: Array<number | string>;
    displayColum?: boolean;
    keyboardType?: KeyboardTypeOptions;
    textInputStyle?: TextStyle;
    onChangeValue: (a: Array<string>, b: string, inputRefs: number) => void;
    parentViewStyle?: ViewStyle;
    value?: Array<string | number>;
    clearInput?: boolean;
    isInputCleared?: (a: boolean) => any | void;
}
declare const NextTextInput: ({ noOfTextInput, placeholder, displayColum, keyboardType, textInputStyle, onChangeValue, parentViewStyle, value, clearInput, isInputCleared }: NextInputProps) => JSX.Element;
export default NextTextInput;
