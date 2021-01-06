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
    <div className="col">
      <h3 className="text-center my-2">You have no todos. Go get some rest!</h3>
    </div>
  )
}

const InvalidBanner = ({info}) => <p className="todoError alert alert-danger text-center">{info}</p>;

const AllTodos = ({todos}) => {
  if (todos.length === 0) return null;
  return todos.map((todo, index) => (<Todo key={index} todo={todo} />));
}

const AddTodoContainer = ({isInvalidTodo, invalidTodoMessage, addTodo, handleChangeTodo, todo}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-lg-7 mx-auto">
          <form onSubmit={addTodo} className="form-group">
            {isInvalidTodo && <InvalidBanner info={invalidTodoMessage} />}
            <label htmlFor="do" className="lead">Write your todos here:</label>
            <input onChange={handleChangeTodo} value={todo} id="do" className="form-control mb-3" type="text" placeholder="Write your todos here" />
            <button type="submit" className="btn btn-primary btn-block my-2">Add</button>
          </form>
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
      todo: '',
      isInvalidTodo: false,
      invalidTodoMessage: ''
    };
  }

  addTodo = event => {
    event.preventDefault();
    const {todos, todo} = this.state;

    if (todos.includes(todo)) {
      this.setState({
        isInvalidTodo: true,
        invalidTodoMessage: `${todo} is already in todos.`
      });
    }
    else if (todo === '') {
      this.setState({
        isInvalidTodo: true,
        invalidTodoMessage: 'Todo input should not be empty.'
      });
    }
    else {
      todos.unshift(todo);
      this.setState({
        isInvalidTodo: false, 
        invalidTodoMessage: '', 
        todos: todos,
        todo: ''
      });
    }
  }

  handleChangeTodo = event => this.setState({todo: event.target.value});

  clearTodos = () => this.setState({todos: []});

  render () {
    const {todos, todo, isInvalidTodo, invalidTodoMessage} = this.state;
    return (
      <section>
        <AddTodoContainer isInvalidTodo={isInvalidTodo} invalidTodoMessage={invalidTodoMessage} addTodo={this.addTodo} handleChangeTodo={this.handleChangeTodo} todo={todo} />
        <div className="container">
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-between">
              <p className="lead">
                Your todos:
              </p>
              {todos.length > 0 && <button onClick={this.clearTodos} className="btn btn-outline-danger py-1">Clear all todos</button>}
            </div>
          </div>
          
          <div className="row">
            {todo && <Todo todo={todo} />}
            {<AllTodos todos={todos}/>}
            {todos.length === 0 && todo === '' && <NoTodo />}
          </div>
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