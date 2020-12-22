import React, {Component} from 'react';
import TableItem from './TableItem';



class Table extends Component {
    constructor(props){
        super(props);
            this.state = {
                filterName : '',
                filtrtStatus : -1  // all : -a, active : 1, deactive : 0    
            }  
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === "filterName" ? value : this.state.filterName,
            name === "filterStatus" ? value : this.state.filterStatus
        )
        this.setState ({
            [name] : value
        })
    }

    render(){

        var {tasks} = this.props; // var tasks = this.props.tasks
        // var task = tasks.split(',')
        var elmTasks = tasks.map((task, index) => {
            return <TableItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                        onUpdateStatus={this.props.onUpdateStatus} 
                        onDelete={this.props.onDelete}
                        onUpdate={this.props.onUpdate}
                    />  
        })
        
        

        return (        
            
                            
                <div className="text-center col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                                            
                            <table className="table table-bordered table-hover mt-15">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Trạng Thái</th>
                                    <th>Hoạt động</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="text"
                                            name="filterName"
                                            value={this.filterName}
                                            onChange={this.onChange}
                                        />
                                    </td>
                                    <td>
                                        <select name="" id="input" 
                                            className="form-control" 
                                            name="filterStatus"
                                            value={this.filterStatus}
                                            onChange={this.onChange}
                                        >
                                            <option value="0">Tất cả</option>
                                            <option value="1">Ẩn</option>
                                            <option value="2">Kích hoạt</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>

                                      {elmTasks}         
                                
                                </tbody>
                            </table>
                            </div>                   
            
              
        
    );
}
}

export default Table;