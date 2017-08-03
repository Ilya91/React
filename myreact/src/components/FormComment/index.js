import React, { Component } from 'react'
import './FormComment.css'

class FormComment extends Component{

    handleSubmit(event) {
        event.preventDefault();
    }

    state = {
        user: '',
        text: ''
    }


    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>
                        Name:
                        <input type="text" value = {this.state.user}
                               onChange = {this.handleChange('user')}
                               className = {this.getClassName('user')}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Comment:
                        <textarea cols="30" rows="10" value = {this.state.text}
                                  onChange = {this.handleChange('text')}
                                  className = {this.getClassName('text')}
                        ></textarea>
                    </label>
                </p>
                <input type="submit" value="Submit" />
            </form>
        )
    }

    getClassName = type => this.state[type].length && this.state[type].length < limits[type].min
        ? 'form-input__error' : ''

    handleChange = type => ev => {
        const {value} = ev.target
        if (value.length > limits[type].max) return
        this.setState({
            [type]: value
        })
    }
}

const limits = {
    user: {
        min: 5,
        max: 15
    },
    text: {
        min: 20,
        max: 50
    }
}

export default FormComment