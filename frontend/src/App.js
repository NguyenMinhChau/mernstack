import {Routes, Route} from 'react-router-dom';
import {useCallback, useEffect, useReducer} from 'react';
import {Header, Footer, Login, Register, Main, NotFound, AppContext, reducer, initialState, getCurrentUser} from '../src/exportStore';
import {url} from '../src/urlServer';
import axios from 'axios';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //checkCurrentUser
  const checkCurrentUser = useCallback(async () => {
    try{
      const token = localStorage.getItem('token');
      const option = {
        method: 'GET',
        url: `${url}/api/v1/users`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await axios(option);
      if(response.data.data.user){
        dispatch(getCurrentUser(response.data.data.user.username));
      }
    }catch(err){
      console.log(err);
    }
  },[dispatch])
  useEffect(() => {
    checkCurrentUser();
  },[checkCurrentUser]);

  return (
    <AppContext.Provider value={{state,dispatch}}>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
