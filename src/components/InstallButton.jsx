import { useEffect, useState } from 'react'

function InstallButton() {
  const [prompt, setPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    function handleBeforeInstall(e) {
      e.preventDefault()
      setPrompt(e)
    }

    function handleInstalled() {
      setInstalled(true)
      setPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  if (installed || !prompt) return null

  async function handleClick() {
    prompt.prompt()
    await prompt.userChoice
    setPrompt(null)
  }

  return (
    <button type="button" className="install-btn" onClick={handleClick}>
      Install App
    </button>
  )
}

export default InstallButton