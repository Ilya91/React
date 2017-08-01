import React, { Component } from 'react'

import ArticleList from './ArticleList'
import UserForm from './UserForm'
import { articles } from '../fixtures'

/* Filters */
import Filters from './Filters'

/* Date Picker */
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

/* DayPickerInput */
import DayPickerInput from 'react-day-picker/DayPickerInput';



const modifiers = {
    even: day => day.getDate() % 2 === 0,
    odd: day => day.getDate() % 2 !== 0,
    first: day => day.getDate() === 1,
};

class App extends Component{
    state = {
        selection: null,
        selectedDay: new Date(),
        from: null,
        to: null
    }

    handleDayClick = day => {
        this.setState({
            selectedDay: day,
        });
    }
    render(){
        return(
        <div>
            <DayPicker onDayClick={this.handleDayClick}
                       selectedDays={this.state.selectedDay}
                       modifiers={modifiers}
            />
            <UserForm/>

            <DayPickerInput />
            <ArticleList articles = { articles }/>
            <Filters/>
        </div>
        )
    }
}
export default App