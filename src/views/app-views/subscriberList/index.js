import React, { useEffect, useState, useContext } from 'react'
import { Card, Table, Tag,Modal, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import userData from "assets/data/user-list.data.json";
import axios from 'axios'
import utils from 'utils'
 function UserList()  {
	const { confirm } = Modal

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
  
	const [usersList, setUsers] = useState([])
	useEffect(() => {
		axios
		  .get(
			`http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/subscribers`,
		  )
		  .then((res) => {
			// console.log(res.data)
			setUsers(res.data)
		  })
	  }, [])




	const deleteUser = (row) => {
		const objKey = 'id'
		confirm({
		  title: 'Do you want to Delete this Subscriber?',
		  content: 'Once you click OK this user will be deleted .',
		  onOk() {
			axios
			  .delete(
				`http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/subcribers/${row.id}`,
			  )
			  .then(() => {
				message.success(`User has been deleted successfully`)
	
				let data = usersList
				if (selectedRows.length > 1) {
				  selectedRows.forEach((elm) => {
					data = utils.deleteArrayRow(data, objKey, elm.id)
					setUsers(data)
					setSelectedRows([])
				  })
				} else {
				  data = utils.deleteArrayRow(data, objKey, row.id)
				  setUsers(data)
				}
			  })
		  },
		})
	  }

	  const rowSelection = {
		onChange: (key, rows) => {
		  setSelectedRows(rows)
		  setSelectedRowKeys(key)
		},
	  }
	const tableColumns = [
		{
			title: 'Subscriber First Name',
			dataIndex: 'fullName',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus src={record.img} name={record.fullName} subTitle={record.email}/>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
					  b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Phone Number',
			dataIndex: 'phoneNumber',
			sorter: {
				compare: (a, b) => a.role.length - b.role.length,
			},
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			
			sorter: (a, b) => moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
		},
		{
			title: 'Country',
			dataIndex: 'country',
		
			sorter: (a, b) => moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
		},
		// {
		// 	title: 'Status',
		// 	dataIndex: 'status',
		// 	render: status => (
		// 		<Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
		// 	),
		// 	sorter: {
		// 		compare: (a, b) => a.status.length - b.status.length,
		// 	},
		// },
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={()=> {deleteUser(elm)}} size="small"/>
					</Tooltip>
				</div>
			)
		}
	];
 
	
		

		return (
			<Card bodyStyle={{'padding': '0px'}}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={usersList} rowKey='id' />
				</div>
				
			</Card>
		)
		}


export default UserList;
