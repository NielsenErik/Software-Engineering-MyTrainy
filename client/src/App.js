import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.scss'

// Import pages
import LoginPage from './pages/LoginPage';
import RegistrationPage from "./pages/RegistrationPage";
import CalendarPage from './pages/CalendarPage';
import ProgCardPage from "./pages/ProgCardPage";
import DiaryPage from "./pages/DiaryPage";

import useLocalStorage from './useLocalStorage';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import MyTrainyHome from "./pages/MyTrainyHome";

// import { useNavigate } from "react-router-dom";

function App() {
  // Token state
  const [token, setToken] = useLocalStorage('token', "");

  // loggerUser state
  const [loggedUser, setLoggedUser] = useLocalStorage( 'user', "");

  const [page, setPage] = useState(<MyTrainyHome />);

  useEffect(() =>{
    fetch("/api/v1/users/me?token="+token)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data);
        if(data.success){
          setPage(<CalendarPage/>);
        }
      })
  }, []);

  // const [data, setData] = useState(null);
  // useEffect(() =>{
  //   fetch('/api/v1')
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  // }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={page}/>
          <Route path="/login" exact element={<LoginPage 
            loggedUser={loggedUser} 
            setLoggedUser={setLoggedUser} 
            token={token} 
            setToken={setToken}
            page={page}
            setPage={setPage}
            />}/>
          <Route path="/singup" exact element={<RegistrationPage loggedUser={loggedUser} setLoggedUser={setLoggedUser} setToken={setToken} setPage={setPage}/>}/>
          <Route path="/calendar" exact element={<CalendarPage />} />
          <Route path="/prog-card-dash" exact element={<ProgCardPage />} />
          <Route path="/diary" exact element={<DiaryPage />} />
          <Route path="/courses" exact element={<CoursesPage />} />
          <Route path="/home" exact element={<MyTrainyHome />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
