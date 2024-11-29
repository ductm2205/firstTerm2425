import React, {Component} from 'react';
import axios from 'axios';
import StudentUpdate from "./StudentUpdate";

class StudentList extends Component {
    state = {
        students: [],
        selected: null
    };

    url = 'http://localhost:8080';

    componentDidMount() {
        this.fetchStudentList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reloadList !== prevProps.reloadList) {
            this.fetchStudentList();
        }
    }

    fetchStudentList = () => {
        axios
            .get(`${this.url}`)
            .then((res) => {
                this.setState({students: res.data});
            })
            .catch((err) => console.error('Error fetching student list:', err));
    };

    handleUpdate = (studentId) => {
        this.setState({selected: studentId});
    }

    handleCancelUpdate = () => {
        this.setState({selected: null});
    }

    handleDelete = (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            axios
                .delete(`${this.url}/delete/${studentId}`)
                .then(() => {
                    this.fetchStudentList(); // Refresh the list after deletion
                })
                .catch((err) => console.error('Error deleting student:', err));
        }
    };

    render() {


        if (this.state.selected) {
            // Render the StudentUpdate component if a student is selected for update
            return (
                <StudentUpdate
                    studentId={this.state.selected}
                    onCancel={this.handleCancelUpdate} // To go back to the list
                    reloadStudentList={this.fetchStudentList}
                />
            );
        }
        return (
            <div className="container text-center">
                <table className="table table-primary">
                    <thead>
                    <tr>
                        <th colSpan="4" className="h3 text-danger bg-warning">STUDENT LIST</th>
                    </tr>
                    <tr>
                        <th className="h5 text-success">Student ID</th>
                        <th className="h5 text-success">Student Name</th>
                        <th className="h5 text-success">Student Age</th>
                        <th className="h5 text-success">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>
                                <button className="btn btn-warning mx-1"
                                        onClick={() => this.handleUpdate(student.id)}
                                >
                                    Update
                                </button>

                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => this.handleDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentList;
