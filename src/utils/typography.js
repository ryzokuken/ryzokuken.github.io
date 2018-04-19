import Typography from 'typography';

const typography = new Typography({
  googleFonts: [
    {
      name: 'Nunito',
      styles: ['400', '700']
    }
  ],
  bodyFontFamily: ['Nunito', 'sans'],
  headerFontFamily: ['Nunito', 'sans']
});

export default typography;
