import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Image, Linking, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Coffee, Sun, Moon, Dumbbell, Clock, Flame, Play, Calendar, Utensils, AlertCircle, X } from 'lucide-react-native';
import axios from 'axios';
import styles from '../styles/PlanStyles';
import { useAuth } from '../context/AuthContext';

import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.API_URL;
console.log("✅ API URL usada en Plan:", apiUrl);

// Card Components
const MealCard = ({ type, name, calories, category, icon: Icon, color }: any) => (
  <TouchableOpacity style={[styles.mealCard, { borderLeftColor: color }]}>
    <View style={styles.mealCardContent}>
      <View style={styles.mealCardHeader}>
        <Icon size={20} color={color} />
        <Text style={[styles.mealType, { color }]}>{type}</Text>
      </View>
      <Text style={styles.mealName}>{name}</Text>
      <View style={styles.mealDetails}>
        <Text style={styles.mealCalories}>{calories} kcal</Text>
        <View style={[styles.mealCategory, { backgroundColor: `${color}20` }]}>
          <Text style={[styles.mealCategoryText, { color }]}>{category}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const DayMealsSection = ({ day, meals, isToday, adjusted }: any) => (
  <View style={styles.daySection}>
    <View style={styles.dayHeader}>
      <View style={styles.dayTitleContainer}>
        <Text style={[styles.dayTitle, isToday && styles.todayTitle]}>{day}</Text>
        {adjusted && (
          <View style={styles.adjustedBadge}>
            <Text style={styles.adjustedBadgeText}>🔄 Ajustado</Text>
          </View>
        )}
      </View>
      {isToday && (
        <View style={styles.todayBadge}>
          <Text style={styles.todayBadgeText}>Hoy</Text>
        </View>
      )}
    </View>
    
    {meals && meals.length > 0 ? (
      meals.map((meal: any, index: number) => {
        const mealType = getMealTypeByIndex(index);
        const mealColor = getMealColorByType(mealType);
        const MealIcon = getMealIconByType(mealType);
        
        return (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.mealCard, 
              { borderLeftColor: mealColor },
              isToday && styles.weeklyMealCardToday
            ]}
          >
            <View style={styles.mealCardContent}>
              <View style={styles.mealCardHeader}>
                <MealIcon size={20} color={mealColor} />
                <Text style={[styles.mealType, { color: mealColor }]}>
                  {mealType}
                </Text>
              </View>
              <Text style={styles.mealName}>{meal.name}</Text>
              <View style={styles.mealDetails}>
                <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
                <View style={[styles.mealCategory, { backgroundColor: `${mealColor}20` }]}>
                  <Text style={[styles.mealCategoryText, { color: mealColor }]}>
                    {meal.category || 'General'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    ) : (
      <View style={styles.emptyDayCard}>
        <Text style={styles.emptyText}>No hay comidas planificadas para este día</Text>
      </View>
    )}
  </View>
);

// Componente ExerciseCard actualizado
const ExerciseCard = ({ name, duration, difficulty, calories, description, videoUrl }: any) => {
  const handlePlayPress = async () => {
    if (videoUrl) {
      const supported = await Linking.canOpenURL(videoUrl);
      
      if (supported) {
        await Linking.openURL(videoUrl);
      } else {
        console.error('No se puede abrir la URL:', videoUrl);
        alert('No se puede abrir el video. URL no válida.');
      }
    } else {
      console.error('No hay URL de video disponible');
      alert('No hay video disponible para este ejercicio.');
    }
  };

  return (
    <TouchableOpacity style={styles.exerciseCard}>
      <View style={styles.exerciseIcon}>
        <Dumbbell size={24} color="#3B82F6" />
      </View>
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{name}</Text>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <Play size={20} color="#3B82F6" fill="#3B82F6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.exerciseDescription}>{description}</Text>
        <View style={styles.exerciseDetails}>
          <View style={styles.exerciseDetail}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.exerciseDetailText}>{duration} min</Text>
          </View>
          <View style={styles.exerciseDetail}>
            <Flame size={14} color="#6B7280" />
            <Text style={styles.exerciseDetailText}>{calories} kcal</Text>
          </View>
          <View style={[styles.exerciseDifficulty, {
            backgroundColor: difficulty === 'Principiante' ? '#D1FAE5' :
              difficulty === 'Intermedio' ? '#FEF3C7' : '#FEE2E2'
          }]}>
            <Text style={[styles.exerciseDifficultyText, {
              color: difficulty === 'Principiante' ? '#065F46' :
                difficulty === 'Intermedio' ? '#92400E' : '#991B1B'
            }]}>{difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Helper functions
const getMealColorByType = (mealType: string) => {
  const colors: { [key: string]: string } = {
    'Desayuno': '#F59E0B',
    'Almuerzo': '#10B981',
    'Cena': '#8B5CF6',
    'Comida': '#6B7280'
  };
  return colors[mealType] || '#6B7280';
};

const getMealIconByType = (mealType: string) => {
  const icons: { [key: string]: any } = {
    'Desayuno': Coffee,
    'Almuerzo': Sun,
    'Cena': Moon,
    'Comida': Utensils
  };
  return icons[mealType] || Utensils;
};

const getMealTypeByIndex = (index: number) => {
  const types = ['Desayuno', 'Almuerzo', 'Cena'];
  return types[index] || 'Comida';
};

const getMealColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Bajo peso': '#3B82F6',
    'Normal': '#10B981',
    'Sobrepeso': '#F59E0B',
    'Obesidad I': '#EF4444',
    'Obesidad II': '#DC2626',
    'Obesidad III': '#991B1B'
  };
  return colors[category] || '#6B7280';
};

// Nuevos tipos de eventos
const EVENT_TYPES = [
  { value: 'fiesta', label: '🎉 Fiesta', description: 'Exceso calórico (+600 cal)' },
  { value: 'viaje', label: '✈️ Viaje', description: 'Exceso calórico (+400 cal)' },
  { value: 'enfermedad', label: '🤒 Enfermedad', description: 'Déficit calórico (-300 cal)' },
  { value: 'estrés', label: '😫 Estrés', description: 'Exceso leve (+200 cal)' },
  { value: 'día_libre', label: '🏖️ Día Libre', description: 'Exceso calórico (+300 cal)' }
];

// Componente Modal para Eventos
const EventModal = ({ visible, onClose, onSubmit, loading }: any) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = [
    { value: 'monday', label: 'Lunes' },
    { value: 'tuesday', label: 'Martes' },
    { value: 'wednesday', label: 'Miércoles' },
    { value: 'thursday', label: 'Jueves' },
    { value: 'friday', label: 'Viernes' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' }
  ];

  const handleSubmit = () => {
    if (selectedEvent && selectedDay) {
      onSubmit(selectedEvent, selectedDay);
    }
  };

  const resetForm = () => {
    setSelectedEvent('');
    setSelectedDay('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reportar Evento</Text>
            <TouchableOpacity onPress={resetForm} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalSubtitle}>
            La IA ajustará automáticamente tu plan nutricional según el evento
          </Text>

          <Text style={styles.inputLabel}>Tipo de Evento</Text>
          <ScrollView style={styles.eventsContainer} horizontal showsHorizontalScrollIndicator={false}>
            {EVENT_TYPES.map((event) => (
              <TouchableOpacity
                key={event.value}
                style={[
                  styles.eventOption,
                  selectedEvent === event.value && styles.eventOptionSelected
                ]}
                onPress={() => setSelectedEvent(event.value)}
              >
                <Text style={[
                  styles.eventOptionText,
                  selectedEvent === event.value && styles.eventOptionTextSelected
                ]}>
                  {event.label}
                </Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.inputLabel}>Día del Evento</Text>
          <ScrollView style={styles.daysContainer} horizontal showsHorizontalScrollIndicator={false}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day.value}
                style={[
                  styles.dayOption,
                  selectedDay === day.value && styles.dayOptionSelected
                ]}
                onPress={() => setSelectedDay(day.value)}
              >
                <Text style={[
                  styles.dayOptionText,
                  selectedDay === day.value && styles.dayOptionTextSelected
                ]}>
                  {day.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.submitButton, (!selectedEvent || !selectedDay) && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!selectedEvent || !selectedDay || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Aplicar Ajustes de IA</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Plan = () => {
  const { token, user } = useAuth();
  const [plan, setPlan] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [adapting, setAdapting] = useState(false);
  const [adaptationMessage, setAdaptationMessage] = useState<string | null>(null);
  const [adjustedDays, setAdjustedDays] = useState<Set<string>>(new Set());

  // Cargar datos del servidor
  const fetchServerData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [planResponse, exercisesResponse] = await Promise.all([
        axios.get(`${apiUrl}/plans/me`, {
          headers: { 'x-auth-token': token },
        }),
        axios.get(`${apiUrl}/exercises/generate`, {
          headers: { 'x-auth-token': token },
        })
      ]);

      setPlan(planResponse.data);
      setExercises(exercisesResponse.data.exercises || []);
      console.log('🌐 Datos cargados desde el servidor');
      
    } finally {
      setLoading(false);
    }
  };

  // Generar nuevo plan
  const generateNewPlan = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/plans/generate`, {}, {
        headers: { 'x-auth-token': token },
      });
      
      const newPlan = response.data;
      setPlan(newPlan);
      setAdjustedDays(new Set()); // Resetear días ajustados
      
      Alert.alert('Éxito', 'Nuevo plan generado correctamente');
    } catch (err: any) {
      console.error('Error al generar nuevo plan:', err);
      Alert.alert('Error', 'No se pudo generar el plan. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // FUNCIÓN CORREGIDA: Adaptar plan con IA - LLAMANDO DIRECTAMENTE A FLASK
  const adaptPlanWithAI = async (eventType: string, day: string) => {
    try {
      setAdapting(true);
      setEventModalVisible(false);
      
      const userId = user?._id || user?.id;
      
      if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario');
      }

      if (!plan) {
        throw new Error('No hay plan disponible para ajustar');
      }

      console.log('🚀 Enviando solicitud de adaptación directamente a Flask...', { 
        eventType, 
        day, 
        userId,
        hasWeeklyMeals: !!plan.weeklyMeals
      });

      // CORRECCIÓN: Llamar directamente al endpoint de Flask
      const response = await axios.post('https://ia-metafit-production.up.railway.app/adapt', {
        userId: userId,
        eventType: eventType,
        day: day,
        plan: plan.weeklyMeals  // Enviar weeklyMeals completo
      }, {
        headers: { 
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      console.log('✅ Respuesta recibida de Flask:', response.data);

      if (response.data.updatedPlan) {
        // Actualizar el plan con la respuesta de Flask
        const updatedPlan = {
          ...plan,
          weeklyMeals: response.data.updatedPlan
        };

        setPlan(updatedPlan);

        // Identificar días ajustados (solo para mostrar visualmente)
        const daysAdjusted = new Set<string>();
        daysAdjusted.add(day);
        
        // Para eventos que afectan múltiples días
        if (eventType === 'fiesta' || eventType === 'viaje') {
          const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
          const dayIndex = weekDays.indexOf(day);
          const nextDay1 = weekDays[(dayIndex + 1) % 7];
          const nextDay2 = weekDays[(dayIndex + 2) % 7];
          daysAdjusted.add(nextDay1);
          daysAdjusted.add(nextDay2);
        }
        
        setAdjustedDays(daysAdjusted);

        setAdaptationMessage(response.data.message || 'Plan ajustado exitosamente');
        
        console.log('🔄 Plan actualizado desde Flask');
        console.log('🎯 Días ajustados:', Array.from(daysAdjusted));
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          setAdaptationMessage(null);
        }, 5000);

      } else {
        throw new Error('No se recibió un plan actualizado de Flask');
      }

    } catch (err: any) {
      console.error('❌ Error al adaptar plan con IA Flask:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Error desconocido';
      Alert.alert('Error', `No se pudo ajustar el plan: ${errorMessage}`);
    } finally {
      setAdapting(false);
    }
  };

  // Recargar datos cuando cambia el token o usuario
  useEffect(() => {
    if (token && user) {
      fetchServerData();
    }
  }, [token, user]);

  const weeklyMealsData = [
    { day: 'Lunes', meals: plan?.weeklyMeals?.monday, key: 'monday', adjusted: adjustedDays.has('monday') },
    { day: 'Martes', meals: plan?.weeklyMeals?.tuesday, key: 'tuesday', adjusted: adjustedDays.has('tuesday') },
    { day: 'Miércoles', meals: plan?.weeklyMeals?.wednesday, key: 'wednesday', adjusted: adjustedDays.has('wednesday') },
    { day: 'Jueves', meals: plan?.weeklyMeals?.thursday, key: 'thursday', adjusted: adjustedDays.has('thursday') },
    { day: 'Viernes', meals: plan?.weeklyMeals?.friday, key: 'friday', adjusted: adjustedDays.has('friday') },
    { day: 'Sábado', meals: plan?.weeklyMeals?.saturday, key: 'saturday', adjusted: adjustedDays.has('saturday') },
    { day: 'Domingo', meals: plan?.weeklyMeals?.sunday, key: 'sunday', adjusted: adjustedDays.has('sunday') }
  ];

  // Debug: verificar datos
  console.log('📊 Plan actual:', plan ? '✅ Con datos' : '❌ Sin datos');

  const getCurrentDayName = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[new Date().getDay()];
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4cc5e7ff" />
        <Text style={styles.loadingText}>Cargando plan...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.errorButtons}>
          <TouchableOpacity onPress={fetchServerData} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={generateNewPlan} style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generar Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#00C9FF', '#92FE9D']}
        style={styles.header}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://i.postimg.cc/5yR2hdLY/ejercicio.png' }} 
            style={styles.icon} 
          />
          <Text style={styles.title}>
            {activeTab === 'daily' ? 'Plan Diario' : 'Plan Semanal'}
          </Text>
        </View>
        <Text style={styles.date}>
          {activeTab === 'daily' 
            ? `Hoy, ${new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}`
            : `Semana del ${new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}`
          }
        </Text>
      </LinearGradient>

      {/* Mensaje de adaptación de IA */}
      {adaptationMessage && (
        <View style={styles.adaptationMessage}>
          <AlertCircle size={20} color="#10B981" />
          <Text style={styles.adaptationMessageText}>{adaptationMessage}</Text>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}
        >
          <Sun size={20} color={activeTab === 'daily' ? '#10B981' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>
            Diario
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Calendar size={20} color={activeTab === 'weekly' ? '#10B981' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
            Semanal
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Botones de acción */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            onPress={generateNewPlan} 
            style={styles.generatePlanButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.generatePlanText}>Generar Nuevo Plan</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setEventModalVisible(true)} 
            style={styles.eventButton}
          >
            <AlertCircle size={20} color="#FFFFFF" />
            <Text style={styles.eventButtonText}>Reportar Evento</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'daily' ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Comidas del Día</Text>
              
              {plan?.meals ? (
                <>
                  <MealCard
                    type="Desayuno"
                    name={plan.meals.breakfast?.name || plan.meals.breakfast}
                    calories={plan.meals.breakfast?.calories || 250}
                    category={plan.meals.breakfast?.category || 'General'}
                    icon={Coffee}
                    color="#F59E0B"
                  />
                  <MealCard
                    type="Almuerzo"
                    name={plan.meals.lunch?.name || plan.meals.lunch}
                    calories={plan.meals.lunch?.calories || 600}
                    category={plan.meals.lunch?.category || 'General'}
                    icon={Sun}
                    color="#10B981"
                  />
                  <MealCard
                    type="Cena"
                    name={plan.meals.dinner?.name || plan.meals.dinner}
                    calories={plan.meals.dinner?.calories || 400}
                    category={plan.meals.dinner?.category || 'General'}
                    icon={Moon}
                    color="#8B5CF6"
                  />
                </>
              ) : (
                <Text style={styles.emptyText}>No hay plan nutricional disponible</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}> 
                <Image
                  source={{ uri: 'https://i.postimg.cc/NFVnhp0n/fRUTA.png' }} 
                  style={styles.icon} 
                /> Ejercicios del Día
              </Text>
              {exercises.length > 0 ? (
                exercises.map((exercise, index) => (
                  <ExerciseCard 
                    key={exercise._id || index}
                    name={exercise.name}
                    duration={exercise.duration}
                    difficulty={exercise.difficulty}
                    calories={exercise.caloriesBurned}
                    description={exercise.description}
                    videoUrl={exercise.videoUrl}
                  />
                ))
              ) : (
                <Text style={styles.noExercisesText}>No hay ejercicios asignados para hoy</Text>
              )}
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Planificación Semanal</Text>
              <View style={styles.bmiBadge}>
                <Text style={styles.bmiBadgeText}>BMI: {plan?.bmiCategory || 'No especificada'}</Text>
              </View>
            </View>
            
            {weeklyMealsData.map((dayData) => (
              <DayMealsSection
                key={dayData.key}
                day={dayData.day}
                meals={dayData.meals}
                isToday={dayData.day === getCurrentDayName()}
                adjusted={dayData.adjusted}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal para eventos */}
      <EventModal
        visible={eventModalVisible}
        onClose={() => setEventModalVisible(false)}
        onSubmit={adaptPlanWithAI}
        loading={adapting}
      />
    </SafeAreaView>
  );
};

export default Plan;