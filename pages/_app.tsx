// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BubbleChat } from 'flowise-embed-react'; // Import BubbleChat

import * as Fathom from 'fathom-client'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import posthog from 'posthog-js'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return  (
    <>
    <BubbleChat
      chatflowid="25f9401d-a111-465b-a789-25072ad022ed"
      apiHost="https://flowise-local.moodmnky.com"
      theme={{
        button: {
          backgroundColor: "#D53A3A", // Red to match the truck's color
          right: 20,
          bottom: 20,
          size: "medium",
          iconColor: "white",
          customIconSrc: "https://cdn.shopify.com/s/files/1/0693/4328/1426/files/mood_mnky_a_social_media_avatar_image_of_a_food_truck_called_Ru_0721b558-4330-4cc5-97f2-646abd4ca011_no_background.png",
        },
        chatWindow: {
          welcomeMessage: "Welcome to Ruth Mae's Food Truck! How may I be of service?",
          backgroundColor: "#FFFFFF", // White for a clean look
          height: 700,
          width: 400,
          fontSize: 16,
          poweredByTextColor: "#FFFFFF", // Red to match the truck's color
          botMessage: {
            backgroundColor: "#D53A3A", // Red for consistency
            textColor: "#FFFFFF", // White text for contrast
            showAvatar: true,
            avatarSrc: "https://cdn.shopify.com/s/files/1/0693/4328/1426/files/mood_mnky_a_social_media_avatar_image_of_a_food_truck_called_Ru_0721b558-4330-4cc5-97f2-646abd4ca011_no_background.png",
          },
          userMessage: {
            backgroundColor: "#FFFFFF", // White for a clean look
            textColor: "#D53A3A", // Red text for consistency
            showAvatar: false,
            avatarSrc: "https://cdn.discordapp.com/attachments/1083532452347269220/1198302011888767156/5bda0b7be46cb971021b7630_sctc-logos-03_1_1.png",
          },
          textInput: {
            placeholder: "Type your question",
            backgroundColor: "#D53A3A", // Red for consistency
            textColor: "#FFFFFF", // White text for contrast
            sendButtonColor: "#D53A3A", // Red for consistency
          }
        }
      }}
    />
  <Component {...pageProps} />
  </>
  );
}
