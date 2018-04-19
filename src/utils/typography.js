import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '24px',
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
