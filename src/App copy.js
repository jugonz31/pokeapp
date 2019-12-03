import React, { Component } from 'react';
import Navbar from './components/Navbar'
import PokemonList from './components/PokemonList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       searchInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
}
  
  handleChange(e){
    const {id, value} = e.target;
    this.setState({
        [id]: value
    });
    console.log(this.state.searchInput)
}

  render() {
    
    return (
      <div>
        <Navbar onChange={this.handleChange}/>


        <PokemonList />
      </div>
    )
  };
}

export default App;
