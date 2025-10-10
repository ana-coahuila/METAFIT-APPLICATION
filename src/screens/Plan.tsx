import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Coffee, Sun, Moon, Dumbbell, Clock, Flame, Play, Calendar, Utensils } from 'lucide-react-native';
import axios from 'axios';
import styles from '../styles/PlanStyles';
import { useAuth } from '../context/AuthContext';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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

const DayMealsSection = ({ day, meals, isToday }: any) => (
  <View style={styles.daySection}>
    <View style={styles.dayHeader}>
      <Text style={[styles.dayTitle, isToday && styles.todayTitle]}>{day}</Text>
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
                    {meal.category}
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

const ExerciseCard = ({ name, duration, difficulty, calories, description }: any) => (
  <TouchableOpacity style={styles.exerciseCard}>
    <View style={styles.exerciseIcon}>
      <Dumbbell size={24} color="#3B82F6" />
    </View>
    <View style={styles.exerciseContent}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{name}</Text>
        <TouchableOpacity style={styles.playButton}>
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

// Helper functions
const getMealColorByType = (mealType: string) => {
  const colors: { [key: string]: string } = {
    'Desayuno': '#F59E0B',  // Amarillo/naranja
    'Almuerzo': '#10B981',  // Verde
    'Cena': '#8B5CF6',      // Púrpura
    'Comida': '#6B7280'     // Gris por defecto
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

// Función original para BMI (se mantiene por si acaso)
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

const Plan = () => {
  const { token } = useAuth();
  const [plan, setPlan] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  const fetchPlanAndExercises = async () => {
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
    } catch (err) {
      console.error('Error al obtener datos:', err);
      setError('No se pudieron cargar los datos. Por favor intenta nuevamente o ingresa el peso inicial en el apartado de progreso.');
      
      
    } finally {
      setLoading(false);
    }
  };

  const generateNewPlan = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/plans/generate`, {}, {
        headers: { 'x-auth-token': token },
      });
      setPlan(response.data);
      await fetchPlanAndExercises();
    } catch (err) {
      console.error('Error al generar nuevo plan:', err);
      setError('Error al generar nuevo plan');
    }
  };

  useEffect(() => {
    if (token) fetchPlanAndExercises();
  }, [token]);

  const weeklyMealsData = [
    { day: 'Lunes', meals: plan?.weeklyMeals?.monday, key: 'monday' },
    { day: 'Martes', meals: plan?.weeklyMeals?.tuesday, key: 'tuesday' },
    { day: 'Miércoles', meals: plan?.weeklyMeals?.wednesday, key: 'wednesday' },
    { day: 'Jueves', meals: plan?.weeklyMeals?.thursday, key: 'thursday' },
    { day: 'Viernes', meals: plan?.weeklyMeals?.friday, key: 'friday' },
    { day: 'Sábado', meals: plan?.weeklyMeals?.saturday, key: 'saturday' },
    { day: 'Domingo', meals: plan?.weeklyMeals?.sunday, key: 'sunday' }
  ];

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
        <TouchableOpacity onPress={fetchPlanAndExercises} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
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
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9757/9757053.png' }} 
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
        {/* Botón para generar nuevo plan */}
        <View style={styles.generatePlanContainer}>
          <TouchableOpacity onPress={generateNewPlan} style={styles.generatePlanButton}>
            <Text style={styles.generatePlanText}>Generar Nuevo Plan</Text>
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
                    name={plan.meals.breakfast.name}
                    calories={plan.meals.breakfast.calories}
                    category={plan.meals.breakfast.category}
                    icon={Coffee}
                    color="#F59E0B"
                  />
                  <MealCard
                    type="Almuerzo"
                    name={plan.meals.lunch.name}
                    calories={plan.meals.lunch.calories}
                    category={plan.meals.lunch.category}
                    icon={Sun}
                    color="#10B981"
                  />
                  <MealCard
                    type="Cena"
                    name={plan.meals.dinner.name}
                    calories={plan.meals.dinner.calories}
                    category={plan.meals.dinner.category}
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
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2906/2906587.png' }} 
            style={styles.icon} 
          />     Ejercicios del Día</Text>
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <ExerciseCard 
                    key={exercise._id}
                    name={exercise.name}
                    duration={exercise.duration}
                    difficulty={exercise.difficulty}
                    calories={exercise.caloriesBurned}
                    description={exercise.description}
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
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Plan;