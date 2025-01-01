const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m"
};

// Utility function to log text with default and custom color and style
function colorLog(text, options = {}) {
  // Default color options
  const defaults = {
    fgColor: "FgBlue",   // Default foreground color
    bgColor: "BgBlack",   // Default background color
    style: "Bright"       // Default style
  };
  
  // Merge defaults with user options
  const { fgColor, bgColor, style } = { ...defaults, ...options };
  
  // Resolve color codes
  const fgCode = colors[fgColor] || ""; // Foreground color
  const bgCode = colors[bgColor] || ""; // Background color
  const styleCode = colors[style] || ""; // Text style
  
  console.log(`${styleCode}${fgCode}${bgCode}${text}${colors.Reset}`);
}

module.exports = colorLog;
