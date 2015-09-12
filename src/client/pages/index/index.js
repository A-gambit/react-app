import React from 'react'
import {addons} from 'react/addons'


export default React.createClass({
  mixins: [addons.PureRenderMixin],

  getInitialState() {
    return {value: ''}
  },

  handleChange(event) {
    this.setState({value: event.currentTarget.value})
  },

  render() {
    return (
      <div>
        <input onChange={this.handleChange} type='text' value={this.state.value} />
        {this.state.value}
      </div>
    )
  }
})
