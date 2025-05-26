import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useQuery, } from '@tanstack/react-query'

export function useToken(): string | undefined {
  const { getToken } = useKindeAuth()

  const { data } = useQuery({
    queryKey: ['getToken'],
    queryFn: async () => {
      if (getToken != null) {
        return await getToken()
      }
    },
  })
  // console.log('Token:', data)

  return data
}
