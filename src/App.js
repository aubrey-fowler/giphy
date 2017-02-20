import React from 'react';
import Pagination from './components/pagination';
import { connect } from 'react-redux';
import { setPageNumber, setSearchFilter, requestGifs, setModalVisibility } from '../src/actions/actions';

class App extends React.Component {

    componentDidMount() {
        this.props.requestGifs('Puppies', 75, 0);
        this.props.requestGifs('Kittens', 75, 0);
    }

    render() {
        if (Object.getOwnPropertyNames(this.props.data).length === 0) {
            return null;
        }

        return (
            <Pagination 
                data={this.props.data} 
                onClick={this.props.setModalVisibility}
                isModalVisible={this.props.isModalVisible} 
                modalVideoId={this.props.modalVideoId}
                currentPage={this.props.currentPage} 
                numSearchResults={this.props.numSearchResults}
                onChangePageNumber={this.props.setPageNumber}
                onChangeSearchFilter={this.props.setSearchFilter}
                currentSearchFilter={this.props.currentSearchFilter} />                 
        );
    }
}

const mapStateToProps = (store) => {
    const currentSearchFilter = store.currentSearchFilter;
    const searchFilterData = store.data[currentSearchFilter];

    return { 
        currentPage: store.currentPage,
        numSearchResults: store.resultsPerSearchFilter[currentSearchFilter],
        data: searchFilterData,
        currentSearchFilter: currentSearchFilter,
        isModalVisible: store.isModalVisible,
        modalVideoId: store.modalVideoId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPageNumber: (pageNumber) => {
            dispatch(setPageNumber(pageNumber));
        },
        setSearchFilter: (searchFilter) => {
            dispatch(setSearchFilter(searchFilter));
        },
        requestGifs: (searchFilter, limit, offset) => {
            dispatch(requestGifs(searchFilter, limit, offset));
        },
        setModalVisibility: (id) => {
            dispatch(setModalVisibility(id));
        }
    };
}

App.propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    numSearchResults: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    setSearchFilter: React.PropTypes.func.isRequired,
    setPageNumber: React.PropTypes.func.isRequired,
    isModalVisible: React.PropTypes.bool.isRequired,
    modalVideoId: React.PropTypes.string
};

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);