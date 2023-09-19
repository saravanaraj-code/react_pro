import {React,useEffect,useState} from 'react'
import { Table, Form, Input, Button,Modal, message } from 'antd';
import  styled  from 'styled-components';
import API from './Api/ApiServices';
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
const {TextArea} = Input
const User = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen1, setModelOpen1] = useState(false);  
  const [user, setUser] = useState([]);   
  const api = new API();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const modelFunc = () => {
    setModelOpen(true)
  }; 

  const getAllUserList = () => {
    api.getuser().then((res) => {
     console.log("res===>", res);
     setUser(res?.data?.data);
    })
  }

  useEffect(() => {
    getAllUserList();
  }, []);

const data = [];
user?.map((i, e) => {
  data.push({
    key: i?.id,
    sno: e + 1,
    email_id: i?.email_id,
    full_name: i?.full_name,
    role: i?.role,
    action: i?.id,
  });
})

const onFinish = (values) => {
  // console.log('Received values of form: ', values);
  const data = {...values, role:"Employee"}
 api.Signup(data).then((res) => {
  if(res?.status === 201){
      message.success("Sigup successfully")
      setModelOpen(false)
      getAllUserList();
  }else {
  message.error("Something went wrong!")
  }
 }) }

const handleEditModel = (action) => {
  console.log("action", action)
  setModelOpen1(true);
api.viewuser(action).then((res) => {
  console.log("res?.data", res?.data)
 form1.setFieldsValue({
  ...res?.data,
  id: res?.data?.id
});
})

}

const UpdateUser = (values) => {
 
  const data = {...values}
  api.updateuser(data).then((res) => {
    console.log("first", res);
    if(res?.status === 201) {
      setModelOpen1(false);
      message.success("Updated Successfully");
      getAllUserList();
    }else {
      message.error("Something Went Wrong!")
    }
  })

}

const DeleteUser = (action) => {
  api.deleteuser(action).then((res) => {
    console.log("res", res);
    if(res?.status === 200) {
      message.success("Deleted Successfully");
      getAllUserList();
    }else {
      message.error("Something Went Wrong!")
    }
  })
}


  const columns=[
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email_id',
      key: 'email_id',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action,name',
      key: 'action,name',
      render: (action, record) => (
        console.log("record", record),
        // <div>
        //   <Button type="primary" size="small" onClick={()=> handleEditModel(record?.key)}>Edit</Button>
        //   <Button type="danger" size="small" onClick={() =>DeleteUser(record?.key)}>Delete</Button>
        // </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
          <p className='Edit' onClick={()=> handleEditModel(record?.key)}>
          <EditOutlined
          style={{ color: "#1677ff", cursor: "pointer" }}
          />
          </p>
          <p onClick={() =>DeleteUser(record?.key)}>
          <DeleteOutlined  style={{ color: "red",cursor: "pointer" }}/>
          </p>

          {/* <Button type="primary" size="small" >Edit</Button>
          <Button type="danger" size="small" >Delete</Button> */}
        </div>
        
      ),
    }

  ]

  

  return (  
    <div>
    <TaskSections>
   <Title>
    <div className='Title'>
    <h1>User List</h1>
    <Button type='primary' onClick = {modelFunc}>
  Add
    </Button>
    
  </div>
  </Title>
    <TableAlign>
    <div className='Container'>
     
    <Table
    className='Table' 
    columns={columns}
    dataSource={data}
    pagination={false}
    />
    </div>
    </TableAlign>
    </TaskSections>
    <Modal title="Add User"
    open = {modelOpen}
    onCancel={() =>setModelOpen(false)}
    footer={null}
    >
      <Form
        name="signup"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="full_name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email_id"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name=""
          rules={[{ required: true, message: 'Please enter your password again!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType='submit'>
          Save
        </Button>
      </Form>
    </Modal>
    <Modal
    title="Edit User"
    open={modelOpen1}
    onCancel={()=> setModelOpen1(false)}
    footer={null}
    >
 <Form
        name="signup"
        layout="vertical"
        form={form1}
        onFinish={UpdateUser}
      >
        <Form.Item name="id" style={{ display: 'none' }}>
         <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="Name"
          name="full_name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email_id"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          disabled
        >
          <Input.Password disabled/>
        </Form.Item>
        <Button
        type='primary'
        htmlType="submit"

        >
          Update
        </Button>
      </Form>


    </Modal>
    </div>
    
  )
}

export default User;

const TaskSections =styled.div`
 height: 100vh;
`

const TableAlign = styled.div`

.ant-table {
  width: 250%;
    margin-left: -72%;
}

`

const Title = styled.div`
.Title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 245%;
    margin-left: -69%;
}

`