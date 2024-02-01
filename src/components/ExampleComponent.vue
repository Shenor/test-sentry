<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>

    <q-btn label="trow error" @click="myUndefinedFunction()"></q-btn>
    <q-btn label="trow api errot" @click="getUsers"></q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';
import { api } from 'src/boot/axios';
import * as Sentry from '@sentry/vue';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);

const getUsers = async () => {
  // https://jsonplaceholder.typicode.com/users
  try {
    const data = await api.get('https://jsonplaceholder.typicode.com/user');
    console.log(data);
  } catch (e) {
    Sentry.setTag('test-tag-name', 'testuser');
    Sentry.setUser({ user: 'test-user', email: 'john.doe@example.com' });
    throw new Error(e);
  }
};
</script>
