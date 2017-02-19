import React from 'react';
import Pagination from './components/pagination';
import { connect } from 'react-redux';

import { 
    setPageNumber, 
    setSearchFilter, 
    //requestInitialData 
    requestGifs
} from '../src/actions/actions';

class App extends React.Component {

    componentDidMount() {
        this.props.requestGifs('Puppies', 75, 0);
        this.props.requestGifs('Kittens', 75, 0);
    }

    render() {
        //console.log('App data:::', this.props.data);
        return (
            <Pagination 
                data={this.props.data} 
                onClick={function(id){console.log('id::: ', id);}} 
                currentPage={this.props.currentPage} 
                totalNumPages={this.props.totalNumPages}
                onChangePageNumber={this.props.setPageNumber}
                onChangeSearchFilter={this.props.setSearchFilter}
                currentSearchFilter={this.props.currentSearchFilter} /> 
        );
    }
}

const mapStateToProps = (store) => {
    // console.log('store:: ', store.toJS());
    // const currentSearchFilter = store.get('currentSearchFilter');
    // console.log('data:: ', store.get('data'));
    // const searchFilterData = store.getIn(['data', currentSearchFilter]);
    // console.log('searchFilterData:: ', searchFilterData);

    //console.log('store:: ', store.toJS());
    const currentSearchFilter = store.currentSearchFilter;
    //console.log('data:: ', store.data);
    const searchFilterData = store.data[currentSearchFilter];
    //console.log('searchFilterData:: ', searchFilterData);

    return { 
        currentPage: store.currentPage,
        totalNumPages: Object.keys(searchFilterData).length,
        data: searchFilterData,
        currentSearchFilter: currentSearchFilter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPageNumber: (pageNumber) => {
            dispatch(setPageNumber(pageNumber))
        },
        setSearchFilter: (searchFilter) => {
            dispatch(setSearchFilter(searchFilter))
        },
        // requestInitialData: () => {
        //     dispatch(requestInitialData())
        // }
        requestGifs: (searchFilter, limit, offset) => {
            dispatch(requestGifs(searchFilter, limit, offset))
        }
    };
}

App.propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    totalNumPages: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    //data: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    setSearchFilter: React.PropTypes.func.isRequired,
    setPageNumber: React.PropTypes.func.isRequired
};

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);