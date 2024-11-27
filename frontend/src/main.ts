import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import './assets/tailwind.css'; // Ensure this line is present

// Add global reset
const style = document.createElement('style');
style.textContent = `
  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
document.head.append(style);

createApp(App).use(router).mount('#app');