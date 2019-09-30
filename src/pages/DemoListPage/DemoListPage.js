/* eslint-disable camelcase */
import React from 'react';
import { Table, Button, Popconfirm, Icon } from 'antd';

import { ContentBox } from '@/components/common';
import { commonService } from '@/services';

class DemoListPage extends React.Component {
  state = {
    loading: false,
    data: null,
    pagination: null,
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'actions',
        width: '150px',
        render: id => (
          <React.Fragment>
            <Button
              type="ghost"
              onClick={() => {
                alert(`Edited ID: ${id}`);
              }}
            >
              <Icon type="edit" />
            </Button>
            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                alert(`Deleted ID: ${id}`);
              }}
              placement="topRight"
            >
              <Button style={{ marginLeft: 15 }} type="danger">
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </React.Fragment>
        ),
      },
    ],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (params = {}) => {
    this.setState({ loading: true });
    const defaultParams = {
      per_page: 10,
      page: 1,
    };
    commonService
      .list({ ...defaultParams, ...params }, 'users')
      .then(res => {
        this.setState(state => {
          console.log(res);
          const { page, per_page, total, total_pages, data } = res;
          const { pagination } = state;
          const paging = { ...pagination };
          paging.total = total;
          paging.totalPages = total_pages;
          paging.current = page;
          paging.pageSize = per_page;

          return {
            data,
            loading: false,
            pagination: paging,
          };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ data: null, loading: false });
      });
  };

  handleTableChange = pagination => {
    this.setState(state => {
      const pager = { ...state.pagination };
      pager.current = pagination.current;
      pager.pageSize = pagination.pageSize;
      return {
        pagination: pager,
      };
    });
    this.fetchData({
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  };

  render() {
    const { data, columns, loading, pagination } = this.state;
    const paginationSettings = {
      ...pagination,
      showTotal: total => <span>{total} Record</span>,
      showSizeChanger: true,
      showQuickJumper: true,
    };
    return (
      <ContentBox title="User List">
        <Table
          loading={loading}
          rowKey={record => record.id}
          dataSource={data}
          columns={columns}
          pagination={paginationSettings}
          onChange={this.handleTableChange}
        />
      </ContentBox>
    );
  }
}

export { DemoListPage };
