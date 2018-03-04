import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'antd'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { toggleSpin, getCategories, getPosts, getComments } from './actions'

class PageTransition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted4Real: false
    }
    this.timeout = setTimeout(() => this.setState({ mounted4Real: true }), 200)
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

class App extends Component {
  async componentWillMount() {
    const { toggleSpin, getCategories, getPosts, getComments } = this.props
    toggleSpin(true)
    const promises = [getCategories(), getPosts(), getComments('8xf0y6ziyjabvozdd253nd')]
    await Promise.all(promises)
    toggleSpin(false)
  }

  render() {
    console.log('App render', this.props)

    return (
      <div>
        <section>
          <p><Link to='/posts'>One</Link></p>
          <p><Link to='/posts/react'>Two</Link></p>
          <p><Link to='/posts/react/866876'>3</Link></p>
        </section>
        <section>
          <Switch>
            <Redirect from='/' exact to='/posts'/>
            <Route path='/posts' exact component={() => <PageTransition><h2>One</h2></PageTransition>}/>
            <Route path='/posts/:category' exact component={() => <PageTransition><h2>Two</h2></PageTransition>}/>
            <Route path='/posts/:category/:id' exact component={() => <PageTransition><h2>Post</h2></PageTransition>}/>
            <Route component={() => <h1>Not Found</h1>}/>
          </Switch>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const actionCreators = { toggleSpin, getCategories, getPosts, getComments }

export default connect(mapStateToProps, actionCreators)(App)
