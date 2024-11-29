import {Routes, Route} from "react-router-dom";
import StudentList from "./components/StudentList.jsx";
import StudentAdd from "./components/StudentAdd.jsx";
import StudentUpdate from "./components/StudentUpdate.jsx";
import {useState} from "react";

function App() {
    const [reloadList, setReloadList] = useState(false);

    const handleReloadList = () => {
        setReloadList(!reloadList);
    };

    return (
        <>
            <div className="container text-center card mt-3">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="row">
                                <div className="col">
                                    <StudentAdd reloadStudentList={handleReloadList}/>
                                </div>
                                <div className="col">
                                    <StudentList reloadList={reloadList}/>
                                </div>
                            </div>
                        }
                    />
                    <Route path="/update/:id" element={<StudentUpdate/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
