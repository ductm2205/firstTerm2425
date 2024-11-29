import React, {Component} from 'react';
import axios from 'axios';

class StudentUpdate extends Component {
    state = {
        name: '',
        age: '',
    };

    url = 'http://localhost:8080';

    componentDidMount() {
        const {studentId} = this.props;
        axios
            .get(`${this.url}/detail/${studentId}`) // Fetch existing student data
            .then((res) => {
                this.setState({
                    name: res.data.name,
                    age: res.data.age,
                });
            })
            .catch((err) => {
                console.error('Error fetching student data:', err);
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {studentId} = this.props;
        const student = {
            name: this.state.name,
            age: this.state.age,
        };

        axios
            .put(`${this.url}/update/${studentId}`, student) // Update student data
            .then((res) => {
                console.log('Student updated:', res.data);
                if (this.props.reloadStudentList) {
                    this.props.reloadStudentList(); // Optional: Reload list if function is provided
                }
            })
            .catch((err) => {
                console.error('Error updating student:', err);
            });
    };

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        return (
            <div className="container text-center mt-3 mb-5">
                <h3 className="bg-warning text-primary p-2">UPDATE STUDENT</h3>
                <form className="form card p-3 bg-light" onSubmit={this.handleSubmit}>
                    <label className="form-label h5 text-success">Student Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        value={this.state.name}
                        minLength="3"
                        maxLength="20"
                        required
                        onChange={this.handleChange}
                    />
                    <label className="form-label h5 text-success">Student Age</label>
                    <input
                        className="form-control"
                        type="number"
                        id="age"
                        value={this.state.age}
                        min="18"
                        max="25"
                        required
                        onChange={this.handleChange}
                    />
                    <div className="text-center">
                        <button className="btn btn-primary mt-3 col-md-3" type="submit">
                            Update
                        </button>
                        <button className="btn btn-danger mt-3 col-md-3" onClick={() => this.handleCancel()}>
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}

export default StudentUpdate;
