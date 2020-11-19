import React from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';

class SelectWhichFolder extends React.Component {
    static contextType = ApiContext;

    static propTypes = {
        handleChange: PropTypes.func.isRequired
    };

    render() {
        const {handleChange} = this.props;

        const select = this.context.folders.map((folder, idx) => {
            return (
                <option key={idx} value={folder.id}>
                    {folder.name}
                </option>
            )
        })
        
        return (
            <select onChange={(event) => handleChange('folderId', event.target.value)} required>
                {select}
            </select>
        )
    }
}

export default SelectWhichFolder;