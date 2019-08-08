import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {
  findPalette(id) {
    return seedColors.find(palette => palette.id === id);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
