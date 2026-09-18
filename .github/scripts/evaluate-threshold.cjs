const fs = require('fs');

const resultsFile = process.env.RESULTS_FILE || 'playwright-results.json';
const minThreshold = parseFloat(process.env.PASS_THRESHOLD || '80.0');

if (!fs.existsSync(resultsFile)) {
  console.error(`❌ Error: Results file "${resultsFile}" not found!`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
const stats = data.stats || {};
const passed = stats.expected || 0;
const failed = stats.unexpected || 0;
const flaky = stats.flaky || 0;
const skipped = stats.skipped || 0;

const totalExecuted = passed + failed + flaky;
const passRate = totalExecuted > 0 ? (passed / totalExecuted) * 100 : 0;

console.log('========================================================');
console.log('📊 PLAYWRIGHT AUTOMATED TEST EXECUTION METRICS');
console.log('========================================================');
console.log(`- Passed Scenarios:    ${passed}`);
console.log(`- Failed Scenarios:    ${failed}`);
console.log(`- Flaky Scenarios:     ${flaky}`);
console.log(`- Skipped Scenarios:   ${skipped}`);
console.log(`- Total Executed:      ${totalExecuted}`);
console.log(`- Calculated Pass Rate: ${passRate.toFixed(2)}%`);
console.log(`- Required Threshold:  ${minThreshold.toFixed(2)}%`);
console.log('========================================================');

const summaryContent = [
  '## 📊 Playwright Quality Gate Metrics',
  `- **Passed Tests**: ${passed}`,
  `- **Failed Tests**: ${failed}`,
  `- **Flaky Tests**: ${flaky}`,
  `- **Skipped Tests**: ${skipped}`,
  `- **Total Executed**: ${totalExecuted}`,
  `- **Calculated Pass Rate**: **${passRate.toFixed(2)}%**`,
  `- **Required Threshold**: **${minThreshold.toFixed(2)}%**`,
  '',
  passRate >= minThreshold
    ? `### ✅ QUALITY GATE PASSED (${passRate.toFixed(2)}% >= ${minThreshold.toFixed(2)}%)`
    : `### ❌ QUALITY GATE FAILED (${passRate.toFixed(2)}% < ${minThreshold.toFixed(2)}%)`
].join('\n');

if (process.env.GITHUB_STEP_SUMMARY) {
  try {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryContent + '\n');
  } catch (err) {
    console.warn('Could not write to GITHUB_STEP_SUMMARY:', err.message);
  }
}

if (passRate < minThreshold) {
  console.error(
    `❌ FAILURE: Pass rate (${passRate.toFixed(2)}%) is below the required threshold of ${minThreshold.toFixed(2)}%! Blocking deployment.`
  );
  process.exit(1);
} else {
  console.log(
    `✅ SUCCESS: Pass rate (${passRate.toFixed(2)}%) meets or exceeds the required threshold of ${minThreshold.toFixed(2)}%! Deployment permitted.`
  );
}
