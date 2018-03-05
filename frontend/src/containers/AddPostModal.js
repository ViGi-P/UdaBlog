import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Select, Input, Row, Col, Button, message } from 'antd'

import { addPost } from '../actions'

const { TextArea } = Input
const { Option } = Select

class Inner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '', body: '', author: '', category: props.categories[0].path
    }
  }

  save = async () => {
    const values = Object.values(this.state)
    if (values.every(val => val !== '')) {
      const { addPost, close } = this.props
      try {
        await addPost(this.state)
        close()
      } catch (err) {
        console.log('save error', err)
      }
    } else message.error('Fields marked * cannot be empty!')
  }

  render() {
    const { visible, categories, close } = this.props
    const { title, body, author, category } = this.state

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
      <h3>New Post</h3>
      <Row gutter={5} style={{ marginTop: 20 }}>
        <Col xs={24} sm={4}>
          Title *
        </Col>
        <Col xs={24} sm={20} style={{ marginBottom: 10 }}>
          <Input
            placeholder='Title cannot be empty'
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </Col>
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
        <Col xs={24} sm={8} style={{ marginBottom: 10 }}>
          <Input
            placeholder='Author is required'
            value={author}
            onChange={e => this.setState({ author: e.target.value })}
          />
        </Col>
        <Col xs={24} sm={4} className='edit-modal-category'>
          <span>Category</span>
        </Col>
        <Col xs={24} sm={8} style={{ marginBottom: 10 }}>
          <Select style={{ width: '100%' }} value={category} onChange={category => this.setState({ category })}>
            {categories.map(({ path }) => <Option key={path} value={path}><span className='filter-option'>{path}</span></Option>)}
          </Select>
        </Col>
      </Row>
    </Modal> : null
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export const AddPostModal = connect(mapStateToProps, { addPost })(Inner)
