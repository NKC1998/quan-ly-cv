import React, {Component} from 'react';



class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }

    }


    onExitForm = () => {
        this.props.onExitForm()
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false
        };
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        // Clear && exitForm
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState ({
            name : '',
            status : false
        })
    }

    componentDidMount() {
        if(this.props.task){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            })
        } else if(!nextProps.task){
            this.setState({
                id : '',
                name : '',
                status : false
            })
        }
    }

    render(){

        var {id} = this.state;

        return (        
            <div className="panel-warning "> 
            <div className="panel-heading"> 
                <h3 className="panel panel-title">
                    {id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
                    <span 
                        className="fas fa-times-circle text-right"
                        onClick={this.onExitForm}
                    >
                    </span>
                </h3>
            </div>
        
                            
            <div className="panel-body khung-addjob">
               <form action=""
                    onSubmit={this.onSubmit}
                    >
                    <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text"  
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                    </div>
                    <label>Trạng Thái :</label> <br/>
                    <select 
                            className="form-group selec"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                    </select> <br/>
                    <div className="text-center">
                            <button type="submit" className="btn btn-warning btn-sm">Lưu Lại</button>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-sm"
                                onClick={this.onClear}
                                >
                                Hủy Bỏ
                            </button>
                    </div>
               </form> 
            </div> 
        </div>
    );
}
}

export default Content;