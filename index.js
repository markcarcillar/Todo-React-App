// App
class App extends React.Component {
  render () {
    return (
      <section>
        <Header />
        <AddTodos />
        <TodosContainer />
      </section>
    );
  }
}

// DOM
class Header extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-4 my-5 text-center">Todo React App</h1>
          </div>
        </div>
      </div>
    );
  }
}

class TodosContainer extends React.Component {
  clearTodos = () => {
    document.querySelector('#todos').textContent = '';
    document.querySelector('#noTodos').style.display = 'block';
    document.querySelector('#clearTodos').style.display = 'none';
    if (document.querySelector('.todoError')) document.querySelector('.todoError').remove();
    todos = [];
  }

  render () {
    return (
      <div id="todosContainer" className="container">
        <div className="row my-3">
          <div className="col-12 d-flex justify-content-between">
            <p id="yourTodos" className="lead">
              Your todos:
            </p>
            <button onClick={this.clearTodos} id="clearTodos" className="btn btn-outline-danger py-1" style={{display: 'none'}}>Clear all todos</button>
          </div>
        </div>
        
        {/* When there are no todos */}
        <div className="row">
          <div id="noTodos" className="col">
            <h3 className="text-center my-2">You have no todos. Go get some rest!</h3>
          </div>
        </div>

         {/* Container for todos */}
        <div id="todos" className="row"></div>
      </div>
    );
  }
}


// Methods
class AddTodos extends React.Component {
  addTodo = () => {
    const todosContainer = document.querySelector('#todos');
    const todoForm = document.querySelector('#todoForm');
    const todo = document.querySelector('#do');
    
    if (todos.includes(todo.value)) {
      const todoError = document.querySelector('.todoError');
      const errorDiv = document.createElement('p');

      if (todoError) todoError.remove();
      errorDiv.classList.add('todoError', 'alert', 'alert-danger', 'text-center');
      errorDiv.innerText = `${todo.value} is already in todos.`;
      todoForm.prepend(errorDiv);
    }
    else if (todo.value !== '') {
      const todoError = document.querySelector('.todoError');
      const todoDiv = document.createElement('div');
      const todoCard = document.createElement('div');

      if (todoError) todoError.remove();
      todoCard.classList.add('card', 'card-body', 'm-2');
      todoCard.innerText = todo.value;
      todoDiv.classList.add('col-lg-6', 'pointer');
      todoDiv.append(todoCard)
      todosContainer.prepend(todoDiv);
      todos.push(todo.value);
      todo.value = '';
    }
    else {
      const todoError = document.querySelector('.todoError');
      const errorDiv = document.createElement('p');

      if (todoError) todoError.remove();
      errorDiv.classList.add('todoError', 'alert', 'alert-danger', 'text-center');
      errorDiv.innerText = 'Todo input should not be empty.';

      todoForm.prepend(errorDiv);
    }

    if (todos.length > 0) {
      document.querySelector('#noTodos').style.display = 'none';
      document.querySelector('#clearTodos').style.display = 'block';
    }
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-7 mx-auto">
            <div id="todoForm" className="form-group">
              <label htmlFor="do" className="lead">Write your todos here:</label>
              <input id="do" className="form-control mb-3" type="text" placeholder="Write your todos here" />
              <button onClick={this.addTodo} className="btn btn-primary btn-block my-2" type="button">Add!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


// Render
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);