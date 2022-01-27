import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Create from '../views/Create.vue';
import ViewWorkout from '../views/ViewWorkout.vue';
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: 'Create'
    }
  },
  {
    path: "/view-workout/:workoutId",
    name: "ViewWorkout",
    component: ViewWorkout,
    meta: {
      title: 'View Workout'
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next()
})
// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});
export default router;
