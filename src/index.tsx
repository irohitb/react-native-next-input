// Remove next input since we have created npm module for the same

import * as React from 'react'
import { View, TextInput, ViewStyle, KeyboardTypeOptions, TextStyle } from 'react-native'

export interface NextInputProps {
  noOfTextInput: number
  placeholder?: Array<number | string>
  displayColum?: boolean
  keyboardType?: KeyboardTypeOptions
  textInputStyle?: TextStyle
  onChangeValue: (a: Array<string>, b: string, inputRefs: number) => void
  parentViewStyle?: ViewStyle
  value?: Array<string | number>
  clearInput?: boolean
  isInputCleared?: (a: boolean) => any | void
}

const NextTextInput = ({
  noOfTextInput,
  placeholder = [],
  displayColum = false,
  keyboardType = 'numeric',
  textInputStyle,
  onChangeValue,
  parentViewStyle,
  value,
  clearInput = false,
  isInputCleared
}: NextInputProps) => {
  const didMount = React.useRef(false)
  const lastValue: React.MutableRefObject<string | null> = React.useRef(null)
  const lastRef: React.MutableRefObject<number | null> = React.useRef(null)
  const clearBoxesInput = React.useRef(false)
  const inputRefs: Array<React.RefObject<TextInput>> = Array(noOfTextInput)
    .fill(0)
    .map((_) => React.createRef())
  const [inputValues, setInputValues] = React.useState(
    Array(noOfTextInput)
      .fill(null)
      .map((val, index) => (value && value[index] !== undefined ? `${value[index]}` : val))
  )

  React.useEffect(() => {
    if (clearInput) {
      setInputValues(Array(noOfTextInput).fill(null))
      // Focus the first element
      const ref = inputRefs[0].current?.focus()
      if (isInputCleared) {
        isInputCleared(true)
      }
    }
  }, [clearInput])

  const onChangeHandler = async (value: string, index: number) => {
    const currentState = [...inputValues]
    currentState[index] = value
    setInputValues(currentState)
    lastValue.current = value
    lastRef.current = index
  }

  // skip on first render and then emit value updwards
  React.useEffect(() => {
    if (
      didMount.current &&
      !clearBoxesInput.current &&
      lastRef.current !== null &&
      lastValue.current !== null
    ) {
      onChangeValue(inputValues, lastValue.current, lastRef.current)
      const ref = inputRefs[lastRef.current + 1]
      if (lastValue.current !== '' && ref && ref.current) ref.current.focus()
    } else if (clearBoxesInput.current) {
      clearBoxesInput.current = false
    } else {
      didMount.current = true
    }
  }, [inputValues])

  return (
    <View
      style={
        displayColum
          ? [{ display: 'flex', flexDirection: 'column' }, parentViewStyle]
          : [{ display: 'flex', flexDirection: 'row' }, parentViewStyle]
      }
    >
      {inputRefs.map((element, index) => {
        return (
          <TextInput
            key={index}
            placeholder={`${placeholder && placeholder[index] ? placeholder[index] : ''}`}
            value={inputValues[index]}
            maxLength={1}
            keyboardType={keyboardType}
            style={textInputStyle}
            ref={inputRefs[index]}
            numberOfLines={1}
            onChangeText={(text) => onChangeHandler(text, index)}
          />
        )
      })}
    </View>
  )
}

export default NextTextInput
