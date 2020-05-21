import React from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import VisibleTodoList from './components/VisibleTodoList';
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
