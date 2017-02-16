import React from 'react';
import GiphyStillImage from './giphy-still-image';

//page showing 15 giphy still images
class PaginationPage extends React.Component {

    _renderArrayOfGiphyStillImages() {
        let images = [];

        for (var i = 0; i < this.props.items.length; i++) {
            images.push(
                <GiphyStillImage 
                    key={this.props.items[i]}
                    id={this.props.items[i]}
                    onClick={this.props.onClick} />
            );
        }

        return images;
    }

    render() {
        return (
            <div>
                {this._renderArrayOfGiphyStillImages()}
            </div>
        );
    }
}

PaginationPage.propTypes = {
    items: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default PaginationPage;