import React from 'react';
import ApiContext from '../ApiContext';
import ErrorValidation from './ErrorValidation';
import './AddFolderForm.css';
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component {

  static contextType = ApiContext;

  constructor(props) {
      super(props);
      this.state = {
          name: '',
          added: false
      }
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  handleAddFolder = (event) => {
      event.preventDefault();

      let newFolder = JSON.stringify(this.state)

      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: newFolder
      }

      fetch('http://localhost:9090/folders', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Folder was not added successfully. Please try again.')
            } else return response.json()
        })
        .then(responseJson => {
            this.context.handleAddFolder(responseJson);
            console.log(responseJson)
        })
        .then(() => this.props.history.push('/'))
        .catch(error => console.log(error.message))
  }

  updateFolderInput = (value) => {
      this.setState({
          name: value,
          added: true
      })
  }

  validateFolderName = () => {
      let name = this.state.name.trim();
      if (name === ''){
          return "Please enter a folder name"
      }
  }



  render() {
    const { name } = this.state;
    const errorName = this.validateFolderName();
    return (
        <>
            <form className="folder-form"
                onSubmit={(event) => {
                    this.handleAddFolder(event);
                }}>
                
                <fieldset>
                    <legend htmlFor="folder-details">Enter Folder Details</legend>
                    <label htmlFor='new-folder'>Folder Name:</label>
                    <input type='text' id='new-folder' placeholder="Example: The Best Folder" defaultValue={name}
                        onChange={(event) => this.updateFolderInput(event.target.value)} required />
                    {this.state.touched && (
                        <ErrorValidation message={errorName} />
                    )}
                    <button type='submit'
                    enabled = {this.validateFolderName()}>Submit</button>
                </fieldset>    
    
            </form>
        </>
    )
  }
}

