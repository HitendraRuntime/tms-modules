import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from '../HeaderComponent';
import LoginComponent from '../auth/LoginComponent';
import RegisterComponent from '../auth/RegisterComponent';
import TaskList from '../task/TaskList';
import AuthenticatedRoute from './AuthenticatedRoute';
import TaskFormV2 from '../task/TaskFormV2';

function RouterComponent() {

    return (
        <div className="Router">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    {/* http://localhost:8080 */}
                    <Route path='/' element={<LoginComponent />}></Route>
                    {/* http://localhost:8080/register */}
                    <Route path='/register' element={<RegisterComponent />}></Route>

                    {/* http://localhost:8080/tms */}
                    <Route path='/view-task' element={
                        <AuthenticatedRoute>
                            <TaskList />
                        </AuthenticatedRoute> 
                    }
                    >
                    </Route>

                    {/* http://localhost:8080/tms */}
                    <Route path='/add-task' element={
                        <AuthenticatedRoute>
                            <TaskFormV2 />
                        </AuthenticatedRoute> 
                    }
                    >
                    </Route>

                    {/* http://localhost:8080/add-task/1 */}
                    <Route path='/add-task/:id' element={
                        <AuthenticatedRoute>
                            <TaskFormV2 />
                        </AuthenticatedRoute>
                    }
                    >
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default RouterComponent;
