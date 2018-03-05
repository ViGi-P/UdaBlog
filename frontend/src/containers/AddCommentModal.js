import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Row, Col, Button, message } from 'antd'

import { addComment } from '../actions'

const { TextArea } = Input

class Inner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentId: props.parentId, body: '', author: ''
    }
  }

  save = async () => {
    const values = Object.values(this.state)
    console.log(values)
    if (values.every(val => val !== '')) {
      const { addComment, close } = this.props
      try {
        await addComment(this.state)
        close()
      } catch (err) {
        console.log('save error', err)
      }
    } else message.error('Fields marked * cannot be empty!')
  }

  render() {
    const { visible, close } = this.props
    const { body, author } = this.state

    return visible ? <Modal
      footer={<Row>
        <Col xs={12} style={{ textAlign: 'left' }}>
          <Button type='danger' onClick={close}>Cancel</Button>
        </Col>
        <Col xs={12}>
          <Button onClick={this.save}>Save</Button>
        </Col>
      </Row>}
      visible={visible}
      onCancel={close}
      maskClosable={false}
      style={{ top: 20 }}
    >
      <h3>New Comment</h3>
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

export const AddCommentModal = connect(null, { addComment })(Inner)
