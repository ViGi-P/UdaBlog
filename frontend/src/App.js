import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Select } from 'antd'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { toggleSpin, getCategories, getPosts } from './actions'
import { Posts, Post } from './containers'
import { PageTransition, NotFound } from './components'

const { Header, Content } = Layout
const { Option } = Select

class App extends Component {
  async componentWillMount() {
    const { toggleSpin, getCategories, getPosts } = this.props
    toggleSpin(true)
    const promises = [getCategories(), getPosts()]
    await Promise.all(promises)
    toggleSpin(false)
  }

  render() {
    const { history, location, categories, spinning } = this.props
    const { pathname } = location
    const paths = pathname.split('/').filter(el => el)

    return (
      <div>
        <Header className='header'>
          <h2>UdaBlog</h2>
          {
            paths.length < 3 ? <Select
              size='large'
              style={{ width: 150, marginLeft: 5 }}
              value={paths.length > 1 ? paths[1] : ''}
              onChange={filter => history.push(`/posts/${filter}`)}
            >
              <Option value=''>All categories</Option>
              {categories.map(({ path }) => <Option key={path} value={path}><span className='filter-option'>{path}</span></Option>)}
            </Select> : null
          }
        </Header>
        <Content style={{ padding: 15 }}>
          {spinning || <Switch>
            <Redirect from='/' exact to='/posts'/>
            <Route path='/posts' exact component={props => <PageTransition><Posts {...props}/></PageTransition>}/>
            <Route path='/posts/:category' exact component={props => <PageTransition><Posts {...props}/></PageTransition>}/>
            <Route path='/posts/:category/:id' exact component={props => <PageTransition><Post {...props}/></PageTransition>}/>
            <Route component={() => <PageTransition>
              <NotFound/>
            </PageTransition>}/>
          </Switch>}
        </Content>
      </div>
    )
  }
}

function mapStateToProps({ categories, spinning }) {
  return { categories, spinning }
}

const actionCreators = { toggleSpin, getCategories, getPosts }

export default connect(mapStateToProps, actionCreators)(App)
