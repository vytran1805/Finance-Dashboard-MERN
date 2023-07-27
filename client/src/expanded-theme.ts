import { Palette, PaletteColor } from "@mui/material/styles/createPalette";
/**
 * Extend the PaletteColor and Palette interfaces
 */
declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }
  interface Palette {
    tertiary: PaletteColor;
  }
}
