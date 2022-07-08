import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SubscribedButton({ user, subscribed }) {
  const router = useRouter()

  const [subscribedButtonText, setSubscribedButtonText] = useState('Subscribed')
  const [subscribedButtonColor, setSubscribedButtonColor] = useState('green')

  return (
    <>
      {subscribed ? (
        <button
          className={`bg-${subscribedButtonColor}-500 px-3 py-2 flex rounded-md`}
          onClick={async () => {
            await fetch('/api/unsubscribe', {
              body: JSON.stringify({
                unsubscribeTo: user.id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })

            router.reload(window.location.pathname)
          }}
          onMouseOver={() => {
            setSubscribedButtonText('Unsubscribe')
            setSubscribedButtonColor('red')
          }}
          onMouseOut={() => {
            setSubscribedButtonText('Subscribed')
            setSubscribedButtonColor('green')
          }}
        >
       <span> {subscribedButtonText} </span>  
<svg
xmlns="http://www.w3.org/2000/svg"
class="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
stroke-width="2"
>
<path
  stroke-linecap="round"
  stroke-linejoin="round"
  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
/>
</svg>
        </button>
      ) : (
        <button
          className=' bg-red-500 px-3 py-2 flex rounded-md'
          onClick={async () => {
            await fetch('/api/subscribe', {
              body: JSON.stringify({
                subscribeTo: user.id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })

            router.reload(window.location.pathname)
          }}
        >
         <span>Subscribe </span> 
<svg
xmlns="http://www.w3.org/2000/svg"
class="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
stroke-width="2"
>
<path
  stroke-linecap="round"
  stroke-linejoin="round"
  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
/>
</svg>
        </button>
      )}
    </>
  )
}
