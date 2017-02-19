import React from 'react';
import PaginationPage from './pagination-page';
import PaginationButtons from './pagination-buttons';
import RadioButtons from './radio-buttons';

const options = ['Puppies', 'Kittens'];

class Pagination extends React.Component {
    render() {
        return (
            <div>
                <RadioButtons 
                    options={options} 
                    selected={this.props.currentSearchFilter}
                    onChange={this.props.onChangeSearchFilter} />
                <PaginationPage 
                    items={this.props.data[this.props.currentPage.toString()]} 
                    onClick={this.props.onClick} />
                <PaginationButtons 
                    totalNumPages={this.props.totalNumPages} 
                    currentPage={this.props.currentPage}
                    onChangePageNumber={this.props.onChangePageNumber} />
            </div>
        );
    }
}

Pagination.propTypes = {
    totalNumPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onChangePageNumber: React.PropTypes.func.isRequired,
    onChangeSearchFilter: React.PropTypes.func.isRequired,
    currentSearchFilter: React.PropTypes.string.isRequired
};

export default Pagination;