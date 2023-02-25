import { gql } from "@apollo/client";

export const NUTRIENTS_LIST_SHORT = `
    calcium
    calories
    carbs
    cholesterol
    fat
    netcarbs
    potassium
    protein
    saturatedFat
    sodium
    sugar
    transFat
`;

export const NUTRIENTS_LIST_FULL = `
     ala
     calcium
     calories
     carbs
     cholesterol
     choline
     copper
     dha
     dpa
     epa
     fat
     fiber
     iodine
     iron
     magnesium
     manganese
     molybdenum
     monounsaturatedFat
     netcarbs
     omega3
     phosphorus
     polyunsaturatedFat
     potassium
     protein
     saturatedFat
     selenium
     sodium
     sugar
     transFat
     vitaminA
     vitaminB1
     vitaminB2
     vitaminB3
     vitaminB5
     vitaminB6
     vitaminB7
     vitaminB9
     vitaminB12
     vitaminC
     vitaminD
     vitaminE
     vitaminK
     zinc
`;

export const RECIPE_ATTRIBUTES = `
    adherence
    adherenceDetails {
        color
        icon
        isRecommended
        reason
        score
        title
    }
    author
    caloriesPerServing {
        ala
        carbs
        dha
        dpa
        epa
        fat
        monounsaturatedFat
        omega3
        polyunsaturatedFat
        protein
        saturatedFat
        transFat
    }
    databaseId
    id
    ingredientLines
    ingredients {
        confirmed
        cpc
        name
        priority
        type
    }
    ingredientsCount
    instructions
    isUserFavorite
    mainImage
    mealTags
    name
    numberOfServings
    nutrientsPerServing {
        ${NUTRIENTS_LIST_SHORT}
    }
    programIds
    rating
    recipeType
    serving
    servingWeight
    servings {
        amount
        description
        equivalent
        selected
        unit
    }
    sourceUrl
    sourceUrlNotWorks
    sourceUrlWorks
    totalTime
    url
    usersFavorite
`;

export const GET_DIET_RESTRICTIONS = gql`
  query {
    restrictions(first: 10) {
      edges {
        node {
          id
          name
          subcategory
          slugname
          isOnProgram
        }
      }
    }
  }
`;

export const RECIPE = gql`
query recipe ($id: ID!) {
    recipe (id: $id) {
        ${RECIPE_ATTRIBUTES}
    }
}
`;

export const POPULAR_RECIPES = gql`
    query popularRecipes ($after: String, $before: String, $first: Int, $hidePurchasable: Boolean, $last: Int) {
    popularRecipes (after: $after, before: $before, first: $first, hidePurchasable: $hidePurchasable, last: $last) {
        edges {
            cursor
            node {
                ${RECIPE_ATTRIBUTES}
            }
        }
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
    }
}
`;

export const RECIPES_BY_MEAL_TIME = gql`
    query recipesByMealTime ($after: String, $before: String, $dietaryTags: [DietaryTag], $first: Int, $hidePurchasable: Boolean, $last: Int, $maxPrepTime: Int, $mealTime: RecipeMealTime) {
    recipesByMealTime (after: $after, before: $before, dietaryTags: $dietaryTags, first: $first, hidePurchasable: $hidePurchasable, last: $last, maxPrepTime: $maxPrepTime, mealTime: $mealTime) {
        edges {
            cursor
            node {
                ${RECIPE_ATTRIBUTES}
            }
        }
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
    }
}
`;

export const MY_FAVORITE_RECIPES = gql`
    query myFavoriteRecipes ($after: String, $before: String, $first: Int, $last: Int) {
    myFavoriteRecipes (after: $after, before: $before, first: $first, last: $last) {
        edges {
            cursor
            node {
                ${RECIPE_ATTRIBUTES}
            }
        }
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
    }
}
`;

export const MY_RECIPES = gql`
  query myRecipes(
    $after: String
    $before: String
    $first: Int
    $id: ID
    $last: Int
  ) {
    myRecipes(
      after: $after
      before: $before
      first: $first
      id: $id
      last: $last
    ) {
      count
      edges {
        cursor
        node {
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
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const SEARCH_RECIPE_BY_NAME_OR_INGREDIENT = gql`
query searchRecipeByNameOrIngredient ($query: String) {
    searchRecipeByNameOrIngredient (query: $query) {
        onPlan {
            ${RECIPE_ATTRIBUTES}
        }
        otherResults {
            ${RECIPE_ATTRIBUTES}
        }
    }
}
`;

export const RECIPE_SEARCH = gql`
    query recipeSearch ($after: String, $before: String, $cuisines: [String], $dietaryTag: DietaryTag, $filter: FoodFilter, $first: Int, $hasImage: Boolean, $hasInstructions: Boolean, $ingredients: [String], $isPremium: Boolean, $last: Int, $macroNutrientsRange: MacroNutrientsRangeInput, $maxPrepTime: Int, $mealTime: RecipeMealTime, $meals: [String], $minPrepTime: Int, $numberOfIngredients: Int, $program: String, $query: String, $skillLevel: SkillLevel, $tags: [String], $totalTime: Float) {
    recipeSearch (after: $after, before: $before, cuisines: $cuisines, dietaryTag: $dietaryTag, filter: $filter, first: $first, hasImage: $hasImage, hasInstructions: $hasInstructions, ingredients: $ingredients, isPremium: $isPremium, last: $last, macroNutrientsRange: $macroNutrientsRange, maxPrepTime: $maxPrepTime, mealTime: $mealTime, meals: $meals, minPrepTime: $minPrepTime, numberOfIngredients: $numberOfIngredients, program: $program, query: $query, skillLevel: $skillLevel, tags: $tags, totalTime: $totalTime) {
        edges {
            cursor
            node {
                ${RECIPE_ATTRIBUTES}
            }
        }
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
    }
}
`;

export const COMMON_FOODS = gql`
  query commonFoods(
    $after: String
    $before: String
    $filter: FoodFilter
    $first: Int
    $last: Int
    $query: String
  ) {
    commonFoods(
      after: $after
      before: $before
      filter: $filter
      first: $first
      last: $last
      query: $query
    ) {
      count
      edges {
        cursor
        node {
          description
          foodDataId
          id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const INGREDIENT_SEARCH = gql`
  query ingredientSearch(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $query: String
  ) {
    ingredientSearch(
      after: $after
      before: $before
      first: $first
      last: $last
      query: $query
    ) {
      edges {
        cursor
        node {
          ... on EdamamFoodResult {
            databaseId
            id
            label
            servings {
              amount
              description
              equivalent
              selected
              unit
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_CURRENT_MEALPLAN = gql`
    query mealPlan ($useDatetime: Boolean, $fromDate: Date) {
        mealPlan (fromDate: $fromDate) {
            calories
            date (useDatetime: $useDatetime)
            day
            id
            meals {
                calories
                id
                maxNumOfServings
                meal
                numOfServings
                recipe {
                    ${RECIPE_ATTRIBUTES}
                }
            }
        }
    }
`;

export const RECOMMENDED_SWAPS = gql`
    query recommendedSwaps ($forSimpleMealPlan: Boolean, $mealTime: RecipeMealTime!) {
    recommendedSwaps (forSimpleMealPlan: $forSimpleMealPlan, mealTime: $mealTime) {
        meals {
                databaseId
                id
                isUserFavorite
                mealTags
                mainImage
                name
                numberOfServings
        }
        recipes {
            ${RECIPE_ATTRIBUTES}
        }
    }
}
`;

export const MEAL_TRACKER_SIMPLEST = gql`
  query mealTracker($endDate: Date!, $startDate: Date!) {
    mealTracker(endDate: $endDate, startDate: $startDate) {
      date
      meal {
        id
        meal
      }
      mealId
      value
    }
  }
`;

export const MEAL_TRACKER_SIMPLE = gql`
  query mealTracker($endDate: Date!, $startDate: Date!) {
    mealTracker(endDate: $endDate, startDate: $startDate) {
      date
      meal {
        calories
        id
        maxNumOfServings
        meal
        numOfServings
        recipe {
          mainImage
          name
          numberOfServings
        }
      }
      mealId
      value
    }
  }
`;

export const MEAL_TRACKER = gql`
    query mealTracker ($preferredUnitSystem: UnitSystem, $endDate: Date!, $startDate: Date!) {
        mealTracker (endDate: $endDate, startDate: $startDate) {
            date
            meal {
                calories
                id
                maxNumOfServings
                meal
                numOfServings
                recipe {
                    ${RECIPE_ATTRIBUTES}
                }
            }
            mealId
            value
        }
    }
`;

export const SHOPPING_LIST_AGGREGATE = gql`
  query shoppingListAggregate(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $offset: Int
    $recipe: ID
    $after1: String
    $before1: String
    $first1: Int
    $id: UUID
    $last1: Int
    $offset1: Int
  ) {
    shoppingListAggregate(
      after: $after1
      before: $before1
      first: $first1
      id: $id
      last: $last1
      offset: $offset1
    ) {
      edges {
        cursor
        node {
          aggregateMeta {
            aisle
            grams
            ids
            idsContribution {
              databaseId
              eqv
            }
            name
            qty
            rawQty
          }
          aisleName
          comment
          createdAt
          databaseId
          grams
          id
          ingredient
          isCleared
          isDone
          listitemSet(
            after: $after
            before: $before
            first: $first
            last: $last
            offset: $offset
            recipe: $recipe
          ) {
            edges {
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
          meta
          quantity
          servingEquivalent
          unit
          updatedAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const SHOPPING_LIST = gql`
  query shoppingList(
    $after: String
    $before: String
    $first: Int
    $id: UUID
    $last: Int
    $offset: Int
    $after1: String
    $before1: String
    $first1: Int
    $last1: Int
    $offset1: Int
    $recipe: ID
  ) {
    shoppingList(
      after: $after1
      before: $before1
      first: $first1
      last: $last1
      offset: $offset1
      recipe: $recipe
    ) {
      edges {
        cursor
        node {
          aggregation(
            after: $after
            before: $before
            first: $first
            id: $id
            last: $last
            offset: $offset
          ) {
            edges {
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
          aisleName
          comment
          createdAt
          databaseId
          errors
          floatQuantity
          grams
          id
          ingredient
          ingredientLine
          isCleared
          isDone
          numberOfServings
          parse
          quantity
          quantityMetric
          recipeId
          recipeName
          recipeServings
          unit
          unitMetric
          updatedAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const HYDRATION = gql`
  query hydration($endDate: Date!, $startDate: Date!) {
    hydration(endDate: $endDate, startDate: $startDate) {
      date
      goal
      isToday
      quantity
    }
  }
`;

export const DAILY_RECAP_QUESTIONS = gql`
  query dailyRecapQuestions {
    dailyRecapQuestions {
      answers {
        answer
        id
        selected
        type
      }
      done
      id
      imageUrl
      isDefault
      question
      title
    }
  }
`;

export const WEIGHT_TRACKER = gql`
  query weightTracker($endDate: Date!, $startDate: Date!) {
    weightTracker(endDate: $endDate, startDate: $startDate) {
      entries {
        date
        value
      }
      start
      tendency {
        difference
        type
      }
      today
    }
  }
`;

export const STREAKS = gql`
  query streaks($endDate: Date!, $startDate: Date!) {
    streaks(endDate: $endDate, startDate: $startDate) {
      activities
      date
      dayStatus
      hasPreviousStreak
      isToday
      longestStreakEver
      totalPerfectDays
    }
  }
`;

export const MY_PROFILE = gql`
  query myProfile {
    myProfile {
      id
      email
      age
      birthdate
      biologicalSex
      activityLevel
      startingWeight
      customAttributes
      targetWeight
      height
      weeklyWeightGoal
      goalsOn
      isImperial
      programName
      restrictions {
        id
        name
      }
      dailyCaloricIntakeGoal
      caloricDifference
      totalDailyEnergyExpenditure
      basalMetabolicRate
      program {
        id
        name
        author
        cpcsIngredientGroups {
          avoid {
            benefits
            description
            matchCustomAttribute
            name
            simpleExamples
          }
          decrease {
            benefits
            description
            matchCustomAttribute
            name
            simpleExamples
          }
          increase {
            benefits
            description
            matchCustomAttribute
            name
            simpleExamples
          }
        }
        descriptionLong
        descriptionShort
      }
    }
  }
`;

export const PROGRAM = gql`
  query program(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $offset: Int
    $encoded: Boolean
    $id: ID!
  ) {
    program(id: $id) {
      author
      authorAvatar
      authors
      backgroundImage
      books
      comment
      contentlibrarySet(
        after: $after
        before: $before
        first: $first
        last: $last
        offset: $offset
      ) {
        edges {
          cursor
          node {
            categories {
              databaseId
              id
              name
              slug
            }
            databaseId
            id
            imageUrl
            interestedProfiles {
              activityLevel
              adherenceScore
              age
              basalMetabolicRate
              biologicalSex
              birthdate
              bloodPressureDiastolic
              bloodPressureSystolic
              bodyMassIndex
              caloricDifference
              country
              cpcs
              createdAt
              customAttributes
              dailyCaloricIntakeGoal
              email
              extraData
              gender
              glucoseLevel
              goal
              goals
              goalsOn
              hasNotifications
              hasOnboarded
              height
              id
              isImperial
              isPremium
              journeyStarted
              language
              lat
              lon
              mpCalories
              mpCarbsPerc
              mpDays
              mpDiversity
              mpError
              mpFatPerc
              mpFormat
              mpMonounsaturatedFatPerc
              mpOmega3Perc
              mpPolyunsaturatedFatPerc
              mpProteinPerc
              mpSaturatedFatPerc
              mpTransFatPerc
              programName
              sendbirdAccessToken
              startingWeight
              tags
              targetWeight
              timezone
              totalDailyEnergyExpenditure
              updatedAt
              userId
              weeklyWeightGoal
              weight
            }
            isBlocked
            order
            sourceUrl
            subTitle
            tags {
              id
              name
            }
            title
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
      cover
      cpcsIngredientGroups {
        avoid {
          benefits
          description
          matchCustomAttribute
          name
          simpleExamples
        }
        decrease {
          benefits
          description
          matchCustomAttribute
          name
          simpleExamples
        }
        increase {
          benefits
          description
          matchCustomAttribute
          name
          simpleExamples
        }
      }
      createdAt
      databaseId
      defaultVideoThumnail
      descriptionLong
      descriptionShort
      id
      image
      isActive
      isPremium
      name
      order
      restrictions(encoded: $encoded)
      showDefaultGoals
      slug
      tags
      visibility
    }
  }
`;

export const PROGRAMS = gql`
  query programs(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $offset: Int
    $encoded: Boolean
    $after1: String
    $before1: String
    $first1: Int
    $isActive: Boolean
    $isPremium: Boolean
    $last1: Int
    $offset1: Int
    $orderBy: ProgramOrderBy
  ) {
    programs(
      after: $after1
      before: $before1
      first: $first1
      isActive: $isActive
      isPremium: $isPremium
      last: $last1
      offset: $offset1
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          author
          authorAvatar
          authors
          backgroundImage
          books
          comment
          contentlibrarySet(
            after: $after
            before: $before
            first: $first
            last: $last
            offset: $offset
          ) {
            edges {
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
          cover
          cpcsIngredientGroups {
            avoid {
              benefits
              description
              matchCustomAttribute
              name
              simpleExamples
            }
            decrease {
              benefits
              description
              matchCustomAttribute
              name
              simpleExamples
            }
            increase {
              benefits
              description
              matchCustomAttribute
              name
              simpleExamples
            }
          }
          createdAt
          databaseId
          defaultVideoThumnail
          descriptionLong
          descriptionShort
          id
          image
          isActive
          isPremium
          name
          order
          restrictions(encoded: $encoded)
          showDefaultGoals
          slug
          tags
          visibility
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const RESTRICTIONS = gql`
  query restrictions($after: String, $before: String, $first: Int, $last: Int) {
    restrictions(after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
          databaseId
          id
          isOnProgram
          name
          slugname
          subcategory
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
