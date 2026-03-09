/**
 * Jellyfin API proxy route.
 * All requests to /api/jellyfin/* are proxied to the Jellyfin backend,
 * with the API key injected server-side (never exposed to the browser).
 *
 * Example:
 *   GET /api/jellyfin/Users/Libraries
 *   → GET {JELLYFIN_URL}/Users/{userId}/Views  (with X-Emby-Token header)
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const jellyfinUrl = config.jellyfinUrl || 'http://localhost:8096'
  const apiKey = config.jellyfinApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'JELLYFIN_API_KEY is not configured',
    })
  }

  // Build the target path from the wildcard segment
  const path = event.context.params?.path ?? ''

  // Handle convenience routes that need user ID injection
  let targetPath: string
  let targetUrl: string

  if (path === 'Users/Libraries') {
    // Get the current user's libraries (views)
    const userId = await getAuthenticatedUserId(jellyfinUrl, apiKey)
    targetUrl = `${jellyfinUrl}/Users/${userId}/Views`
  } else if (path === 'Users/Movies') {
    // Get movies from the Movies library
    const userId = await getAuthenticatedUserId(jellyfinUrl, apiKey)
    targetUrl = `${jellyfinUrl}/Users/${userId}/Items?IncludeItemTypes=Movie&Recursive=true&Fields=ImageTags,CommunityRating,ProductionYear&SortBy=SortName&SortOrder=Ascending&Limit=500`
  } else {
    targetPath = path
    // Preserve query string
    const query = getQuery(event)
    const queryString = new URLSearchParams(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    ).toString()
    targetUrl = `${jellyfinUrl}/${targetPath}${queryString ? `?${queryString}` : ''}`
  }

  const response = await $fetch<unknown>(targetUrl, {
    headers: {
      'X-Emby-Token': apiKey,
      'Accept': 'application/json',
    },
  })

  return response
})

/**
 * Authenticates with Jellyfin and returns the current user ID.
 * Uses the API key to look up the admin user.
 */
async function getAuthenticatedUserId(jellyfinUrl: string, apiKey: string): Promise<string> {
  const users = await $fetch<Array<{ Id: string; Policy?: { IsAdministrator?: boolean } }>>(
    `${jellyfinUrl}/Users`,
    {
      headers: { 'X-Emby-Token': apiKey },
    }
  )

  if (!users || users.length === 0) {
    throw createError({ statusCode: 401, statusMessage: 'No users found in Jellyfin' })
  }

  // Prefer admin user, fall back to first user
  const admin = users.find(u => u.Policy?.IsAdministrator)
  return (admin ?? users[0]).Id
}
