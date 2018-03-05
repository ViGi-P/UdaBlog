import React, { Component } from 'react'

export class PageTransition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted4Real: false
    }
  }

  componentWillMount() {
    this.timeout = setTimeout(() => {
      this.setState({ mounted4Real: true })
    }, 200)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return <div style={{ ...{ transition: 'opacity 200ms linear' }, ...(this.state.mounted4Real ? { opacity: 1 } : { opacity: 0 })}}>
      {this.props.children}
    </div>
  }
}
