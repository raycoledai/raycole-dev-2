// @flow strict
import { Table, Button } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';

import 'antd/dist/antd.css';
import PriceHistoryChart from '../../../components/PriceHistoryChart';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'cmcRank',
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
  },
];

const HorizontalSpacer = () => <span style={{ marginLeft: 8 }} />;

export default function MarketIndex() {
  const [selectedRowKeys, onSelectChange] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [index, setIndex] = React.useState([]);
  const dataLoaded = useRef(0);
  const [loading, setLoading] = React.useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    console.log('fetching data: coins');
    const apiCall = await fetch('http://127.0.0.1:5000/coins');
    const response = await apiCall.json();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, [dataLoaded]);

  const sendRequest = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    console.log('fetching data: calculate_index');

    const apiCall = await fetch('http://127.0.0.1:5000/calculate_index', {
      method: 'post',
      body: JSON.stringify({
        coin_ids: selectedRowKeys,
      }),
    });
    const response = await apiCall.json();
    setIndex(response);
    console.log(index);

    if (isMounted.current) {
      setLoading(false);
    }
  }, [index, loading, selectedRowKeys]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="Crypto">
      <div style={{ marginBottom: 16 }}>
        <PriceHistoryChart data={index} height={900} width={1600} ratio={1} />
        <Button
          type="primary"
          onClick={sendRequest}
          disabled={!hasSelected}
          loading={loading}
        >
          Calculate
        </Button>
        <HorizontalSpacer />
        <Button
          type="primary"
          onClick={() => onSelectChange([])}
          disabled={!hasSelected}
        >
          Clear Selection
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}
