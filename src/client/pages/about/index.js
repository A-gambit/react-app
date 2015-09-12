import React from 'react'
import {addons} from 'react/addons'


export default React.createClass({
  mixins: [addons.PureRenderMixin],

  getInitialState() {
    return {value: 0}
  },

  handleClick() {
    this.setState({value: this.state.value + 1})
  },

  render() {
    return (
      <div>
        <input onClick={this.handleClick} type='submit' />
        {this.state.value}
      </div>
    )
  }
})
