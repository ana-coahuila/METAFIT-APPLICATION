import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    fontFamily: ' fantasy',
  },
  date: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  mealCardContent: {
    flex: 1,
  },
  mealCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealType: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealCalories: {
    fontSize: 14,
    color: '#6B7280',
  },
  mealCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mealCategoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  recipesScroll: {
    paddingBottom: 8,
  },
  recipeCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipeImageContainer: {
    height: 120,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeInfo: {
    padding: 12,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recipeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  recipeDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  recipeDifficulty: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recipeDifficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  exerciseDifficulty: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  exerciseDifficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
   noExercisesText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  createPlanButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createPlanButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 58,
    height: 58,
    marginRight: 30,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    margin: 16,
    borderRadius: 12,
    padding: 4,
     marginBottom: 30,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#10B981',
  },

  // Botón generar plan
  generatePlanContainer: {
    paddingHorizontal: 50,
    marginBottom: 25,
    marginTop: 19,
  },
  generatePlanButton: {
    backgroundColor: '#259febff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  generatePlanText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // BMI Badge
  bmiBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  bmiBadgeText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
  },

  // Sección de día semanal
  daySection: {
    marginBottom: 20,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  todayTitle: {
    color: '#10B981',
  },
  todayBadge: {
    backgroundColor: '#00ccffff',
    paddingHorizontal: 100,
    paddingVertical: 8,
    borderRadius: 8,
    
  },
  
  todayBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },

  // Día vacío
  emptyDayCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#E5E7EB',
  },

  // Header de sección mejorado
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  // Estilos para el indicador de hoy
  todayIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    
  },

  // Estilos para tarjetas semanales (manteniendo consistencia)
  weeklyMealCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  weeklyMealCardToday: {
    borderLeftColor: '#10B981',
    borderLeftWidth: 4,
  },
  weeklyMealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weeklyMealDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  weeklyMealDayToday: {
    color: '#10B981',
  },
  weeklyMealContent: {
    // Contenido de comidas
  },
  weeklyMealItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  weeklyMealItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  weeklyMealName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 6,
  },
  weeklyMealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weeklyMealCalories: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  weeklyMealCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  // Botón de reintento
  retry_Button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retry_ButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Subtítulo de sección
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },



// Estilos para el sistema de eventos
actionButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 28,
  gap: 10,
},

generate_PlanButton: {
  flex: 1,
  backgroundColor: '#3B82F6',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
},

eventButton: {
  flex: 1,
  backgroundColor: '#EF4444',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},

generatePText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},

eventButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},

// Modal styles
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

modalContent: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 24,
  width: '100%',
  maxHeight: '80%',
},

modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},

modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F2937',
},

closeButton: {
  padding: 4,
},

modalSubtitle: {
  fontSize: 14,
  color: '#6B7280',
  marginBottom: 24,
  textAlign: 'center',
},

inputLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#374151',
  marginBottom: 12,
},

// Event options
eventsContainer: {
  marginBottom: 24,
},

eventOption: {
  backgroundColor: '#F3F4F6',
  padding: 16,
  borderRadius: 12,
  marginRight: 12,
  minWidth: 140,
  borderWidth: 2,
  borderColor: 'transparent',
},

eventOptionSelected: {
  backgroundColor: '#DBEAFE',
  borderColor: '#3B82F6',
},

eventOptionText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#374151',
  marginBottom: 4,
},

eventOptionTextSelected: {
  color: '#1E40AF',
},

eventDescription: {
  fontSize: 12,
  color: '#6B7280',
},

// Day options
daysContainer: {
  marginBottom: 24,
},

dayOption: {
  backgroundColor: '#F3F4F6',
  padding: 12,
  borderRadius: 8,
  marginRight: 8,
  borderWidth: 2,
  borderColor: 'transparent',
},

dayOptionSelected: {
  backgroundColor: '#D1FAE5',
  borderColor: '#10B981',
},

dayOptionText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#374151',
},

dayOptionTextSelected: {
  color: '#065F46',
},

// Modal actions
modalActions: {
  marginTop: 8,
},

submitButton: {
  backgroundColor: '#10B981',
  paddingVertical: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
},

submitButtonDisabled: {
  backgroundColor: '#9CA3AF',
},

submitButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},

// Adaptation message
adaptationMessage: {
  backgroundColor: '#D1FAE5',
  borderLeftWidth: 4,
  borderLeftColor: '#10B981',
  padding: 16,
  marginHorizontal: 20,
  marginTop: 10,
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
},

adaptationMessageText: {
  color: '#065F46',
  fontSize: 14,
  fontWeight: '500',
  flex: 1,
},

// Adjusted badge styles
dayTitleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

adjustedBadge: {
  backgroundColor: '#FEF3C7',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#F59E0B',
},

adjustedBadgeText: {
  fontSize: 10,
  color: '#92400E',
  fontWeight: '600',
},


errorButtons: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 10,
},

generateButton: {
  backgroundColor: '#10B981',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 8,
  minWidth: 120,
  alignItems: 'center',
},
generateButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},










});