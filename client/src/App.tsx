import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { useMemo } from "react"
import { themeSettings } from "./theme"

function App() {
  // create theme that comes from MUI
  const theme = useMemo(()=>createTheme(themeSettings),[])
  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          {/* CssBaseline will reset the setting of MUI to default */}
          <CssBaseline/>
        </ThemeProvider>
      </div>
      
  )
}

export default App
