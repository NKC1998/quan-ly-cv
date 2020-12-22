import React, {Component} from 'react';
import './App.css';
import Title from './component/Title';
import Content from './component/Content'
import Table from './component/Table';
import Form from './component/Form';
import Sort from './component/Sort';
import {filter, findIndex} from 'lodash';
import Demo from './tranning/Demo';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [], // id: duy nhất, name, trạng thái
            isDisplayForm : false,
            taskEditting : null,
            filter : {
                name : '',
                status : 0
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1
        }
        
    }

    componentDidMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }


    onToggleForm = () => { 
        if(this.state.isDisplayForm && this.state.taskEditting !== null){
            this.setState ({
                isDisplayForm : true,
                taskEditting : null 
            })
        }else{
            this.setState ({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditting : null //khi đang sửa
            })
        }
       
    } // bắt sự kiện của nút Thêm Công Việc

    onExitForm = () => {
        this.setState ({
            isDisplayForm : false
        })
    }

    onShowForm = () => {
        this.setState ({
            isDisplayForm : true
        })
    }

    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4()
    }

    onSubmit = (data) => {
        var {tasks} = this.state; // this.state.tasks
        if(data.id === ''){
            data.id = this.generateID(); // task
            tasks.push(data)
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
       
        this.setState ({
            tasks : tasks 
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        // var index = this.findIndex(id);
        var index = findIndex(tasks, (tasks) => {return tasks.id === id})
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState ({
                tasks : tasks
            });
        } 
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((tasks, index) => {
            if(tasks.id === id){
                result = index;
            }
        })
            return result;
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState ({
                tasks : tasks
            });
        } 
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onExitForm();
    }


    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditting = tasks[index]
        this.setState({
            taskEditting : taskEditting
        })
        this.onShowForm()
    }

    onFilter = (filterName, filterStatus) => { // Lọc dữ liệu
        filterStatus = parseInt(filterStatus, 10);
        this.setState ({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        })
    }

    onSeach = (keyword) => {
        this.setState({
            keyword : keyword
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        })
    }

    render(){

        var {tasks, isDisplayForm, taskEditting, filter, keyword, sortBy, sortValue} = this.state; // var tasks = this.state.tasks
        if(filter){ // Lọc dữ liệu
            if(filter.name){
                // tasks = tasks.filter((task) => {
                //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
                // })
                tasks = filter(tasks, (task)=>{return task.name.toLowerCase().indexOf(filter.name) !== -1})
            }
            tasks = tasks.filter((task) => {
                if(filter.status === 0){
                    return task;
                }else{
                    return task.status === (filter.status === 1 ? false : true)
                }
            });
        }
        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }

        if(sortBy === 'name'){
            tasks.sort((a, b) =>{
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            })
        }else{
            tasks.sort((a, b) =>{
                if(a.status > b.status) return sortValue;
                else if(a.status < b.status) return -sortValue;
                else return 0;
            })
        }

        var elmTaskForm = isDisplayForm ? 
            <Form 
                onExitForm={this.onExitForm}
                onSubmit={this.onSubmit}
                task={taskEditting}
            /> 
            : ''

        return (        
        <div className="container">
            <Title />
            <div className="row">
                
                <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                    {elmTaskForm}
                                     
                </div> 
                
                <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={this.onToggleForm}
                        >
                        <span className="fas fa-plus"> </span>
                          Thêm Công Việc
                    </button>
                    <div className="row">
                        <Content 
                            onSeach={this.onSeach}
                        />
                        <Sort 
                            onSort={this.onSort}
                            sortBy={sortBy} //truyền lại cho Sort
                            sortValue={sortValue}
                        />
                        <Table tasks = {tasks} 
                        onUpdateStatus={this.onUpdateStatus}
                        onDelete={this.onDelete}
                        onUpdate={this.onUpdate}
                        onFilter={this.onFilter}
                        />
                    </div>
                        
                        
                        
                        
                   
                    
                </div>
                
            </div>
                       
           
        </div>
        
    );
}
}

export default App;
