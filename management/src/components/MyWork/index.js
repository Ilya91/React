import React, { Component } from 'react'
import './Content.css'
import TaskList from './TaskList'
import { connect } from 'react-redux'
import { addNewTask } from '../../AC'

class MyWork extends Component {
    state = {
        tasks: 0,
        taskInputOpen: false,
        name: '',
        isActive: true
    }

    handleClick = () => {
        this.setState({
            taskInputOpen: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            taskInputOpen: false,
            name: ''
        })
    }

    handleChange = (e) =>{
        this.setState({name: e.target.value});
    }

    handleClickTask = (value) => {
        this.setState({
            isActive: value
        })
    }

    render(){
        const { taskInputOpen, name, isActive } = this.state
        const { tasks } = this.props
        return(
            <div className="content-wrapper">
                <section className="content">
                    <div className="row">
                        <section className={ isActive ? "col-lg-8" : "col-lg-6"}>
                            <div className="box box-primary">
                                <div className="box-header">
                                    <i className="ion ion-clipboard"></i>
                                    <h3 className="box-title">НА СЕГОДНЯ</h3>
                                    <span className="myWorkData"> Окт 9</span>
                                    <span className="label label-info pull-right">0</span>
                                </div>
                                <div className="box-body">
                                    <div className="taskPanel">
                                        { taskInputOpen ?
                                            <form onSubmit={this.handleSubmit}>
                                                <input type="text" className="form-control" onChange={this.handleChange} value={name}/>
                                            </form> :
                                            <button onClick={this.handleClick} type="button" className="btn btn-default pull-left">
                                                <i className="fa fa-plus"></i> Новая задача
                                            </button>}

                                    </div>
                                </div>
                                <ul className="taskList">
                                    <TaskList onClick={this.handleClickTask} tasks={tasks}/>
                                </ul>

                            </div>
                        </section>
                        <section className={ isActive ? "col-lg-4" : "col-lg-6"}>
                            <div className="box box-primary">
                                <div className="box-header">
                                    <i className="ion ion-clipboard"></i>
                                    <h3 className="box-title">НА ЭТУ НЕДЕЛЮ</h3>
                                    <span className="myWorkData"> Окт 9</span>
                                    <span className="label label-info pull-right">0</span>
                                </div>
                                <div className="box-header">
                                    <i className="ion ion-clipboard"></i>
                                    <h3 className="box-title">НА СЛЕД. НЕДЕЛЮ</h3>
                                    <span className="myWorkData"> Окт 9</span>
                                    <span className="label label-info pull-right">0</span>
                                </div>
                                <div className="box-header">
                                    <i className="ion ion-clipboard"></i>
                                    <h3 className="box-title">ПОЗЖЕ</h3>
                                    <span className="myWorkData"> Окт 9</span>
                                    <span className="label label-info pull-right">0</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}
export default connect((state) => ({
    tasks: state.tasks
}), { addNewTask })(MyWork)