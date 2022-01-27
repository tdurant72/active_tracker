import { ref, computed } from 'vue';
import { supabase } from "../supabase/init";
export const useCreateWorkout = () => {
    const workoutName = ref('');
    const workoutType = ref('select-workout');
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);
    const createWorkout = async () => {
        try {
            const { error } = await supabase.from('workouts').insert([
                {
                    workoutName: workoutName.value,
                    workoutType: workoutType.value,
                    exercises: exercises.value
                }
            ]);
            if (error) throw error;
            statusMsg.value = 'Success workout created';
            workoutName.value = null;
            workoutType.value = 'select-workout';
            exercises.value = [];
            setTimeout(() => {
                statusMsg.value = null;
            }, 500);
        } catch (err) {
            errorMsg.value = `Error: ${err.message}`;
            setTimeout(() => {
                errorMsg.value = false;
            }, 5000);
        }
    };
    return {
        workoutName,
        workoutType,
        exercises,
        statusMsg,
        errorMsg,
        createWorkout,
    }
}