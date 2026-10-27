import assert from 'assert';

console.log('🧪 RUNNING SQA API ENDPOINT SUITE...\n');

async function runApiTests() {
  let passed = 0;
  let total = 0;

  // 1. Test Writing Evaluation Route
  total++;
  try {
    const res = await fetch('http://localhost:3000/api/evaluate/writing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskType: 'task1',
        taskPrompt: 'The maps show hospital road changes from 2007 to 2010.',
        candidateSubmission: 'The maps illustrate noticeable changes in the hospital infrastructure between 2007 and 2010. Overall, significant modernization occurred, including two new roundabouts and dedicated bus stops.',
      }),
    });
    assert.strictEqual(res.status, 200, 'Writing API must return 200 OK');
    const data = await res.json();
    assert.ok(data.overallBand >= 0 && data.overallBand <= 9, 'Band score must be between 0 and 9');
    assert.ok(data.criteriaScores, 'Must include criteriaScores breakdown');
    assert.ok(data.criteriaScores.taskAchievementOrResponse, 'Must have TR score');
    assert.ok(data.criteriaScores.coherenceCohesion, 'Must have CC score');
    assert.ok(data.criteriaScores.lexicalResource, 'Must have LR score');
    assert.ok(data.criteriaScores.grammaticalRangeAccuracy, 'Must have GRA score');
    assert.ok(data.detailedFeedback, 'Must include detailedFeedback');
    console.log('  ✅ PASS: /api/evaluate/writing endpoint');
    passed++;
  } catch (err) {
    console.error('  ❌ FAIL: /api/evaluate/writing endpoint', err);
  }

  // 2. Test Speaking Evaluation Route
  total++;
  try {
    const res = await fetch('http://localhost:3000/api/evaluate/speaking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partNumber: 2,
        topicPrompt: 'Describe a good law in your country',
        transcript: 'Well, um, I would like to talk about the traffic helmet law. It was enacted, you know, several years ago to protect motorcyclists and, um, reduce fatalities.',
        durationSeconds: 60,
      }),
    });
    assert.strictEqual(res.status, 200, 'Speaking API must return 200 OK');
    const data = await res.json();
    assert.ok(data.overallBand >= 0 && data.overallBand <= 9, 'Band score must be between 0 and 9');
    assert.ok(data.criteriaScores.fluencyCoherence, 'Must have FC score');
    assert.ok(data.criteriaScores.pronunciation, 'Must have Pronunciation score');
    assert.ok(data.fillerWordsCount >= 2, 'Must detect filler words (um, you know)');
    assert.ok(data.wpm > 0, 'Must calculate WPM speech rate');
    console.log('  ✅ PASS: /api/evaluate/speaking endpoint');
    passed++;
  } catch (err) {
    console.error('  ❌ FAIL: /api/evaluate/speaking endpoint', err);
  }

  console.log(`\n========================================`);
  console.log(`📊 SQA API RESULTS: ${passed} / ${total} TESTS PASSED`);
  console.log(`========================================\n`);

  if (passed !== total) process.exit(1);
}

runApiTests();
