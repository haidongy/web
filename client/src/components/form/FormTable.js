import React, { Component } from 'react';
import { Table, Icon, Popconfirm } from 'antd';

export default class FormTable extends Component{
    constructor(props){
        super(props);
        this.state={ };
    }

    render(){
        const { checkChange, onDelete, editClick,loading } = this.props;
        const rowSelection = {
                onChange: checkChange,
                getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        const columns = [
        {
            title: '来源',
            dataIndex: 'loanName',
            width: 80,
        }, {
            title: '总数',
            dataIndex: 'total',
            sorter: (a, b) => a.total - b.total,
            width: 80,
        },{
            title: '结清',
            dataIndex: 'current',
            width: 180,
        },{
            title: '剩余数',
            dataIndex: 'remainder',
            width: 120,
        }
        ,{
            title: '剩余金额（元）',
            dataIndex: 'remainderSum',
            width:140,
        },{
            title: '操作',
            dataIndex: 'opera',
            width:100,
            render: (text, record) =>
                <div className='opera'>
                    <span onClick={() => editClick(record)}><Icon type="edit" /> 修改</span><br />
                    <span><Popconfirm title="确定要删除吗?" onConfirm={() => onDelete(record.id)}><Icon type="minus-square-o" /> 删除 </Popconfirm></span>
                </div>
        }
        ];
        return(
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.dataSource}
                bordered={true}
                scroll={{x:'100%'}}
                className='formTable'
                loading={loading}
                rowKey='id'
            />
        )
    }
}
