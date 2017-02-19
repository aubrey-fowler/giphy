import React from 'react';

class PaginationButtons extends React.Component {

    _handlePageNumberChange: (event) => void;

    constructor(props) {
        super(props);

        this._handlePageNumberChange = this._handlePageNumberChange.bind(this);
    }

    _handlePageNumberChange(event) {
        console.log(event.target);
        const pageNumber = parseInt(event.target.getAttribute('data-index-number'), 10);
        console.log('pageNumber:: ', pageNumber);
        if (pageNumber !== this.props.currentPage) {
            this.props.onChangePageNumber(pageNumber);
        }
    }

    _renderPageNumbers() {
        let items = [];

        for (var i = 0; i < this.props.totalNumPages; i++) {
            items.push(
                <div key={'pagination-button-'+ i} data-index-number={i}>{i}</div>
            );
        }

        return items;
    }

    render() {
        return (
            <div onClick={this._handlePageNumberChange}>
                {' total num pages: '}{this.props.totalNumPages}
                {' current page num: '}{this.props.currentPage}
                {this._renderPageNumbers()}
            </div>
        );
    }
}

PaginationButtons.propTypes = {
    totalNumPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    onChangePageNumber: React.PropTypes.func.isRequired
};

export default PaginationButtons;