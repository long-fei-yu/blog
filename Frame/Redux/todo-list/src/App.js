import React from 'react';
import './App.css';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <AddTodo/>
            <VisibleTodoList/>
            <Footer/>
        </div>
    );
}

export default App;
