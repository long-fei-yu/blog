import React from 'react';

import AddTodo from './containers/todos/AddTodo';
import VisibleTodoList from './containers/todos/VisibleTodoList';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
}

export default App;
