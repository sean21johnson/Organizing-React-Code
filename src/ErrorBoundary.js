import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true}
    }

    static propTypes = {
        children : PropTypes.object.isRequired
    };
    
    render() { 
        const contents = this.state.hasError ?
        <div className="boundary-error"><h1>There was an error loading this page. Please refresh the page or try again later.</h1></div>
        : <>{this.props.children}</>
        return contents;
    }
}
 
export default ErrorBoundary;