<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation/>
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from './supabase/init';
import store from './store';
import Navigation from './components/Navigation.vue';

export default {
	components: {
		Navigation
	},
	setup() {
		// Create data / vars
		const appReady = ref(null);
		const user = supabase.auth.user();
		// Check to see if user is already logged in

		// If user does not exist, need to make app ready
		if (!user) {
			appReady.value = true;
		}
		// Runs when there is a auth state change
		// if user is logged in, this will fire
		supabase.auth.onAuthStateChange((_, session) => {
			store.methods.setUser(session);
			appReady.value = true;
			console.log('user logged in', store.state.user);
		});
		return {
			appReady
		};
	}
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
</style>
