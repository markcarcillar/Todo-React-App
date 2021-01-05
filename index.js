// App
class App extends React.Component {
  render () {
    return (
      <section>
        <Header />
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

const Todo = ({todo}) => {
  return (
    <div className="col-lg-6 pointer">
      <div className="card card-body m-2">
        {todo}
      </div>
    </div>
  )
}

const NoTodo = () => {
  return (
    <div className="row">
      <div className="col">
        <h3 className="text-center my-2">You have no todos. Go get some rest!</h3>
      </div>
    </div>
  )
}

const InvalidBanner = ({info}) => <p className="todoError alert alert-danger text-center">{info}</p>;

const AllTodos = ({todos}) => {
  return (
    <div className="row">
      {todos.map((todo, index) => (<Todo key={index} todo={todo} />))}
    </div>
  );
}

const AddTodoContainer = ({isInvalidTodo, invalidTodoMessage, addTodo}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-lg-7 mx-auto">
          <div className="form-group">
            {isInvalidTodo && <InvalidBanner info={invalidTodoMessage} />}
            <label htmlFor="do" className="lead">Write your todos here:</label>
            <input id="do" className="form-control mb-3" type="text" placeholder="Write your todos here" />
            <button onClick={addTodo} className="btn btn-primary btn-block my-2" type="button">Add!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

class TodosContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todos: [], 
      isInvalidTodo: false,
      invalidTodoMessage: ''
    };
  }

  addTodo = () => {
    const todos = this.state.todos;
    const todo = document.querySelector('#do');

    if (todos.includes(todo.value)) {
      this.setState({
        isInvalidTodo: true,
        invalidTodoMessage: `${todo.value} is already in todos.`
      });
    }
    else if (todo.value === '') {
      this.setState({
        isInvalidTodo: true,
        invalidTodoMessage: 'Todo input should not be empty.'
      });
    }
    else {
      todos.unshift(todo.value);
      this.setState({
        isInvalidTodo: false, 
        invalidTodoMessage: '', 
        todos: todos
      });
      todo.value = '';
    }
  }

  clearTodos = () => {
    this.setState({todos: []});
  }

  render () {
    const {todos, isInvalidTodo, invalidTodoMessage} = this.state;
    return (
      <section>
        <AddTodoContainer isInvalidTodo={isInvalidTodo} invalidTodoMessage={invalidTodoMessage} addTodo={this.addTodo} />
        <div className="container">
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-between">
              <p className="lead">
                Your todos:
              </p>
              {todos.length > 0 && <button onClick={this.clearTodos} className="btn btn-outline-danger py-1">Clear all todos</button>}
            </div>
          </div>
          
          {todos.length === 0 ? <NoTodo /> : <AllTodos todos={todos}/>}
        </div>
      </section>
    );
  }
}

// Render
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);