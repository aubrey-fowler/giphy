import React from 'react';
import PaginationPage from './pagination-page';

//TODO: add change page number button
class Pagination extends React.Component {
    render() {
        return (
            <div>
                <PaginationPage items={this.props.data[this.props.currentPage.toString()]} onClick={this.props.onClick} />
                {' total num pages: '}{this.props.totalNumPages}
                {' current page num: '}{this.props.currentPage}
            </div>
        );
    }
}

Pagination.propTypes = {
    totalNumPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default Pagination;