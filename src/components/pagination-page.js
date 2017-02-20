import React from 'react';
import GiphyStillImage from './giphy-still-image';
import { SpringGrid, measureItems, layout, makeResponsive } from 'react-stonecutter';
import '../index.css';

const { pinterest } = layout;

//page showing 15 giphy still images
class PaginationPage extends React.Component {
    render() {
        const Grid = makeResponsive(measureItems(SpringGrid, {measureImages: true}), {
            maxWidth: 1920
        });
        return (
            <Grid
                component="ul"
                layout={pinterest}
                gutterWidth={5}
                gutterHeight={5}
                columnWidth={200}
                columns={4}>
                  {this.props.items.map((photo) => (
                    <li key={photo}>
                      <GiphyStillImage id={photo} onClick={this.props.onClick} />
                    </li>
                  ))}
            </Grid>
        );
    }
}

PaginationPage.propTypes = {
    items: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default PaginationPage;