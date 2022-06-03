import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Tabs,
  DatePicker,
  Row,
  Col,
  Select,
  List,
  Form,
  Input,
  Avatar,
  Comment,
  Tooltip,
  Card,
  Upload,
  Button,
  message,
} from "antd";
import Flex from "components/shared-components/Flex";
// import GeneralField from './GeneralField'
import VariationField from "./VariationField";
import ShippingField from "./ShippingField";
import { Facebook, Twitter } from 'react-sharingbuttons'
import { CommentOutlined,SearchOutlined, ShareAltOutlined } from "@ant-design/icons";
import ProductListData from "assets/data/product-list.data2.json";
import moment from "moment";
import axios from "axios";
import { auth, storage } from "../../../../../firebase";
import YouTube from "@u-wave/react-youtube";
import 'react-sharingbuttons/dist/main.css'
const { TabPane } = Tabs;
const { TextArea } = Input;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const [events, setEvents] = useState({});
  const [errors, setErrors] = useState({});
  const [v, setValue] = useState([{
    value:""
  }]);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [fetchComments, setfetchComments] = useState([]);
  const [comments, setComments] = useState({
    comment: "",
  });
  const { TextArea } = Input;
  useEffect(() => {
    fetch(
      "http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/eventComments"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((fetchComments) => {
        const { id } = param;

        let filteredComments = fetchComments.filter(function (e) {
          return e.id === id;
        });

        setfetchComments(filteredComments);
      })
      .catch((error) => {
        setErrors(error);
      });

    axios
      .get(
        `http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/subscribers
    `
      )
      .then((res) => {
        console.log(res.data);
        setSubscribers(res.data);
      });

    if (mode === EDIT) {
      const { id } = param;

      axios
        .get(
          `http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/events/${id}
      `
        )
        .then((res) => {
          setEvents(res.data.virtualLink);
        })
        .then(() => { });
    }
  }, []);

  // const handle = (e) => {
  //   setComments({ ...comments, [e.target.name]: e.target.value });
  // };

  // const submit = () => {
  //   // setComments({ comment: '' })
  //   const { id } = param;
  //   let email = auth.currentUser.email;
  //   let subcr = subscribers.filter((e) => {
  //     return e.email === email;
  //   });

  //   let name = subcr[0].fullName;
  //   let comment = comments.comment;
  //   axios
  //     .post(
  //       "http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/eventComments",
  //       { fullName: name, comment, id }
  //     )
  //     .then(() => {
  //       message.success("Comment Shared");
  //       //this shows comment to the comments after commenting
  //       setfetchComments([...fetchComments, { fullName: name, comment, id }])
  //     });
  // };

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
 
	const handleSubmit = () => {
    const { id } = param;
    let emailAddress = auth.currentUser.email;
    let subcr = subscribers.filter((e) => {
      return e.email === emailAddress;
    });

    // let name = subcr[0].fullName;
    let comment = comments.comment;
	  if (!v.value) {
		return;
	  }
  
	 setSubmitting({
		submitting: true,
	  });

    axios
      .post(
        "http://localhost:5000/fun-olympic-games-24ef8/us-central1/app/api/eventComments",
        { fullName:emailAddress, comment, id }
      )
      .then(() => {
      
        setfetchComments([...fetchComments, { fullName: emailAddress, comment, id }])
      });
  
	  setTimeout(() => {
		setSubmitting(false);
		setValue('');
		 setComment([
			{
			  author: emailAddress,
			  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			  content: <p>{v.value}</p>,
			  datetime: moment().fromNow(),
			},
			...comment,
		  ],
		);
	  }, 1000);
	};


  const handleChange = (e) => {
    setValue({ ...v, [e.target.name]: e.target.value })
  }
  const url = `https://youtu.be/${events}`


  return (
    <>

        <PageHeaderAlt className="bg-primary" overlap>
					<div className="container text-center">
						<div className="py-lg-4">
							<h1 className="text-white display-4">Enjoy the Olympic Games</h1>
							<Row type="flex" justify="center">
								<Col xs={24} sm={24} md={12}>
									<p className="text-white w-75 text-center mt-2 mb-4 mx-auto">
										Look at these words. Are they small words? And he referred to my words - if they're small, something else must be small..
									</p>
								</Col>
							</Row>
							<Row type="flex" justify="center" className="mb-5">
								<Col xs={24} sm={24} md={12}>
								</Col>
							</Row>
						</div>
					</div>
				</PageHeaderAlt>
      <Row gutter={16}>
        <Col xs={24} sm={16} md={24}>
        <Row type="flex" justify="center" className="mb-5">
          <Card hoverable>
            <div    style={{justify:"center"}}       >
              <YouTube  height={600}
        width={1200} video="jx5hdo50a2M" autoplay />
            </div>
          </Card>
          </Row>
        </Col>

       
        <Col xs={24} sm={8} md={14}>
       
        <div    className="mb-10">
			{comment.length > 0 && <CommentList comments={comment} />}
			<Comment
			  avatar={
				<Avatar
				  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
				  alt="Han Solo"
				/>
			  }
			  content={
          <div    style={{justify:"center"}}       >
         <Form.Item>
                          <Input.TextArea
                            name="value"
                            placeholder="Enter the short Description"
                            onChange={handleChange}
                            value={v.value}
                            className="w-100"
                            rows={4}
                          />
      </Form.Item>
      <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
              Add Comment
            </Button>

          
            <Facebook url={url} />
         
          </Form.Item>

          
        </div>
			  }
			/>
		  </div>
       
        </Col>
    
      </Row>
    </>
  );
};

export default ProductForm;
