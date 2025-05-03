import Portfolio from "./components/Portfolio"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Portfolio />
    </ThemeProvider>
  )
}

export default App