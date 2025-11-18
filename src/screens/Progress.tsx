import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProgressStyles';
import axios from 'axios';
import Constants from "expo-constants";

// Reemplazamos la URL de la API para producción
const apiUrl = Constants.expoConfig?.extra?.API_URL;
console.log("✅ API URL usada en Progress:", apiUrl);

type WeightRecord = {
  _id?: string;
  createdAt?: string;
  date?: string;
  weight: number;
};

type User = {
  fullName: string;
  weight: number;
  height: number;
  targetWeight: number;
  bmi: number;
  bmiCategory: string;
};

const Progress: React.FC = () => {
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [newWeight, setNewWeight] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);



  // Cargar datos del usuario y progreso
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        // Datos del usuario
        const userRes = await axios.get(`${apiUrl}/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Historial de progreso
        const progressRes = await axios.get(`${apiUrl}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWeightRecords(progressRes.data || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        Alert.alert('Error', 'No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Registrar nuevo peso en el backend
  const handleSubmit = async () => {
    const weightValue = parseFloat(newWeight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setError('Por favor ingresa un peso válido');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token || !user) return;

      const res = await axios.post(
        `${apiUrl}/progress`,
        {
          weight: weightValue,
          height: user.height,
          targetWeight: user.targetWeight,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setWeightRecords((prev) => [res.data.progress, ...prev]);

      setNewWeight('');
      setShowForm(false);
      setError('');

      Alert.alert('Éxito', res.data.message || 'Progreso registrado');
    } catch (err) {
      console.error('Error al guardar progreso:', err);
      Alert.alert('Error', 'No se pudo guardar el progreso.');
    }
  };

  const calculateProgress = () => {
    if (weightRecords.length === 0 || !user) return 0;

    const sorted = [...weightRecords].sort(
      (a, b) =>
        new Date(a.createdAt || a.date || '').getTime() -
        new Date(b.createdAt || b.date || '').getTime()
    );

    const initial = sorted[0]?.weight;
    const current = sorted[sorted.length - 1]?.weight;
    const goal = user.targetWeight;

    if (goal < initial)
      return current <= goal
        ? 100
        : current >= initial
        ? 0
        : ((initial - current) / (initial - goal)) * 100;

    if (goal > initial)
      return current >= goal
        ? 100
        : current <= initial
        ? 0
        : ((current - initial) / (goal - initial)) * 100;

    return 100;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  if (loading) return <Text style={styles.header}>Cargando datos...</Text>;
  if (!user) return <Text style={styles.header}>No hay usuario autenticado.</Text>;

  const sortedRecords = [...weightRecords].sort(
    (a, b) =>
      new Date(a.createdAt || a.date || '').getTime() -
      new Date(b.createdAt || b.date || '').getTime()
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 4, paddingTop: 40 }}
    >
      <Text style={styles.header}>Hola, {user.fullName.split(' ')[0]}</Text>

      {/* Progreso */}
      <View style={styles.card}>
        
        <Text style={styles.title}> 
          <Image source={{ uri: 'https://i.postimg.cc/vBYdYqv8/grafica.png' }} 
                        style={styles.icon} />    PROGRESO HACIA TU META </Text>
                        
       <View style={styles.statsRow}>
  <View style={styles.statsColumn}>
    <Text style={styles.statLabel}>Meta: {user.targetWeight} kg</Text>
  </View>
  <View style={styles.statsColumn}>
    <Text style={[styles.statLabel, { textAlign: 'right' }]}>
      Peso Actual: {user.weight} kg
    </Text>
  </View>
</View>

        <Text style={styles.percent}>{calculateProgress().toFixed(1)}%</Text>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${calculateProgress()}%` }]} />
        </View>
      </View>

      {/* Botón para registrar peso */}
      <TouchableOpacity style={styles.button} onPress={() => setShowForm(!showForm)}>
        <Text style={styles.buttonText}>Registrar peso</Text>
      </TouchableOpacity>

      {/* Formulario */}
      {showForm && (
        <View style={styles.form}>
          <TextInput
            placeholder="Peso actual (kg)"
            keyboardType="numeric"
            value={newWeight}
            onChangeText={setNewWeight}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.formRow}>
            <TouchableOpacity onPress={() => setShowForm(false)} style={styles.cancelBtn}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
              <Text style={{ color: '#fff' }}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Registros */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={{ uri: 'https://i.postimg.cc/q7rQhgZj/weighlog.png' }}
            style={styles.icon}
          />
          <Text style={[styles.title]}>Registros</Text>
        </View>

        {sortedRecords.length === 0 ? (
          <Text>No hay registros de peso ingresa tu peso inicial </Text>
        ) : (
          sortedRecords
            .slice()
            .reverse()
            .map((record, i, arr) => {
              const prev = arr[i + 1];
              const diff = prev ? (record.weight - prev.weight).toFixed(1) : null;
              const isLoss = diff && parseFloat(diff) < 0;
              return (
                <View
                  key={(record.createdAt || record.date || '') + i}
                  style={styles.recordRow}
                >
                  <Text>{formatDate(record.createdAt || record.date)}</Text>
                  <Text>{record.weight} kg</Text>
                  {diff && (
                    <Text style={{ color: isLoss ? 'green' : 'red' }}>
                      {parseFloat(diff) > 0 ? '+' : ''}
                      {diff} kg
                    </Text>
                  )}
                </View>
              );
            })
        )}
      </View>

      {/* Estadísticas */}
      <View style={styles.card}>
        <View style={[styles.section, { marginTop: 24 }]}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3703/3703300.png' }}
              style={styles.icon}
            />
            <Text style={[styles.sectionTitle, { marginHorizontal: 8 }]}>Estadísticas</Text>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2821/2821733.png' }}
              style={styles.icon}
            />
          </View>
        </View>

        {/* Diseño de dos columnas para las estadísticas */}
        <View style={styles.statsContainer}>
          {/* Columna izquierda */}
          <View style={styles.statsColumn}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Peso inicial:</Text>
              <Text style={styles.statValue}>
                {sortedRecords[0]?.weight ?? user.weight} kg
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Categoría:</Text>
              <Text style={styles.statValue}>{user.bmiCategory}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Peso actual:</Text>
              <Text style={styles.statValue}>{user.weight} kg</Text>
            </View>
          </View>

          {/* Columna derecha */}
          <View style={styles.statsColumn}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Objetivo:</Text>
              <Text style={styles.statValue}>{user.targetWeight} kg</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>IMC:</Text>
              <Text style={styles.statValue}>{user.bmi.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Progress;
