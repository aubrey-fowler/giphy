import React from 'react';

//clickable giphy still image
class GiphyStillImage extends React.Component {

    _handleClick: () => void;

    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <img 
                src={`http://media1.giphy.com/media/${this.props.id}/200w_s.gif`} 
                alt="https://giphy.com/" 
                onClick={this._handleClick} />
        );
    }
}

GiphyStillImage.propTypes = {
    id: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default GiphyStillImage;