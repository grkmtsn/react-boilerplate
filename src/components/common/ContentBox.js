import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader, Button } from 'antd';

function ContentBox({ children, title }) {
  const styles = {
    wrapper: {
      backgroundColor: '#fff',
      padding: title ? '0 24px' : '24px',
    },
    header: {
      backgroundColor: '#fff',
    },
  };
  return (
    <div>
      {title && (
        <PageHeader
          style={styles.header}
          title={title}
          extra={[
            <Button key="2">Filter</Button>,
            <Button key="1" type="primary">
              Add
            </Button>,
          ]}
        />
      )}
      <div style={styles.wrapper}>{children}</div>
    </div>
  );
}

ContentBox.defaultProps = {
  title: '',
};

ContentBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { ContentBox };
