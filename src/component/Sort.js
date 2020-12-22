import React, {Component} from 'react';



class Sort extends Component {
    

    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue)
    }

    render(){
        return (
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Sắp Xếp
                            <span className="fas fa-caret-square-down ml-5"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={ () => this.onClick('name', -1)}>
                                <a role="button" className="sort-selected">
                                    <span className="fas fa-sort-alpha-up pr-5">
                                        Tên A-Z
                                    </span>
                                </a>
                            </li>
                            <li onClick={ () => this.onClick('name', 1)}>
                                <a role="button" className="sort-selected">
                                    <span className="fas fa-sort-alpha-up-alt pr-5">
                                        Tên Z-A
                                    </span>
                                </a>
                            </li>
                            <li onClick={ () => this.onClick('status', -1)}>
                                <a role="button" className="sort-selected">
                                    <span className="fas fa-sort-alpha-up-alt pr-5">
                                        Trạng Thái Kích Hoạt
                                    </span>
                                </a>
                            </li>
                            <li onClick={ () => this.onClick('status', 1)}>
                                <a role="button" className="sort-selected">
                                    <span className="fas fa-sort-alpha-up-alt pr-5">
                                    Trạng Thái Ẩn
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
    );
}
}

export default Sort;