import React, {Component} from 'react';



class TableItem extends Component {
    // constructor(props){
    //     super(props);
    // }

    onUpdateStatus = () => {
        // console.log(this.props.task.id)
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id)
    }

    render(){

        var {task, index} = this.props;
        
        return (        
                      
                                        
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>
                    <span 
                        className={ task.status === true ? 'label label-danger' : 'label label-success' }
                        onClick={this.onUpdateStatus}
                        > 
                        { task.status === true ? 'Kích hoạt' : 'Ẩn'} 
                    </span>
                </td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={this.onUpdate}
                    >
                        <span className="fas fa-pen mr-5" ></span> Sửa
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.onDelete}
                        >
                        <span className="fas fa-trash-alt mr-5"></span> Xóa
                    </button>
                </td>
            </tr> 
                    
    );
}
}

export default TableItem;