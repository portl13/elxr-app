import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $birthdate: Date
    $country: String
    $email: String
    $isImperial: Boolean
    $language: Language
    $mpDiversity: MealPlanDiversity
    $name: String
    $timezone: String
  ) {
    updateProfile(
      birthdate: $birthdate
      country: $country
      email: $email
      isImperial: $isImperial
      language: $language
      mpDiversity: $mpDiversity
      name: $name
      timezone: $timezone
    ) {
      errors {
        field
        messages
      }
      success
    }
  }
`;

export const PROFILE_RESTRICTIONS_UPDATE = gql`
  mutation profileRestrictionsUpdate($replace: Boolean, $restrictions: [ID]) {
    profileRestrictionsUpdate(replace: $replace, restrictions: $restrictions) {
      message
      restrictions
      success
    }
  }
`;

export const UPDATE_USER_PROGRAM = gql`
  mutation updateUserProgram($programId: String!) {
    updateUserProgram(programId: $programId) {
      message
      success
    }
  }
`;

export const USER_FAVORITE_RECIPE = gql`
  mutation userFavoriteRecipe($recipeId: String!) {
    userFavoriteRecipe(recipeId: $recipeId) {
      isUserFavorite
      success
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $birthdate: Date
    $email: String!
    $emailPasswordNotification: Boolean
    $extraData: JSONString
    $name: String!
    $phone: String
    $program: String
    $restrictions: [String]
  ) {
    createUser(
      birthdate: $birthdate
      email: $email
      emailPasswordNotification: $emailPasswordNotification
      extraData: $extraData
      name: $name
      phone: $phone
      program: $program
      restrictions: $restrictions
    ) {
      message
      success
      user {
        appleUserSource
        appleUserSourceJson
        avatar
        createdAt
        databaseId
        email
        id
        isActive
        isArUser
        name
        organizationId
        phone
        profileId
        updatedAt
        userSource
      }
    }
  }
`;

export const GENERATE_MEALPLAN = gql`
  mutation generateMealPlan(
    $useDatetime: Boolean
    $addDays: Boolean
    $breakfastDistribution: Float
    $dinnerDistribution: Float
    $ignoreLock: Boolean
    $includeFavorites: Boolean
    $isCache: Boolean
    $kcalLimit: Float
    $lunchDistribution: Float
    $maxIngredientsCount: IntValueByMealTime
    $maxNumOfServings: Int
    $maxServingWeight: Int
    $maxTimeMinutes: IntValueByMealTime
    $minServingWeight: Int
    $repeat: DateTime
    $snackDistribution: Float
  ) {
    generateMealPlan(
      addDays: $addDays
      breakfastDistribution: $breakfastDistribution
      dinnerDistribution: $dinnerDistribution
      ignoreLock: $ignoreLock
      includeFavorites: $includeFavorites
      isCache: $isCache
      kcalLimit: $kcalLimit
      lunchDistribution: $lunchDistribution
      maxIngredientsCount: $maxIngredientsCount
      maxNumOfServings: $maxNumOfServings
      maxServingWeight: $maxServingWeight
      maxTimeMinutes: $maxTimeMinutes
      minServingWeight: $minServingWeight
      repeat: $repeat
      snackDistribution: $snackDistribution
    ) {
      mealPlan {
        calories
        date(useDatetime: $useDatetime)
        day
        id
        meals {
          calories
          id
          maxNumOfServings
          meal
          numOfServings
          recipe {
            id
            name
            mainImage
          }
        }
      }
      message
      success
    }
  }
`;

export const START_OVER_MEALPLAN = gql`
  mutation startOverMealPlan {
    startOverMealPlan {
      message
      success
    }
  }
`;

// DOES NOT WORK USE ALTERNATIVE BELOW EVEN IF SINGLE RECIPE
export const ADD_TO_SHOPPING_LIST = gql`
  mutation addToShoppingList($recipeId: String!) {
    addToShoppingList(recipeId: $recipeId) {
      message
      success
    }
  }
`;

export const ADD_RECIPES_TO_SHOPPING_LIST = gql`
  mutation addRecipesToShoppingList($recipeIds: [String]!) {
    addRecipesToShoppingList(recipeIds: $recipeIds) {
      message
      success
    }
  }
`;

export const REMOVE_FROM_SHOPPING_LIST = gql`
  mutation removeFromShoppingList($recipeId: String!) {
    removeFromShoppingList(recipeId: $recipeId) {
      success
    }
  }
`;

export const TOGGLE_SHOPPING_LIST_ITEM = gql`
  mutation toggleShoppingListItem($isAggregate: Boolean!, $itemId: String!) {
    toggleShoppingListItem(isAggregate: $isAggregate, itemId: $itemId) {
      success
    }
  }
`;

export const UPDATE_SHOPPING_LIST_RECIPE_SERVINGS = gql`
  mutation updateShoppingListRecipeServings(
    $numberOfServings: Int!
    $recipeId: String!
  ) {
    updateShoppingListRecipeServings(
      numberOfServings: $numberOfServings
      recipeId: $recipeId
    ) {
      success
    }
  }
`;

export const CLEAR_SHOPPING_LIST_CHECKED_ITEMS = gql`
  mutation clearShoppingListCheckedItems {
    clearShoppingListCheckedItems {
      success
    }
  }
`;

export const CLEAR_SHOPPING_LIST = gql`
  mutation clearShoppingList {
    clearShoppingList {
      success
    }
  }
`;

export const CREATE_MEAL_ENTRY = gql`
  mutation createMealEntry($mealId: ID!, $value: MealTrackStatus) {
    createMealEntry(mealId: $mealId, value: $value) {
      message
      success
    }
  }
`;

export const UPDATE_HYDRATION = gql`
  mutation updateHydration($action: ActionType!, $date: Date!) {
    updateHydration(action: $action, date: $date) {
      message
      success
    }
  }
`;

export const CREATE_WEIGHT_ENTRY = gql`
  mutation createWeightEntry($date: Date!, $value: Float!) {
    createWeightEntry(date: $date, value: $value) {
      message
      success
    }
  }
`;

export const SWAP_MEAL_PLAN_RECIPE = gql`
  mutation swapMealPlanRecipe(
    $useDatetime: Boolean
    $mealId: String
    $mealTag: MealTime
    $recipeId: String!
    $serving: Int
  ) {
    swapMealPlanRecipe(
      mealId: $mealId
      mealTag: $mealTag
      recipeId: $recipeId
      serving: $serving
    ) {
      mealPlan {
        calories
        date(useDatetime: $useDatetime)
        day
        id
        meals {
          calories
          id
          maxNumOfServings
          meal
          numOfServings
        }
      }
      message
      success
    }
  }
`;

export const CREATE_MY_RECIPE = gql`
  mutation createMyRecipe($input: CreateMyRecipeInput!) {
    createMyRecipe(input: $input) {
      message
      recipe {
        courses
        cuisines
        id
        ingredientLines
        ingredients {
          foodId
          grams
          milliliters
          name
        }
        instructions
        language
        mainImage
        mealTimes
        name
        numberOfServings
        nutrients {
          amount
          name
          type
          unit
        }
        nutrientsPerServing {
          amount
          name
          type
          unit
        }
        servingWeight
        squareImage
        tags
        text
        totalTime
        totalTimeInSeconds
        weightInGrams
      }
      success
    }
  }
`;

export const LOGIN = gql`
  mutation login($userId: String!) {
    login(userId: $userId) {
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_MEAL_PLAN = gql`
  mutation generateMealPlan($variety: MPVariety) {
    generateMealPlan(variety: $variety) {
      success
      message
    }
  }
`;
