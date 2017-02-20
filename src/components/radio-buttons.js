import React from 'react';

class RadioButtons extends React.Component {

    _handleOptionClick: (event) => void;

    constructor(props) {
        super(props);

        this._handleOptionClick = this._handleOptionClick.bind(this);
    }

    _handleOptionClick(event) {
        const value = event.target.getAttribute('value');
        if (value != null) {
            this.props.onChange(value);
        }
    }

    _renderRadioSelections() {
        let items = [];

        for (var i = 0; i < this.props.options.length; i++) {
            const value = this.props.options[i];
            items.push(
                <span 
                    key={'radio-button-'+ i} 
                    className={this.props.selected === value ? 'selected-pagination-button' : 'pagination-button'} 
                    value={value}>
                        {value}
                </span>
            );
        }

        return items;
    }

    render() {
        return (
            <div className="pagination-buttons" onClick={this._handleOptionClick}>
                {this._renderRadioSelections()}
                <p>
                    {this.props.numSearchResults}{' GIFs found for '}{this.props.selected}
                </p>
            </div>
        );
    }
}

RadioButtons.propTypes = {
    numSearchResults: React.PropTypes.number.isRequired,
    options: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default RadioButtons;