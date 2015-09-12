import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <Link to='index'>Home</Link>
        <Link to='about'>About</Link>
      </div>
    )
  }
})