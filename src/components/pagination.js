import React from 'react';
import PaginationPage from './pagination-page';
import PaginationButtons from './pagination-buttons';
import RadioButtons from './radio-buttons';

const options = ['Puppies', 'Kittens'];

class Pagination extends React.Component {
    _getTotalNumPages() {
        return Math.ceil(this.props.numSearchResults / 15);
    }

    render() {
        return (
            <div>
                <RadioButtons
                    numSearchResults={this.props.numSearchResults} 
                    options={options} 
                    selected={this.props.currentSearchFilter}
                    onChange={this.props.onChangeSearchFilter} />
                <PaginationPage 
                    items={this.props.data[this.props.currentPage.toString()]} 
                    onClick={this.props.onClick} />
                <PaginationButtons 
                    totalNumPages={this._getTotalNumPages()} 
                    currentPage={this.props.currentPage}
                    onChangePageNumber={this.props.onChangePageNumber} />
            </div>
        );
    }
}

Pagination.propTypes = {
    numSearchResults: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onChangePageNumber: React.PropTypes.func.isRequired,
    onChangeSearchFilter: React.PropTypes.func.isRequired,
    currentSearchFilter: React.PropTypes.string.isRequired
};

export default Pagination;