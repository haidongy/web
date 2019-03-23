import React, { Component } from 'react';
import './form.less';

import moment from 'moment';
import { Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm, Modal } from 'antd';

import BreadcrumbCustom from '../common/BreadcrumbCustom';
import CollectionCreateForm from './CustomizedForm';
import FormTable from './FormTable';

const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;

//数组中是否包含某项
// function isContains(arr, item){
//     arr.map(function (ar) {
//         if(ar === item){
//             return true;
//         }
//     });
//     return false;
// }

//替换数组的对应项
// function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
//     arr.map(function (ar) {
//         if(ar.key === item){
//             arr.splice(arr.indexOf(ar),1,place)
//         }
//     });
//     return arr;
// }

export default class UForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loanName: '',
            loanName2: '',
            timeRange: [],
            visible: false, //新建窗口隐藏
            selectedRowKeys: [],
            tableRowKey: 0,
            isUpdate: false,
            loading: true,
            dateForm:[],
        };
    }
    //加载数据
    getData = () => {
        var url ="loan/findLoanRecord";
        var getInformation ={
            method:"GET",
            headers:{
            "Content-Type":"application/json"
            },
            }
            fetch(url,getInformation)
            .then(response => response.json())
            .then(json =>{
                // 返回的数据 根据自己返回的json格式取值
                this.setState({
                        dateForm:json,
                        loading:false
                })
            })
    };
    //按照来源搜索change
    onChangeUserName = (e) => {
        const value = e.target.value;
        this.setState({
            loanName: value,
        })
    };
    //用按照来源搜索search
    onSearchUserName = (value) => {
        const { dateForm } = this.state;
        this.setState({
            dateForm: dateForm.filter(item => item.loanName.indexOf(value) !== -1),
            loading: false,
        })
    };
    //下拉选择
    Cascader_Select = (value) => {
        const { dateForm } = this.state;
        if(value.length===0){
            this.setState({
                loanName2: value,
                dateForm: [],
            });
            this.getData();
        }else{
            this.setState({
                loanName2: value,
                dateForm: dateForm.filter(item => item.loanName === value[0])
            });
        }
    };
    //时间选择
    RangePicker_Select = (date, dateString) => {
        const { dateForm } = this.state;
        const startime = moment(dateString[0]);
        const endtime = moment(dateString[1]);
        if(date.length===0){
            this.setState({
                timeRange: date,
                dateForm: [],
            });
            this.getData();
        }else{
            this.setState({
                timeRange: date,
                dateForm: dateForm.filter(item => (moment(item.opTime.substring(0,10)) <= endtime  && moment(item.opTime.substring(0,10)) >= startime) === true)
            });
        }
    };
    //渲染
    componentDidMount(){
        var url ="loan/findLoanRecord";
        var getInformation ={
            method:"GET",
            headers:{
            "Content-Type":"application/json"
            },
            }
            fetch(url,getInformation)
            .then(response => response.json())
            .then(data =>{
                data.forEach((post) => {
                options.push({
                        value: post.loanName,
                        label: post.loanName,
                })
            })
            })


        //二维码生成器
        // var filter1 = {
        //   //user: "admin"
        // }
        // var url ="loan/php";
        // var getInformation ={
        //     method:"POST",
        //     headers:{
        //     "Content-Type":"application/json"
        //     },
        //     /* json格式转换 */
        //      body:"" //
        //     }
        //     fetch(url,getInformation)
        //     .then(response => response.json())
        //     .then(data =>{
        //         if (data.code == 1) {
        //             this.setState({
        //                 img:'http://qr.topscan.com/api.php?text=' + data.data,
        //             })
        //             //轮询 查询该qruuid的状态 直到登录成功或者过期(过期这里没判断，留给大家)
        //             var interval1= setInterval(function () {
        //                 var url ="loan/php2";
        //                 var getInformation ={
        //                     method:"POST",
        //                     headers:{
        //                     "Content-Type":"application/json"
        //                     },
        //                     /* json格式转换 */
        //                      body:""
        //                     }
        //                     fetch(url,getInformation)
        //                     .then(response => response.json())
        //                     .then(data =>{
        //                         alert('扫码成功（即登录成功），进行跳转.....');
        //                         clearInterval(interval1);
        //                         //TODO 拿到需要的信息 然后跳转什么的
        //                         //停止轮询
        //                     })
                        
        //             }, 1000);//1秒钟  频率按需求
        //     }
        // })
        // <img id="qrcodeimg" src={this.state.img}/>


        this.getData();
    }
    //搜索按钮==========================================================================
    btnSearch_Click = () => {
        
    };//==================================================================================
    //重置按钮
    btnClear_Click = () => {
        this.setState({
            lanName: '',
            dateForm: [],
        });
        this.getData();
    };
    //新建信息弹窗
    CreateItem = () => {
        this.setState({
            visible: true,
            isUpdate: false,
        });
        const form = this.form;
        form.resetFields();//清空表单中的值
    };
    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };
    //添加记录
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
        var url ="loan/saveLoanRecord";
        var getInformation ={
            method:"PUT",
            headers:{
            "Content-Type":"application/json"
            },
            /* json格式转换 */
             body:JSON.stringify(values) //
            }
            fetch(url,getInformation)
            .then(response => response.json())
            .then(data =>{
                if(data === 1){
                      Modal.success({title: '提示',content: `数据更新成功`,});
                }
                this.setState({
                    visible: false
                });
                this.getData();
            })
            
        });
    };
    //取消
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //批量删除
    // MinusClick = () => {
    //     const { selectedRowKeys } = this.state;
    //     this.setState({
    //         dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.key)),
    //     });
    // };
    //单个删除
    onDelete = (id) => {
        var filter = {
          id: id
        }
        var url ="loan/removeLoanRecord";
        var getInformation ={
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            /* json格式转换 */
             body:JSON.stringify(filter) //
            }
            fetch(url,getInformation)
            .then(response => response.json())
            .then(json =>{
                if(json === 1){
                      Modal.success({title: '提示',content: `数据更新成功`,});
                }
                // 返回的数据 根据自己返回的json格式取值
                this.getData();
            })
    };
    //点击修改
    editClick = (date) => {
        const form = this.form;
        form.setFieldsValue({
            loanName: date.loanName,
            total: date.total,
            current: date.current,
            remainder: date.remainder,
            totalSum: date.totalSum,
            currentSum: date.currentSum,
            remainderSum: date.remainderSum,
        });
        this.setState({
            visible: true,
            tableRowKey: date.id,
            isUpdate: true,
        });
    };
    //更新修改
    handleUpdate = () => {
        const form = this.form;
        const { tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }          
        var filter = {
                  id: tableRowKey,
                  loanName: values.loanName,
                  total: values.total,
                  current: values.current,
                  remainder: values.remainder,
                  totalSum: values.totalSum,
                  currentSum: values.currentSum,
                  remainderSum: values.remainderSum, 
        }
        var url ="loan/updateLoanRecord";
        var getInformation ={
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            /* json格式转换 */
             body:JSON.stringify(filter) //
            }
            fetch(url,getInformation)
            .then(response => response.json())
            .then(json =>{
                if(json === 1){
                      Modal.success({title: '提示',content: `数据更新成功`,});
                }
                form.resetFields();
                this.setState({
                    visible: false,
                });
                // 返回的数据 根据自己返回的json格式取值
                this.getData();
            })


            
        });
    };
    //单选框改变选择
    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    render(){
        const { loanName, timeRange, visible, isUpdate, loading,loanName2 } = this.state;
        const questiontxt = ()=>{
            return (
                <p>
                    <Icon type="plus-circle-o" /> : 新建信息<br/>
                    <Icon type="minus-circle-o" /> : 批量删除
                </p>
            )
        };
        return(
            <div>
                <BreadcrumbCustom paths={['首页','表单']}/>
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="输入来源"
                                prefix={<Icon type="user" />}
                                value={loanName}
                                onChange={this.onChangeUserName}
                                onSearch={this.onSearchUserName}
                            />
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <InputGroup compact>
                                <Cascader style={{ width: '100%' }} options={options} placeholder="选择来源" onChange={this.Cascader_Select} value={loanName2}/>
                            </InputGroup>
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <RangePicker style={{ width:'100%' }} onChange={this.RangePicker_Select} value={timeRange}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div className='plus' onClick={this.CreateItem}>
                            <Icon type="plus-circle" />
                        </div>
                        <div className='minus'>
                            <Popconfirm title="确定要批量删除吗?" onConfirm={this.onDelete}>
                                <Icon type="minus-circle" />
                            </Popconfirm>
                        </div>
                        <div className='question'>
                            <Tooltip placement="right" title={questiontxt}>
                                <Icon type="question-circle" />
                            </Tooltip>
                        </div>
                        <div className='btnOpera'>
                            <Button type="primary" onClick={this.btnSearch_Click} style={{marginRight:'10px'}}>查询</Button>
                            <Button type="primary" onClick={this.btnClear_Click} style={{background:'#f8f8f8', color: '#108ee9'}}>重置</Button>
                        </div>
                    </Row>
                    <FormTable
                        dataSource={this.state.dateForm}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                    {isUpdate?
                        <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="修改信息" okText="更新"
                    /> : <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="新建信息" okText="创建"
                    />}
                </div>
            </div>
        )
    }
}