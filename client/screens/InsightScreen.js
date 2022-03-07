import React from 'react';

import {Chart, Line, Area, HorizontalAxis, VerticalAxis} from 'react-native-responsive-linechart';

import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';

import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const InsightScreen = ({ navigation, route }) => {
  const data = {
    labels: ['Sad', 'Happy', 'Run'], // optional
    data: [0.02, 0.11, 0.85],
  };

  const pieData = [
    {
      name: 'Neutral',
      percentage: 0.8,
      color: '#C1272D',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Happy',
      percentage: 0.11,
      color: '#8CC63F',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Sad',
      percentage: 0.02,
      color: '#F7931E',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Angry',
      percentage: 0.04,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Fearful',
      percentage: 0.02,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundColor: '#e26a00',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View>
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 36,
          color: '#1B1464',
          fontWeight: 'bold',
        }}
      >
        Detected Emotion
      </Text>
      <Chart
        style={{ height: 200, width: '100%', marginTop: 40 }}
        data={[
          { x: 5, y: 15 },
          { x: 6, y: 6 },
          { x: 7, y: 15 },
          { x: 8, y: 3 },
        ]}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 5, max: 8 }}
      >
        <VerticalAxis
          tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { formatter: (v) => v.toFixed(2) },
          }}
        />
        <HorizontalAxis
          tickCount={9}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
          }}
        />
        <Line
          smoothing='cubic-spline'
          tension={0.3}
          theme={{ stroke: { color: 'red', width: 2 } }}
        />
        <Line
          data={[
            { x: 1, y: 7 },
            { x: 2, y: 6 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 3, y: 3 },
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 7, y: 14 },
            { x: 8, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 18 },
          ]}
          smoothing='cubic-spline'
          tension={0.15}
          theme={{ stroke: { color: 'blue', width: 2 } }}
        />
        <Line
          data={[
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 15 },
          ]}
          smoothing='cubic-spline'
          tension={0.3}
          theme={{ stroke: { color: 'green', width: 2 } }}
        />
        <Line
          data={[
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 1, y: 7 },
            { x: 2, y: 6 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 7, y: 14 },
            { x: 8, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 18 },
          ]}
          smoothing='cubic-spline'
          tension={0.3}
          theme={{ stroke: { color: 'orange', width: 2 } }}
        />
      </Chart>
      <View style={{ backgroundColor: '#1B1464' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 36,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
        Your Moods{' '}
        </Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor='percentage'
          backgroundColor='transparent'
          paddingLeft='15'
          absolute
        />
      </View>
    </View>
  );
};

export default InsightScreen;