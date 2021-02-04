/// <reference types="react" />
import { ViewStyle, KeyboardTypeOptions, TextStyle } from 'react-native';
interface Props {
    noOfTextInput: number;
    placeholder?: Array<number | string>;
    displayColum?: boolean;
    keyboardType?: KeyboardTypeOptions;
    textInputStyle?: TextStyle;
    onChangeValue: (a: Array<string>, b: string, inputRefs: number) => void;
    parentViewStyle?: ViewStyle;
    value?: Array<string | number>;
    clearInput?: boolean;
    onInputCleared?: (a: boolean) => void;
}
declare const NextTextInput: {
    ({ noOfTextInput, placeholder, displayColum, keyboardType, textInputStyle, onChangeValue, parentViewStyle, value, clearInput, onInputCleared }: Props): JSX.Element;
    defaultProps: {
        displayColum: boolean;
        keyboardType: string;
        placeholder: never[];
        clearInput: boolean;
    };
};
export default NextTextInput;
