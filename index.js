import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { View, TextInput, StyleSheet } from "react-native"

class NextTextInput extends PureComponent { 
  constructor(props) {
    super(props)
    const noOfRefs = this.props.noOfTextInput 
    this.inputRefs =  Array(noOfRefs)
    .fill(0)
    .map(_ => React.createRef())
  }

  state = {
    inputValue: Array(this.props.noOfTextInput).fill(null)
  }

  onChangeHandler = async (value, index) => {
    const { inputValue } = this.state
		inputValue[index] = value
    await this.setState({inputValue: [...inputValue]})
    this.props.onChangeValue(this.state.inputValue[index])
		const ref = this.inputRefs[index + 1]
		if (value && ref && ref.current) ref.current.focus()
  }
  
  render () {
    return (
      <View style={this.props.displayColum ? [{display: 'flex', flexDirection: 'column'}, this.props.parentViewStyle] : [{display: 'flex', flexDirection: 'row'}, this.props.parentViewStyle]}> 
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
            onChangeText={(text) => this.onChangeHandler(text, index)}
          />
        ) 
        )}
      </View>
    ) 
  }
}

NextTextInput.propTypes = {
  noOfTextInput: PropTypes.number.isRequired,
  placeholder: PropTypes.array,
  displayColum: PropTypes.bool,
  keyboardType: PropTypes.string,
  textInputStyle: PropTypes.object,
  onChangeValue: PropTypes.func.isRequired, 
  parentViewStyle: PropTypes.object
}

NextTextInput.defaultProps = {
  displayColum: false, 
  keyboardType: 'numeric',
  placeholder: []

}

export default NextTextInput
