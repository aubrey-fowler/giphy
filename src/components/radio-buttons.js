import React from 'react';

class RadioButtons extends React.Component {

    _handleOptionClick: (event) => void;

    constructor(props) {
        super(props);

        this._handleOptionClick = this._handleOptionClick.bind(this);
    }

    _handleOptionClick(event) {
        console.log('_handleOptionClick: ', event.target.value);
        this.props.onChange(event.target.value);
    }

    _renderRadioSelections() {
        let items = [];

        for (var i = 0; i < this.props.options.length; i++) {
            const value = this.props.options[i];
            items.push(
                <label key={'radio-button-' + value}>
                    <input 
                        type="radio" 
                        checked={this.props.selected === value} 
                        onChange={this._handleOptionClick} 
                        value={value} /> 
                    {value}
                </label>
            );
        }

        return items;
    }

    render() {
        return (
            <div>
                {this._renderRadioSelections()}
            </div>
        );
    }
}

RadioButtons.propTypes = {
    options: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default RadioButtons;