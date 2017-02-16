import React from 'react';
import Pagination from './components/pagination';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.entries = {
            '0': [
                'l0HlRNXAPC0FBlKUM', 
                'l41m0CPz6UCnaUmxG',
                'kwAi4WrChkSfm',
                '3oz8xXS6gDYSNbqme4',
                'l0ExvA6hnrdzQ5zoI'
            ]
        };
    }

    render() {
        return (
            <div>
                <Pagination 
                    data={this.entries} 
                    onClick={function(id){console.log('id::: ', id);}} 
                    currentPage={0} 
                    totalNumPages={1} /> 
            </div>
        );
    }
}

export default App;