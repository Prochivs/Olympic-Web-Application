import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Button, Card, Table, Tag, Select, Badge } from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import DonutChartWidget from 'components/shared-components/DonutChartWidget'
import NumberFormat from 'react-number-format';
import {
	VideoCameraOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	SyncOutlined,
	BarChartOutlined
} from '@ant-design/icons';
import ChartWidget from 'components/shared-components/ChartWidget';
import { COLORS } from 'constants/ChartConstant';
import {
	weeklyRevenueData,
	customerChartData,

} from './SalesDashboardData'

import utils from 'utils'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { mapValues } from 'lodash';
const { Option } = Select;









const Customers = () => {

	return (
		<Card
			title="Subscribers By Countries and Gender"
		>

			<div>
				<ChartWidget
					card={false}
					series={customerChartData}
					xAxis={weeklyRevenueData.categories}
					height={280}
					customOptions={
						{
							colors: [COLORS[6], COLORS[0]],
							legend: {
								show: false
							},
							stroke: {
								width: 2.5,
								curve: 'smooth'
							},
						}
					}
				/>
			</div>
		</Card>
	)
}




const SalesDashboard = () => {
	const [events, setEvents] = useState([])
	const [eventsResults, setResults] = useState([]);
	const [male, setMale] = useState([]);
	const [female, setFemale] = useState([]);

	const [user, setSubscribers] = useState([])
	const DisplayDataSet = () => (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={12}>
				<DataDisplayWidget
					icon={<UserOutlined />}
					value={user.length}
					title="Total Subscribers"
					color="cyan"
					vertical={true}
					avatarSize={55}
				/>
				<DataDisplayWidget
					icon={<UsergroupAddOutlined />}
					value={male.length}
					title="Males"
					color="gold"
					vertical={true}
					avatarSize={55}
				/>
			</Col>
			<Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={12}>
				<DataDisplayWidget
					icon={<VideoCameraOutlined />}
					value={list.length}
					title="Events Streamed"
					color="blue"
					vertical={true}
					avatarSize={55}
				/>
				<DataDisplayWidget
					icon={<UsergroupAddOutlined />}
					value={female.length}
					title="Females"
					color="volcano"
					vertical={true}
					avatarSize={55}
				/>
			</Col>
		</Row>
	)
	const [list, setList] = useState([])

	const RecentOrder = () => (
		<Card title="Recent Olympic Events">
			<Table
				pagination={false}
				columns={tableColumns}
				dataSource={list}
				rowKey='id'
			/>
		</Card>
	)


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

	]
	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/events`,
			)
			.then((res) => {
				// console.log(res.data)
				setList(res.data)
			})
		axios
			.get(
				"https://us-central1-funolympic-fnqi.cloudfunctions.net/app/api/eventresults"
			).then((eventsResults) => {
				//console.log(subscribers);

				setResults(eventsResults);
			})
			.catch((error) => {
				console.log(error);
			});


		axios
			.get(
				`http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/subscribers`,
			)
			.then((res) => {
				// console.log(res.data)
				setSubscribers(res.data)
				let filteredMale = res.data.filter(function (e) {
					return e.gender === "Male";
				  });
				  let filteredFemale = res.data.filter(function (e) {
					return e.gender === "Female";
				  });
				  setMale(filteredMale);
				  setFemale(filteredFemale);
			})
	}, [])
	// const { direction } = useSelector(state => state.theme)

	return (
		<>
			<Row gutter={16}>
				{/* <Col xs={24} sm={24} md={24} lg={16} xl={15} xxl={14}>
					<WeeklyRevenue />
				</Col> */}



				<Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
					<DisplayDataSet />
				</Col>
				<Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={14}>
					<Customers />
				</Col>
			</Row>


			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<RecentOrder />
				</Col>
			</Row>
		</>
	)
}

export default SalesDashboard
