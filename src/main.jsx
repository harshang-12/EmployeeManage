import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register&Login/Register.jsx';
import Login from './components/Register&Login/Login.jsx';
import EMRead from './components/UserProfile/EmployeeMaster/EMRead.jsx';
import Layout1 from './Layout1.jsx';
import EMAdd from './components/UserProfile/EmployeeMaster/EMAdd.jsx';
import EMUpdate from './components/UserProfile/EmployeeMaster/EMUpdate.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import TaskRead from './components/UserProfile/Task/TaskRead.jsx';
import TaskAdd from './components/UserProfile/Task/TaskAdd.jsx';
import TaskUpdate from './components/UserProfile/Task/TaskUpdate.jsx';
import LeaveRead from './components/UserProfile/EmployeesLeave/LeaveRead.jsx';
import LeaveAdd from './components/UserProfile/EmployeesLeave/LeaveAdd.jsx';
import LeaveUpdate from './components/UserProfile/EmployeesLeave/LeaveUpdate.jsx';


import { Provider } from 'react-redux'
import { Store } from './AppStore/store.js';



const isAuthenticated = () => {
  // Check if a user is authenticated based on your localStorage logic
  return localStorage.getItem('userInfo') !== null;

};

// console.log(isAuthenticated());

const ProtectedRoute = ({ element: Element, fallbackPath = '/' }) => {
  return isAuthenticated() ? Element : <Navigate to={fallbackPath} />;
};




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Register",
        element: <Register />
      },
      {
        path: "/Login",
        element: <Login />
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  },
  {
    path: "/Profile/LeaveRead",
    element: (
      <ProtectedRoute
        element={<Layout1 />}
        fallbackPath="/Login"
      >
        <LeaveRead />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/Profile/LeaveRead",
        element: (
          <ProtectedRoute
            element={<LeaveRead />}
            fallbackPath="/Login"
          />
        ),

      },
      {
        path: "/Profile/LeaveRead/LeaveAdd",
        element: (
          <ProtectedRoute
            element={<LeaveAdd />}
            fallbackPath="/Login"
          />
        ),
      },
      {
        path: "/Profile/LeaveRead/LeaveUpdate/:id",
        element: (
          <ProtectedRoute
            element={<LeaveUpdate />}
            fallbackPath="/Login"
          />
        ),
      },
    ]
  },
  {
    path: "/Profile/TaskRead",
    element: (
      <ProtectedRoute
        element={<Layout1 />}
        fallbackPath="/Login"
      >
        <TaskRead />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/Profile/TaskRead",
        element: (
          <ProtectedRoute
            element={<TaskRead />}
            fallbackPath="/Login"
          />
        ),
      },
      {
        path: "/Profile/TaskRead/AddTask",
        element: (
          <ProtectedRoute
            element={<TaskAdd />}
            fallbackPath="/Login"
          />
        ),
      },
      {
        path: "/Profile/TaskRead/TaskUpdate/:id",
        element: (
          <ProtectedRoute
            element={<TaskUpdate />}
            fallbackPath="/Login"
          />
        ),
      },
    ]
  },

  {
    path: "/Profile/EMRead",
    element: (
      <ProtectedRoute
        element={<Layout1 />}
        fallbackPath="/Login"
      >
        <EMRead />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/Profile/EMRead",
        element: (
          <ProtectedRoute
            element={<EMRead />}
            fallbackPath="/Login"
          />
        ),
      },

      {
        path: "/Profile/EMRead/AddData",
        element: (
          <ProtectedRoute
            element={<EMAdd />}
            fallbackPath="/Login"
          />
        ),
      },
      {
        path: "/Profile/EMRead/EMUpdate/:id",
        element: (
          <ProtectedRoute
            element={<EMUpdate />}
            fallbackPath="/Login"
          />
        ),
      },

    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={Store}  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>

);
