import React from 'react';
import { SkyLightStateless } from 'react-skylight';

const myDialogStyles = {
    height: 'auto',
    maxHeight: '590px',
    marginTop: '-300px',
    textAlign: 'center',
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