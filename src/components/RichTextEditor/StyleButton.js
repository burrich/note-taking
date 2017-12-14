import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

/**
 * StyleButton component.
 */
class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.style = this.props.style;
    
    // this methods binding
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.style.code);
  }

  render() {
    return(
      <Button 
        icon
        active={this.props.active}
        onMouseDown={this.onToggle}>

        <Icon name={this.style.name} />
      </Button>
    );
  }
}

export default StyleButton;
