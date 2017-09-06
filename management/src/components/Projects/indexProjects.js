import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import '../MyWork/Content.css'
import './style.css'
import ListOfTasks from './ListOfTasks'
import FormTask from '../MyWork/FormTask'
import Moment from 'react-moment';
import moment from 'moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Task from '../MyWork/Task'
import { connect } from 'react-redux'


class Projects extends Component {
    state = { tabIndex: 0 }

    render(){
        const startThisWeek = moment().startOf('isoWeek')
        const endThisWeek = moment().endOf('isoWeek')
        const startNextWeek = moment().add(1, 'weeks').startOf('isoWeek')
        const endNextWeek = moment().add(1, 'weeks').endOf('isoWeek')
        const afterNextWeek = moment().add(1, 'weeks').endOf('isoWeek')
        const { tabIndex } = this.state
        const { activeTask, tasks } = this.props
        return(
            <div className="content-wrapper">
                <section className="content">
                    <div className="row">
                        <section className={ tabIndex || !activeTask ? "col-lg-12" : "col-lg-6"}>
                            <div className="box box-primary projects">
                                <div className="box-body">
                                    <h3 className="box-title">Проекты</h3>
                                </div>
                                <Tabs selectedIndex={tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                    <TabList>
                                        <Tab>СПИСОК</Tab>
                                        <Tab>ТАБЛИЦА</Tab>
                                        <Tab>ВРЕМЕННАЯ ШКАЛА</Tab>
                                    </TabList>
                                        <div className="project-filters">
                                            <ul>
                                                <li>СТАТУС: Любой</li>
                                                <li>ИСПОЛНИТЕЛЬ: Все</li>
                                            </ul>
                                        </div>
                                    <TabPanel>
                                        <FormTask/>
                                        <ListOfTasks/>
                                    </TabPanel>
                                    <TabPanel>
                                        table
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>временная шакала</h2>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </section>
                        { (activeTask && !tabIndex) ? tasks.filter((task) =>
                            activeTask === task.id
                        ).map((task) => <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            date={task.date}
                            description={task.description ? task.description : ''}
                            complete={task.complete ? task.complete : ''}
                            status={task.status}
                        />) : null }
                    </div>
                </section>
            </div>
        )
    }
}
export default connect((state) => ({
    tasks: state.tasks,
    projects: state.projects,
    activeTask: state.activeTask
}), null)(Projects)