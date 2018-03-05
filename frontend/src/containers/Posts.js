import React, { Component } from 'react'
import { List, Select, Row, Col, Button, Modal } from 'antd'
import { EntypoSwap, EntypoThumbsUp, EntypoThumbsDown, EntypoTrash, EntypoEdit,
  EntypoCircleWithPlus } from 'react-entypo'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { AddPostModal, EditPostModal } from '../containers'
import { editPost, deletePost, selectPost, getPosts } from '../actions'

const { Item } = List
const { Meta } = Item
const { Option } = Select
const { confirm } = Modal

class Inner extends Component {
  state = {
    sortKey: 0,
    modalVisible: '',
  }

  componentDidMount() {
    this.props.getPosts()
  }

  handleChange = sortKey => {
    this.setState({ sortKey })
  }

  render() {
    const { posts, match, selectPost, editPost, deletePost } = this.props
    const { sortKey, modalVisible } = this.state

    return <div><List
      header={<Row gutter={5}>
        <Col xs={12}><Button onClick={() => this.setState({ modalVisible: 'add' })} type='primary' style={{ borderRadius: '25px' }}>
          <EntypoCircleWithPlus style={{ fontSize: 16 }}/> New Post
        </Button></Col>
        <Col style={{ textAlign: 'right' }} xs={12}>
          <EntypoSwap className='sort-icon'/>
          <Select style={{ marginLeft: 5, width: 120 }} defaultValue={sortKey} onChange={this.handleChange}>
            <Option value={0}>Time</Option>
            <Option value={1}>Votes</Option>
            <Option value={2}>Comments</Option>
          </Select>
        </Col>
      </Row>}
      itemLayout='vertical'
      dataSource={
        (match.params.category ? posts.filter(({ category }) => category === match.params.category) : posts)
        .sort((a, b) => sortKey === 1 ? b.voteScore - a.voteScore : sortKey === 2 ? b.commentCount - a.commentCount : b.timestamp - a.timestamp)
      }
      renderItem={({ id, title, category, author, timestamp, voteScore, commentCount }) => (
        <Item
          key={id}
        >
          <Meta
            title={<p>{title}</p>}
            description={<section>
              <p>By {author} - <b>{new Date(timestamp).toString()}</b></p>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <span className='lazy-list-action'>
                    Comments <span className='count'>{commentCount}</span>
                  </span>
                  <span className='lazy-list-action'>
                    Votes <span className='count'>{voteScore}</span>
                    <a><EntypoThumbsUp className='list-action' onClick={() => editPost(id, { voteScore: voteScore + 1 })}/></a>
                    <a><EntypoThumbsDown className='list-action' onClick={() => editPost(id, { voteScore: voteScore - 1 })}/></a>
                  </span>
                </Col>
                <Col className='posts-view' xs={24} sm={12}>
                  <a onClick={() => {
                    selectPost(id)
                    this.setState({ modalVisible: id })
                  }} style={{ color: 'purple', marginRight: 30 }}><EntypoEdit/> Edit</a>
                  <a onClick={() => confirm({
                    title: 'Are you sure?',
                    content: 'This post will be deleted.',
                    okText: 'Yes',
                    okType: 'danger',
                    onOk: () => deletePost(id)
                  })} style={{ color: 'indianred', marginRight: 30 }}><EntypoTrash/> Delete</a>
                  <Link to={`/posts/${category}/${id}`}>View Post</Link>
                </Col>
              </Row>
            </section>}
          />
        </Item>
      )}
    />
    {modalVisible === 'add' ? <AddPostModal visible={modalVisible === 'add'} close={() => this.setState({ modalVisible: '' })}/> : null}
    {modalVisible !== 'add' && modalVisible !== '' ? <EditPostModal visible={modalVisible !== 'add' && modalVisible !== ''} id={modalVisible || null} close={() => this.setState({ modalVisible: '' }, () => selectPost())}/> : null}
    </div>
  }
}

function mapStateToProps({ posts }) {
  return { posts: posts.postsArray }
}

export const Posts = connect(mapStateToProps, { getPosts, editPost, selectPost, deletePost })(Inner)
