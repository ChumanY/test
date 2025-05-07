import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LoadingScreen from './LoadingScreen';

const screenWidth = Dimensions.get('window').width;

interface ChartData {
  labels: string[];
  datasets: { data: number[]; strokeWidth: number }[];
}

interface DashboardScreenProps {
  navigation: NavigationProp<any>;
}

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('2025-04-01');
  const [endDate, setEndDate] = useState('2025-04-07');
  const [geo, setGeo] = useState('Spain');

  const fetchData = async () => {
    setLoading(true);
    const MIN_LOADING_TIME = 1000; // Tiempo mínimo de carga en milisegundos
    const startTime = Date.now();

    try {
      const query = `
        query {
          getEnergyPriceHourlyByDate(startDate: "${startDate}", endDate: "${endDate}", geo: "${geo}") {
            geo
            date
            id
            values
          }
        }
      `;

      const response = await axios.post('http://localhost:8080/graphql', {
        query,
      });

      if (response.data.data.getEnergyPriceHourlyByDate.length === 0) {
        alert('No data available for the selected range or location. Please try different parameters.');
        setData(null);
        return;
      }

      const chartData: ChartData = {
        labels: response.data.data.getEnergyPriceHourlyByDate.map((item: any) => item.date),
        datasets: [
          {
            data: response.data.data.getEnergyPriceHourlyByDate.map((item: any) => item.values.reduce((a: number, b: number) => a + b, 0) / item.values.length),
            strokeWidth: 2,
          },
        ],
      };
      setData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADING_TIME - elapsedTime;
      setTimeout(() => setLoading(false), Math.max(remainingTime, 0));
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Dashboard</Text>
            <Button title="Sign Out" onPress={() => navigation.navigate('Login')} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
          />
          <TextInput
            style={styles.input}
            placeholder="End Date (YYYY-MM-DD)"
            value={endDate}
            onChangeText={setEndDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Geo (e.g., Spain)"
            value={geo}
            onChangeText={setGeo}
          />
          <Button title="Fetch Data" onPress={fetchData} />
          {data && (
            <LineChart
              data={data}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          )}
        </>
      )}
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#000',
  backgroundGradientTo: '#000',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});