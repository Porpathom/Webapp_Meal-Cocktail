const { createApp } = Vue

createApp({
    data() {
        return {
            scrolled: false,
            selectedService: null,
            showFilters: false,
            // Meals data
            mealSearch: '',
            meals: [],
            selectedMeal: null,
            mealCategories: [],
            selectedMealCategory: null,
            areas: [],
            selectedArea: null,
            // Cocktails data
            cocktailSearch: '',
            cocktails: [],
            selectedCocktail: null,
            cocktailAbortController: null,
            cocktailCategories: [],
            selectedCocktailCategory: null,
            cocktailTypes: [],
            selectedCocktailType: null,
            cocktailGlasses: [],
            selectedGlass: null,
            cocktailIngredients: [],
            selectedIngredient: null
        }
    },
    methods: {
        handleScroll() {
            this.scrolled = window.scrollY > 20;
            console.log("Scrolled:", this.scrolled, "ScrollY:", window.scrollY);
        },

        selectService(service) {
            this.selectedService = service
            if (service === 'meals') {
                this.loadMealCategories()
                this.loadAreas()
            } else if (service === 'cocktails') {
                this.loadCocktailCategories()
            }
        },

        selectService(service) {
            this.selectedService = service
            if (service === 'meals') {
                this.loadMealCategories()
                this.loadAreas()
            } else if (service === 'cocktails') {
                this.loadCocktailCategories()
            }
        },
        // Meals methods
        async loadMealCategories() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
                const data = await response.json()
                this.mealCategories = data.meals.map(category => category.strCategory)
            } catch (error) {
                console.error('Error loading meal categories:', error)
            }
        },
        async loadAreas() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
                const data = await response.json()
                this.areas = data.meals.map(area => area.strArea)
            } catch (error) {
                console.error('Error loading areas:', error)
            }
        },
        async searchMeals() {
            try {
                let url
                if (this.mealSearch) {
                    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.mealSearch}`
                } else if (this.selectedMealCategory) {
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.selectedMealCategory}`
                } else if (this.selectedArea) {
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.selectedArea}`
                } else {
                    url = 'https://www.themealdb.com/api/json/v1/1/random.php'
                }
                const response = await fetch(url)
                const data = await response.json()
                this.meals = data.meals || []

                // If results are from filter endpoint, fetch full details for each meal
                if (this.selectedMealCategory || this.selectedArea) {
                    this.meals = await Promise.all(
                        this.meals.map(async (meal) => {
                            const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                            const detailData = await detailResponse.json()
                            return detailData.meals[0]
                        })
                    )
                }
            } catch (error) {
                console.error('Error searching meals:', error)
            }
        },
        async getRandomMeal() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                const data = await response.json()
                this.meals = data.meals
            } catch (error) {
                console.error('Error getting random meal:', error)
            }
        },
        async showMealDetails(meal) {
            console.log("1. Function called with meal:", meal);
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                console.log("2. API Response:", response);
                const data = await response.json();
                console.log("3. Data received:", data);
                this.selectedMeal = data.meals[0];
                console.log("4. Selected meal set:", this.selectedMeal);
            } catch (error) {
                console.error('Error loading meal details:', error);
            }
        },
        
        selectMealCategory(category) {
            this.selectedMealCategory = this.selectedMealCategory === category ? null : category
            this.selectedArea = null
            this.mealSearch = ''
            this.searchMeals()
        },
        selectArea(area) {
            this.selectedArea = this.selectedArea === area ? null : area
            this.selectedMealCategory = null
            this.mealSearch = ''
            this.searchMeals()
        },
        getMealIngredients(meal) {
            const ingredients = []
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]
                const measure = meal[`strMeasure${i}`]
                if (ingredient && ingredient.trim()) {
                    ingredients.push({
                        name: ingredient,
                        measure: measure
                    })
                }
            }
            return ingredients
        },
        getIngredientImageUrl(ingredient) {
            return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
        },
        getInstructionSteps(instructions) {
            if (!instructions) return []
            return instructions
                .split(/\r\n|\n|\r/g)
                .filter(step => step.trim())
                .map(step => step.trim())
        },
        getYoutubeEmbedUrl(url) {
            if (!url) return null
            const videoId = url.split('v=')[1]
            return `https://www.youtube.com/embed/${videoId}`
        },

        // Cocktails methods
        async loadCocktailCategories() {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
                const data = await response.json()
                this.cocktailCategories = data.drinks.map(category => category.strCategory)
            } catch (error) {
                console.error('Error loading cocktail categories:', error)
            }
        },
        async getRandomCocktail() {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                const data = await response.json()
                this.cocktails = data.drinks
            } catch (error) {
                console.error('Error getting random cocktail:', error)
            }
        },
        async searchCocktails() {
            try {
                let url = this.cocktailSearch 
                    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.cocktailSearch}`
                    : this.selectedCocktailCategory 
                    ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.selectedCocktailCategory}`
                    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        
                console.log("Fetching:", url);
                const response = await fetch(url);
                const data = await response.json();
                this.cocktails = data.drinks || [];
                this.cocktails = [...this.cocktails];  
                this.$forceUpdate(); 
        
                if (this.selectedCocktailCategory) {
                    let detailedCocktails = [];
                    for (let cocktail of this.cocktails) {
                        console.log(`Fetching details for: ${cocktail.strDrink}`);
                        const detailResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`);
                        const detailData = await detailResponse.json();
                        if (detailData.drinks && detailData.drinks.length > 0) {
                            detailedCocktails.push(detailData.drinks[0]);
                        }
                    }
                    this.cocktails = detailedCocktails;
                }
            } catch (error) {
                console.error('Error searching cocktails:', error);
            }
        },
        
        
        async showCocktailDetails(cocktail) {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`)
                const data = await response.json()
                this.selectedCocktail = data.drinks[0]
            } catch (error) {
                console.error('Error loading cocktail details:', error)
            }
        },
        getCocktailIngredients(cocktail) {
            const ingredients = []
            for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`]
                const measure = cocktail[`strMeasure${i}`]
                if (ingredient && ingredient.trim()) {
                    ingredients.push({
                        name: ingredient,
                        measure: measure || ''
                    })
                }
            }
            return ingredients
        },
        getCocktailIngredientImageUrl(ingredient) {
            return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
        }
    },
    watch: {
        selectedService(newService) {
            if (newService === 'cocktails') {
                this.searchCocktails()
                this.loadCocktailCategories()
            } else if (newService === 'meals') {
                this.searchMeals()
                this.loadMealCategories()
                this.loadAreas()
            }
        }
    },
    mounted() {
        
        window.addEventListener('scroll', this.handleScroll);

        this.handleScroll();
        
        if (this.selectedService === 'meals') {
            this.searchMeals()
        } else if (this.selectedService === 'cocktails') {
            this.searchCocktails()
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
      }
}).mount('#app')