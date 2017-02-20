import React from 'react';
import { SkyLightStateless } from 'react-skylight';

const myDialogStyles = {
    width: '50%',
    height: '590px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-300px',
    marginLeft: '-25%',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '2px',
    zIndex: '100',
    padding: '15px',
    boxShadow: 'rgba(0, 0, 0, 0.137255) 0px 0px 4px, rgba(0, 0, 0, 0.278431) 0px 4px 8px',
    display: 'block',
    overflowY: 'scroll'
};

class StatelessModal extends React.Component {
    render() {
        return (
            <SkyLightStateless
                dialogStyles={myDialogStyles}
                isVisible={this.props.isVisible}
                onCloseClicked={this.props.onCloseModal}>
                <img src={`https://media.giphy.com/media/${this.props.id}/giphy.gif`} alt="Giphy" />
            </SkyLightStateless>
        );
    }
}

StatelessModal.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    onCloseModal: React.PropTypes.func.isRequired,
    id: React.PropTypes.string
};

export default StatelessModal;