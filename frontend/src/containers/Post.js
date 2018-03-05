import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { EntypoCircleWithPlus, EntypoThumbsUp, EntypoThumbsDown, EntypoEdit,
  EntypoTrash } from 'react-entypo'
import { Row, Col, Breadcrumb, List, Modal, Button } from 'antd'

import { EditPostModal, AddCommentModal, EditCommentModal } from '../containers'
import { NotFound } from '../components'
import { selectPost, editPost, deletePost, getComments, selectComment, addComment, editComment,
  deleteComment } from '../actions'

const { Meta } = List.Item
const { Item } = Breadcrumb

class Inner extends Component {
  state = {
    postModalVisible: false,
    commentModalVisible: '',
  }

  componentDidMount() {
    const { selectPost, getComments, match } = this.props
    selectPost(match.params.id)
    getComments(match.params.id)
  }

  componentWillReceiveProps({ selectedPost }) {
    const oldSelectedPost = this.props.selectedPost
    if (oldSelectedPost && selectedPost && oldSelectedPost.category !== selectedPost.category) this.props.history.push(`/posts/${selectedPost.category}/${selectedPost.id}`)
  }

  componentWillUnmount() {
    const { selectComment, selectPost } = this.props
    selectPost()
    selectComment()
  }

  render() {
    const { postModalVisible, commentModalVisible } = this.state
    const { selectedPost, editPost, deletePost, comments, match, selectComment, addComment,
      deleteComment, editComment } = this.props

    return selectedPost && selectedPost.category === match.params.category ? <div>
      <Breadcrumb style={{ marginBottom: 25 }}>
        <Item><Link to='/posts'>posts</Link></Item>
        <Item><Link to={`/posts/${selectedPost.category}`}>{selectedPost.category}</Link></Item>
        <Item>post id : {selectedPost.id}</Item>
      </Breadcrumb>
      <p className='post-title'>{selectedPost.title}</p>
      <Meta
        title={<Row>
          <Col xs={18}>
            Added on {new Date(selectedPost.timestamp).toString()}
          </Col>
          <Col xs={6} style={{ textAlign: 'right' }}>
            By {selectedPost.author}
          </Col>
        </Row>}
        description={<section style={{ paddingTop: 15 }}>
          <p>{selectedPost.body}</p>
        </section>}
      />
      <Row gutter={10} style={{ marginBottom: 30, marginTop: 20 }}>
        <Col xs={24} sm={12}>
          <span className='lazy-list-action'>
            Votes <span className='count'>{selectedPost.voteScore}</span>
            <a><EntypoThumbsUp className='list-action' onClick={() => editPost(selectedPost.id, { voteScore: selectedPost.voteScore + 1 })}/></a>
            <a><EntypoThumbsDown className='list-action' onClick={() => editPost(selectedPost.id, { voteScore: selectedPost.voteScore - 1 })}/></a>
          </span>
        </Col>
        <Col className='posts-view' xs={24} sm={12}>
          <a onClick={() => this.setState({ postModalVisible: true })} style={{ color: 'purple', marginRight: 30 }}><EntypoEdit/> Edit</a>
          <a onClick={() => Modal.confirm({ title: 'Are you sure?',
            content: 'This post will be deleted.',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => deletePost(selectedPost.id)
          })} style={{ color: 'indianred', marginRight: 30 }}><EntypoTrash/> Delete</a>
        </Col>
      </Row>
      {postModalVisible ? <EditPostModal visible={postModalVisible} id={selectedPost.id} close={() => this.setState({ postModalVisible: false })}/> : null}
      <List
        header={<Row gutter={5}>
          <Col xs={12} className='lazy-list-action' style={{ marginTop: 6 }}>
            Comments <span className='count'>{comments.length}</span>
          </Col>
          <Col style={{ textAlign: 'right' }} xs={12}>
            <Button onClick={() => this.setState({ commentModalVisible: 'add' })} type='primary' style={{ borderRadius: '25px' }}>
              <EntypoCircleWithPlus style={{ fontSize: 16 }}/> New Comment
            </Button>
          </Col>
        </Row>}
        itemLayout='vertical'
        dataSource={comments.sort((a, b) => b.timestamp - a.timestamp)}
        renderItem={({ id, body, timestamp, author, voteScore }) => (
          <List.Item key={id}>
            <Meta
              title={<p>{author}</p>}
              description={<section>
                <p>{new Date(timestamp).toString()}</p>
                <p>{body}</p>
                <Row gutter={10}>
                  <Col xs={24} sm={12}>
                    <span className='lazy-list-action'>
                      Votes <span className='count'>{voteScore}</span>
                      <a><EntypoThumbsUp className='list-action' onClick={async () => editComment(id, { voteScore: voteScore + 1 })}/></a>
                      <a><EntypoThumbsDown className='list-action' onClick={() => editComment(id, { voteScore: voteScore - 1 })}/></a>
                    </span>
                  </Col>
                  <Col className='posts-view' xs={24} sm={12}>
                    <a onClick={() => {
                      selectComment(id)
                      this.setState({ commentModalVisible: id })
                    }} style={{ color: 'purple', marginRight: 30 }}><EntypoEdit/> Edit</a>
                    <a onClick={() => Modal.confirm({
                      title: 'Are you sure?',
                      content: 'This comment will be deleted.',
                      okText: 'Yes',
                      okType: 'danger',
                      onOk: () => deleteComment(id)
                    })} style={{ color: 'indianred', marginRight: 30 }}><EntypoTrash/> Delete</a>
                  </Col>
                </Row>
              </section>}
            />
          </List.Item>
        )}
      />
      {commentModalVisible === 'add' ? <AddCommentModal parentId={selectedPost.id} visible={commentModalVisible === 'add'} close={() => this.setState({ commentModalVisible: '' })}/> : null}
      {commentModalVisible !== 'add' && commentModalVisible !== '' ? <EditCommentModal visible={commentModalVisible !== 'add' && commentModalVisible !== ''} id={commentModalVisible || null} close={() => this.setState({ commentModalVisible: '' }, () => selectComment())}/> : null}
    </div> : <NotFound/>
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    selectedPost: posts.selected,
    comments: comments.commentsArray,
    selectedComment: comments.selected
  }
}

export const Post = connect(mapStateToProps, { selectPost, editPost, deletePost, getComments,
  selectComment, addComment, deleteComment, editComment })(Inner)
