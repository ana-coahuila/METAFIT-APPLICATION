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
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
      {/* Header */}
      <View style={styles.header1}>
        
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/11893/11893500.png' }}
                    style={styles.icon}
                  />
        <Text style={styles.greeting}>Hola, {user.fullName.split(' ')[0]} </Text>
      </View>
        </View>
      

      {/* Información Metafit */}
      <View style={styles.card}>
        <Text style={styles.title}>¿Qué es Metafit?</Text>
        <Text style={{ color: '#000000ff', marginVertical: 8 }}>
          Metafit es tu compañero digital en el camino hacia una vida más saludable. 
          Te ofrece planes diarios de comidas y ejercicios adaptados a ti.
        </Text>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg' }}
          
          style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 12 }}
          resizeMode="cover"
        />
        <Text style={{ color: '#000000ff', marginVertical: 8 }}>
          Las metas para ganar peso saludablemente se centran en aumentar la 
          ingesta calórica de manera nutritiva mediante comidas más frecuentes y 
          alimentos ricos en nutrientes, y en incorporar ejercicio para construir 
          masa muscular.
        </Text>
          <Image
          source={{ uri: 'https://images.pexels.com/photos/4828104/pexels-photo-4828104.jpeg' }}
          style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 12 }}
          resizeMode="cover"
        />
      </View>

      {/* Plan de hoy */}
      <View style={styles.card}>
        <View style={styles.row}>
                  <Image
                    source={{ uri: 'https://cdn-icons-gif.flaticon.com/10306/10306567.gif' }} 
                    style={styles.icon} 
                  />
        <Text style={styles.title}>Plan de hoy    </Text>
         <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/12639/12639936.png' }} 
                    style={styles.icon} 
                  /></View>
        <Text>No hay plan hoy</Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('Plan' as never)}
        >
          <Text style={styles.buttonText}>Ir a Generar plan</Text>
        </TouchableOpacity>
      </View>

      {/* Registro de peso */}
      <View style={styles.card}>
        <View style={styles.row}>
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/6774/6774897.png' }} 
                    style={styles.icon} 
                  />
        <Text style={styles.title}>Registro de peso</Text>
        <Image source={{ uri:'https://cdn-icons-gif.flaticon.com/19016/19016722.gif' }} 
                    style={styles.icon} 
                  /></View>
        
         <View style={styles.row}>
                  <Text > Usted Actualmente pesa</Text>
                  <Text style={styles.title}>  {user.weight} kg</Text>
                </View>
        <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate('Progress' as never)}
        >

          <Text style={styles.buttonText}>Ir a Registrar peso</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
