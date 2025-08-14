import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/DashboardStyles';

type User = {
  fullName: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${apiUrl}/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text>Cargando información...</Text>
      </View>
    );
  }

  if (!user) return <Text style={{ textAlign: 'center', marginTop: 50 }}>No hay usuario autenticado</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <View style={styles.header1}>
        <Text style={styles.greeting}>Hola, {user.fullName.split(' ')[0]}</Text>
      </View>

      {/* Información Metafit */}
      <View style={styles.card}>
        <Text style={styles.title}>¿Qué es Metafit?</Text>
        <Text style={{ color: '#4B5563', marginVertical: 8 }}>
          Metafit es tu compañero digital en el camino hacia una vida más saludable. 
          Te ofrece planes diarios de comidas y ejercicios adaptados a ti.
        </Text>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg' }}
          style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 12 }}
          resizeMode="cover"
        />
      </View>

      {/* Plan de hoy */}
      <View style={styles.card}>
        <Text style={styles.title}>Plan de hoy</Text>
        <Text>No hay plan hoy</Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('Plan' as never)}
        >
          <Text style={styles.buttonText}>Generar plan</Text>
        </TouchableOpacity>
      </View>

      {/* Registro de peso */}
      <View style={styles.card}>
        
        <Text style={styles.title}>Registro de peso</Text>
         <View style={styles.row}>
                  <Text >Peso actual:</Text>
                  <Text style={styles.mealName}>{user.weight} kg</Text>
                </View>
        <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('Progress' as never)}
        >
          <Text style={styles.buttonText}>Registrar peso</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
