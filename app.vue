<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <span class="text-lg font-bold">JellyNuxt</span>
          </NuxtLink>

          <!-- Nav links -->
          <div class="hidden md:flex items-center gap-6">
            <NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors text-sm">
              Libraries
            </NuxtLink>
            <NuxtLink to="/movies" class="text-gray-300 hover:text-white transition-colors text-sm">
              Movies
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="pt-16">
      <NuxtPage />
    </main>
  </div>
</template>
