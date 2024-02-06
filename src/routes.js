import HomePage from './pages/HomePage.vue'
import ListeCoursesPage from './pages/ListeCoursesPage.vue'
import RecipeListPage from './pages/RecipeListPage.vue'
import RecipeDetailsPage from './pages/RecipeDetailsPage.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'Home',
    svgPaths: [
      'm19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z'
    ],
    svgViewBox: '0 0 20 20',
    toNavbar: true
  },
  {
    path: '/recipes',
    component: RecipeListPage,
    name: 'Recipes',
    svgPaths: [
      'M50 2H16a6.007 6.007 0 0 0-6 6v42a6.007 6.007 0 0 0 6 6h3v5a1 1 0 0 0 1.707.707L24 58.414l3.293 3.293A1 1 0 0 0 29 61v-5h21a4.004 4.004 0 0 0 4-4V6a4.004 4.004 0 0 0-4-4ZM16 4h34a2.002 2.002 0 0 1 2 2v38H16a5.969 5.969 0 0 0-4 1.54V8a4.004 4.004 0 0 1 4-4Zm8.707 52.293a1 1 0 0 0-1.414 0L21 58.586V51h6v7.586ZM50 54H29v-3h19a1 1 0 0 0 0-2H17a1 1 0 0 0 0 2h2v3h-3a4 4 0 0 1 0-8h36v6a2.002 2.002 0 0 1-2 2ZM21 28.411V36a3.003 3.003 0 0 0 3 3h16a3.003 3.003 0 0 0 3-3v-7.589a7.99 7.99 0 0 0-4.034-15.332 7.987 7.987 0 0 0-13.932 0A7.99 7.99 0 0 0 21 28.411ZM40 37H24a1.001 1.001 0 0 1-1-1v-1h18v1a1.001 1.001 0 0 1-1 1ZM24.26 15.016A7.962 7.962 0 0 0 24 17a1 1 0 0 0 2 0 6 6 0 0 1 12 0 1 1 0 0 0 2 0 7.961 7.961 0 0 0-.26-1.984 5.995 5.995 0 1 1-1.453 11.731 1 1 0 0 0-.574 1.916 7.706 7.706 0 0 0 3.287.268V33H23v-4.07a7.706 7.706 0 0 0 3.287-.267 1 1 0 0 0-.574-1.916 5.994 5.994 0 1 1-1.454-11.73Z'
    ],
    svgViewBox: '0 0 64 64',
    toNavbar: true
  },
  {
    path: '/recipes/:id',
    component: RecipeDetailsPage,
    name: 'Recipe Details',
    toNavbar: false
  },
  {
    path: '/listecourses',
    component: ListeCoursesPage,
    name: 'Liste de Courses',
    svgPaths: [
      'M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z'
    ],
    svgViewBox: '0 0 20 20',
    toNavbar: true
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

export default routes