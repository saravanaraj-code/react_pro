import {React,useState,useEffect} from 'react'
import { Table, Form, Input, Button,Modal,message, Select } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import  styled  from 'styled-components';
import API from './Api/ApiServices';

const {TextArea} = Input

const Task = () => {
  const api = new API();
  const [modelOpen, setModelOpen] = useState(false); 
  const [modelOpen1, setModelOpen1] = useState(false);    
  const [task, setTask] = useState([]);
  const [user, setUser] = useState([]);  
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [selectedUser, setselectedUser] = useState({})
  const employee = localStorage.getItem("user_id");
  
  const getAllUserList = () => {
    api.getuser().then((res) => {
     console.log("res===>", res);
     setUser(res?.data?.data);
    })
  }

  const user_list = []
  user.map((item)=>{
    user_list.push({
      label: item.full_name,
      value: item.id
    })
  })

  const UpdateTask = (values) => {
    const data = {...values,allocated_user_name: selectedUser.label, allocated_employee_id: selectedUser.value}
    api.addTask(data).then((res) => {
      if(res?.status === 201) {
        setModelOpen1(false);
        message.success("Task Updated Successfully");
        getAllTask();
      }else {
        message.error("Something Went Wrong!")
      }
    })
  
  }

  const modelFunc = () => {
    getAllUserList()
    setModelOpen(true)
  }; 

  const getAllTask = () => {
    api.gettask().then((res) => {

     setTask(res?.data?.tasks);
    })
  }

  useEffect(() => {
    getAllTask();
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const data = {...values,employee:employee, task_status:"Pending", allocated_user_name: selectedUser.label, allocated_employee_id: selectedUser.value}
   api.addTask(data).then((res) => {
    if(res?.status === 201){
        message.success("Task Assign successfully")
        setModelOpen(false)
        getAllTask();
    }else {
    message.error("Something went wrong!")
    }})
  console.log(data)
    }

  const data = [];
  task?.map((i, e) => {
  data.push({
    key: i?.id,
    sno: e + 1,
    title: i?.title,
    description: i?.description,
    allocated_user_name: i?.allocated_user_name,
    task_status: i?.task_status,
    action: i?.id,
  });
})

const handleUserChange = (value, option) => {
  setselectedUser(option)
}

const handleEditModel = (action) => {
  console.log("action", action)
  setModelOpen1(true);
api.viewtask(action).then((res) => {
  console.log("res?.data", res?.data)
 form1.setFieldsValue({
  ...res?.data,
  id: res?.data?.id
});
})}

const DeleteUser = (action) => {
  api.deletetask(action).then((res) => {
    console.log("res", res);
    if(res?.status === 201) {
      message.success("Deleted Successfully");
      getAllTask();
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
      title: 'Task Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Task Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'UserName',
      dataIndex: 'allocated_user_name',
      key: 'allocated_user_name',
    },
    {
      title: 'Task Status',
      dataIndex: 'task_status',
      key: 'task_status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action, record) => (
        
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
    <h1>Task Summary</h1>
    <Button type='primary' onClick = {modelFunc}>
  Add
    </Button>
    
  </div>
  </Title>
    <TableAlign>
    
     
    <Table 
    columns={columns}
    dataSource={data}
    pagination={false}
    />
  
    </TableAlign>
    </TaskSections>
    <Modal title="Add Task"
    open = {modelOpen}
    onCancel={() =>setModelOpen(false)}
    footer={null}
    >
      <Form
      layout='vertical'
      onFinish={onFinish}
      form={form}
      >
        <Form.Item label="Task Title"
        name="title"
        rules={[{ required: true, message: 'Please enter task title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Task Description"
        name="description"
        rules={[{ required: true, message: 'Please enter task description!' }]}
        >
          <TextArea/>
        </Form.Item>
        <Form.Item label="Employee Name"
        name="allocated_user_name"
        rules={[{ required: true, message: 'Please enter employee name!' }]}
        >
          <Select 
          options={user_list}
          onChange={handleUserChange}
          />
        </Form.Item>
        <Button type="primary" htmlType='submit'>
          Save
        </Button>
      </Form>
    </Modal>

    <Modal
    title="Edit Task"
    open={modelOpen1}
    onCancel={()=> setModelOpen1(false)}
    footer={null}
    >
 <Form
        name="signup"
        layout="vertical"
        form={form1}
        onFinish={UpdateTask}
      >
       <Form.Item name="id" style={{ display: 'none' }}>
  <Input type="hidden" />
</Form.Item>
        <Form.Item
          label="Task Title"
          name="title"
          rules={[{ required: true, message: 'Please enter task title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Task Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a task description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="UserName"
          name="allocated_user_name"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <Select 
          options={user_list}
          onChange={handleUserChange}
          />
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

export default Task;

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
