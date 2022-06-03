import React, { useEffect, useState, useContext } from 'react'
import {
  Card,
  Table,
  Modal,
  Select,
  Input,
  Button,
  Badge,
  Menu,
  message,
} from 'antd'
import ProductListData from 'assets/data/product-list.data2.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import axios from 'axios'
import { UserContext } from '../../../provider/UserProvider'

const { Option } = Select
const { confirm } = Modal
const getStockStatus = (stockCount) => {
  if (stockCount >= 10) {
    return (
      <>
        <Badge status="success" />
        <span>In Stock</span>
      </>
    )
  }
  if (stockCount < 10 && stockCount > 0) {
    return (
      <>
        <Badge status="warning" />
        <span>Limited Stock</span>
      </>
    )
  }
  if (stockCount === 0) {
    return (
      <>
        <Badge status="error" />
        <span>Out of Stock</span>
      </>
    )
  }
  return null
}

const categories = ['status', 'location']




const ProductList = () => {
  let { currentUser } = useContext(UserContext)

  let history = useHistory()
  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/events`,
      )
      .then((res) => {
        // console.log(res.data)
        setList(res.data)
      })
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  )
  console.clear();
  const addProduct = () => {
    history.push(`./add-job`)
  }

  const viewDetails = (row) => {
    history.push(`./job-details/${row.id}`)
  }

  const deleteRow = (row) => {
    const objKey = 'id'
    const id = row.id
    confirm({
      title: 'Do you want to Delete this Event?',
      content: 'Once you click OK this event will be deleted .',
      onOk() {
        axios
          .delete(
            `http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/events/${row.id}`,
          )
          .then(() => {
            message.success(` Delete successful`)

            let data = list
            if (selectedRows.length > 1) {
              selectedRows.forEach((elm) => {
                data = utils.deleteArrayRow(data, objKey, elm.id)
                setList(data)
                setSelectedRows([])
              })
            } else {
              data = utils.deleteArrayRow(data, objKey, row.id)
              setList(data)
            }
          })
      },
    })
  }

  const tableColumns = [
    {
      title: 'Sport Name',
      dataIndex: 'codeName',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'codeName'),
    },
  
    {
      title: 'Countries',
      dataIndex: 'countriesParticipating',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    {
      title: 'Event Date',
      dataIndex: 'dateScheduled',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Event Venue',
      dataIndex: 'eventLocation',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'price'),
    },

    {
      title: 'Description',
      dataIndex: 'eventDescription',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'category'),
    },

    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows)
      setSelectedRowKeys(key)
    },
  }

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value
  //   const searchArray = e.currentTarget.value ? list : ProductListData
  //   const data = utils.wildCardSearch(searchArray, value)
  //   setList(data)
  //   setSelectedRowKeys([])
  // }

  // const handleShowCategory = (value) => {
  //   if (value !== 'All') {
  //     const key = 'category'
  //     const data = utils.filterArray(ProductListData, key, value)
  //     setList(data)
  //   } else {
  //     setList(ProductListData)
  //   }
  // }

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          {/* <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div> */}
          {/* <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowCategory}
              placeholder="Category"
            >
              <Option value="All">All</Option>
              {categories.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </div> */}
        </Flex>

        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add New Sporting Code
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          // rowSelection={{
          //  selectedRowKeys: selectedRowKeys,
          //   type: 'checkbox',
          //   preserveSelectedRowKeys: false,
          //   ...rowSelection,
          // }}
        />
      </div>
    </Card>
  )
}

export default ProductList
