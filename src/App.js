import logo from './logo.svg';
import './App.css';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const { token: { colorBgContainer } } = theme.useToken();
  
  // 图表数据源 - 使用state管理
  const [chartData, setChartData] = useState([]);
  
  // X轴数据 - 使用state管理
  const [xAxisData, setXAxisData] = useState([]);
  
  // 模拟数据请求，延迟1秒后设置数据
  useEffect(() => {
    // 模拟API请求
    const fetchData = async () => {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟获取到的数据
      const mockChartData = [
        { 
          name: '曼哈顿',
          smooth: true,
          data: [-190, 100, 100, null, 130, 140, 150],
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        { 
          name: '国贸',
          data: [210, 120, 330, 100, 470, 690, -200],
          smooth: true,
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        { 
          name: '商业中心',
          data: [1500, 120, 830, -800, 170, 190, -1500],
          smooth: true,
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        }
      ];
      
      const mockXAxisData = ['2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01'];
      
      // 设置数据
      setChartData(mockChartData);
      setXAxisData(mockXAxisData);
    };
    
    fetchData();
  }, []);

  const navs = ["订单供给", "运力履约", "服务质量", "毛利趋势"]

  const columns = [
    {
      title: '日期',
      dataIndex: 'name',
    },
    {
      title: '区域',
      dataIndex: 'age',
    },
    {
      title: '订单毛利',
      dataIndex: 'address',
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  return (
    <div className="App">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ background: "white", borderRight: "1px solid" }}
        >
          <div style={{ height: 60, width: "100%", lineHeight: "60px", borderBottom: "1px solid" }}>城市经营分析平台</div>
          <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: navs[index],
              }),
            )}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                // background: colorBgContainer,
              }}
            >
              <div style={{ background: colorBgContainer, width: "100%", height: 400, marginBottom: 30 }}>
                <Chart 
                  type="line"
                  dataSource={chartData}
                  xAxisData={xAxisData || {}}
                  title="折线图示例"
                />
              </div>
              <div style={{ background: colorBgContainer, width: "100%", height: 400 }}>
                <Chart 
                  type="bar"
                  dataSource={chartData}
                  xAxisData={xAxisData || {}}
                  title="柱形图示例"
                />
              </div>
              <div style={{ background: colorBgContainer, width: "100%", marginTop:30,padding:10 }}>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;