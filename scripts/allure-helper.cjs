const fs = require('fs');
const path = require('path');
const allure = require('allure-commandline');

// 1. Sanitize JAVA_HOME (fixes Windows batch trailing slash issue and missing env)
if (process.env.JAVA_HOME) {
  process.env.JAVA_HOME = process.env.JAVA_HOME.replace(/[\\/]+$/, '');
} else if (process.platform === 'win32') {
  const defaultTemurin = 'C:\\Program Files\\Eclipse Adoptium\\jre-17.0.20.101-hotspot';
  if (fs.existsSync(defaultTemurin)) {
    process.env.JAVA_HOME = defaultTemurin;
  }
}

// 2. Preserve History: Copy previous allure-report/history -> allure-results/history
const reportHistoryDir = path.resolve(__dirname, '../allure-report/history');
const resultsHistoryDir = path.resolve(__dirname, '../allure-results/history');

if (fs.existsSync(reportHistoryDir)) {
  try {
    fs.mkdirSync(resultsHistoryDir, { recursive: true });
    fs.cpSync(reportHistoryDir, resultsHistoryDir, { recursive: true });
    console.log('📊 Preserved Allure historical trend data (copied allure-report/history -> allure-results/history)');
  } catch (err) {
    console.warn('⚠️ Could not copy history:', err.message);
  }
}

// 3. Delegate command to Allure CLI
const args = process.argv.slice(2);
const runner = allure(args);

runner.on('close', (code) => {
  process.exit(code);
});
