module.exports = (message, input, colorOption = 'info') => {
  // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  const colors = {
    info: '\x1b[44m%s\x1b[0m', // BgBlue
    success: '\x1b[42m', // BgGreen
    error: '\x1b[41m', // BgRed
    warning: '\x1b[43m', // BgYellow
    secondary: '\x1b[45m', // BgMagenta
  };

  const terminalDefaultColor = '\x1b[0m'

  console.log(colors[colorOption], message, terminalDefaultColor, input)
}