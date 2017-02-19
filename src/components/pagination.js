import React from 'react';
import PaginationPage from './pagination-page';
import PaginationButtons from './pagination-buttons';
import RadioButtons from './radio-buttons';

const options = ['Puppies', 'Kittens'];
const IMAGES_PER_PAGE = 15;

class Pagination extends React.Component {

    _getTotalNumPages() {
        return Math.ceil(this.props.numSearchResults / IMAGES_PER_PAGE);
    }

    render() {
        return (
            <div>
                <RadioButtons
                    numSearchResults={this.props.numSearchResults} 
                    options={options} 
                    selected={this.props.currentSearchFilter}
                    onChange={this.props.onChangeSearchFilter} />
                <PaginationButtons 
                    totalNumPages={this._getTotalNumPages()} 
                    currentPage={this.props.currentPage}
                    onChangePageNumber={this.props.onChangePageNumber} />
                <PaginationPage 
                    items={this.props.data[this.props.currentPage.toString()]} 
                    onClick={this.props.onClick} />
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