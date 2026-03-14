<template>
  <div class="min-h-screen px-4 pt-32 pb-20 text-white bg-neutral-900">
    <div class="max-w-3xl mx-auto">
      <h1 class="mb-8 text-4xl font-bold text-primary-500">Admin Panel</h1>

      <div v-if="!isLoggedIn" class="p-8 border bg-neutral-800 rounded-2xl border-neutral-700">
        <h2 class="mb-4 text-2xl">Login</h2>
        <input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-4 text-white border rounded bg-neutral-900 border-neutral-700" />
        <input v-model="password" type="password" placeholder="Password" class="w-full p-3 mb-4 text-white border rounded bg-neutral-900 border-neutral-700" />
        <button @click="login" class="px-6 py-3 font-semibold text-white transition-colors rounded bg-primary-500 hover:bg-primary-400">Login</button>
      </div>

      <div v-else class="p-8 space-y-4 border bg-neutral-800 rounded-2xl border-neutral-700">
        <h2 class="mb-4 text-2xl font-semibold">Write a New Blog (English)</h2>
        
        <input v-model="post.imageUrl" type="text" placeholder="Image URL (e.g., /images/blog1.webp)" class="w-full p-3 text-white border rounded bg-neutral-900 border-neutral-700" />
        
        <input v-model="post.titleEn" type="text" placeholder="Article Title (EN)" class="w-full p-3 text-white border rounded bg-neutral-900 border-neutral-700" />
        
        <textarea v-model="post.contentEn" rows="10" placeholder="Write your article here..." class="w-full p-3 text-white border rounded bg-neutral-900 border-neutral-700"></textarea>
        
        <div class="flex items-center justify-between mt-6">
          <p v-if="isPublishing" class="text-primary-500 animate-pulse">Translating and Publishing...</p>
          <button v-else @click="publishPost" class="px-8 py-3 font-semibold text-white transition-colors rounded bg-primary-500 hover:bg-primary-400">
            Translate to BG & Publish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const isLoggedIn = ref(false);
const isPublishing = ref(false);

const email = ref('');
const password = ref('');

const post = ref({
  titleEn: '',
  contentEn: '',
  imageUrl: ''
});

// Create a Free DeepL API Key at deepl.com

const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;

async function login() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    isLoggedIn.value = true;
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}

// Change this function in src/pages/Admin.vue
async function translateText(text, targetLang) {

  const response = await fetch('https://corsproxy.io/?https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang
    })
  });
  
  if (!response.ok) {
    throw new Error('Translation failed. Check your DeepL API key.');
  }

  const data = await response.json();
  return data.translations[0].text;
}

async function publishPost() {
  if (!post.value.titleEn || !post.value.contentEn) {
    return alert('Please fill in the title and content.');
  }

  isPublishing.value = true;

  try {
    // 1. Auto-Translate to Bulgarian
    const titleBg = await translateText(post.value.titleEn, 'BG');
    const contentBg = await translateText(post.value.contentEn, 'BG');

    // 2. Save to Firestore
    await addDoc(collection(db, "posts"), {
      slug: post.value.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      date: new Date().toISOString(),
      image: post.value.imageUrl || '/images/Logo.webp',
      en: {
        title: post.value.titleEn,
        content: post.value.contentEn
      },
      bg: {
        title: titleBg,
        content: contentBg
      }
    });

    alert('Post published and translated successfully!');
    post.value = { titleEn: '', contentEn: '', imageUrl: '' }; // Reset form
  } catch (error) {
    alert('Error publishing: ' + error.message);
  } finally {
    isPublishing.value = false;
  }
}
</script>