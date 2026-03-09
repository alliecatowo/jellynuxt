<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">My Libraries</h1>

    <!-- Loading state -->
    <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="i in 10"
        :key="i"
        class="aspect-square bg-gray-800 rounded-xl animate-pulse"
      />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-20">
      <div class="text-red-400 text-lg mb-2">Failed to load libraries</div>
      <div class="text-gray-500 text-sm">{{ error.message }}</div>
      <p class="text-gray-600 text-xs mt-4">
        Make sure JELLYFIN_URL and JELLYFIN_API_KEY are configured.
      </p>
    </div>

    <!-- Libraries grid -->
    <div v-else-if="libraries?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <NuxtLink
        v-for="lib in libraries"
        :key="lib.Id"
        :to="lib.CollectionType === 'movies' ? '/movies' : `/library/${lib.Id}`"
        class="group relative aspect-square rounded-xl overflow-hidden bg-gray-800 hover:ring-2 hover:ring-purple-500 transition-all"
      >
        <!-- Library art -->
        <img
          v-if="lib.ImageTags?.Primary"
          :src="`/api/jellyfin/Items/${lib.Id}/Images/Primary`"
          :alt="lib.Name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-gray-900"
        >
          <span class="text-4xl">🎬</span>
        </div>

        <!-- Library name overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div class="font-semibold text-sm">{{ lib.Name }}</div>
          <div class="text-gray-400 text-xs capitalize">{{ lib.CollectionType || 'Library' }}</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-20 text-gray-500">
      <div class="text-6xl mb-4">📚</div>
      <p class="text-lg">No libraries found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface JellyfinLibrary {
  Id: string
  Name: string
  CollectionType?: string
  ImageTags?: { Primary?: string }
}

const { data: libraries, pending, error } = await useFetch<JellyfinLibrary[]>(
  '/api/jellyfin/Users/Libraries',
  { default: () => [] }
)
</script>
