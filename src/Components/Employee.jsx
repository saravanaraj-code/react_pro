import {React,useState,useEffect} from 'react'
import { Table, Form, Input, Button,Modal,Switch,message } from 'antd';
import  styled  from 'styled-components';
import API from './Api/ApiServices';

const {TextArea} = Input
const Employee = () => {
  const [modelOpen, setModelOpen] = useState(false);   
  const [task, setTask] = useState([]);
  const api = new API();

  const modelFunc = () => {
    setModelOpen(true)
  }; 

  const getAllTask = () => {
    api.gettask().then((res) => {
     setTask(res?.data?.tasks);
    })
  }

  const getAllTask1 = () => {
    api.gettask1().then((res) => {
     setTask(res?.data?.tasks);
    })
  }

  const userActive = async (checked, record) => {  
    const status = checked ? "Completed" : "Pending";
    let data = { "id":record.key,"task_status":status}
    console.log(data);
    api.changeStatus(data).then((res) => {
      // setUserData(res?.data.data);
      console.log("status",res?.data);
      if (res?.status === 200) {
        message.success("User Status Updated Successfully");
        getAllTask();
      } else {
        message.error("Something Went Wrong!");
      }
    });
  };

  useEffect(() => {
    getAllTask1();
  }, []);

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
    title: 'Task Status',
    dataIndex: 'task_status',
    key: 'task_status',
  },
  {
    title: "Action",
    dataIndex: "action", // You need to provide a unique dataIndex for each column
    key: "action", // Provide a unique key
    render: (_, record) => (
      console.log(record),
      <>
        <Switch defaultChecked={record?.task_status === "Completed"} onChange={(checked)=>userActive(checked, record)} />
      </>
    )
  }
]

  return (  
    <div>
    <TaskSections>
   <Title>
    <div className='Title'>
    <h1>Task List</h1>
    {/* <Button type='primary' onClick = {modelFunc}>
  Add
    </Button> */}
    
  </div>
  </Title>
    <TableAlign>
    <div className='Container'>
     
    <Table 
    columns={columns}
    dataSource={data}
    pagination={false}
    />
    </div>
    </TableAlign>
    </TaskSections>
    </div>
    
  )
}

export default Employee;

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