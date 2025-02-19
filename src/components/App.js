import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  onChangeType = e => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    });
  };

  onFindPetsClick = () => {
    const { type } = this.state.filters;
    const url = type === "all" ? "/api/pets" : `/api/pets?type=${type}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pets: data
        });
      });
  };

  onAdoptPet = petId => {
    this.state.pets.forEach(pet =>
      pet.id === petId ? (pet.isAdopted = true) : null
    );
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
