<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Movies</h1>
      <div class="text-gray-400 text-sm">{{ movies?.length || 0 }} titles</div>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search movies..."
        class="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
      />
    </div>

    <!-- Loading -->
    <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <div v-for="i in 18" :key="i" class="space-y-2">
        <div class="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
        <div class="h-3 bg-gray-800 rounded animate-pulse w-3/4" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <div class="text-red-400 text-lg mb-2">Failed to load movies</div>
      <div class="text-gray-500 text-sm">{{ error.message }}</div>
    </div>

    <!-- Movie grid -->
    <div
      v-else-if="filteredMovies.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <div
        v-for="movie in filteredMovies"
        :key="movie.Id"
        class="group cursor-pointer"
      >
        <!-- Poster -->
        <div class="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 relative mb-2">
          <img
            v-if="movie.ImageTags?.Primary"
            :src="`/api/jellyfin/Items/${movie.Id}/Images/Primary?maxWidth=300`"
            :alt="movie.Name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"
          >
            <span class="text-4xl">🎞️</span>
          </div>

          <!-- Play overlay on hover -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <!-- Rating badge -->
          <div v-if="movie.CommunityRating" class="absolute top-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-xs text-yellow-400 font-medium">
            ★ {{ movie.CommunityRating.toFixed(1) }}
          </div>
        </div>

        <!-- Movie info -->
        <div class="text-sm font-medium truncate">{{ movie.Name }}</div>
        <div class="text-gray-500 text-xs">{{ movie.ProductionYear }}</div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-20 text-gray-500">
      <div class="text-6xl mb-4">🎬</div>
      <p class="text-lg">{{ searchQuery ? 'No movies match your search' : 'No movies found' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface JellyfinMovie {
  Id: string
  Name: string
  ProductionYear?: number
  CommunityRating?: number
  ImageTags?: { Primary?: string }
}

const searchQuery = ref('')

const { data: movies, pending, error } = await useFetch<JellyfinMovie[]>(
  '/api/jellyfin/Users/Movies',
  { default: () => [] }
)

const filteredMovies = computed(() => {
  if (!searchQuery.value || !movies.value) return movies.value ?? []
  const q = searchQuery.value.toLowerCase()
  return movies.value.filter(m => m.Name.toLowerCase().includes(q))
})
</script>
