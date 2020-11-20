import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import ErrorValidation from '../AddFolderForm/ErrorValidation';
import SelectWhichFolder from './SelectWhichFolder';
import PropTypes from 'prop-types';
import './AddNoteForm.css';

class AddNoteForm extends Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            modified: '',
            folderId: '',
            name: '',
            touched: false
        }
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };


    handleStateFields = (key, value) => {
        let modified = new Date().toISOString();

        if (key === 'name'){
            this.setState({
                touched: true
            })
        }
        console.log(key, value)


        this.setState({
            [key]: value,
            modified
        })
    }

    validateNoteName = () => {
        let name = this.state.name.trim();
        if (name === ''){
            return "Please enter a name for this note";
        }
    }

    handleAddNote = (event) => {
        event.preventDefault();
        const { touched, ...rest} = this.state
        console.log(rest)
        let newNote = JSON.stringify(rest);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newNote
        }

        fetch('http://localhost:9090/notes', options)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Note was not added successfully. Please try again.')
                } else return response.json()
            })
            .then(responseJson => {
                this.context.handleAddNote(responseJson)
                console.log(responseJson)
            })
            .then(() => this.props.history.push('/'))
            .catch(error => console.log(error.message))
    }

    render() { 

        const errorName = this.validateNoteName();

        return ( 
            <form className="note-form"
                onSubmit={(event) => {
                    this.handleAddNote(event)
                }}>

                <fieldset>

                    <legend>Note Details</legend>

                    <label htmlFor="new-note">Note Name:</label>
                    <input type="text" id="new-note"
                        onChange={(event) => {
                            this.handleStateFields('name', event.target.value);
                        }} placeholder="Example: Kangaroos" required></input>
                    {this.state.touched && (
                        <ErrorValidation message={errorName} />
                    )}

                    <label htmlFor='note-folder'>Folder:</label>
                    <SelectWhichFolder handleChange={this.handleStateFields}/>

                    <label htmlFor='note-description'>Note Description:</label>
                    <textarea
                        onChange={(event) =>
                            this.handleStateFields('content', event.target.value)}
                        placeholder='Example: Kangaroos have the greatest vertical leaping ability of any animal'>
                    </textarea>

                    <button type='submit'
                        enabled={this.validateNoteName()}>Submit
                    </button>

                </fieldset>

            </form>

         );
    }
}
 
export default AddNoteForm;