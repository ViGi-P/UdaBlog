import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Row, Col, Button, message } from 'antd'

import { editComment } from '../actions'

const { TextArea } = Input

class Inner extends Component {
  constructor(props) {
    super(props)
    const { selectedComment } = props
    this.state = {
      body: selectedComment.body, author: selectedComment.author
    }
  }

  close = () => {
    this.props.close()
  }

  save = async () => {
    const values = Object.values(this.state)
    console.log(values)
    if (values.every(val => val !== '')) {
      const { editComment, selectedComment } = this.props
      try {
        await editComment(selectedComment.id, { ...this.state, timestamp: Date.now() })
        this.close()
      } catch (err) {
        console.log('save error', err)
      }
    } else message.error('Fields marked * cannot be empty!')
  }

  render() {
    const { visible } = this.props
    const { body, author } = this.state

    return visible ? <Modal
      footer={<Row>
        <Col xs={12} style={{ textAlign: 'left' }}>
          <Button type='danger' onClick={this.close}>Cancel</Button>
        </Col>
        <Col xs={12}>
          <Button onClick={this.save}>Save</Button>
        </Col>
      </Row>}
      visible={visible}
      onCancel={this.close}
      maskClosable={false}
      style={{ top: 20 }}
    >
      <h3>Edit Comment</h3>
      <Row gutter={5} style={{ marginTop: 20 }}>
        <Col xs={24} sm={4}>
          Body *
        </Col>
        <Col xs={24} sm={20} style={{ marginBottom: 10 }}>
          <TextArea
            autosize
            placeholder='Body cannot be empty'
            value={body}
            onChange={e => this.setState({ body: e.target.value })}
          />
        </Col>
        <Col xs={24} sm={4}>
          Author *
        </Col>
        <Col xs={24} sm={20} style={{ marginBottom: 10 }}>
          <Input
            placeholder='Author is required'
            value={author}
            onChange={e => this.setState({ author: e.target.value })}
          />
        </Col>
      </Row>
    </Modal> : null
  }
}

function mapStateToProps({ comments }) {
  return { selectedComment: comments.selected }
}

export const EditCommentModal = connect(mapStateToProps, { editComment })(Inner)
