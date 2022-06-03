import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import {
  Tabs,
  DatePicker,
  Row,
  Col,
  Select,
  Form,
  Input,
  Card,
  Upload,
  Button,
  message,
} from 'antd'
import Flex from 'components/shared-components/Flex'
// import GeneralField from './GeneralField'
import VariationField from './VariationField'
import ShippingField from './ShippingField'

import ProductListData from 'assets/data/product-list.data2.json'
import moment from 'moment'
import axios from 'axios'
import { auth, storage } from '../../../../firebase'

const { TabPane } = Tabs
const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState('')
  const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  // const [list, setList] = useState({})

  useEffect(() => {


    if (mode === EDIT) {

      const { id } = param
      axios
        .get(
          `http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/events/${id}`

        )
        .then((res) => {
          // console.log(id)
          setData(res.data)
          // message.success(`Job listing submitted successfully`)

          form.setFieldsValue({
            codeName: data.codeName,
            countriesParticipating: data.countriesParticipating,
            dateScheduled: data.dateScheduled,
            category: data.category,
            eventLocation: data.eventLocation,
            virtualLink: data.virtualLink,
            eventDescription: data.eventDescription,
            // email:auth.currentUser.email,
          })
        })
    }
  }, [])

  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl)
        setUploadLoading(true)
      })
    }
  }

  const onFinish = () => {
    if (
      data.codeName === ""
      // countriesParticipating: "",
      // dateScheduled: "",
      // category: "",
      // eventLocation: "",
      // virtualLink: "",
      // eventDescription: "",
      // data.email === ''
    ) {
      // console.log(
      // `${data.jobTitle} ${data.companyName} ${data.experience} ${data.description} ${data.deadline} ${data.location} ${data.email}`,
      // )
      message.warning(`Please fill in all fields!`)
      return
    }
    setSubmitLoading(true)
    form.validateFields().then(() => {
      setTimeout(() => {
        if (mode === ADD) {
          setSubmitLoading(false)
          submit()
        }
        if (mode === EDIT) {
          const { id } = param
          alert(id)
          axios
            .put(
              `http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/olympic_event/${id}`, data

            )
            .then(() => {
              setSubmitLoading(false)
              message.success(` Event Details have been edited successfully `)
              //   window.location.reload()
            })

        }
      }, 1500)
    })
  }

  const { Dragger } = Upload
  const { Option } = Select

  const { MonthPicker, RangePicker } = DatePicker

  const dateFormat = 'YYYY/MM/DD'
  const monthFormat = 'YYYY/MM'
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

  const imageUploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    showUploadList: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const discard = () => {
    setData({
      codeName: "",
      countriesParticipating: "",
      dateScheduled: "",
      category: "",
      eventLocation: "",
      virtualLink: "",
      eventDescription: "",
      email: auth.currentUser.email,
    })
  }

  const [data, setData] = useState({
    codeName: "",
    countriesParticipating: "",
    dateScheduled: "",
    category: "",
    eventLocation: "",
    virtualLink: "",
    eventDescription: "",
    email: auth.currentUser.email,
  })

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = () => {
    axios
      .post(
        'http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/events',
        data,
      )
      .then((res) => {
        message.success(`Event has been submitted successfully`)
        setData({
          codeName: "",
          countriesParticipating: "",
          dateScheduled: "",
          category: "",
          eventLocation: "",
          virtualLink: "",
          eventDescription: "",
          // email: auth.currentUser.email,
        })
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: 'cm',
          widthUnit: 'cm',
          weightUnit: 'kg',
        }}
        onSubmit={(e) => submit(e)}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'New Sporting Code' : `Edit Sporting Code`}{' '}
              </h2>
              <div className="mb-3">
                <Button onClick={discard} className="mr-2">
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add Sporting Code' : `Save Changes`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24}>
                  <Card title="">
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Sport Name">
                          <Input
                            name="codeName"
                            placeholder="Enter Job Title"
                            onChange={handle}
                            value={data.codeName}
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Venue">
                          <Input
                            type="text"
                            name="eventLocation"
                            placeholder="Enter Company Name"
                            onChange={handle}
                            value={data.eventLocation}
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Countries">
                          <Input
                            type="text"
                            name="countriesParticipating"
                            placeholder="Enter Countries  Required"
                            onChange={handle}
                            value={data.countriesParticipating}
                            className="w-100"
                          />
                        </Form.Item>

                        <Form.Item label="Date of Event">
                          <Input
                            type="date"
                            name="dateScheduled"
                            onChange={handle}
                            value={data.dateScheduled}
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Description">
                          <Input.TextArea
                            name="eventDescription"
                            placeholder="Enter the short Description"
                            onChange={handle}
                            value={data.eventDescription}
                            className="w-100"
                            rows={4}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Streaming Link">
                          <Input
                            type="text"
                            name="virtualLink"
                            placeholder="Enter streaming  virtual link"
                            onChange={handle}
                            value={data.virtualLink}
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Email">
                          <Input readOnly
                            type="email"
                            name="email"
                            placeholder="Enter Contact Email"
                            onChange={handle}
                            value={ auth.currentUser.email}
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
