import React from 'react';

class PaginationButtons extends React.Component {

    _handlePageNumberChange: (event) => void;

    constructor(props) {
        super(props);

        this._handlePageNumberChange = this._handlePageNumberChange.bind(this);
    }

    _handlePageNumberChange(event) {
        const pageNumber = parseInt(event.target.getAttribute('data-index-number'), 10);
        console.log('pageNumber:: ', pageNumber);
        if (pageNumber !== this.props.currentPage) {
            this.props.onChangePageNumber(pageNumber);
        }
    }

    _renderPageNumbers() {
        let items = [];

        // display 4 behind and 4 in front
        let min = this.props.currentPage - 4;
        if (min < 0) {
            min = 0;
        }

        let max = this.props.currentPage + 4;
        if (max > this.props.totalNumPages) {
            max = this.props.totalNumPages;
        }

        for (var i = min; i < max; i++) {
            items.push(
                <span key={'pagination-button-'+ i} data-index-number={i}>{i}</span>
            );
        }

        return items;
    }

    _renderPreviousButton() {
        if (this.props.currentPage === 0) {
            return null;
        }

        return (
            <span data-index-number={this.props.currentPage - 1}>
                {'Prev'}
            </span>
        );
    }

    _renderNextButton() {
        if (this.props.totalNumPages === 0) {
            return null;
        }
        return (
            <span data-index-number={this.props.currentPage + 1}>
                {'Next'}
            </span>
        );
    }

    render() {
        return (
            <div onClick={this._handlePageNumberChange}>
                <p>{' total num pages: '}{this.props.totalNumPages}</p>
                <p>{' current page num: '}{this.props.currentPage}</p>
                {this._renderPreviousButton()}
                {this._renderPageNumbers()}
                {this._renderNextButton()}
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