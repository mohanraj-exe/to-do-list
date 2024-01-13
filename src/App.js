import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    // console.log("constructor: It is called first when the class header component is initiated");
    console.log("constructor");
    super(props);
    this.state = {
      to_do_lists: [],
      newTask: "",
      showAlert: false
    };
  }

  showAlert(){
    this.setState({ showAlert: true });

    setTimeout(() => {
      console.log("to be vanish");
      this.setState({ showAlert: false })
    }, 2000);
    
  }

  onClick(e) {
    e.preventDefault();
    if(this.state.newTask.trim() !== ""){
      this.setState({
        to_do_lists: [...this.state.to_do_lists, this.state.newTask],
        newTask: ""
      }, () => this.showAlert());
    }
  };

  onChange(e){
    // console.log(e);
    this.setState({ newTask: e.target.value });
  }

  componentDidUpdate(prevProps, prevState){

    if (prevState.to_do_lists.length !== this.state.to_do_lists.length) {
      // Trigger the alert
      console.log("DidUpdate");
      this.showAlert();
    }
  
  }

  render() {
    // console.log("render function: It is called after constructor it renders DOM");
    console.log("render function");
    // console.log("state value:", this.state);
    return (
      <>
        <form>
          <input type="text" name="task" value={this.state.newTask} onChange={(e) => this.onChange(e)}/><br />
          <button type="submit" onClick={(e) => this.onClick(e)}>Add</button>
        </form>
        <h1>My To Do lists:</h1>
        <ul>
        {this.state.to_do_lists.length > 0 ? ( this.state.to_do_lists.map((task, index) =>(
          <li key={index}>{task}</li>
        ))
        ) : (
        <p>No tasks yet</p>
        )}
        </ul>
        {/* Conditional rendering of the alert */}
        {this.state.showAlert === true && (
          <div>
            <p>New task added!</p>
          </div>
        )}
      </>
    );
  }
}
